// miniprogram/pages/travelDetail/travelDetail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travelId:"",
    queryResult:[],
    title:"",
    dest:'',
    date:'',
    des:'',
    attend_list: {},
    
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  createTravel: function(e) {
    
    // console.log(app.globalData.openid)
    if (this.data.des == '' || this.data.dest == '' || this.data.title == '' || this.data.date == ''){
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
    } else{
    
      wx.cloud.callFunction({
        // 云函数名称
        name: 'addtravel',
        // 传给云函数的参数
        data: {
          'create_id': app.globalData.openid,
          'des': this.data.des,
          'dest': this.data.dest,
          'time': this.data.date,
          'title': this.data.title,
          'attend_list': [].push(app.globalData.openid)
          
        },
        success(res) {
          console.log(res) // 3
          wx.showModal({
            content: '创建成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta:1
                })
              }
            }
          });
        },
        fail: console.error
      })
    }

    

  },

  titleInput:function(e){
    this.setData({
      title:e.detail.value
    })
    
  },
  destInput: function (e) {
    this.setData({
      dest: e.detail.value
    })

  },
  descriptionInput: function (e) {
    this.setData({
      des: e.detail.value
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      travelId: options.id,
      queryResult:[]
    }) 
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('travel_info').where({
      _id: this.data.travelId
    }).get({
      success: res => {
        this.setData({
          //queryResult: JSON.stringify(res.data, null, 2)
          queryResult:res.data[0]
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

  }
})