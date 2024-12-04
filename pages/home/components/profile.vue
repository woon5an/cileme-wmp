<template>
	<view class="profileWrap">
		<view class="close"  @click="handleClose">
			✖️
		</view>
		<view class="userInfo">
			<button class="avatar" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
				<image mode='scaleToFill'  class="circle"  :src="USERINFO.avatarUrl" />
			</button>
			<view class="info">
				<view class="username">
					{{USERINFO.nickName}}
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
import { ref,watch } from 'vue'
const emit = defineEmits(['close'])
const props = defineProps({
	userInfo: {
		type: Object,
		default: () => null
	}
})
const USERINFO = ref({
	nickName: '',
	avatarUrl: '',
	userId: ''
})
watch(()=> props.userInfo, (nv)=> {
	console.log(nv)
	USERINFO.value = props.userInfo
}, {
	immediate: true,
	deep: true
})
const moodValue = ref(2.5)
const onMoodChange = (e)=> {
	
}

const chooseAvatar = (e)=> {
	const {
		avatarUrl
	} = e.detail
	
}

const uploadAvatar = (url) => {
	uni.showLoading({
		title: '加载中'
	});
	uniCloud.uploadFile({
		filePath: url,
		cloudPath: `userInfo/${USERINFO.value.userId}`,
		onUploadProgress: function(progressEvent) {
		  console.log(progressEvent);
		  var percentCompleted = Math.round(
			(progressEvent.loaded * 100) / progressEvent.total
		  );
		},
		success(res) {
			console.log(res)
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