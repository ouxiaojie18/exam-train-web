$(document).ready(function() {
    let uid = sessionStorage.getItem('uid');
    let nickname=""
      _getId = () => {
        var query = decodeURI(window.location.search.substring(1));
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == "nickname") {
                nickname = pair[1];
            }
        }
        console.log(nickname)
        $(".user-info h3").text("欢迎你！"+nickname);
        return;
    };
    _getId();
  $('input[name="phone"]').change(function(e) {
    var mobile = $(this).val();
    console.log(mobile)
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(mobile)) {
      $(".err_phone").show();
    } else {
      $(".err_phone").hide();
    }
  });
  $(".login-btn").click(function(){
    let phone = $('input[name="phone"]').val();
    let userpassword = $('input[name="pwd"]').val();
    let data={
      phone,
      userpassword,
      uid
    }
    setAjax("https://kaopeixia.com/webapi/user/register", "POST", data, function (result) {
        console.log(result)
    })
  })
})