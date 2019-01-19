// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var openid = event.openid
  var id=event.travelId
  try {
    return await db.collection('travel_info').doc(id).update({
      
      data: {
        
        'attend_list': db.command.push(openid)
      }
    })
  } catch (e) {
    console.log(e)
  }
}