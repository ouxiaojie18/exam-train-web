$(document).ready(function() {
  let uid = sessionStorage.getItem("uid");
  if (uid == null) {
    $(".mymodal-part").css("display", "block");
  }
  $(".mymodal-cancel").click(function() {
    window.history.go(-1);
  });
  $(".mymodal-login").click(function() {
    window.location.href = "./login.html";
  });
  // 获取信息
  let userData = {
    id: uid
  };
  setAjax(
    "https://kaopeixia.com/webapi/user/getuserbyid",
    "GET",
    userData,
    function(result) {
      if (result.status == "200") {
        let info = result.data[0];
        // console.log(result);
        // $("input[name='nickname']").val("mosquito").attr("readonly","readonly");;
        $(".avatar").attr("src", info.headimg);
        $("input[name='nickname']").val(info.nickname);
        $("input[name='username']").val(info.username);
        $("input[name='phone']").val(info.phone);
        $("input[name='grade']").val(info.grade);
        $("input[name='address']").val(info.area);
        $("input[name='school']").val(info.school);
      }
    }
  );
  $("#pic").click(function() {
    $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#upload").on("change", function() {
      let file = this.files[0];
      var formData = new FormData();
      formData.append("file", file);
      // let parmas = {
      //   cache: false,
      //   processData: false,
      //   contentType: false,
      // }
      // setAjax("https://kaopeixia.com/webapi/file/getfilepath", "POST", formData,parmas, function (result) {
      //     if (result.status == 201) {
      //       $(".avatar").attr("src", "https://kaopeixia.com/webapi/" + result.filename);
      //     }
      // })
      $.ajax({
        url: "https://kaopeixia.com/webapi/file/getfilepath",
        type: "POST",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        dataType: "json",
        xhrFields: { withCredentials: true },
        success: function(result) {
          if (result.status == 201) {
            $(".avatar").attr(
              "src",
              "https://kaopeixia.com/webapi/" + result.filename
            );
          }
        }
      });
    });
  });

  $('input[name="phone"]').change(function(e) {
    var mobile = $(this).val();

    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(mobile)) {
      $(".error-tip").show();
    } else {
      $(".error-tip").hide();
    }
  });

  $(".update-btn").click(function() {
    let avatar = $(".avatar").attr("src");
    // console.log("avatar", avatar);
    let nickname = $("input[name='nickname']").val();
    let username = $("input[name='username']").val();
    let phone = $("input[name='phone']").val();
    let grade = $("input[name='grade']").val();
    let area = $("input[name='address']").val();
    let school = $("input[name='school']").val();
    $.ajax({
      url: "https://kaopeixia.com/webapi/user/updateuser",
      type: "POST",
      data: {
        id: uid,
        headimg: avatar,
        nickname,
        username,
        phone,
        grade,
        area,
        school
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "200") {
          //   let info = result.data[0];
          getAjax();
          // console.log(result);
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        //On error do this
        console.info("error.");
        if (xhr.status == 200) {
          alert(ajaxOptions);
        } else {
          alert(xhr.status);
          alert(thrownError);
        }
      }
    });
  });
});
