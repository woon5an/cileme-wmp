'use strict';
const db = uniCloud.database();
const user = db.collection('user');
const moment = require('moment'); 
const daily = db.collection('daily');
exports.main = async (event, context) => {
	const userId = event.userId;
	const date = moment().format('YYYY-MM-DD')
	// 使用 upsert 来处理插入或更新操作
	const res = await user.where({
	  _id: userId
	}).field({
		userId: true,
		avatarUrl: true,
		nickName: true,
		introduction: true
	  }).get()
	console.log(res)
	const moodRes = await daily.where({
		userId: userId,
		exactDate: date
	}).field({
		mood: true
	}).get()
	const mood = (moodRes.data && moodRes.data.length > 0) ? moodRes.data[0].mood : 2.5
	const res_ = {
		userId: res.data[0]._id,
		avatarUrl: res.data[0].avatarUrl,
		nickName: res.data[0].nickName,
		introduction: res.data[0].introduction,
		mood: mood
	}
	//返回数据给客户端
	return {
	  errCode: 1,
	  msg: '记录成功',
	  data: res_
	}
};
