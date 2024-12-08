<template>
	<view class="profileWrap">
		<view class="close"  @click="handleClose">
			✖️
		</view>
		<view class="userInfo">
			<button class="avatar" :disabled="isDisabled" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
				<image mode='scaleToFill'  class="circle"  :src="USERINFO.avatarUrl" />
			</button>
			<view class="info">
				<view class="username">
					{{USERINFO.nickName}}
					<view class="edit" @click="editNameShow=true">📝</view>
				</view>
				<view class="introduction" @longtap.stop="handleLongTap">
					{{!USERINFO.introduction ? '这个人很懒暂时没有简介~' : USERINFO.introduction}}
				</view>
			</view>
		</view>
		<view class="mood">
			<view class="title">
				你今天开心吗？
			</view>
			<van-rate
			  :value="USERINFO.mood"
			  size="25"
			  allow-half
			  color="#EEA9B8"
			  icon="smile"
			  void-icon="smile"
			  void-color="#fbeaed"
			  @change="onMoodChange"
			/>
		</view>
		<view class="bottom" @click="handleClose"></view>
		<van-dialog
		  use-slot
		  :show="editNameShow"
		  confirmButtonText="提交"
		  cancelButtonText="取消"
		  show-cancel-button
		  custom-class="my-custom-class"
		  confirm-button-color="#EEA9B8"
		  @confirm="confirmEditName"
		  @cancel="handleCancelEditName"
		>
			<view class="inputWrap">
				<input class="weui-input" v-model="USERINFO.nickName"  placeholder="请输入"  />
			</view>
		</van-dialog>
		<van-dialog
		  use-slot
		  :show="editIntroShow"
		  confirmButtonText="提交"
		  cancelButtonText="取消"
		  show-cancel-button
		  custom-class="my-custom-class"
		  confirm-button-color="#EEA9B8"
		  @confirm="confirmEditIntro"
		  @cancel="handleCancelEditIntro"
		>
			<view class="inputWrap">
				<input class="weui-input" v-model="USERINFO.introduction"  placeholder="请输入"  />
			</view>
		</van-dialog>
	</view>
</template>

