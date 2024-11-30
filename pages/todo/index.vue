<template>
	<view class="toDoPage">
		<view class="head">
			<view class="date">
				{{today}}
			</view>
		</view>
		<view class="toDolist">
			<view class="toDoList_head">
				TODO
			</view>
			<view class="toDoList_content">
				<view v-if="FOODLIST.length === 0" class="emptyMessage">
					🐮啊都被你吃完了！
				</view>
				<view v-else class="toDoList_content_item" v-for="(item, index) in FOODLIST" :key="index" @click="handleToDo(item, index)">
					{{FOOD_MAP[item].label}}
				</view>
			</view>
		</view>
		<view class="finishedList">
			<view class="finishedList_head">
				FINISHED
			</view>
			<view class="finishedList_content">
				<view v-if="FINISHEDLIST.length === 0" class="emptyMessage">
					记得按时吃饭！
				</view>
				<view v-else class="finishedList_content_item" v-for="item in FINISHEDLIST" :key="item">
					{{FOOD_MAP[item].label}}
				</view>
			</view>
		</view>
		<van-dialog
		  use-slot
		  title="让我看看你吃了什么"
		  :show="showInput"
		  confirmButtonText="提交"
		  cancelButtonText="取消"
		  show-cancel-button
		  custom-class="my-custom-class"
		  confirm-button-color="#EEA9B8"
		  @confirm="dialogInputConfirm"
		  @cancel="handleCancel"
		>
			<view class="inputWrap">
				<input class="weui-input" :value="foodInfo"  placeholder="请输入内容"/>
			</view>
		</van-dialog>
	</view>
</template>

<script setup>
import {computed, getCurrentInstance, onMounted, ref} from 'vue'
import moment from 'moment'
import { FOOD_MAP,FOOD_ARR } from './const.js'
const {proxy} = getCurrentInstance()
onMounted(()=> {
	getTodayData()
})
const FOODLIST = ref(FOOD_ARR)
const FINISHEDLIST = ref([])
const currentItem = ref('')
const showInput = ref(false)
const foodInfo = ref('')
const today = computed(() => {
	return moment().format('YYYY-MM-DD')
})

const getTodayData = ()=> {
	proxy.$http('Daily').then(res => {
		const code = res.result.errCode
		if([0, 2].indexOf(code) !== -1){
			wx.showToast({
			  title: '今天说一点没吃哇~',
			  icon: 'none',
			  duration: 2000
			})
		} else {
			const todoList = []
			const finishedList = []
			const data = res.result.data
			for(prop in FOOD_ARR){
				if(data[prop] !== ''){
					finishedList.push(prop)
				} else {
					todoList.push(prop)
				}
			}
		}
	})
}
const handleToDo = (prop, index) => {
	currentItem.value = prop
	showInput.value = true
}
const dialogInputConfirm = ()=> {
	const todoList = FOODLIST.value.slice()
	const index = todoList.findIndex(e=> e === currentItem.value)
	todoList.splice(index, 1)
	FINISHEDLIST.value.push(currentItem.value)
	FOODLIST.value = todoList
	foodInfo.value = ''
	showInput.value = false
}
const handleCancel = ()=> {
	currentItem.value = ''
	foodInfo.value = ''
	showInput.value = false
}
</script>

<style scoped lang="scss">
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
.emptyMessage {
	box-sizing: border-box;
	width: 100%;
	text-align: center;
}
.toDoPage {
	width: 100%;
	height: 100vh;
	padding: 20rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 30rpx;
	.head{
		position: relative;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #EEA9B8;
		border-radius: 20rpx;
		font-size: 24px;
		color: #FFFFFF;
		font-family: Microsoft YaHei, Microsoft YaHei-Bold;
		font-weight: 700;
		.date{
			flex-grow: 0;
		}
		
	}
	.head::after {
		position: absolute;
		content: '🥕';
		right: 20px;
	}
	.card_head {
		box-sizing: border-box;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100rpx;
		background-color: #EEA9B8;
		top: 0;
		left: 0;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		line-height: 100rpx;
		font-size: 25px;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: left;
		color: #ffffff;
	}
	.toDolist {
		position: relative;
		width: 100%;
		height: 500rpx;
		box-sizing: border-box;
		background-color: white;
		text-align: center;
		box-shadow: 2rpx 2rpx 8rpx #aaa;
		border-radius: 20rpx;
		background-color: #fbeaed;
		.toDoList_head {
			@extend .card_head;
		}
		.toDoList_head::before {
			position: absolute;
			content: '📌';
			right: 20px;
		}
		.toDoList_content{
			box-sizing: border-box;
			width: 100%;
			height: calc(100% - 100rpx);
			margin-top: 100rpx;
			padding: 20rpx 40rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			gap: 30rpx;
		}
		.toDoList_content_item {
			background: #EEA9B8;
			padding: 20rpx;
			border-radius: 25rpx;
			color: #FFFFFF;
		}
	}
	.finishedList {
		position: relative;
		width: 100%;
		height: 500rpx;
		box-sizing: border-box;
		background-color: white;
		text-align: center;
		box-shadow: 2rpx 2rpx 8rpx #aaa;
		border-radius: 20rpx;
		background-color: #fff6e5;
		.finishedList_head {
			@extend .card_head;
			background-color: #ffdc99;
		}
		.finishedList_head::before {
			position: absolute;
			content: '👍	';
			right: 20px;
		}
		.finishedList_content{
			box-sizing: border-box;
			width: 100%;
			height: calc(100% - 100rpx);
			margin-top: 100rpx;
			padding: 20rpx 40rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			gap: 30rpx;
		}
		.finishedList_content_item {
			background: #ffdc99;
			padding: 20rpx;
			border-radius: 25rpx;
			color: #FFFFFF;
		}
	}
}
</style>