<template>
	<view class="home" @longtap="showDialog = true">
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
import { ref, onMounted } from "vue"
const showDialog = ref(false)
const showToEat = ref(false)
onMounted(()=> {
	showDialog.value = true
})
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
	justify-content:flex-end;
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