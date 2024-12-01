// 公共请求方法
const http = (Name, Data = {}) => {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync('Token')
		// 判断是否存在token
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
			// 用户已经登录(验证token合法性)
			uniCloud.callFunction({
				name: 'VerifyToken',
				data: {
					token: token,
				},
				success: (TokenRes) => {
					if (TokenRes.result === false) {
						// token 过期
						uni.showToast({
							icon: 'error',
							title: '登录过期咯～',
							duration: 2000
						})
						// 返回登录页
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/login/index'
							})
						}, 2000)
					} else {
							
							uniCloud.callFunction({
								name: Name,
								data: Object.assign(Data, {token}),
								success: (res) => {
									resolve(res)
								},
								fail: (err) => {
									reject(err)
								}
							})
						
					}
				}
			})
 
		}
 
	})
 
}
 
 
export default http