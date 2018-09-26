$(document).ready(function () {
  var categoryType = $(".language-list .active span").text();
  var posterType = ".ielts-test-poster";
  var clientPage = 1;
  var num = 1;
  var courseData = [];
  var hash;
  let videoArr = [];
  let videoNum = 7;
  let everyPage = 3;
  hash = window.location.hash
    ? decodeURI(window.location.hash).substring(1)
    : "雅思";

  $(document).on("click", ".video-btn", function () {
    let url =
      "./videoDetail.html?videoid=" +
      this.dataset.videoid +
      "&courseid=" +
      $(this).parent()[0].dataset.parentid +
      "&coursename=" +
      encodeURI($(this).parent()[0].dataset.coursename) +
      "&teacher=" +
      encodeURI($(this).parent()[0].dataset.teacher) +
      "&type=" +
      categoryType +
      "&from=课程";
    window.location.href = url;
  });
  // getVideoBtn = (videoItem, index) => {
  //   let videoLen = videoItem.length;
  //   let videoBtn = "";
  //   let videoId = 0;
  //   if (videoLen == 0) {
  //     videoBtn = "课程即将上线，敬请期待！";
  //   } else {
  //     let video_one = videoItem[0].id;
  //     for (let i = 0; i < videoLen; i++) {
  //       videoId = videoItem[i].id;
  //       if (i == 0) {
  //         videoBtn += `<div data-videoid=${videoId} class="video-btn active">1</div>`;
  //       } else {
  //         videoBtn += `<div data-videoid=${videoId} class="video-btn">${i +
  //           1}</div>`;
  //       }
  //       if (i >= videoNum - 1) {
  //         videoBtn += `<div data-videoid=${video_one} class="video-btn">全部</div>`;
  //         break;
  //       }
  //     }
  //   }

  //   $(".video-btn-wrap")
  //     .eq(index)
  //     .append(videoBtn);
  // };
  getCourseTop = (stage, categoryType, coursename, Courselist) => {
    // const { course_left, course } = course_line;
    // const { coursename, teacher } = course_left;
    const teacher_poster = Courselist[0].teacher;
    let constLen = Courselist.length;
    let str = "", str1 = "";

    Courselist.map((courseItem, index) => {
      const { teacher, courselistname, id, video = [] } = courseItem;
      let courseType = courselistname.substring(courselistname.length - 2);
      let videoLen = video[0].length;
      let videoBtn = '';
      let videoId = 0;
      if(videoLen==0){
        videoBtn="课程即将上线，敬请期待！"
      }else{
        for (let i = 0; i < videoLen; i++) {
          if (i > 6) {
            videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid="all" class="video-btn">全部</div>`
            break;
          }
          videoId = video[0][i].id;
          if (i == 0) {

            videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid=${videoId} class="video-btn active">1</div>`
          } else if (i == (videoLen - 1)) {
            videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid="all" class="video-btn">全部</div>`
          } else {
            videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid=${videoId} class="video-btn">${i + 1}</div>`
          }
        }
      }

      let temp=`
      <div class="stage-card video-card">
          <div class="stage-card-left">
              <h5>${coursename}</h5>
              <div class="teacher-wrap">${teacher}</div>
              <div class="info-row">
                  <img src="./img/订单.png" alt="">
                  <span>课 程：共${videoLen}课</span>
              </div>
              <div class="info-row">
                  <img src="./img/约课.png" alt="">
                  <span>课 时：约45分钟/课</span>
              </div>
              <div class="info-row">
                  <img src="./img/开课指导.png" alt="">
                  <span>类 别：${courseType}</span>
              </div>
              <div class="info-row">
                  <img src="./img/播放.png" alt="">
                  <span>课程播放</span>
                  <img src="./img/下 拉.png" alt="">
              </div>
          </div>
          <img src="./img/图层 7.png" alt="">
          <div  data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} class="video-btn-wrap">
              ${videoBtn}
          </div>
      </div>
      `;
      if (index < 4) {
        str += temp;
      } else {
        str1+=temp;
      }

    });
    // debugger;
    $(posterType).append(`
            <div class="course-content-wrap">
                <div class="stage-title">
                    <img src="./img/title_ABC/${stage}.png" alt="">
                    <p>${coursename}
                        <span>注重培养学生学习${categoryType}的一系列基础问题</span>
                    </p>
                </div>
                <div class="stage-left">
                    <img src="./img/图层 5 拷贝.png" alt="" style="height: 275px;">
                    <div class="stage-left-info-wrap">
                        <img class="poster-bottom" src="./img/海报底部.png" alt="">
                        <div class="poster-letter">
                            <img src="./img/poster_ABC/${stage}.png" alt="">
                        </div>
                        <div class="stage-left-info">
                            <h4>${coursename}</h4>
                            <div class="teacher-wrap">${teacher_poster}等</div>
                            <div class="info-row row1">
                                <img src="./img/订单.png" alt="">
                                <span>课程：共${constLen}门课 每门课节数不同</span>
                            </div>
                            <div class="info-row row2">
                                <img src="./img/约课.png" alt="">
                                <span>课时：约45分钟/课</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stage-card-list">${str}</div>
                <div>${str1}</div>
            </div>
        `);
  };

  // getCourseLeft = (item, num, video_num) => {
  //   $.ajax({
  //     url: "https://kaopeixia.com/webapi/courselist/getcourselistbyid",
  //     type: "GET",
  //     async: false,
  //     headers: {
  //       Authorization: "wechat"
  //     },
  //     data: {
  //       id: item.id
  //     },
  //     dataType: "json",
  //     xhrFields: { withCredentials: true },
  //     success: function(result) {
  //       if (result.status == "200") {
  //         getCourseRight(item, num, result.data);
  //       }
  //     },
  //     error: function(xhr, ajaxOptions, thrownError) {
  //       console.info("error.");
  //       if (xhr.status == 200) {
  //         console.log(ajaxOptions);
  //       } else {
  //         console.log(xhr.status);
  //         console.log(thrownError);
  //       }
  //     }
  //   });
  // };
  getCourseRight = (course_info, index, index1) => {
    $.ajax({
      url:
        "https://kaopeixia.com/webapi/coursedetail/getcoursedetailbycourselistidp",
      type: "GET",
      async: false,
      data: {
        courselist_id: course_info.id
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function (result) {
        // console.log("video",result)
        courseData[index].Courselist[index1].video = [];
        if (result.status == "200") {
          videoArr.push(result.data);

          // let obj = {
          //   course_info,
          //   course_video: result.data
          // };

          courseData[index].Courselist[index1].video.push(result.data);
        } else {
          videoArr.push([]);
          // let obj = {
          //   course_info,
          //   course_video: []
          // };
          // courseData[num].course_line.course.push(obj);
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.info("error.");
        if (xhr.status == 200) {
          console.log(ajaxOptions);
        } else {
          console.log(xhr.status);
          console.log(thrownError);
        }
      }
    });
  };
  getAjax = (categoryType, clientPage, everyPage) => {
    $.ajax({
      url: "https://kaopeixia.com/webapi/course/getcoursebysearchv3",
      type: "GET",
      headers: {
        Authorization: "wechat"
      },
      data: {
        category: categoryType,
        clientPage: clientPage,
        everyPage: everyPage
      },
      success: function (result) {
        console.log(result)
        if (result.status == "200") {
          $(posterType).text("");
          courseData.length = 0;
          courseData = result.data;
          let reg = /[A-Z]/g;
          result.data.map((item, index) => {
            console.log(item)
            if (item.Courselist != null) {
              let stage = item.Courselist[0].courselistname.match(reg)[0];
              courseData[index].stage = stage;
              ///////////////////////////////////////////////////////////////////////////
              let big = item.Courselist;
              big.map((item1, index1) => {
                item.Courselist.push(item1);
              })
              console.log(big)




              ////////////////////////////////////////////////////////////////////////////
              item.Courselist.map((courseItem, index1) => {
                // console.log(item.id,index,courseItem)
                getCourseRight(courseItem, index, index1);
              })
            }

            //     let isHas = false;
            //     let num = 0,
            //       video_num = 0;
            //     for (let i = 0; i < courseData.length; i++) {
            //       if (stage == courseData[i].stage) {
            //         isHas = true;
            //         num = i;
            //         break;
            //       }
            //     }
            //     if (!isHas) {
            //       let obj = {
            //         stage: "",
            //         course_line: {
            //           course_left: {},
            //           course: []
            //         }
            //       };
            //       obj.stage = stage;
            //       obj.course_line.course_left = item;
            //       courseData.push(obj);
            //       num = courseData.length - 1;
            //     }

            //     video_num = courseData[num].course_line.course.length - 1;
            //     getCourseLeft(item, num, video_num);
          });
          $(posterType).append(`
                        <div class="language-poster-big">
                            <img src="./img/index图/${categoryType}.png" alt="">
                        </div>
                    `);
          console.log(courseData);
          courseData.map((item, index) => {
            const { stage, coursename, Courselist } = item;
            if (Courselist != null) {
              getCourseTop(stage, categoryType, coursename, Courselist);
            }

          });
          //   let videoBoxWidth = $(".video-btn-wrap").width();
          //   videoNum = Math.floor(videoBoxWidth / 41);
          //   videoArr.map((videoItem, index) => {
          //     getVideoBtn(videoItem, index);
          //   });
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
                    $(this)
                      .css("background-color", "#fff")
                      .css("color", "#888888")
                      .css("cursor", "no-drop");
                  } else if (event.type == "mouseout") {
                    $(this)
                      .css("background-color", "#fff")
                      .css("color", "#888888")
                      .css("cursor", "no-drop");
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
              $(".my_raquo").addClass("my_raquo_can");
              $(".my_last_page").addClass("my_last_page_can");
            }
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.info("error.");
        if (xhr.status == 200) {
          console.log(ajaxOptions);
        } else {
          console.log(xhr.status);
          console.log(thrownError);
        }
      }
    });
  };
  if (hash != "") {
    switch (hash) {
      case "韩语":
        $(".language-list li").removeClass("active");
        $(".language-list li")
          .eq(3)
          .addClass("active");
        getAjax("韩语", 1, everyPage);
        break;
      case "托福":
        $(".language-list li").removeClass("active");
        $(".language-list li")
          .eq(1)
          .addClass("active");
        getAjax("托福", 1, everyPage);
        break;
      case "日语":
        $(".language-list li").removeClass("active");
        $(".language-list li")
          .eq(2)
          .addClass("active");
        getAjax("日语", 1, everyPage);
        break;

      default:
        $(".language-list li").removeClass("active");
        $(".language-list li")
          .eq(0)
          .addClass("active");
        getAjax("雅思", 1, everyPage);
    }
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

  $(document).on("click", ".my_laquo_can", function () {
    if (clientPage - 1 <= 0) {
      clientPage = clientPage;
    } else {
      clientPage = clientPage - 1;
    }
    getAjax(categoryType, clientPage, everyPage);
  });
  $(document).on("click", ".my_first_page_can", function () {
    getAjax(categoryType, 1, everyPage);
  });
  $(document).on("click", ".my_raquo_can", function () {
    if (clientPage + 1 <= num) {
      clientPage = Number(clientPage) + 1;
    } else {
      clientPage = clientPage;
    }
    getAjax(categoryType, clientPage, everyPage);
  });
  $(document).on("click", ".my_last_page_can", function () {
    getAjax(categoryType, num, everyPage);
  });
  $(document).on("click", ".my_pagination>li .my_page-btn", function () {
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
