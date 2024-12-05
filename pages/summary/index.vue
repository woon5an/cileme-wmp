<template>
	<view class="summary">
		<view class="top" >
			<view class="top_title" @click="handeToogle">
				LET ME SEE SEE 👀
			</view>
			<transition name="slide">
				<view v-if="userTabOpen" class="userWrap">
					<view v-for="(item, index) in users" :key="index" class="user" :class="activeTab === item.name ?  'active' : ''" @click="switchUser(item.name)">
						{{item.nickName}}
					</view>
<!-- 					<view class="user" :class="activeTab === 'ma' ?  'active' : ''" @click="switchUser('ma')">
						莞城文化复兴艺术家马熙茜
					</view>
					<view class="user" :class="activeTab === 'woon' ?  'active' : ''" @click="switchUser('woon')">
						woonsan
					</view> -->
				</view>
			</transition>
		</view>
		


		<view class="calendarWrap">
			<view class="calendar-title">
				<span  @click="preMonth">
					<uni-icons type="left" size="30"></uni-icons>
				</span>
				<span style="padding: 0 67px;">{{monthTitle}}</span>
				<span  @click="nextMonth">
					<uni-icons type="right" size="30"></uni-icons>
				</span>
			</view>
			<view class="calendar-content">
				<van-calendar
				  v-if="showCalendar"
				  row-height="43"
				  type="single"
				  color="#EEA9B8"
				  :poppable="false"
				  :show-confirm="false"
				  :show-subtitle="false"
				  :show-title="false"
				  :min-date="minDate"
				  :max-date="maxDate"
				  :key="calendarKey"
				  :formatter="handleDateFormatter"
				  @select="selectDay"
				  @unselect="unselectDay"
				/>
				<view v-else class="empty">
					日历玩命加载中啦
				</view>
				<view class="luckRow">
					<view class="text"  @click="getTodayLuck">
						点我获取今日运势 👆🏻
					</view>
					<view class="passTotal">
						 及格天数✅：{{passCount}}
					</view>
				</view>

			</view>
		</view>
		
		<view class="bottom">
			<van-circle :size="120" :value="rate" color="#EEA9B8" stroke-width="8">
				<view style="color: #EEA9B8;">
					达标率 {{rate}}%
				</view>
			</van-circle>
		</view>

	</view>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance,nextTick, watchEffect } from 'vue'
import moment from 'moment'
import Toast from '../../wxcomponents/vant-weapp/toast/toast'
import { dateUtils } from "@/utils/utils.js"
import { onShow } from "@dcloudio/uni-app"
const {proxy} = getCurrentInstance()
onShow(()=> {
	getUsers()
})
onMounted(()=> {
	getMonthData()
})
const showCalendar = ref(false)
const calendarKey = ref(0)
const forceRerender = () => {
  calendarKey.value++// 增加 key 强制重新渲染
}

const rate = ref(0)

const userTabOpen = ref(false)
// const woon = {
// 	name: 'woon',
// 	id: '674b067c9fd38e63368ab1b6',
// }
// const ma = {
// 	name: 'ma',
// 	id: '674b067c9fd38e63368ab1b6',
// }
const users = ref([])
const userList = {
	woon: {
		name: 'woon',
		id: '674b067c9fd38e63368ab1b6'
	},
	ma: {
		name: '莞城文化复兴艺术家马熙茜',
		id: '674d2684e1c3eba5d9b0248f'
	}
}


const activeTab = ref('ma')

const monthTitle = computed(()=> {
	const date = new Date(minDate.value)
	let m = date.getMonth() + 1
	m = m < 10 ? `0${m}` : `${m}`
	return `${date.getFullYear()}年${m}月`
})
const passCount = computed(()=> {
	const passDates = recordDates.value.filter(e=> e.pass)
	return passDates.length
})

const minDate = ref(moment().startOf('month').valueOf())
const maxDate = ref(moment().endOf('month').valueOf())

const preMonth = ()=> {
	const date = minDate.value
	minDate.value = dateUtils.preMonthStartForDate(date)
	maxDate.value = dateUtils.preMonthEndForDate(date)
	getMonthData()
}

const nextMonth = ()=> {
	const date = minDate.value
	minDate.value = dateUtils.nextMonthStartForDate(date)
	maxDate.value = dateUtils.nextMonthEndForDate(date)
	getMonthData()
}

const selectDay = (Date)=> {
	handleClick(Date)
}
const unselectDay = ()=> {
	
}

const handeToogle = async ()=> {
	if(!userTabOpen.value && users.value.length === 0){
		await getUsers()
	}
	userTabOpen.value = !userTabOpen.value
}

const getUsers = async ()=> {
	proxy.$http('GetUserList').then(res=> {
		const code = res.result.errCode
		if(code === 0){
			const data = res.result.data
			users.value = data.map(e=> {
				if(e._id ===  userList.woon.id){
					return {
						...e,
						name: 'woon'
					}
				} else {
					return {
						...e,
						name: 'ma'
					}
				}
			}).reverse()
		}
	})
}

