<template>
	<view class="home" @longtap="showDialog = true">
		<user-bar @open="handleOpen"></user-bar>
		<Profile :userInfo="userData['ma']" key="ma" v-if="showMa" @close="()=> showMa = false"></Profile>
		<Profile :userInfo="userData['woon']" key="woon" v-if="showWoon" @close="()=> showWoon = false"></Profile>
		<van-dialog
		  use-slot
		  title="突击检查"
		  :show="showDialog"
		  showCancelButton
		  confirmButtonText="吃了"
		  cancelButtonText="还没"
		  custom-class="my-custom-class"
		  @confirm="handleConfirm"
		  @cancel="handleCancel"
		>
			<image width="100" height="100" src="/static/images/question.gif" />
		</van-dialog>
		<van-dialog
		  use-slot
		  :show="showToEat"
		  confirmButtonText="ok"
		  custom-class="my-custom-class"
		  @confirm="goToDo"
		>
			<image width="100" height="100" src="/static/images/goEat.jpg" />
		</van-dialog>
	</view>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import Profile from './components/profile.vue'
import UserBar from './components/userBar.vue'
const { proxy } = getCurrentInstance()
const showDialog = ref(false)
const showToEat = ref(false)
const showMa = ref(false)
const showWoon = ref(false)
const userData = ref({
	woon: {},
	ma: {}
})
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
onMounted(()=> {
	showDialog.value = true
})
const handleOpen = async (prop)=> {
	if(prop === 'ma'){
		await getUserInfo(prop)
		showMa.value = true
	} else {
		await getUserInfo(prop)
		showWoon.value = true
	}
}

const getUserInfo = async (prop)=> {
	wx.showLoading({
	  mask: true,
	  title: '加载中',
	})
	const id = userList[prop].id
	await proxy.$http('GetUserInfo', {userId: id}).then(res=> {
		wx.hideLoading()
		const code = res.result.errCode
		if(code === 1){
			userData.value[prop] = {...res.result.data}
		}
	}).catch(()=> {
		wx.hideLoading()
	})
}

const handleConfirm = () => {
	showDialog.value = false
	uni.showToast({
		title: '🐮啊'
	})
}
const handleCancel = () => {
	showDialog.value = false
	showToEat.value = true
}
const goToDo = () => {
	resetShow()
	uni.switchTab({
		url: '/pages/todo/index'
	})
}

const resetShow = () => {
	showDialog.value = false
	showToEat.value = false
}
</script>

<style lang="scss" scoped>
.home{
	position: relative;
	height: 100vh;
	display: flex;
	flex-direction:column;
	justify-content:flex-start;
	padding: env(safe-area-inset-top) 20rpx env(safe-area-inset-bottom) 20rpx;
}
.home:before{
	background-image:$login-bg;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	width: 100%;
	height: 100%;
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;/*-1 可以当背景*/
	-webkit-filter: blur(3px);
	filter: blur(3px);
}
.home image {
  position: relative; /* 如果没有 position 的话，z-index 不会生效 */
  z-index: 10; /* 将图片的层级提升 */
}
</style>