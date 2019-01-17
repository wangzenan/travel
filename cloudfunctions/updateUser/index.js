// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var openid = event.openid
  var age = event.age
  var gender = event.gender
  var name = event.name
  var intro = event.intro
  var phoneNo = event.phoneNo
  var schoolName = event.schoolName
  try {
    return await db.collection('user').doc(openid).update({
      data: {
        age: age,
        gender: gender,
        name: name,
        intro: intro,
        phone_no=phoneNo,
        school_name=schoolName
      }
    })
  } catch (e) {
    console.log(e)
  }
}