// miniprogram/pages/newUser/newUser.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    age:"",
    gender:"",
    intro:"",
    name:"",
    openid:"",
    school:"",
    phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: app.globalData.openid
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ageinput: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  genderinput: function (e) {
    this.setData({
      gender: e.detail.value
    })
  },
  phoneinput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  schinput: function (e) {
    this.setData({
      school: e.detail.value
    })
  },
  introinput: function (e) {
    this.setData({
      intro: e.detail.value
    })
  },
  bindGetUserInfo: function (e) {
    this.data.name = e.detail.userInfo.nickName
    if (this.data.age == '' || this.data.gender == '' || this.data.phone == '' || this.data.school == '' || this.data.intro == '') {
      wx.showModal({
        content: '填写数据不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('确定')
          }
        }
      });
      return
    } else {
      wx.cloud.callFunction({
        // 云函数名称
        //name: 'updateUser',
        name: 'addUser',
        // 传给云函数的参数
        data: {
          'name': this.data.name,
          'openid': this.data.openid,
          'age': this.data.age,
          'gender': this.data.gender,
          'intro': this.data.intro,
          'phoneNo': this.data.phone,
          'schoolName': this.data.school,
        },
        success(res) {
          console.log(res) // 3
          wx.showModal({
            content: '添加成功',
            showCancel: false,
            success: function (res) {
              // if (res.confirm) {
              //   wx.navigateBack({
              //     delta: 1
              //   })
              // }
              if (res.confirm) {
                wx.switchTab({
                  url: "/pages/myInfo/myInfo",
                })
              }
            }
          });
        },
        fail: console.error
      })
    }
    //console.log(e.detail.userInfo)
  }
})