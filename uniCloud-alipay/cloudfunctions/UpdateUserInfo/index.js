'use strict';
const db = uniCloud.database();
const user = db.collection('user');
exports.main = async (event, context) => {
	const userId = event.userId;
	const userInfo = event.userInfo;
    let prop = userInfo.prop;
    let value = userInfo.value;
	if(prop === 'fileID'){
		const result = await uniCloud.getTempFileURL({
			fileList: [value]
		})
		prop = 'avatarUrl',
		value = result.fileList[0].tempFileURL
	}
	// 使用 upsert 来处理插入或更新操作
	const res = await user.where({
	  _id: userId
	}).update({
		[prop]: value
	})
	if(prop === 'avatarUrl'){
		return {
		  errCode: 1,
		  msg: '成功~',
		  data: {
			  avatarUrl: value
		  }
		}
	} else {
		//返回数据给客户端
		return {
		  errCode: 1,
		  msg: '成功~',
		  data: {}
		}
	}

};
