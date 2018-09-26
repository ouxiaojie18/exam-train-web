$(document).ready(function () {
    var categoryType = $(".language-list .active span").text();
    var posterType = ".ielts-test-poster";
    let clientPage = 1;
    let everyPage = 12;
    var num = 1;
    let uid = sessionStorage.getItem('uid');
    var hash;
    hash = window.location.hash ? decodeURI(window.location.hash).substring(1) : "雅思";
    if (hash != "") {
        switch (hash) {
            case "托福":
                $(".language-list li").removeClass("active");
                $(".language-list li").eq(1).addClass("active");

                getAjax("托福", 1, everyPage);
                break;
            case "日语":
                $(".language-list li").removeClass("active");
                $(".language-list li").eq(2).addClass("active");
                getAjax("日语", 1, everyPage);
                break;
            case "韩语":
                $(".language-list li").removeClass("active");
                $(".language-list li").eq(3).addClass("active");
                getAjax("韩语", 1, everyPage);
                break;
            default:
                $(".language-list li").removeClass("active");
                $(".language-list li").eq(0).addClass("active");
                getAjax("雅思", 1, everyPage);
        }
    }
    
    
    function getDocCard(name, time, id) {
        $(posterType).append(`
            <div class="video-card test-card">
                <div class="test-card-left">
                    <div class="test-card-title">${name}</div>
                    <p>满 分：100分</p>
                    <p>测试时长：${time}分钟</p>
                    <div data-errorid=${id} data-testname=${name} class="start-test">查看错题</div>
                </div>
                <img src="./img/测试.png" alt="">
            </div>
            `);
    }

    function getPagination(num, clientPage) {
    
        var divWrap = $('<div style="text-align:center;margin-top:30px;width:1120px;"></div>');
        var ulPagi = $('<ul class="my_pagination"></ul>');
        var firstPage = $('<li class="my_first_page"><span>首页</span></li>');
        var lastPage = $('<li class="my_last_page"><span>尾页</span></li>');
        var laquo = $('<li class="my_laquo"><span>上一页</span></li>');
        var raquo = $('<li class="my_raquo"><span>下一页</span></li>');
    
        var liList = "";
        for (var i = 1; i <= num; i++) {
          if (clientPage == i) {
            liList += `<li><span class="my_page-btn active">${i}</span></li>`;
          } else {
            liList += `<li><span class="my_page-btn">${i}</span></li>`;
          }
        }
        ulPagi.append(firstPage, laquo, liList, raquo, lastPage);
        divWrap.append(ulPagi);
        $(posterType).append(divWrap);
      }
    function getAjax(category, clientPage, everyPage) {
        let myTestData = {
            user_id: uid,
            category: category,
            clientPage: clientPage,
            everyPage: everyPage
        }
        setAjax("https://kaopeixia.com/webapi/examinationrecord/getexaminationrecordbyuseridx", "GET", myTestData, function (result) {
            if (result.status == "200") {
                $(posterType).text("");
                var data = result.data;
                data.map((item, index) => {
                    const { name, time, id } = item;
                    getDocCard(name, time, id);
                });
                num = Math.ceil(result.pager.sumpage / result.pager.everypage);
                getPagination(num, clientPage);
                $(`${posterType} .page-btn`)
                    .eq(clientPage - 1)
                    .css({
                        zIndex: "2",
                        color: "#23527c",
                        backgroundColor: "#eee",
                        borderColor: "#ddd"
                    });

                    if (clientPage == 1) {
                        $(".my_laquo")
                          .children()
                          .css("color", "#888888");
                        $(".my_first_page")
                          .children()
                          .css("color", "#888888");
                        $(
                          document
                        ).on(
                          "mouseover mouseout",
                          ".my_laquo span,.my_first_page span",
                          function(event) {
                            if (event.type == "mouseover") {
                              $(this)
                                .css("background-color", "#fff")
                                .css("color", "#888888")
                                .css("cursor", "no-drop");
                            } else if (event.type == "mouseout") {
                              $(this)
                                .css("background-color", "#fff")
                                .css("cursor", "no-drop")
                                .css("color", "#888888");
                            }
                          }
                        );
                        $(".my_laquo").removeClass("my_laquo_can");
                        $(".my_first_page").removeClass("my_first_page_can");
                      } else {
                        $(".my_laquo")
                          .children()
                          .css("color", "#000");
                        $(".my_first_page")
                          .children()
                          .css("color", "#000");
                        $(
                          document
                        ).on(
                          "mouseover mouseout",
                          ".my_laquo span,.my_first_page span",
                          function(event) {
                            if (event.type == "mouseover") {
                              $(this)
                                .css("background-color", "#56b949")
                                .css("color", "#fff")
                                .css("cursor", "pointer");
                            } else if (event.type == "mouseout") {
                              $(this)
                                .css("background-color", "#fff")
                                .css("color", "#000")
                                .css("cursor", "pointer");
                            }
                          }
                        );
                        $(".my_laquo").addClass("my_laquo_can");
                        $(".my_first_page").addClass("my_first_page_can");
                      }
                      if (clientPage == num) {
                        $(".my_raquo")
                          .children()
                          .css("color", "#888888");
                        $(".my_last_page")
                          .children()
                          .css("color", "#888888");
                        $(
                          document
                        ).on(
                          "mouseover mouseout",
                          ".my_raquo span,.my_last_page span",
                          function(event) {
                            if (event.type == "mouseover") {
                              $(this).css("background-color", "#fff").css("color", "#888888").css("cursor", "no-drop");
                            } else if (event.type == "mouseout") {
                              $(this).css("background-color", "#fff").css("color", "#888888").css("cursor", "no-drop");
                            }
                          }
                        );
                        $(".my_raquo").removeClass("my_raquo_can");
                        $(".my_last_page").removeClass("my_last_page_can");
                      } else {
                        $(".my_raquo")
                          .children()
                          .css("color", "#000");
                        $(".my_last_page")
                          .children()
                          .css("color", "#000");
                        $(
                          document
                        ).on(
                          "mouseover mouseout",
                          ".my_raquo span,.my_last_page span",
                          function(event) {
                            if (event.type == "mouseover") {
                              $(this).css("background-color", "#56b949").css("color", "#fff").css("cursor", "pointer");
                            } else if (event.type == "mouseout") {
                              $(this).css("background-color", "#fff").css("color", "#000").css("cursor", "pointer");
                            }
                          }
                        );
                        $(".my_raquo").addClass("my_raquo_can");
                        $(".my_last_page").addClass("my_last_page_can");
                      }
            }
        })
    }
    $(document).on("click", ".start-test", function () {
        let url = "./errortest.html?errorid=" + this.dataset.errorid + "&testname=" + this.dataset.testname + "&type=" + categoryType + "&from=我的测试";
        window.location.href = url;
    });
    $(document).on("click", ".my_laquo_can", function() {
        if (clientPage - 1 <= 0) {
          clientPage = clientPage;
        } else {
          clientPage = clientPage - 1;
        }
        getAjax(categoryType, clientPage, everyPage);
      });
      $(document).on("click", ".my_first_page_can", function() {
        getAjax(categoryType, 1, everyPage);
      });
      $(document).on("click", ".my_raquo_can", function() {
        if (clientPage + 1 <= num) {
          clientPage = Number(clientPage) + 1;
        } else {
          clientPage = clientPage;
          
        }
        getAjax(categoryType, clientPage, everyPage);
      });
      $(document).on("click", ".my_last_page_can", function() {
        getAjax(categoryType, num, everyPage);
      });
      $(document).on("click", ".my_pagination>li .my_page-btn", function() {
        clientPage = Number($(this).text());
        getAjax(categoryType, clientPage, everyPage);
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
        getAjax(categoryType, 1, everyPage);
    });
});

