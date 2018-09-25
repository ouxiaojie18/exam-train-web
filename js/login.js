$(document).ready(function() {
    let my_code=""
    //   _getId = () => {
    //     var query = decodeURI(window.location.search.substring(1));
    //     var vars = query.split("&");

    //     for (var i = 0; i < vars.length; i++) {
    //         var pair = vars[i].split("=");
    //         if (pair[0] == "code") {
    //             my_code = pair[1];
    //         }
    //     }
    //     return;
    // };
    // if(my_code!=""){
    //     let data={
    //         appid:"wx2b9c8cd08c79022b",
    //         secret:"23ce8d416477b572a80edea4ca789bb6",
    //         code:my_code,
    //         grant_type:authorization_code
    //     }
    //     setAjax("https://api.weixin.qq.com/sns/oauth2/access_token", "GET", data, function (result) {
    //         console.log(result)
    //     })
    // }
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
    $(".user-phone-login").css("display", "inline-block");
    $(".user-wechat-login").css("display", "none");
    $(".wechat-btn").removeClass("active");
     $(".phone-part").css("display", "block");
    $(".phone-btn").addClass("active");
  });
  $(".wechat-btn").click(function() {
    // https://open.weixin.qq.com/connect/qrconnect?appid=wx2b9c8cd08c79022b&redirect_uri=http%3a%2f%2fwww.kaopeixia.com&response_type=code&scope=snsapi_login#wechat_redirect
// https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2b9c8cd08c79022b&secret=23ce8d416477b572a80edea4ca789bb6&code=0618HuA20CIr3E1IMCB20ae5A208HuAq&grant_type=authorization_code
    $(".user-wechat-login").css("display", "inline-block");
    var obj = new WxLogin({
      self_redirect: true,
      id: "login_container",
      appid: "wx2b9c8cd08c79022b",
      scope: "snsapi_login",
      redirect_uri: "https%3a%2f%2fkaopeixia.com%2fwebapi%2fopenid%2fgetwebtoken"
    });
    // https%3a%2f%2fkaopeixia.com%2flogin.html
    console.log(obj);
    $(".user-phone-login").css("display", "none");
    $(".phone-btn").removeClass("active");
    $(".wechat-part").css("display", "block");
    $(".wechat-btn").addClass("active");
  });
  $(".login-link").click(function() {
    $(".user-register").css("display", "none");
    $(".user-login").css("display", "block");
  });
  $(".register-link").click(function() {

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
            //     nickname: "admin",
    // userpassword: "admin123"
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
