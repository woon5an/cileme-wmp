<template>
	<view class="toDoPage">
		<view class="head">
			<view class="date">
				2024-11-28
			</view>
		</view>
		<view class="toDolist">
			<view class="toDoList_head">
				TODO
			</view>
			<view class="toDoList_content">
				<view class="toDoList_content_item" v-for="(item, index) in FOODLIST" :key="index" @click="handleToDo">
					{{item}}
				</view>
			</view>
		</view>
		<view class="finishedList">
			<view class="finishedList_head">
				FINISHED
			</view>
			<view class="finishedList_content">
				<view class="finishedList_content_item" v-for="item in FINISHEDLIST" :key="item">
					{{item}}
				</view>
			</view>
		</view>
		<uni-popup ref="inputDialog" v-model="showInput" type="dialog">
			<uni-popup-dialog  mode="input" title="让我看看你吃了什么" value=""
				placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup>
import {ref} from 'vue'
const FOODLIST = ref(['🍳BREAKFAST','🍜LUNCH','🍲DINNER', '🍘SNACK', '🍰CAKE'])
const FINISHEDLIST = ref([])
const currentItem = ref('')
const showInput = ref(false)
const handleToDo = (prop, index) => {
	currentItem.value = prop
	showInput.value = true
}
const dialogInputConfirm = ()=> {
	const todoList = FOODLIST.value.slice()
	const index = todoList.findIndex(e=> e === currentItem.value)
	todoList.splice(index, 1)
	FINISHEDLIST.value.push(currentItem.value)
}
</script>

<style scoped lang="scss">
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
		.finishedList_head {
			@extend .card_head;
			background-color: #6cfd97;
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
			background: #6cfd97;
			padding: 20rpx;
			border-radius: 25rpx;
			// color: #FFFFFF;
		}
	}
}
</style>