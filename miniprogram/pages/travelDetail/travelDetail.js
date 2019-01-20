// miniprogram/pages/travelDetail/travelDetail.js
const app = getApp()
var util = require('../../utils/utils.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travelId:"",
    queryResult:[],
    attendName:[]
  },
  handleClicks: function () {
    if (app.globalData.openid != this.data.queryResult.create_id && app.globalData.openid && this.data.queryResult.attend_list.indexOf(app.globalData.openid)==-1){
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updateTravel',
        // 传给云函数的参数
        data: {
          'openid': app.globalData.openid,
          'travelId':this.data.travelId
        },
        success(res) {
          console.log(res) // 3
          wx.showModal({
            content: '加入成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                const time_now = util.formatTime(new Date());
                console.log(time_now)
                wx.cloud.callFunction({
                  name: 'addMessage',
                  // 传给云函数的参数
                  data: {
                    'content': '加入行程成功',
                    'dest_id': app.globalData.openid,
                    'source_id': '',
                    'time': time_now
                  }
                })
              }
            }
          });
        },
        fail: console.error
      })
    }
    else if (app.globalData.openid == this.data.queryResult.create_id){
      wx.showModal({
        content: '您是发起人无法重复加入',
        showCancel: false,
        // success(res) {
        //   if (res.confirm) {
        //     wx.navigateBack({
        //       delta: 0
        //     })
        //   }
        // }
      });
    }
    else {
      wx.showModal({
        content: '不要重复加入',
        showCancel: false,
        // success(res) {
        //   if (res.confirm) {
        //     wx.navigateBack({
        //       delta: 0
        //     })
        //   } 
        // }       
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      travelId: options.id,
      createId:"",
      createName: "",
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
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('travel_info').where({
      _id: this.data.travelId
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data[0],
          createId: res.data[0].create_id,
          //appendList:res.data[0].append_list        
        })
        db.collection('user').where({
          openid: this.data.createId
        }).get({
          success: cres => {
            this.setData({
              createName: cres.data[0].name
            })
            console.log('[数据库] [查询记录] 成功: ', cres)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })

        for (var attend in this.data.queryResult.attend_list) {
          console.log(this.data.queryResult.attend_list[attend])
          db.collection('user').where({
            openid: this.data.queryResult.attend_list[attend]
          }).get({
            success: ares => {
              this.setData({
                attendName: this.data.attendName.concat(ares.data[0].name)
              })
              console.log('[数据库] [查询记录] 成功: ', ares.data[0].name)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
              console.error('[数据库] [查询记录] 失败：', err)
            }

          })
        }
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