<template>
	<view class="login">
		<button class="btn" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">点我登录</button> 
	</view>
</template>

<script setup>
// 获取授权
const getUserInfo = ()=> {
	uni.showModal({
		title:"使用微信授权登录",
		showCancel:true,
		cancelColor:"#000000",
		confirmColor:"#42b983",
		success:(success) => {
			if(success.confirm) {
				uni.showLoading({
					title:'登录中...'
				})
				uni.getUserProfile({
					desc:'获取用户信息，进行登录',
					success: (res) => {
						//调用登录函数
						console.log(res)
						getLogin(res.userInfo)
					}
				})
			}
			if(success.cancel) {
				uni.showToast({
					title: '用户取消登录!',
					icon:'none',
					duration: 2000
				});
			}
			
			
		}
	})
}
// 微信登录
const getLogin = (userInfo)=> {
	uni.login({
		provider:'weixin',
		success: (res) => {
			// 调用云函数
			uniCloud.callFunction({
				name:'Login', // 云函数名称
				data:{ // 需要传递给云函数的参数
					userinfo:userInfo,
					code:res.code
				}
			}).then(ress => {
				//判断是否返回了用户数据
				if(ress.result.affectedDocs != 0) {
					//存储用户信息
					// this.UpdaUserInfo(ress.result.data[0])
					// 存储token
					uni.setStorage({
						key:'Token',
						data:ress.result.data[0].token
					})
					uni.setStorage({
						key: 'UserId',
						data: ress.result.data[0].userId
					})
					uni.showToast({
						title:'登录成功',
						icon:'none',
						duration: 2000
					});
					setTimeout(() => {
						// 跳转首页
						uni.switchTab({
							url:'/pages/home/index'
						})
					},2000)
				}else {
					uni.showToast({
						title:'登录失败',
						icon:'none',
						duration: 2000
					});
				}
				uni.hideLoading()
				
				
			}).catch(err => {
				uni.showToast({
					title:'登录失败',
					icon:'none',
					duration: 2000
				});
			})
		} 
	})
}
</script>

<style lang="scss" scoped>
.login{
	position: relative;
	height: 100vh;
	display: flex;
	flex-direction:column;
	justify-content:center;
	.btn {
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;
		// background-color: #ffdc99;
		// color: #fff;
	}
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
.login image {
  position: relative; /* 如果没有 position 的话，z-index 不会生效 */
  z-index: 10; /* 将图片的层级提升 */
}
</style>