$(function () {
    // 点击"立即注册"的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击""登录"的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui获取form对象
    var form = layui.form;

    var layer = layui.layer;
    // 通过form.verify()函数自定义Layui的校验规则，把 key 赋值给输入框的 lay-verify 属性即可
    form.verify({
        // 密码校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 确认密码校验规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致,请重新输入'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止表单提交的默认行为
        e.preventDefault();
        // 2.发起Ajax的POST请求
        // $.post('/api/reguser', {
        //     username: $('#form_reg [name=username]').val(),
        //     password: $('#form_reg [name=password]').val()
        // }, function (res) {
        //     if (res.status !== 0) {
        //         return console.log(res.message);
        //     }
        //     console.log('注册成功');
        // })

        $.ajax({
            method: 'POST',
            url: '/api/reguser', //通过baseAPI.js中的ajaxPrefilter()函数优化了路径代码
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                // 模拟点击请登录按钮，跳转登录页面
                $('#link_login').click();
            }
        })

    })
    // 发起登录请求
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // serialize() 快速获取表单数据
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})