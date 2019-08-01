const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


// 获取设备列表
function login(username, password) {
  var that = this
  wx.request({
    url: 'http://www.gn-smart.cn/usvc/',
    data: {
      SID: 0,
      NM: 'LoginReq',
      clientName: 'GT-P3100',
      userName: username,
      SN: 13,
      mac: '352123052298',
      agingTime: 86400000,
      password: password,
      timeout: 5000,
      clientId: 'F0002C0004',
      CID: 10011
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }, // 设置请求的 header
    success: function (res) {
      // success
      console.log(res.data)
      if (res.data.result == 1) {
        wx.setStorage({
          key: 'sid',
          data: res.data.SID.toString(),
          success: function (res) {
            console.log("save sid success: " + res)
          },
          complete: function () {
            console.log("jump device")
            wx.navigateTo({
              url: '../device/device'
            })
          }
        })
      } else {
        wx.showToast({
          title: res.data.reason,
          duration: 2000
        })
      }
    },
    fail: function () {
      console.log('登录失败')
      wx.showToast({
        title: '网络故障',
        duration: 2000
      })
    }
  })
}