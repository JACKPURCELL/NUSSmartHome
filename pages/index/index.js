//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome Back Home',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gotohome:function(){
    wx.navigateTo({ url: '/pages/home/home', }) ;
  },


  

  onShow: function () {
    var thispage = this
    thispage.openWss()
    setInterval(function () { thispage.testWss(); }, 3000);
  },
  openWss() {
    wx.connectSocket({
      url: 'wss://nussh.happydoudou.xyz:8000/'
    })
  },
  testWss() {
    var thispage = this
    wx.sendSocketMessage({
      data: "connect"
    })
    wx.onSocketMessage(function (res) {
      thispage.setData({ alarm: res.data }),
        console.log('小程序收到服务器消息：' + thispage.data.alarm)
      
      if (thispage.data.alarm=='Alarm')
          wx.showModal({
            title: 'FBI WARNING!!!',
            content: 'Emergency Detected',
            cancelText:'STOP',
            confirmText: 'CALL999',
            cancelColor:'#07c160',
            confirmColor:'#f44',
            success(res) {
              if (res.confirm) {
                wx.makePhoneCall({
                  phoneNumber: '666' 
                })
              } else if (res.cancel) {
                wx.sendSocketMessage({
                  data: "Cancel"
                })
              }
            }
            
          })

    })
  }
  
})
