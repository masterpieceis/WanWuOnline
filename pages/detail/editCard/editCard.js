// pages/detail/editCard/editCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNum: '',
    clickable: true,
    imei: '',
    bgcSet: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cardNum: options.cardNum,
      imei: options.imei,
      bgcSet: 'background-color:' + app.globalData.appTheme.theme_color.color_whole
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.globalData.appTheme.theme_color.color_whole
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
    return {
      title: '数化万物 智在融合',
      path: 'pages/authorize/authorize',
      imageUrl: './../../images/forward.jpg'
    }
  },
  getInput (e) {
    console.log(e.detail)
    if (String(e.detail.value).length === 13 || String(e.detail.value).length === 11) {
      this.setData({
        clickable: true,
        cardNum: e.detail.value
      })
    } else {
      this.setData({
        clickable: false
      })
    }
  },
  modifyCard() {
    const that = this
    if (!this.data.clickable) {
      wx.showToast({
        title: '请输入卡号',
        icon: 'none',
      })
      return
    } else {
      const url = 'https://litin.gmiot.net/1/account/devinfo'
      let data = {
        method: 'modifyUser',
        access_token: app.globalData.accessToken,
        access_type: 'inner',
        account: app.globalData.account,
        imei: this.data.imei,
        map_type: 'AMAP',
        target: app.globalData.account,
        tel: this.data.cardNum
      }
      wx.request({
        url: url,
        data: data,
        success: function (res) {
          if (res.data.errcode === 0) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000,
              success: function () {
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000);
              }
            })
          } else {
            wx.showToast({
              title: '修改失败'
            })
          }
        }
      })
    }
  }
})