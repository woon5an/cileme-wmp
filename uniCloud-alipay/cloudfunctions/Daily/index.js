'use strict';
const moment = require('moment'); 
const db = uniCloud.database();
const daily = db.collection('daily');
const { verifyToken } = require('wx-common');

exports.main = async (event, context) => {
  const user = event.userId;
  const date = event.exactDate;

  // 一次性查询用户信息以及当天记录
  const res = await daily.where({
    userId: user,
    exactDate: date
  }).field({
    breakfast: true,
    lunch: true,
    dinner: true,
    snack: true,
    cake: true
  }).get();

  if (res.data && res.data.length > 0) {
    const dayInfo = res.data[0];

    // 直接处理缺失的字段，避免后续处理
    const fields = ['breakfast', 'lunch', 'dinner', 'snack', 'cake'];
    fields.forEach(field => {
      if (!dayInfo.hasOwnProperty(field)) {
        dayInfo[field] = '';  // 设置为空字符串
      }
    });

    return {
      errCode: 1,
      data: dayInfo
    };
  } else {
    return {
      errCode: 2,
      data: {}
    };
  }
}
