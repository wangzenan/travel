// miniprogram/pages/modidetail/modidetail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: "",
    age:"",
    gender:"",
    phone:"",
    sch:"",
    intro:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: options.userid,
      queryResult: []
    })
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user').where({
      _id: this.data.userid
    }).get({
      success: res => {
        this.setData({
          //queryResult: JSON.stringify(res.data, null, 2)
          queryResult: res.data[0]
          //title:res.data.title
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
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
      sch: e.detail.value
    })
  },
  introinput: function (e) {
    this.setData({
      intro: e.detail.value
    })
  },
  onTap: function (e) {
    wx.cloud.callFunction({
      // 云函数名称
      //name: 'updateUser',
      name:'updateUser',
      // 传给云函数的参数
      data: {
        'openid' : this.data.userid,
        'age' : this.data.age,
        'gender' : this.data.gender,
        'intro' : this.data.intro,
        'phoneNo' : this.data.phone,
        'schoolName' : this.data.sch,
      },
      success(res) {
        console.log(res) // 3
        wx.showModal({
          content: '修改成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        });
      },
      fail: console.error
    })
    wx.showToast({
      title: this.data.age,
      icon: 'success',
      duration: 2000
    })
  }
})