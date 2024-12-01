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
	const exactInfo = event.exactInfo
	const prop = exactInfo.prop
	const dayInfo = await daily.where({
		openid: user,
		exactDate: today
	}).get()
	console.log(dayInfo)
	if(dayInfo.data && dayInfo.data.length === 0){
		await daily.add({
			openid: user,
			[prop]: exactInfo.value,
			exactDate: today,
			score: exactInfo.score
		})
		return {
			errCode: 1,
			msg: '记录成功',
			data: {}
		}
	} else {
		const currentScore = dayInfo.data[0].score || 0
		const updatedScore = currentScore + exactInfo.score
		await daily.where({
			openid: user,
			exactDate: today
		}).update({
			[prop]: exactInfo.value,
			score: updatedScore
		})
		return {
			errCode: 1,
			msg: '记录成功',
			data: {}
		}
	}
};
