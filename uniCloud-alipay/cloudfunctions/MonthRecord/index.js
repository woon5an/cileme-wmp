'use strict';
const moment = require('moment'); 
const db = uniCloud.database();
const daily = db.collection('daily');
const { verifyToken } = require('wx-common');

exports.main = async (event, context) => {
  // const user = verifyToken(event.token).value;
  const userId = event.userId
  const targetMonth = event.month;

  // 查询该用户指定月份的数据，使用正则来匹配 exactDate 的年月
  const res_user_monthData = await daily.where({
    userId: userId,
    exactDate: db.RegExp({
      regexp: `^${targetMonth}`, // 匹配 'YYYY-MM' 格式
      options: 'i' // 不区分大小写
    })
  }).get();

  // 如果查询没有数据，返回空数组
  if (res_user_monthData.data.length === 0) {
    return {
      errCode: 2,
      msg: '该月份没有数据',
      data: [] // 返回空数组
    };
  }

  const hasAtLeastOneKeyWithValue = (obj)=> {
	  const keys = ['breakfast', 'lunch', 'dinner', 'snack', 'cake'];
	  return keys.some(key => obj[key] !== undefined && obj[key] !== null);
	}
  // 构造符合要求的数组，使用 map 来直接返回最终结果
  const result = res_user_monthData.data.map(item => ({
	mood: 'mood' in item ? item.mood : 2.5,
    record: hasAtLeastOneKeyWithValue(item),  // 记录存在
    exactDate: item.exactDate,  // 日期
    pass: item.score ? item.score >= 60 : false // 判断 score 是否 >= 60
  }));

  return {
    errCode: 1,
    msg: '查询成功',
    data: result
  };
};
