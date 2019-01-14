//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    var that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ',res, res.result.openid)
        this.globalData.openid = res.result.openid
        console.log(this.globalData.openid)
      }
    })
    
    this.globalData = {
      openid:'',
      appid:'wx0e247236e1f2f06d',
      secret:'343538ed469c055b286d679ce2389bc0'
    }
  }
})
