'use strict';
const db = uniCloud.database();
const user = db.collection('user');
exports.main = async (event, context) => {
	const userId = event.userId;
	const userInfo = event.userInfo;
    const prop = userInfo.prop;
    const value = userInfo.value;
	// 使用 upsert 来处理插入或更新操作
	const res = await user.where({
	  userId: userId
	}).update({
		[prop]: value
	})
	
	//返回数据给客户端
	return {
	  errCode: 1,
	  msg: '成功~',
	  data: {}
	}
};
