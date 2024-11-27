<template>
	<view class="login">
	<swiper interval="2000" indicator-dots="true" autoplay="true" circular="true">
		<swiper-item>
		  <image mode="scaleToFill" :src="loginBg1"></image>
		</swiper-item>
		<swiper-item class="cri"> 
		  <image mode="scaleToFill" :src="loginBg2"></image>
		</swiper-item>
		<swiper-item>
			<image mode="scaleToFill" :src="loginBg3"></image>
		</swiper-item>
	</swiper>
	</view>
</template>

<script setup>
import { ref, reactive } from "vue"
import mixins from './mixins/generateImagesUrl.js'
	let {
		loginBg1,
		loginBg2,
		loginBg3
	} = mixins()
	const title = ref('test')
</script>

<style lang="scss" scoped>
.login{
	position: relative;
	height: 100vh;
	display: flex;
	flex-direction:column;
	justify-content:flex-end;
}
.login:before{
	background-image:$login-bg1;
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

</style>
