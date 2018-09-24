$(document).ready(function () {
  var categoryType = $(".language-list .active span").text();
  var posterType = ".ielts-test-poster";
  var clientPage = 1;

  var num = 1;
  var hash;
  hash = window.location.hash
    ? decodeURI(window.location.hash).substring(1)
    : "雅思";
  //调整地址栏地址，使前进、后退按钮能使用
  if (hash != "") {
    switch (hash) {
      case "托福":
        $(".language-list li").removeClass("active");
        $(".language-list li")
          .eq(1)
          .addClass("active");

        getAjax("托福", 1, 12);
        break;
      case "日语":
        $(".language-list li").removeClass("active");
        $(".language-list li")
          .eq(2)
          .addClass("active");
        getAjax("日语", 1, 12);
        break;
      case "韩语":
        $(".language-list li").removeClass("active");
        $(".language-list li")
          .eq(3)
          .addClass("active");
        getAjax("韩语", 1, 12);
        break;
      default:
        $(".language-list li").removeClass("active");
        $(".language-list li")
          .eq(0)
          .addClass("active");
        getAjax("雅思", 1, 12);
    }
  }
  function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
         var a = val.charAt(i);
         if (a.match(/[^\x00-\xff]/ig) != null) 
        {
            len += 2;
        }
        else
        {
            len += 1;
        }
    }
    return len;
}
  function getDocCard(filename, introduce, fileaddress,index) {
    var name = fileaddress.replace(/.*(\/|\\)/, "");
    var fileExt = /[.]/.exec(name) ? /[^.]+$/.exec(name.toLowerCase()) : "";
    console.log(introduce)
// ${introduce}
    $(posterType).append(`
                <div class="video-card test-card">
                    <div class="test-card-left">
                        <div class="test-card-title">${filename}</div>
                        <p class="introduce">简介：${introduce}</p>
                        <a href="https://kpx.oss-cn-beijing.aliyuncs.com/${fileaddress}" class="start-test" download="https://kpx.oss-cn-beijing.aliyuncs.com/${fileaddress}" >${filename}</a>
                    </div>
                    <img src="./img/格式/${fileExt}.png" alt="">
                </div>
            `);
    let el = $(".test-card-left").eq(index);
    let p = el.children("p");
    n = p[0].offsetHeight;
    // console.log(el,n,p[0].scrollHeight)
    // debugger;
    
    // for (i = 0; i < introduce.length; i++) {
    //   p[0].innerHTML = introduce.substr(0, i);
    //   if (n < p[0].scrollHeight) {
    //     p[0].style.overflow = 'hidden';
    //     p[0].innerHTML = introduce.substr(0, i - 3) + '...';
    //     break;
    //   }
    // }
  }

  function getPagination(num) {
    var divWrap = $('<div style="text-align:center"></div>');
    var ulPagi = $('<ul class="pagination"></ul>');
    var laquo = $('<li class="laquo"><span>&laquo;</span></li>');
    var raquo = $('<li class="raquo"><span>&raquo;</span></li>');

    var liList = "";
    for (var i = 1; i <= num; i++) {
      liList += `<li><span class="page-btn">${i}</span></li>`;
    }
    ulPagi.append(laquo, liList, raquo);
    divWrap.append(ulPagi);
    $(posterType).append(divWrap);
  }
  function getAjax(category, clientPage, everyPage) {
    let documentData = {
      category: category,
      clientPage: clientPage,
      everyPage: everyPage
    };
    wetChatAjax("https://kaopeixia.com/webapi/document/getdocumentbysearch", "POST", documentData, function (result) {
      if (result.status == "200") {
        // console.info(result);
        $(posterType).text("");
        var data = result.data;
        data.map((item, index) => {
          const { filename, introduce, fileaddress } = item;
          console.log(item);
          getDocCard(filename, introduce, fileaddress,index);
        });
        num = Math.ceil(result.pager.sumpage / result.pager.everypage);
        getPagination(num);
        // console.log($(`${posterType} .page-btn`).eq(clientPage - 1));
        $(`${posterType} .page-btn`)
          .eq(clientPage - 1)
          .css({
            zIndex: "2",
            color: "#23527c",
            backgroundColor: "#eee",
            borderColor: "#ddd"
          });

        if (clientPage == 1) {
          $(".laquo")
            .children()
            .css("color", "#ddd");
          $(".laquo").addClass("disabled");
        } else {
          $(".laquo")
            .children()
            .css("color", "#337ab7");
          $(".laquo").removeClass("disabled");
        }
        if (clientPage == num) {
          $(".raquo")
            .children()
            .css("color", "#ddd");
          $(".raquo").addClass("disabled");
        } else {
          $(".raquo")
            .children()
            .css("color", "#337ab7");
          $(".raquo").removeClass("disabled");
        }
      }
    }
    );
  }
  $(document).on("click", ".laquo", function () {
    if (clientPage - 1 <= 0) {
      clientPage = clientPage;
    } else {
      clientPage = clientPage - 1;
    }

    getAjax(categoryType, clientPage, 12);
  });
  $(document).on("click", ".raquo", function () {
    if (clientPage + 1 >= num) {
      clientPage = clientPage;
    } else {
      clientPage = clientPage + 1;
    }
    getAjax(categoryType, clientPage, 12);
  });
  $(document).on("click", ".pagination>li .page-btn", function () {
    clientPage = $(this).text();
    getAjax(categoryType, clientPage, 12);
  });
  $(".language-list li").click(function () {
    $(".language-list li").removeClass("active");
    $(this).addClass("active");
    categoryType = $(".language-list .active span").text();
    window.location.hash = categoryType;
    var index = $(this).data("index");
    $(".test-poster").css("display", "none");
    clientPage = 1;
    switch (index) {
      case 1:
        posterType = ".ielts-test-poster";
        $(".ielts-test-poster").css("display", "block");
        break;
      case 2:
        posterType = ".toefl-test-poster";
        $(".toefl-test-poster").css("display", "block");
        break;
      case 3:
        posterType = ".japan-test-poster";
        $(".japan-test-poster").css("display", "block");
        break;
      case 4:
        posterType = ".korea-test-poster";
        $(".korea-test-poster").css("display", "block");
        break;
    }
    getAjax(categoryType, 1, 12);
  });
});
