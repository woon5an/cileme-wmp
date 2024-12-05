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
		console.log(result)
		prop = 'avatarUrl',
		value = result.fileList[0].tempFileURL
		const res = await user.where({
		  _id: userId
		}).update({
			[prop]: value
		})
		return {
		  errCode: 1,
		  msg: '成功~',
		  data: {
			  avatarUrl: value
		  }
		}
	} else {
		const res = await user.where({
		  _id: userId
		}).update({
			[prop]: value
		})
		return {
		  errCode: 1,
		  msg: '成功~',
		  data: {}
		}
	}

};
