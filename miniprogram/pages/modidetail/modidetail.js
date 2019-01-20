// miniprogram/pages/modidetail/modidetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    userid: "",
    age: "",
    gender: "",
    phone: "",
    sch: "",
    intro: "",
    oa: "",
    og: "",
    op: "",
    os: "",
    oi: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: options.id,
      queryResult: []
    })
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user').where({
      openid: this.data.userid
    }).get({
      success: res => {
        this.setData({
          //queryResult: JSON.stringify(res.data, null, 2)
          queryResult: res.data[0],
          oa: res.data[0].age,
          og: res.data[0].gender,
          oi: res.data[0].intro,
          op: res.data[0].phone_no,
          os: res.data[0].school_name,
          id: res.data[0]._id
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
  onShow: function (options) {

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
    // if (this.data.age == ''){
    //   this.data.age == this.data.oa
    // } else{
    //   this.data.age == this.data.age
    // }
    // if (this.data.gender == '') {
    //   this.data.gender == this.data.og
    // } else{
    //   this.data.gender == this.data.gender
    // }
    // if (this.data.phone == '') {
    //   this.data.phone == this.data.op
    // }else{
    //   this.data.phone == this.data.phone
    // }
    // if (this.data.sch == '') {
    //   this.data.sch == this.data.os
    // }else{
    //   this.data.sch == this.data.sch
    // }
    // if (this.data.intro == '') {
    //   this.data.intro == this.data.oi
    // } else{
    //   this.data.intro == this.data.intro
    // }
    if (this.data.age == '' && this.data.gender == '' && this.data.phone == '' && this.data.sch == '' && this.data.intro == '') {
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
        name: 'updateUser',
        // 传给云函数的参数
        data: {
          'openid': this.data.id,
          'age': this.data.age,
          'gender': this.data.gender,
          'intro': this.data.intro,
          'phoneNo': this.data.phone,
          'schoolName': this.data.sch,
        },
        success(res) {
          console.log(res) // 3
          wx.showModal({
            content: '修改成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2
                })
              }
            }
          });
        },
        fail: console.error
      })
    }
    wx.showToast({
      title: this.data.age,
      icon: 'success',
      duration: 2000
    })
  }
})
