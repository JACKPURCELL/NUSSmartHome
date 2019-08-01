// pages/envi/envi.

// var that=this 
// that.test()


Page({

  /**
 * 页面的初始数据
 */

  data: {
    enviinfo: null
  },


  compare(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 > value2 ? -1 : 1
    }
  },

  getenvi:function(cb){
    wx.request({
      url: 'https://nussh.happydoudou.xyz:5000/api/Environmentfull', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        cb(res.data)
        // var thispage = this;
        
        // thispage.setData({ enviinfo: res.data })

      }
    })
  },





  // test: function(){
  //   getenvi
  // },

  // binclick:function(){
  //   var thispage = this
  //   getenvi(){
  //     console.data
  //   }
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // var thispage=this;
      // this.getenvi(data)
      // thispage.setData({enviinfo:data})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var thispage = this;
    this.getenvi(function (data) {
      console.log(data.sort(thispage.compare ('Timestamp')))
      thispage.setData({ enviinfo: data.sort(thispage.compare('Timestamp')) })
    }); 
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

})

