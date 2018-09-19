$(document).ready(function () {
    let uid = sessionStorage.getItem("uid");
    // 获取信息
    let userData = {
        id: uid
    };
    setAjax("https://kaopeixia.com/webapi/user/getuserbyid", "GET", userData, function (result) {
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
    })
    $("#pic").click(function () {
        $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload").on("change", function () {
            let file = this.files[0];
            var formData = new FormData();
            formData.append('file', file);
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
                success: function (result) {
                    if (result.status == 201) {
                        $(".avatar").attr("src", "https://kaopeixia.com/webapi/" + result.filename);
                    }

                }
            });
        });
    });

    $('input[name="phone"]').change(function (e) {
        var mobile = $(this).val();

        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(mobile)) {
            $(".error-tip").show();
        } else {
            $(".error-tip").hide()
        }

    });

    $(".update-btn").click(function () {
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
            success: function (result) {
                if (result.status == "200") {
                    //   let info = result.data[0];
                    getAjax();
                    console.log(result);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
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


