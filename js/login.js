$(document).ready(function () {
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
});