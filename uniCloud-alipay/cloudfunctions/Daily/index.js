'use strict';
const moment = require('moment'); 
// 创建user数据表实例
const db = uniCloud.database()
const daily = db.collection('daily')
// 校验token公共模块
const {verifyToken} = require('wx-common')
exports.main = async (event, context) => {
	const user = verifyToken(event.token).value
	const today = moment().format('YYYY-MM-DD')
	const res_user = await daily.where({
		openid: user
	}).get()
	if(res_user.data && res_user.data.length === 0){
		return {
			//该用户暂无数据
			errCode: 0,
			data: {}
		}
	} else {
		const res_user_today = await daily.where({
			openid: user,
			exactDate: today
		}).get()
		if(res_user_today.data) {
			console.log(res_user_today.data)
			// 查询当天的记录
			const result = await daily.where({
				openid: user,
				exactDate: today
			})
			.field({
				breakfast: true,
				lunch: true,
				dinner: true,
				snack: true,
				cake: true,
			})
			.get()
			// 对返回的数据进行处理，确保每个字段都存在，如果没有就设置为空字符串
		    const dayInfo = result.data.length > 0 ? result.data[0] : {};
			  // 将缺失的字段设置为空字符串
			const fields = ['breakfast', 'lunch', 'dinner', 'snack', 'cake'];
			fields.forEach(field => {
			    if (!dayInfo.hasOwnProperty(field)) {
			      dayInfo[field] = ''; // 如果字段不存在，设置为空字符串
			    }
			});
			return {
				errCode: 1,
				data: dayInfo
			}
		} else {
			return {
				//该日暂无数据
				errCode: 2,
				 data: {
					 
				 }
			}
		}
	}
};
