$(document).ready(function() {
  //写cookies，一个小时过期
  function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 60 * 1000);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
  }
  //读取cookies
  function getCookie(name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }
  //删除cookies
  function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 60 * 60 * 1000);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie =
        name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
  }
  $('input[name="phone"]').change(function(e) {
    var mobile = $(this).val();

    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(mobile)) {
      $(".err_phone").show();
    } else {
      $(".err_phone").hide();
    }
  });
  $(".phone-btn").click(function() {
    $(".wechat-part").css("display", "none");
    $(".wechat-btn").removeClass("active");
    $(".phone-part").css("display", "block");
    $(this).addClass("active");
  });
  $(".wechat-btn").click(function() {
    var obj = new WxLogin({
      self_redirect: true,
      id: "login_container",
      appid: "wx2b9c8cd08c79022b",
      scope: "snsapi_login",
      redirect_uri: "https%3a%2f%2fwww.kaopeixia.com"
    });
    console.log(obj);
    $(".phone-part").css("display", "none");
    $(".phone-btn").removeClass("active");
    $(".wechat-part").css("display", "block");
    $(this).addClass("active");
  });
  $(".login-link").click(function() {
    $(".user-register").css("display", "none");
    $(".user-login").css("display", "block");
  });
  $(".register-link").click(function() {
    // var obj = new WxLogin({
    //   self_redirect: true,
    //   id: "login_container",
    //   appid: "wx2b9c8cd08c79022b",
    //   scope: "snsapi_login",
    //   redirect_uri: "http%3a%2f%2fwww.kaopeixia.com"
    // });
    // console.log(obj);
    // $.ajax({
    //   url: "https://kaopeixia.com/webapi/login/login",
    //   type: "GET",
    //   data: {
    //     nickname: "admin",
    //     userpassword: "admin123"
    //   },
    //   dataType: "json",
    //   xhrFields: { withCredentials: true },
    //   success: function(result) {
    //     if (result.status === "200") {
    //       console.log(result);
    //       sessionStorage.setItem("uid", result.uid);
    //       window.location.href = "./index.html";
    //     }
    //   },
    //   error: function(xhr, ajaxOptions, thrownError) {
    //     if (xhr.status == 200) {
    //       console.log(ajaxOptions);
    //     } else {
    //       console.log(xhr.status);
    //       console.log(thrownError);
    //     }
    //   }
    // });
    $(".user-login").css("display", "none");
    $(".user-register").css("display", "block");
  });
  $(".login-btn").click(function() {
    let phone = $("input[name='phone']").val();
    let pwd = $("input[name='pwd']").val();
    //     nickname: "admin",
    // userpassword: "admin123"
    $.ajax({
      url: "https://kaopeixia.com/webapi/login/login",
      type: "POST",
      data: {
        nickname: phone,
        userpassword: pwd
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status === "200") {
          console.log(result);
          sessionStorage.setItem("uid", result.uid);
          window.location.href = "./index.html";
        } else {
          $(".err_pwd").show();
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        if (xhr.status == 200) {
          console.log(ajaxOptions);
        } else {
          console.log(xhr.status);
          console.log(thrownError);
        }
      }
    });
  });
});
