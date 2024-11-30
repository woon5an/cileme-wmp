<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			const token = uni.getStorageSync('Token')
			if (!token) {
				uni.showToast({
					icon: 'error',
					title: '请先登录一哈!',
					duration: 2000
				})
				// 返回登录页
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/index'
					})
				}, 2000)
			} else {
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	view {
		box-sizing: border-box;
	}
</style>
