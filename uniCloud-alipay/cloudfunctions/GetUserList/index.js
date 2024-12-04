'use strict';
const db = uniCloud.database();
const userCollection = db.collection('user'); // 假设 'user' 是存储用户信息的集合

exports.main = async (event, context) => {
  try {
    // 获取所有用户信息
    const res = await userCollection.get(); // 获取所有用户数据

    if (res.data && res.data.length > 0) {
      return {
        errCode: 0,
        msg: '获取用户信息成功',
        data: res.data  // 返回所有用户信息
      };
    } else {
      return {
        errCode: 1,
        msg: '没有找到用户信息',
        data: []
      };
    }
  } catch (error) {
    return {
      errCode: 2,
      msg: '获取用户信息失败',
      data: error
    };
  }
}