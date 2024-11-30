'use strict';
// 生成token和校验token公共模块
const {verifyToken} = require('wx-common')
exports.main = async (event, context) => {
	console.log(event.token)
	const isValidToken = verifyToken(event.token)
	if(!isValidToken){
		return false
	} else {
		return true
	}
};
