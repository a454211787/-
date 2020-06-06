$(function () {
  //分页数据
  var pageObj = {
    pages: 8, //每页显示的条数
    totalPages: 1, //总页数
    PageSize: 5, //显示的页数
    currentPage: 1, //当前页数
    classdata: [], // 课程所有数据
    classPagedata: [], // 课程当页数据
  }
  console.log($.config())
  //请求所有的课程数据
  $.ajax({
    url: $.config().baseURL + '/class/all',
    type: 'post',
    data: {
      subid: 0, // 0 表示所有课程
      curpage: 1, // 请求的页数
      total: 0, // 起始页
      token: '', // 未登录用户未空
    },
    success: function (data) {
      pageObj.totalPages = Math.ceil(data.data.pages.total / pageObj.pages)
      pageObj.pageSize = pageObj.totalPages > 5 ? 5 : pageObj.totalPages
      pageObj.currentPage = data.data.pages.curpage
      pageObj.classdata = data.data.classes
      //获取制定量的数据
      getPageData(pageObj.currentPage, pageObj.pages, pageObj.classdata)
      setShowPage(pageObj.currentPage, pageObj.totalPages, pageObj.pageSize)
      showTemp()
    },
  })

  function setShowPage(currentPage, totalPages, pageSize) {
    currentPage = currentPage ? currentPage : 1
    totalPages = totalPages ? totalPages : 5
    $('#page').bootstrapPaginator({
      bootstrapMajorVersion: 3, //对应的bootstrap版本
      currentPage: currentPage, //当前页数
      numberOfPages: pageSize, //每次显示页数
      totalPages: totalPages, //总页数
      shouldShowPage: true, //是否显示该按钮
      useBootstrapTooltip: true,
      //点击事件
      onPageClicked: function (event, originalEvent, type, page) {
        getPageData(page, pageObj.pages, pageObj.classdata)
        showTemp()
      },
    })
  }
  //获取每页显示的数据
  function getPageData(currentPage, pages, data) {
    var start = (currentPage - 1) * pages
    var end = (currentPage - 1) * pages + pages
    pageObj.classPagedata = data.slice(start, end)
  }
  //渲染数据到页面中
  function showTemp() {
    var html = template('clssList', { classdata: pageObj.classPagedata })
    $('.content>ul').html(html)
  }

  //登陆
  $('#login').on('click', function () {
    $.ajax({
      type: 'post',
      url: $.config().baseURL + '/user/login',
      data: $('#logform').serialize(),
      success: function (data) {
        if (data.code === 0) {
          $('.close').click()

          $.saveUserinfo(data.data)
        } else {
          alert('登陆失败')
        }
      },
      error: function () {
        $('.close').click()
        alert('请求失败')
      },
    })
  })
})
