$(function () {
  $.extend({
    config: function () {
      return {
        title: '华小智人工智能平台',
        baseURL: 'http://150.158.184.72:9999',
        regbaseURL: 'http://150.158.184.72',
      }
    },
    getQueryVariable: function (variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false
    },
    saveUserinfo: function (data) {
      //写入
      sessionStorage.setItem('userinfo', JSON.stringify(data))
      window.location = '/index.html'
    },
    delUserinfo: function (data) {
      //删除
      sessionStorage.removeItem(data)
      window.location = '/index.html'
    },
  })
})