const recordDates = ref([])
const forceUpdateFlag = ref(false); // 用于强制视图更新
const getMonthData = () => {
	const month = moment(minDate.value).format('YYYY-MM') 
	wx.showLoading({
	  mask: true,
	  title: '加载中',
	})
	const userId = userList[activeTab.value].id
	proxy.$http('MonthRecord', { month, userId}).then(res=> {
		wx.hideLoading()
		const code = res.result.errCode
		if([0, 2].indexOf(code) !== -1){
			wx.showToast({
			  title: '这个月一点没吃哇~',
			  icon: 'none',
			  duration: 2000
			})
			showCalendar.value = true
		} else {
			recordDates.value = res.result.data
			showCalendar.value = true
			console.log(recordDates.value)
			forceUpdateFlag.value = !forceUpdateFlag.value
			rate.value = computeRate()
			// forceRerender()
			forceRerender()
		}
	}).catch(()=> {
		wx.hideLoading()
	})
}

const switchUser = (name)=> {
	activeTab.value = name
	showCalendar.value = false
	getMonthData()
}

const computeRate = () => {
	const monthDays = moment(minDate.value).daysInMonth()
	const passDays = recordDates.value.filter(e=> e.pass).length
	return  passDays === 0 ? 0 : (passDays / monthDays).toFixed(2) * 100
}

const handleDateFormatter = (day)=> {
	const dateStr = dateUtils.formatDate(day.date)
	if(dateUtils.today() === dateStr){
		day.text = '今'
	}
	//在ticketDates有票日期里查找是否包含该天
	const match = recordDates.value.find(e => {
		return e.exactDate === dateStr
	})
	if(!match){
		day.type = 'disabled'
	} else if(match.pass){
		day.bottomInfo = '✅'
	} else {
		day.bottomInfo = '❌'
	}
	return day
}
const handleClick = (Date)=> {
	const date = moment(Date.detail).format('YYYY-MM-DD')
	const user = users.value.find(e=> e.name === activeTab.value)
	console.log(user)
	const params = {
	  currentDate: date,
	  dates: recordDates.value.map(e => e.exactDate),
	  userName: user.nickName,
	  userId: user._id
	}
	uni.navigateTo({
		url: `/pages/summary/components/card/index?data=${encodeURIComponent(JSON.stringify(params))}`
	})
}

// const handleLongTap = ()=> {
// 	wx.showToast({
// 	  title: '这是一个没彩蛋的彩蛋~',
// 	  icon: 'none',
// 	  duration: 2000
// 	})
// }

const getTodayLuck = ()=> {
	wx.showLoading({
	  mask: true,
	  title: '加载中'
	})
	
	setTimeout(function () {
	  wx.hideLoading()
	  wx.showToast({
	    title: '骗你的暂时没有这个功能~',
	    icon: 'none',
	    duration: 2000
	  })
	}, 2000)
	
}
</script>

<style scoped lang="scss">
	.summary {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		// align-items: center;
		box-sizing: border-box;
		padding: 20rpx 20rpx;
		// gap: 20rpx;
		background-color: #fbeaed;
		.top{
			background-color: #fff;
			border-radius: 10px;
			width: 100%;
			display: flex;
			flex-direction: column;
			.top_title {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				box-shadow: 2rpx 2rpx 8rpx #aaa;
				border-radius: 20rpx;
				background-color: #EEA9B8;
				color: #FFFFFF;
			}
			.userWrap {
				// padding: 15px 25px;
				padding: 0rpx 40rpx;
				margin: 0 auto;
				height: 100rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				gap: 20rpx;
				overflow: hidden;
				transition: transform .8s;
				// background-color: #FFFFFF;
				border-bottom-left-radius: 25rpx;
				border-bottom-right-radius: 25rpx;
				.user {
					background: #fafafa;
					padding: 5rpx 10rpx;
					border-radius: 15rpx;
					color: #ffdc99;
				}
				.active {
					background: #ffdc99;
					color: #fafafa;
				}
			}
		}

		.calendarWrap {
			box-shadow: 2rpx 2rpx 8rpx #aaa;
			border-radius: 20rpx;
			padding-top: 5px;
			background-color: #FFFFFF;
			// padding-bottom: 80px;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			height: 60vh;
			display: flex;
			flex-direction: column;
			.calendar-title {
				text-align: center;
				padding: 10px;
				border-bottom: solid 1px rgba(0, 0, 0, 0.06);
				line-height: 15px;
				display: flex;
				justify-content: center;
				font-size: 15px;
				font-weight: bold;
			}
			.calendar-content {
				// flex:1;
				// max-height: 280px;
				.empty {
					width: 100%;
					height: 300rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.luckRow {
					width: 100%;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-left: 30rpx;
					.text {
						background: #ffdc99;
						padding: 20rpx;
						border-radius: 25rpx;
						color: #FFFFFF;
					}
					.passTotal {
						box-sizing: border-box;
						padding-right: 30rpx;
					}
				}
	
			}
		}
		.bottom {
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: center;
		}
		.slide-enter,
		.slide-leave-active {
		  transform: translate3d(0, 100%, 0);
		}
	}
</style>
<style>
	.van-calendar__month-title {
		display: none;
	}

	.calendarWrap .van-calendar__bottom-info {
		margin: 0 auto;
		bottom: 3px !important;
		font-size: 8px;
		color: #0DDBA4;
		word-break: break-all;
	}

</style>