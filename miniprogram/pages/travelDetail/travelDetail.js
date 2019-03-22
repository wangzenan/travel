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
    attendName:[],
    attendButtonDisplay: "",
    exitButtonDisplay: "none",
    deleteButtonDisplay:"none"
  
  },
  handleClicks: function () {
    const db = wx.cloud.database()
    db.collection('user').where({
      openid: app.globalData.openid
    })
      .get({
        success(res) {
          console.log(res.data)
          if (res.data.length == 0) {
            wx.navigateTo({
              url: '/pages/newUser/newUser',
            })
          }        
        }
      })
    if(app.globalData.openid != this.data.queryResult.create_id && this.data.queryResult.attend_list.indexOf(app.globalData.openid) == -1) {

    const dest_now = this.data.queryResult.dest
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updateTravel',
      // 传给云函数的参数
      data: {
        'openid': app.globalData.openid,
        'travelId': this.data.travelId
      },
      success(rres) {
        console.log(rres) // 3
        wx.showModal({
          content: '加入成功',
          showCancel: false,
          success: function (rres) {
            if (rres.confirm) {
              const time_now = util.formatTime(new Date());
              console.log(time_now)
              wx.cloud.callFunction({
                name: 'addMessage',
              // 传给云函数的参数
                data: {
                  'content': '加入行程成功',
                  'dest_id': app.globalData.openid,
                  'source_id': '',
                  'time': time_now,
                  'dest': dest_now
                }
              })

            wx.navigateBack({
              delta: 1
            })
          }
        }
      });
      },
      fail: console.error
      })
    }else if (app.globalData.openid == this.data.queryResult.create_id) {
      wx.showModal({
        content: '您是创始人无法加入',
        showCancel: false,
      });
    }else {
      wx.showModal({
        content: '请勿重复加入',
        showCancel: false,
        success:function(res){
          wx.navigateBack({
            delta:1
          })
        }
      });
    
    }
          

  },

  deleteButtonClicks:function(){
    const dest_now = this.data.queryResult.dest
    wx.cloud.callFunction({
      name:"deleteTravel",
      data:{
        "travelId": this.data.travelId
      },
      success:function(res){
        wx.showModal({
          content: '取消成功',
          showCancel: false,
          success:function(res){
            const time_now = util.formatTime(new Date());
            console.log(time_now)
            wx.cloud.callFunction({
              name: 'addMessage',
              // 传给云函数的参数
              data: {
                'content': '取消行程成功',
                'dest_id': app.globalData.openid,
                'source_id': '',
                'time': time_now,
                'dest': dest_now
              }
            })
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },

  exitButtonClicks:function(){
    let index=this.data.queryResult.attend_list.indexOf(app.globalData.openid)
    this.data.queryResult.attend_list.splice(index,1)
    console.log(index)
    wx.cloud.callFunction({
      name:"exitTravel",
      data:{
        "index":index,
        "travelId":this.data.travelId,
        "attendList":this.data.queryResult.attend_list
      },
      success:function(res){
        console.log("exit success")
      }
    })
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
    
    this.setData({
      attendName:[]
    }) 
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

        if (app.globalData.openid != this.data.queryResult.create_id && this.data.queryResult.attend_list.indexOf(app.globalData.openid) != -1) {
          this.setData({
            attendButtonDisplay: "",
            exitButtonDisplay: "none",
            deleteButtonDisplay: "none"
          })
        } else if (app.globalData.openid == this.data.queryResult.create_id){
          this.setData({
            attendButtonDisplay: "none",
            exitButtonDisplay: "none",
            deleteButtonDisplay:""
          })
        }
         else {
          this.setData({
            attendButtonDisplay: "",
            exitButtonDisplay: "none",
            deleteButtonDisplay:"none"
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