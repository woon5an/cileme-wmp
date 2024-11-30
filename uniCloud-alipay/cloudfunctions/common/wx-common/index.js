// 生成token方法
const jwt = require('jsonwebtoken')
 
// 密匙
const secret = '***'
 
//生成token
function getToken(value) {
	// sign(加密数据，加密辅助，过期时间(单位/s))
	return jwt.sign({value}, secret, {expiresIn: 10800 * 8 * 7});
}
//解密token
function verifyToken(token) {
	try {
		return jwt.verify(token,secret)
	}catch(e) {
		return false
	}
}
//导出方法
module.exports = {
	getToken,
	verifyToken
}