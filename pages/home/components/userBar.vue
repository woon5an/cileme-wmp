<template>
	<view class="userBar" v-if="userList.length > 0">
		<view class="avatar" v-for="(item, index) in userList" @click="handleClick(item.name)" :key="index">
			<image mode='aspectFill' class="circle"  :src="item.avatarUrl" />
		</view>
<!-- 		<view class="avatar" @click="handleClick('ma')">
			<image mode='aspectFill' class="circle"  src="/static/images/bobo.jpg" />
		</view>
		<view class="avatar" @click="handleClick('woon')">
			<image mode='aspectFill' class="circle"  src="/static/images/bobo.jpg" />
		</view> -->
	</view>
	<view v-else class="userBar">
		
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { onShow } from "@dcloudio/uni-app"
const {proxy} = getCurrentInstance()
const emit = defineEmits(['close'])
const handleClick = (prop)=> {
	emit('open', prop)
}
const userList = ref([])
const woon = {
	name: 'woon',
	id: '674b067c9fd38e63368ab1b6',
}
const ma = {
	name: 'ma',
	id: '674b067c9fd38e63368ab1b6',
}
onShow(()=> {
	getUserInfo()
})
const getUserInfo = ()=> {
	proxy.$http('GetUserList').then(res=> {
		const code = res.result.errCode
		if(code === 0){
			const data = res.result.data
			userList.value = data.map(e=> {
				if(e._id ===  woon.id){
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