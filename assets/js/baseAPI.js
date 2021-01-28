// 每次发起请求时，都会先执行ajaxPrefilter()预处理函数
// 这里把根路径和接口进行了拼接，优化了代码
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})