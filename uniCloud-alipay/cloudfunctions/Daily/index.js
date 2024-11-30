'use strict';
const moment = require('moment'); 
// 创建user数据表实例
const db = uniCloud.database()
const daily = db.collection('daily')
// 校验token公共模块
const {verifyToken} = require('wx-common')
exports.main = async (event, context) => {
	const user = verifyToken(verifyToken(event.token))
	const today = moment().format('YYYY-MM-DD')
	const res_user = daily.where({
		openid: user
	}).get()
	if(res_user.data && res_user.dta.length === 0){
		return {
			//该用户暂无数据
			errCode: 0,
			data: {}
		}
	} else {
		const res_user_today = daily.where({
			openid: user,
			exactDate: today
		}).get()
		if(res_user_today.data) {
			return {
				errCode: 1,
				data: {
					daily.where({
						openid: user,
						exactDate: today
					}).field({
						breakfast: true,
						lunch: true,
						dinner: true,
						snack:true,
						cake:true,
					})
				}
			}
		} else {
			return {
				//该日暂无数据
				errCode: 2,
				 data {
					 
				 }
			}
		}
	}
};
