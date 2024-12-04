<template>
	<view class="profileWrap">
		<view class="close"  @click="handleClose">
			✖️
		</view>
		<view class="userInfo">
			<view class="avatar">
				<image mode='aspectFill' class="circle"  src="/static/images/bobo.jpg" />
			</view>
			<view class="info">
				<view class="username">
					莞城文化复兴艺术家马熙茜
				</view>
				<view class="introduction">
					这个人很懒暂时没有简介~
				</view>
			</view>
		</view>
		<view class="mood">
			<view class="title">
				你今天开心吗？
			</view>
			<van-rate
			  :value="moodValue"
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
	</view>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close'])
const moodValue = ref(2.5)
const onMoodChange = (e)=> {
	
}
const handleClose = ()=> {
	emit('close', 'id')
}
</script>

<style lang="scss" scoped>
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
			width: 100rpx;
			height: 100rpx;
			border: 1px solid #FFF;
			border-radius: 50%;
			.circle {
				width: 100rpx; 
				height: 100rpx;
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