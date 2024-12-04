'use strict';
const db = uniCloud.database();
const user = db.collection('user');
exports.main = async (event, context) => {
	const userId = event.userId;
	// 使用 upsert 来处理插入或更新操作
	const res = await user.where({
	  _id: userId
	}).field({
		userId: true,
		avatarUrl: true,
		nickName: true
	  }).get()
	console.log(res)
	const res_ = {
		userId: res.data[0]._id,
		avatarUrl: res.data[0].avatarUrl,
		nickName: res.data[0].nickName
	}
	//返回数据给客户端
	return {
	  errCode: 1,
	  msg: '记录成功',
	  data: res_
	}
};
