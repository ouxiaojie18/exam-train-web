// $(document).ready(function() {
//   let uid = sessionStorage.getItem("uid");
//   if (uid == null) {
//     $(".mymodal-part").css("display", "block");
//   }
//   $(".mymodal-cancel").click(function() {
//     window.history.go(-1);
//   });
//   $(".mymodal-login").click(function() {
//     window.location.href = "./login.html";
//   });
//   // 获取信息
//   let userData = {
//     id: uid
//   };
//   setAjax(
//     "https://kaopeixia.com/webapi/user/getuserbyid",
//     "GET",
//     userData,
//     function(result) {
//       if (result.status == "200") {
//         let info = result.data[0];
//         // console.log(result);
//         // $("input[name='nickname']").val("mosquito").attr("readonly","readonly");;
//         $(".avatar").attr("src", info.headimg);
//         $("input[name='nickname']").val(info.nickname);
//         $("input[name='username']").val(info.username);
//         $("input[name='phone']").val(info.phone);
//         $("input[name='grade']").val(info.grade);
//         $("input[name='address']").val(info.area);
//         $("input[name='school']").val(info.school);
//       }
//     }
//   );
//   $("#pic").click(function() {
//     $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
//     $("#upload").on("change", function() {
//       let file = this.files[0];
//       var formData = new FormData();
//       formData.append("file", file);
//       $.ajax({
//         url: "https://kaopeixia.com/webapi/file/getfilepath",
//         type: "POST",
//         data: formData,
//         cache: false,
//         processData: false,
//         contentType: false,
//         dataType: "json",
//         xhrFields: { withCredentials: true },
//         success: function(result) {
//           if (result.status == 201) {
//             $(".avatar").attr(
//               "src",
//               "https://kaopeixia.com/webapi/" + result.filename
//             );
//           }
//         }
//       });
//     });
//   });

//   $('input[name="phone"]').change(function(e) {
//     var mobile = $(this).val();

//     var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
//     if (!myreg.test(mobile)) {
//       $(".error-tip").show();
//     } else {
//       $(".error-tip").hide();
//     }
//   });
//   $(".update-btn").click(function() {
//     let avatar = $(".avatar").attr("src");
//     let nickname = $("input[name='nickname']").val();
//     let username = $("input[name='username']").val();
//     let phone = $("input[name='phone']").val();
//     let grade = $("input[name='grade']").val();
//     let area = $("input[name='address']").val();
//     let school = $("input[name='school']").val();
//     $.ajax({
//       url: "https://kaopeixia.com/webapi/user/updateuser",
//       type: "POST",
//       data: {
//         id: uid,
//         headimg: avatar,
//         nickname,
//         username,
//         phone,
//         grade,
//         area,
//         school
//       },
//       dataType: "json",
//       xhrFields: { withCredentials: true },
//       success: function(result) {
//         if (result.status == "200") {
//           getAjax();
//         }
//       },
//       error: function(xhr, ajaxOptions, thrownError) {
//         console.info("error.");
//         if (xhr.status == 200) {
//           alert(ajaxOptions);
//         } else {
//           alert(xhr.status);
//           alert(thrownError);
//         }
//       }
//     });
//   });
// });
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('$(1e).18(c(){b i=1o.1m("i");g(i==1r){$(".F-1i").1j("1n","1k")}$(".F-1l").k(c(){K.1g.1h(-1)});$(".F-P").k(c(){K.1p.1q="./P.19"});b I={11:i};1a("q://u.t/v/14/17","1b",I,c(f){g(f.p=="C"){b d=f.x[0];$(".n").y("w",d.U);$("a[6=\'o\']").2(d.o);$("a[6=\'j\']").2(d.j);$("a[6=\'h\']").2(d.h);$("a[6=\'l\']").2(d.l);$("a[6=\'H\']").2(d.E);$("a[6=\'m\']").2(d.m)}});$("#1c").k(c(){$("#J").k();$("#J").1d("O",c(){b s=Q.1f[0];z A=1F 1I();A.1G("s",s);$.15({12:"q://u.t/v/s/1B",16:"13",x:A,1E:B,1D:B,1C:B,V:"T",R:{S:Z},10:c(f){g(f.p==1H){$(".n").y("w","q://u.t/v/"+f.1A)}}})})});$(\'a[6="h"]\').O(c(e){z L=$(Q).2();z M=/^[1][3,4,5,7,8][0-9]{9}$/;g(!M.1v(L)){$(".r-N").1s()}W{$(".r-N").1t()}});$(".1y-1z").k(c(){b n=$(".n").y("w");b o=$("a[6=\'o\']").2();b j=$("a[6=\'j\']").2();b h=$("a[6=\'h\']").2();b l=$("a[6=\'l\']").2();b E=$("a[6=\'H\']").2();b m=$("a[6=\'m\']").2();$.15({12:"q://u.t/v/14/1w",16:"13",x:{11:i,U:n,o,j,h,l,E,m},V:"T",R:{S:Z},10:c(f){g(f.p=="C"){1x()}},r:c(D,Y,X){1u.d("r.");g(D.p==C){G(Y)}W{G(D.p);G(X)}}})})});',62,107,'||val||||name||||input|let|function|info||result|if|phone|uid|username|click|grade|school|avatar|nickname|status|https|error|file|com|kaopeixia|webapi|src|data|attr|var|formData|false|200|xhr|area|mymodal|alert|address|userData|upload|window|mobile|myreg|tip|change|login|this|xhrFields|withCredentials|json|headimg|dataType|else|thrownError|ajaxOptions|true|success|id|url|POST|user|ajax|type|getuserbyid|ready|html|setAjax|GET|pic|on|document|files|history|go|part|css|block|cancel|getItem|display|sessionStorage|location|href|null|show|hide|console|test|updateuser|getAjax|update|btn|filename|getfilepath|contentType|processData|cache|new|append|201|FormData'.split('|'),0,{}))
