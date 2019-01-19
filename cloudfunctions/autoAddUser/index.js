// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  const openid = wxContext.OPENID


  try {
    await db.collection('user').where({
      openid: 'o6wNp5H_4vRkPns0llAYlfjtnQls',
    }).get({
      success(res) {
        return res.data[0]
      }
    })
  } catch (e) {
    console.log(e)
  }

}