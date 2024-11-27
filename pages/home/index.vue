<template>
	<view class="login">
		
	</view>
</template>

<script setup>
import { ref } from "vue"
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

</style>
