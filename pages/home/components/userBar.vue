<template>
	<view class="userBar">
		<view class="avatar" @click="handleClick('ma')">
			<image mode='aspectFill' class="circle"  src="/static/images/bobo.jpg" />
		</view>
		<view class="avatar" @click="handleClick('woon')">
			<image mode='aspectFill' class="circle"  src="/static/images/bobo.jpg" />
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close'])
const handleClick = (prop)=> {
	emit('open', prop)
}
</script>

<style lang="scss" scoped>
.userBar {
	width: 100%;
	height: 100rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	gap: 20rpx;
	.avatar {
		display: flex;
		.circle {
			width: 50rpx; 
			height: 50rpx;
			border-radius: 50%; /* 将图片裁剪成圆形 */
			object-fit: cover; /* 确保图片填满圆形区域，不变形 */
		}
	}
}
</style>