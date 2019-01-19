// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  const create_id = event.create_id
  const des = event.des
  const dest = event.dest
  const time = event.time
  const title = event.title

  try {
    return await db.collection('travel_info').add({
      data: {
        'attend_list': db.command.push(create_id),
        'create_id': create_id,
        'des': des,
        'dest': dest,
        'time': time,
        'title': title
      }
    })
  } catch (e) {
    console.log(e)
  }
}