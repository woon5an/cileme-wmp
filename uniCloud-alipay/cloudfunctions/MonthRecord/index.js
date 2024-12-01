'use strict';
const moment = require('moment'); 
// 创建user数据表实例
const db = uniCloud.database()
const daily = db.collection('daily')
// 校验token公共模块
const {verifyToken} = require('wx-common')
exports.main = async (event, context) => {
	const user = verifyToken(event.token).value
	const targetMonth = event.month
	const res_user = await daily.where({
		openid: user
	}).get()
	if(res_user.data && res_user.data.length === 0){
		return {
			//该用户暂无数据
			errCode: 0,
			data: [],
			msg: '该用户暂无数据'
		}
	} 
    // 查询该用户指定月份的数据，使用正则来匹配 exactDate 的年月
    const res_user_monthData = await daily.where({
		openid: user,
		exactDate: db.RegExp({
		  regexp: `^${targetMonth}`, // 匹配 'YYYY-MM' 格式
		  options: 'i' // 不区分大小写
		})
	}).get()
    // 如果查询没有数据，返回空数组
    if (res_user_monthData.data.length === 0) {
		return {
		  errCode: 2,
		  msg: '该月份没有数据',
		  data: [] // 返回空数组
		}
	}
    // 如果有数据，构造符合要求的数组
    const result = res_user_monthData.data.map(item => {
        return {
          record: true,   // 记录存在
          exactDate: item.exactDate,   // 日期
          pass: item.score >= 60  // 判断 score 是否 >= 60
        }
    })
	return {
		errCode: 1,
		msg: '查询成功',
		data: result
	}
};
