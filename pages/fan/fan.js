// pages/light/light.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lightvalue: 0,
    state:1
  },


  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `当前值：${event.detail.value}`
    });
    this.setData({ lightvalue: event.detail.value / 100 }),
      this.putlight()
  },



  switch2Change: function (e) {
    var thispage=this
    if (e.detail.value){
      thispage.setData({ state: 0 });
      console.log('控制', e.detail.value)
    }
     
    else if (!e.detail.value){
      thispage.setData({ state: 1 });
      console.log('控制', e.detail.value)
    }
   
    
  },

  putlight: function () {
    wx.request({
      url: 'https://nussh.happydoudou.xyz:5000/api/Fan', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "PUT",
      data: { "Speed": "" + this.data.lightvalue + "" ,
        "State": "" + this.data.state + ""}
    })
  },


  //     success(res) {
  //       cb(res.data)
  //       // var thispage = this;

  //       // thispage.setData({ enviinfo: res.data })

  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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