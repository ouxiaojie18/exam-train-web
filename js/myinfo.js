$(document).ready(function () {
    var $this = $("#area");
    var $province = $this.find('select[name="province"]'),
        $city = $this.find('select[name="city"]'),
        $area = $this.find('select[name="area"]'),
        $town = $this.find('select[name="town"]');
    $.getJSON("./js/city.json", function (result){
                  if (result.rc == 0) {
                var formatProvince = [], provinceField = [], currentProvince = null, cityField = [], currentCity = null, areaField = [], currentArea = null, townField = [];
                formatProvince = result.data.province_list;
                formatProvince.map(function (value, index) {
                    provinceField.push(value.area_name);
                })
                var format = {
                    province: function () {
                        $province.empty();
                        $province.append('<option value=""> - 请选择 - </option>');
                        $province.prop('disabled', provinceField.length === 0);
                        for (var i in provinceField) {
                            $province.append('<option value="' + i + '" data-code="' + i + '">' + provinceField[i] + '</option>');
                        }
                        this.city();
                    },
                    city: function () {
                        $city.empty();
                        $city.append('<option value=""> - 请选择 - </option>');
                        $city.prop('disabled', cityField.length === 0);
                        for (var i in cityField) {
                            $city.append('<option value="' + i + '" data-code="' + i + '">' + cityField[i] + '</option>');
                        }
                        this.area();
                    },
                    area: function () {
                        $area.empty();
                        $area.append('<option value=""> - 请选择 - </option>');
                        $area.prop('disabled', areaField.length === 0);
                        for (var i in areaField) {
                            $area.append('<option value="' + i + '" data-code="' + i + '">' + areaField[i] + '</option>');
                        }
                        this.town();
                    },
                    town: function () {
                        $town.empty();
                        $town.append('<option value=""> - 请选择 - </option>');
                        $town.prop('disabled', townField.length === 0);
                        for (var i in townField) {
                            $town.append('<option value="' + i + '" data-code="' + i + '">' + townField[i] + '</option>');
                        }
                    }

                };

                format.province();
                //事件绑定
                $province.on('change', function () {
                    currentProvince = null, cityField = [], cityId = 0, currentCity = null, areaField = [], areaId = 0, currentArea = null, townField = [], townId = 0;
                    currentProvince = formatProvince[$province.find('option:selected').attr('data-code')]
                    provinceId = currentProvince.area_id;
                    // cityId = currentProvince.city_list[0].area_id;
                    currentProvince.city_list.map(function (value, index) {
                        cityField.push(value.area_name);
                    });
                    format.city();
                });
                $city.on('change', function () {
                    currentCity = null, areaField = [], areaId = 0, currentArea = null, townField = [], townId = 0;
                    currentCity = currentProvince.city_list[$city.find('option:selected').attr('data-code')]
                    cityId = currentCity.area_id;
                    // areaId=currentCity.county_list[0].area_id;
                    currentCity.county_list.map(function (value, index) {
                        areaField.push(value.area_name);
                    });
                    format.area();
                });
                $area.on('change', function () {
                    areaId = 0, currentArea = null, townField = [], townId = 0;
                    currentArea = currentCity.county_list[$area.find('option:selected').attr('data-code')]
                    areaId = currentArea.area_id;
                    // townId =currentArea.town_list[0].area_id;
                    currentArea.town_list.map(function (value, index) {
                        townField.push(value.area_name);
                    });
                    format.town();
                    // console.log(townField)
                });
                $town.on('change', function () {
                    townId = currentArea.town_list[$town.find('option:selected').attr('data-code')].area_id;
                })

            }
    }) 


    let uid = sessionStorage.getItem('uid');
    // 获取信息
    function getAjax() {
        $.ajax({
            url: "https://kaopeixia.com/webapi/user/getuserbyid",
            type: "GET",
            data: {
                'id': uid,
            },
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status == "200") {
                    console.info(result);
                    // var $info = $(".info-line");
                    // var nickname = $info.find()
                    $("input[name='nickname']").val('')
                    // $(posterType).text('');
                    // var data = result.data;
                    // data.map((item, index) => {
                    //     const { filename, introduce, fileaddress } = item;
                    //     getDocCard(filename, introduce, fileaddress);
                    // })
                    // num=Math.ceil(result.pager.sumpage / result.pager.everypage);
                    // getPagination(num);
                    // console.log($(`${posterType} .page-btn`).eq(clientPage-1));
                    // $(`${posterType} .page-btn`).eq(clientPage-1).css({
                    //     zIndex: "2",
                    //     color:"#23527c",
                    //     backgroundColor:"#eee",
                    //     borderColor: "#ddd",
                    // })
                    
                    // if(clientPage==1){
                    //     $(".laquo").children().css('color','#ddd');
                    //     $(".laquo").addClass("disabled");
                    // }else{
                    //     $(".laquo").children().css('color','#337ab7');
                    //     $(".laquo").removeClass("disabled");
                    // }
                    // if(clientPage==num){
                    //     $(".raquo").children().css('color','#ddd');
                    //     $(".raquo").addClass("disabled");
                    // }else{
                    //     $(".raquo").children().css('color','#337ab7');
                    //     $(".raquo").removeClass("disabled");
                    // }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //On error do this
                console.info("error.");
                if (xhr.status == 200) {

                    alert(ajaxOptions);
                }
                else {
                    alert(xhr.status);
                    alert(thrownError);
                }
            }
        });
    }
    getAjax()


    var provinceId = 0, areaId = 0, cityId = 0, townId = 0;
    $(".pay-alipay-button").click(function () {
        var userName = $('input[name="userName"]').val();
        var mobile = $('input[name="mobile"]').val();
        var address = $('input[name="address"]').val();
        var data = {
            userName: userName,
            mobile: mobile,
            area: {
                provinceId: provinceId,
                cityId: areaId,
                countyId: cityId,
                townId: townId,
            },
            address: address,
            returnUrl: 'http://jambo.jianbaolife.com/payresult.html',
            productId: 123123,
        };

        $.ajax({
            url: 'https://jianbaopay-test.laobai.com/pay/special',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                if (result.rc === 0) {
                    document.write(result.data.html);
                }
                // console.log(result)
            }
        })
        // console.log(provinceId, areaId, cityId, townId)
        //adding your code here　　 
    });

    $('input[name="mobile"]').change(function (e) {
        var mobile = $(this).val();

        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(mobile)) {
            $(".error-tip").show();
        } else {
            $(".error-tip").hide()
        }

    });

    $("#pic").click(function () {
        $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload").on("change", function () {
            var objUrl = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $(".avatar").attr("src", objUrl); //将图片路径存入src中，显示出图片
                upimg();
            }
        });
    });
    //建立一?可存取到?file的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    //上传头像到服务器
    function upimg() {
        console.log(344)
        var pic = $('#upload')[0].files[0];
        var file = new FormData();
        file.append('image', pic);
        $.ajax({
            url: "/uploadImg",
            type: "post",
            data: file,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                var res = data;
                $("#resimg").append("<img src='/" + res + "'>")
            }
        });
    }
});