<script setup>
import { computed, onMounted, ref, watch, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const emit = defineEmits(['close'])
const props = defineProps({
	userInfo: {
		type: Object,
		default: () => null
	}
})
onMounted(()=> {
	loginUserId.value = uni.getStorageSync('UserId')
})
const isDisabled = computed(()=> {
	return loginUserId.value !== props.userInfo.userId
})
const USERINFO = ref({
	nickName: '',
	avatarUrl: '',
	userId: '',
	introduction: '',
	mood: 2.5
})
//显示编辑名称
const editNameShow = ref(false)
//显示编辑个人简介
const editIntroShow = ref(false)
const loginUserId = ref('')
watch(()=> props.userInfo, (nv)=> {
	USERINFO.value = props.userInfo
}, {
	immediate: true,
	deep: true
})
const moodValue = ref(2.5)

const _debounce = (func, wait=300)=> {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}
const submitMood = async()=> {
	const exactInfo = {
		prop: 'mood',
		value: moodValue.value
	}
	wx.showLoading({
	  mask: true,
	  title: '记录中',
	})
	const id = USERINFO.value.userId
	proxy.$http('ReportFood', {exactInfo, userId: id}).then(res=> {
		wx.hideLoading()
		const code = res.result.errCode
		if(code === 1){
			wx.showToast({
			  title: 'okok',
			  icon: 'success',
			  duration: 2000
			})
		} else {
			wx.showToast({
			  title: '好像出了点问题',
			  icon: 'error',
			  duration: 2000
			})
		}
	})
}
// 包装后的防抖函数
const debouncedSubmitMood = _debounce(submitMood, 300)
const onMoodChange = (e)=> {
	let mood = e.detail
	moodValue.value = mood
	debouncedSubmitMood(mood)
}
const confirmEditName = async()=> {
	uni.showLoading({
		title: '正在修改'
	})
	const id = USERINFO.value.userId
	const data = { prop: 'nickName', value: USERINFO.value.nickName}
	await proxy.$http('UpdateUserInfo', {userInfo: data,userId: id}).then(ress=> {
		wx.hideLoading()
		const code = ress.result.errCode
		if(code === 1){
			wx.showToast({
			  title: '修改成功',
			  icon: 'none',
			  duration: 1000
			})
		}
		editNameShow.value = false
	}).catch(()=> {
		wx.hideLoading()
		editNameShow.value = false
		wx.showToast({
		  title: '修改失败',
		  icon: 'none',
		  duration: 1000
		})
	})
}

const handleCancelEditName = ()=> {
	editNameShow.value = false
}

const handleLongTap = (event) => {
	// 阻止事件冒泡
	event.stopPropagation()
	editIntroShow.value = true
}

const confirmEditIntro = async()=> {
	uni.showLoading({
		title: '正在修改'
	})
	const id = USERINFO.value.userId
	const data = { prop: 'introduction', value: USERINFO.value.introduction}
	await proxy.$http('UpdateUserInfo', {userInfo: data,userId: id}).then(ress=> {
		wx.hideLoading()
		const code = ress.result.errCode
		if(code === 1){
			wx.showToast({
			  title: '修改成功',
			  icon: 'none',
			  duration: 1000
			})
		}
		editIntroShow.value = false
	}).catch(()=> {
		wx.hideLoading()
		editIntroShow.value = false
		wx.showToast({
		  title: '修改失败',
		  icon: 'none',
		  duration: 1000
		})
	})
}

const handleCancelEditIntro = ()=> {
	editIntroShow.value = false
}

const chooseAvatar = (e)=> {
	console.log(e)
	const {
		avatarUrl
	} = e.detail
	USERINFO.value.avatarUrl = avatarUrl
	uploadAvatar((avatarUrl))
}

const uploadAvatar = (url) => {
	uni.showLoading({
		title: '加载中'
	});
	uniCloud.uploadFile({
		filePath: url,
		cloudPath: `userInfo/${USERINFO.value.userId}.png`,
		fileType: 'image',
		async success(res) {
			console.log(res)
			wx.showLoading({
			  mask: true,
			  title: '加载中',
			})
			const id = USERINFO.value.userId
			const data = { prop: 'fileID', value: res.fileID}
			await proxy.$http('UpdateUserInfo', {userInfo: data,userId: id}).then(ress=> {
				wx.hideLoading()
				const code = ress.result.errCode
				if(code === 1){
					USERINFO.value['avatarUrl'] = ress.result.data.avatarUrl
				}
			}).catch(()=> {
				wx.hideLoading()
			})
		},
		fail() {},
		complete() {}
	})
}
const handleClose = ()=> {
	emit('close', 'id')
}
</script>

<style lang="scss" scoped>
.inputWrap {
	width: 100%;
	height: 150rpx;
	line-height: 150rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.weui-input {
		width: 500rpx;
		height: 70rpx;
		border-radius: 10rpx;
		border: 1px solid #eee;
		padding-left: 20rpx;
	}
}
.profileWrap {
	position: relative;
	width: 100%;
	height: 400rpx;
	box-sizing: border-box;
	box-shadow: 2rpx 2rpx 8rpx #aaa;
	border-radius: 20rpx;
	background-color: rgba(255, 255, 255, 0.9);
	margin-bottom: 30rpx;
	padding: 20rpx 20rpx 0rpx 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	.close{
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}
	.userInfo {
		width: calc(100% - 40rpx);
		height: 150rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		.avatar {
			width: 120rpx;
			height: 100rpx;
			border: 1px solid #FFF;
			border-radius: 50%;
			padding: 0px;
			object-fit: cover;
			.circle {
				width: 100%; 
				height: 100%;
				border-radius: 50%; /* 将图片裁剪成圆形 */
				object-fit: cover; /* 确保图片填满圆形区域，不变形 */
			}
		}
		.info{
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			padding: 5rpx 20rpx;
			gap: 10rpx;
			.username{
				font-family: PingFang SC, PingFang SC-Bold; 
				font-weight: 600;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.edit{
					margin-left: 5rpx;
				}
			}
			.introduction {
				font-size: 12px;
			}
		}
	}
	.mood {
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 30rpx;
	}
	.bottom {
		width: 100%;
		height: 40rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		background-color: #f1f1f1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom::after {
		content: '';
		position: absolute;
		bottom: 10rpx;
	    left: 50%;
	    transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 15rpx solid transparent;
		border-right: 15rpx solid transparent;
		border-bottom: 10px solid #6c6c6c;
	}
}
// .profileWrap::after {
// 	content: '✖️';
// 	position: absolute;
// 	top: 20rpx;
// 	right: 20rpx;
// }
</style>