// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var content = event.content
  var dest_id = event.dest_id
  var source_id = event.source_id
  var time = event.time
  var dest=event.dest
  try {
    return await db.collection('massage').add({
      data: {
        content: content,
        dest_id: dest_id,
        source_id: source_id,
        time: time,
        dest: dest,
      }
    })
  } catch (e) {
    console.log(e)
  }
}