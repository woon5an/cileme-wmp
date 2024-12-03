'use strict';
const moment = require('moment'); 
const db = uniCloud.database();
const daily = db.collection('daily');
const { verifyToken } = require('wx-common');

exports.main = async (event, context) => {
  const openId = verifyToken(event.token).value;
  const user = event.userId;
  const today = moment().format('YYYY-MM-DD');
  const exactInfo = event.exactInfo;
  const prop = exactInfo.prop;
  const value = exactInfo.value;
  const score = exactInfo.score;

  // 使用 upsert 来处理插入或更新操作
  const res = await daily.where({
    userId: user,
    exactDate: today
  }).get();

  let currentScore = 0;

  if (res.data && res.data.length > 0) {
    // 如果已有记录，获取当前 score 值
    currentScore = res.data[0].score || 0;
  }

  const updatedScore = currentScore + score;

  // 使用 upsert（如果记录存在则更新，不存在则插入）
  const updateResult = await daily.where({
    userId: user,
    exactDate: today
  }).update({
    [prop]: value,
    score: updatedScore
  });

  // 如果没有记录，则插入新记录
  if (res.data.length === 0) {
    await daily.add({
      openid: openId,
	  userId: user,
      [prop]: value,
      exactDate: today,
      score: updatedScore
    });
  }

  return {
    errCode: 1,
    msg: '记录成功',
    data: {}
  };
};
