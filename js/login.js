$(function () {
  // 默认显示注册
  seRegAction()
  function seRegAction() {
    if ($.getQueryVariable('do') == 'reg') {
      $('#login-nav>li').eq(1).find('a').click()
    }
  }

  //登陆
  $('#login').on('click', function () {
    $.ajax({
      type: 'post',
      url: $.config().baseURL + '/user/login',
      data: $('#log-form').serialize(),
      success: function (data) {
        if (data.code === 0) {
          $.saveUserinfo(data.data)
        } else {
          alert('登陆失败')
        }
      },
      error: function () {
        alert('请求失败')
      },
    })
  })

  //注册
  $('#reg').on('click', function () {
    $.ajax({
      type: 'Post',
      url: $.config().regbaseURL + '/user/register',
      data: $('#reg-form').serialize(),
      success: function (data) {
        if (data.code === 0) {
          // 存储用户登陆信息
          //写入
          $.saveUserinfo(data.data)
        } else {
          alert('注册失败')
        }
      },
      error: function () {
        alert('请求失败')
      },
    })
  })
})
