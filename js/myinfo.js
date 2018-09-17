$(document).ready(function() {
  let uid = sessionStorage.getItem("uid");
  // 获取信息
  function getAjax() {
    $.ajax({
      url: "https://kaopeixia.com/webapi/user/getuserbyid",
      type: "GET",
      data: {
        id: uid
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "200") {
          let info = result.data[0];
          console.log(result);
          // $("input[name='nickname']").val("mosquito").attr("readonly","readonly");;
          $(".avatar").attr("src", info.headimg);
          $("input[name='nickname']").val(info.nickname);
          $("input[name='username']").val(info.username);
          $("input[name='phone']").val(info.phone);
          $("input[name='grade']").val(info.grade);
          $("input[name='address']").val(info.area);
          $("input[name='school']").val(info.school);
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
  }
  getAjax();

  var image = "";
  var canvas;
  var base64; //将canvas压缩为base64格式

  $("#pic").click(function() {
    $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
    $("#upload").on("change", function() {
      let file = this.files[0].lastModifiedDate;
      var formData = new FormData();
      formData.append('file',file);
      console.log(this.files[0].lastModifiedDate);
      // formData.get('file')
          $.ajax({
            url: "https://kaopeixia.com/webapi/file/getfilepath",
            type: "POST",
              // async: false,  
              cache: false,  
              contentType: false,  
              processData: false,  
            data: {
              "file": formData
            },
            // dataType: "json",
            xhrFields: { withCredentials: true },
            success: function(data) {
              console.log("upimg", data);
              // var res = data;
            }
          });
        });
      });
      // let file = this.files[0];
      // console.log(this.files[0]);
      // if (window.FileReader) {
      //   var reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   //监听文件读取结束后事件
      //   reader.onloadend = function(e) {
      //     $(".avatar").attr("src", e.target.result); //e.target.result就是最后的路径地址
      //     $.ajax({
      //       url: "https://kaopeixia.com/webapi/file/getfilepath",
      //       type: "POST",
      //       data: {
      //         file: e.target.result
      //       },
      //       dataType: "json",
      //       xhrFields: { withCredentials: true },
      //       success: function(data) {
      //         console.log("upimg", data);
      //         var res = data;
      //       }
      //     });
      //   };
      // }


  //  function selectImg(file){

  //  }

  //建立一?可存取到?file的url
  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }
  // // 这是一个转换base64的一个方法
  //     function convertBase64UrlToBlob(urlData){

  //         var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

  //         //处理异常,将ascii码小于0的转换为大于0
  //         var ab = new ArrayBuffer(bytes.length);
  //         var ia = new Uint8Array(ab);
  //         for (var i = 0; i < bytes.length; i++) {
  //             ia[i] = bytes.charCodeAt(i);
  //         }

  //         return new Blob( [ab] , {type : 'image/jpeg'});
  //     }
  //       //上传头像到服务器
  //     function upimg() {
  //         // console.log(344)
  //         var pic = $('#upload')[0].files[0];
  //         var file = new FormData();
  //         file.append('image', pic);
  //         $.ajax({
  //             url: "https://kaopeixia.com/webapi/file/getfilepath",
  //             type: "POST",
  //             data: file,
  //             cache: false,
  //             contentType: false,
  //             processData: false,
  //             dataType: "json",
  //             xhrFields: { withCredentials: true },
  //             success: function (data) {
  //                 console.log("upimg",data);
  //                 var res = data;
  //                 // $(".avatar").attr("src", res);
  //                 // $("#resimg").append("<img src='/" + res + "'>")
  //             }
  //         });
  //     }

  // $('.uploadbtn').click(function(){
  //     //这里用formDate对象向后端传输文件完成交互
  //     var formDate = new FormData();
  //     formDate.append('image', convertBase64UrlToBlob(imgdata));
  //     $.ajax({
  //         type: 'POST',
  //         url: 'url',
  //         data: formDate,
  //         contentType: false,
  //         processData: false,
  //         success: function(data){
  //             alert(data.data);
  //         },
  //         error: function(data){
  //             alert('error');
  //         }
  //     })
  // })
  $(".update-btn").click(function() {
    let avatar = $(".avatar").attr("src");
    console.log("avatar", avatar);
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
          console.log(result);
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

// var $this = $("#area");
// var $province = $this.find('select[name="province"]'),
//     $city = $this.find('select[name="city"]'),
//     $area = $this.find('select[name="area"]'),
//     $town = $this.find('select[name="town"]');
// $.getJSON("./js/city.json", function (result){
//               if (result.rc == 0) {
//             var formatProvince = [], provinceField = [], currentProvince = null, cityField = [], currentCity = null, areaField = [], currentArea = null, townField = [];
//             formatProvince = result.data.province_list;
//             formatProvince.map(function (value, index) {
//                 provinceField.push(value.area_name);
//             })
//             var format = {
//                 province: function () {
//                     $province.empty();
//                     $province.append('<option value=""> - 请选择 - </option>');
//                     $province.prop('disabled', provinceField.length === 0);
//                     for (var i in provinceField) {
//                         $province.append('<option value="' + i + '" data-code="' + i + '">' + provinceField[i] + '</option>');
//                     }
//                     this.city();
//                 },
//                 city: function () {
//                     $city.empty();
//                     $city.append('<option value=""> - 请选择 - </option>');
//                     $city.prop('disabled', cityField.length === 0);
//                     for (var i in cityField) {
//                         $city.append('<option value="' + i + '" data-code="' + i + '">' + cityField[i] + '</option>');
//                     }
//                     this.area();
//                 },
//                 area: function () {
//                     $area.empty();
//                     $area.append('<option value=""> - 请选择 - </option>');
//                     $area.prop('disabled', areaField.length === 0);
//                     for (var i in areaField) {
//                         $area.append('<option value="' + i + '" data-code="' + i + '">' + areaField[i] + '</option>');
//                     }
//                     this.town();
//                 },
//                 town: function () {
//                     $town.empty();
//                     $town.append('<option value=""> - 请选择 - </option>');
//                     $town.prop('disabled', townField.length === 0);
//                     for (var i in townField) {
//                         $town.append('<option value="' + i + '" data-code="' + i + '">' + townField[i] + '</option>');
//                     }
//                 }

//             };

//             format.province();
//             //事件绑定
//             $province.on('change', function () {
//                 currentProvince = null, cityField = [], cityId = 0, currentCity = null, areaField = [], areaId = 0, currentArea = null, townField = [], townId = 0;
//                 currentProvince = formatProvince[$province.find('option:selected').attr('data-code')]
//                 provinceId = currentProvince.area_id;
//                 // cityId = currentProvince.city_list[0].area_id;
//                 currentProvince.city_list.map(function (value, index) {
//                     cityField.push(value.area_name);
//                 });
//                 format.city();
//             });
//             $city.on('change', function () {
//                 currentCity = null, areaField = [], areaId = 0, currentArea = null, townField = [], townId = 0;
//                 currentCity = currentProvince.city_list[$city.find('option:selected').attr('data-code')]
//                 cityId = currentCity.area_id;
//                 // areaId=currentCity.county_list[0].area_id;
//                 currentCity.county_list.map(function (value, index) {
//                     areaField.push(value.area_name);
//                 });
//                 format.area();
//             });
//             $area.on('change', function () {
//                 areaId = 0, currentArea = null, townField = [], townId = 0;
//                 currentArea = currentCity.county_list[$area.find('option:selected').attr('data-code')]
//                 areaId = currentArea.area_id;
//                 // townId =currentArea.town_list[0].area_id;
//                 currentArea.town_list.map(function (value, index) {
//                     townField.push(value.area_name);
//                 });
//                 format.town();
//                 // console.log(townField)
//             });
//             $town.on('change', function () {
//                 townId = currentArea.town_list[$town.find('option:selected').attr('data-code')].area_id;
//             })

//         }
// })

// $('input[name="mobile"]').change(function (e) {
//     var mobile = $(this).val();

//     var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
//     if (!myreg.test(mobile)) {
//         $(".error-tip").show();
//     } else {
//         $(".error-tip").hide()
//     }

// });
