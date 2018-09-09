$(document).ready(function () {
    //写cookies，一个小时过期 
    function setCookie(name, value) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
    }
    //读取cookies 
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    }
    //删除cookies 
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 60 * 60 * 1000);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
    }


    $(".phone-btn").click(function () {
        $(".wechat-part").css('display', 'none');
        $(".wechat-btn").removeClass("active");
        $(".phone-part").css('display', 'block');
        $(this).addClass("active");
    });
    $(".wechat-btn").click(function () {

        $(".phone-part").css('display', 'none');
        $(".phone-btn").removeClass("active");
        $(".wechat-part").css('display', 'block');
        $(this).addClass("active");
    });
    $(".login-link").click(function () {
        $(".user-register").css('display', 'none');
        $(".user-login").css('display', 'block');

    });
    $(".register-link").click(function () {
        $(".user-login").css('display', 'none');
        $(".user-register").css('display', 'block');
    });
    $(".login-btn").click(function () {
        let data = {
            nickname: 'admin',
            userpassword: 'admin123'
        };
        // setAjax("https://kaopeixia.com/webapi/login/login", "POST", data, function callback(result) {
        //     if (result.status === "200") {
        //         sessionStorage.setItem('uid', result.uid);
        //         window.location.href = "./documentdownload.html";
        //     }
        // })
        $.ajax({
            url: "https://kaopeixia.com/webapi/login/login",
            type: "POST",
            data: {
                "nickname": 'admin',
                "userpassword": 'admin123'
            },
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status === "200") {
                    sessionStorage.setItem('uid', result.uid);
                    window.location.href = "./documentdownload.html";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr.status == 200) {
                    console.log(ajaxOptions);
                }
                else {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            }
        });
    })


});