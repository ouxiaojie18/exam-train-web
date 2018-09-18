$(document).ready(function() {
  let videoid = 0,
    courseid = 0,
    courselist = "",
    coursename = "",
    teacher = "",
    uid = sessionStorage.getItem("uid"),
    start_num = 0,
    target_num=0,
    type = "",
    filename_active = "";
  //   fail_prompt("请完善收货信息", 1500);
  _getId = () => {
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == "videoid") {
        videoid = pair[1];
      }
      if (pair[0] == "courseid") {
        courseid = pair[1];
      }
      if (pair[0] == "coursename") {
        coursename = pair[1];
      }
      if (pair[0] == "teacher") {
        teacher = pair[1];
      }
      if (pair[0] == "type") {
        type = pair[1];
      }
      if (pair[0] == "from") {
        from = pair[1];
      }
    }
    $(".language-from").text(from);
    $(".language-type-page").text(type);
    $(".language-test-page").text(coursename);
    $(".card-wrap").append(`
            <p class="detail-title">${coursename}</p>
            <p class="detail-person">主讲人：${teacher}</p>
        `);
    return;
  };
  $(".language-type-page").click(function() {
    if (from == "课程") {
      window.location.href = "./index.html#" + type;
    } else if (from == "我的课程") {
      window.location.href = "./myclasses.html#" + type;
    }
  });
  $(document).on("click", ".course_list_btn", function() {
    let url =
      "./videoDetail.html?videoid=" +
      this.dataset.videoid +
      "&courseid=" +
      courseid +
      "&coursename=" +
      coursename +
      "&teacher=" +
      teacher +
      "&type=" +
      type +
      "&from=课程";
    window.location.href = url;
  });

  getCourseRight = () => {
    $.ajax({
      url:
        "https://kaopeixia.com/webapi/coursedetail/getcoursedetailbycourselistidp",
      type: "GET",
      data: {
        courselist_id: courseid
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "200") {
          let video_list = result.data;
          getCourseList(video_list);
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
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
  getCourseList = video_list => {
    let str = "";
    video_list.map((courseItem, index) => {
      //   console.log(courseItem);
      const { filename, id } = courseItem;
      if (filename_active == filename) {
        str += `
            <li class="course_list_btn" data-videoid=${id} >
                <img src="./img/video-选中.png" alt="">
                <p>${filename}</p>
            </li>
            `;
      } else {
        str += `
            <li class="course_list_btn" data-videoid=${id}>
                <img src="./img/video.png" alt="">
                <p>${filename}</p>
            </li>
            `;
      }
    });
    $(".class-list ul").append(`
            ${str}
        `);
  };
  getAjax = () => {
    $.ajax({
      url: "https://kaopeixia.com/webapi/coursedetail/getcoursedetailbyid",
      type: "GET",
      data: {
        id: videoid
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "200") {
          console.log("video", result);
          filename_active = result.data[0].filename;
          let src =
            "https://v.qq.com/txp/iframe/player.html?vid=" +
            result.data[0].fileaddress;
          $("#my-videos").attr("src", src);
          getCourseRight();
          // var videoSrc = "https://dl.laobai.com/movie/ebaolife2018072702.mp4"; //新的视频播放地址

          // let videoStr = `
          //               <video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" poster="./img/m.jpg" data-setup="{}">
          //                   <source src=${videoSrc} type="">
          //               </video>
          //           `;
          // $(".video-part").append(videoStr);
          // var myPlayer = videojs("#my-video");
          // myPlayer.load();
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
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
  showComment = comment_info => {
    const {
      comment,
      commentdate,
      headimg,
      nickname,
      comment_reply = [],
      score
    } = comment_info;
    let str = "";
    let scoreStr = "";
    if (comment_reply != null) {
      comment_reply.map(reply => {
        str += `
            <div class="replay-list">
                <p class="replay-title">主讲人回复</p>
                <p class="replay-content">${reply}</p>
            </div>
        `;
      });
    }
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        scoreStr += `<img src="./img/start-active.png" alt="">`;
      } else {
        scoreStr += `<img src="./img/start.png" alt="">`;
      }
    }
    // <img class="avatar" src=${headimg} alt="">
    $(".comment-list-wrap").append(
      `
      <div class="comment comment-list">
        <img class="avatar" src=${headimg} alt="">
        <div class="comment-right">
            <div class="user">
                <div class="user-info">
                    <span>${nickname}</span>
                    <span>${commentdate}</span>
                </div>
                <div class="start-list">
                    ${scoreStr}
                </div>
            </div>
            <div class="comment-content">
                ${comment}
            </div>
            ${str}
        </div>
      </div>
      `
    );
  };
  getComment = () => {
    $.ajax({
      url: "https://kaopeixia.com/webapi/comment/getcommentbycoursedetailid",
      type: "GET",
      data: {
        coursedetail_id: courseid,
        clientPage: 1,
        everyPage: 20
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "200") {
          let commentData = result.data;
          $(".comment-title span").text(commentData.length);
          commentData.map(index => {
            showComment(index);
          });

          console.log(result);
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
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

  _getId();

  getAjax();
  // getCourseRight();
  getComment();

    function getInfo() {
    $.ajax({
      url: "https://kaopeixia.com/webapi/user/getuserbyid",
      type: "GET",
      data: {
        id: uid
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function (result) {
        if (result.status == "200") {
          $(".avatar")[0].src=result.data[0].headimg;
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
  }
  getInfo();
  $(".add-class").click(function() {
    let getDate = new Date();
    let joindate = format(getDate, "yyyy-MM-dd");
    $.ajax({
      url: "https://kaopeixia.com/webapi/usercourse/createusercourse",
      type: "POST",
      data: {
        user_id: uid,
        courselist_id: courseid,
        joindate: joindate
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "200") {
          success_prompt("添加成功", 1500);
        } else {
          fail_prompt("已添加过该课程", 1500);
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.info("error.");
        if (xhr.status == 200) {
          console.log(ajaxOptions);
        } else {
          console.log(xhr.status);
          console.log(thrownError);
        }
      }
    });
  });

  $(".sumbit-btn").click(function() {
    let getDate = new Date();
    let commentdate = format(getDate, "yyyy-MM-dd");
    let comment = $(".comment-input").val();
    if (comment == "") {
      fail_prompt("你还没有评论哦~", 1500);
      return;
    }
    if (start_num == 0) {
      fail_prompt("你还没有评分哦~", 1500);
      return;
    }
    $.ajax({
      url: "https://kaopeixia.com/webapi/comment/createcomment",
      type: "POST",
      data: {
        user_id: uid,
        coursedetail_id: courseid,
        comment: comment,
        commentdate: commentdate,
        score: start_num
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "201") {
          $(".comment-list-wrap").text("");
          $(".comment-input").val("");
          var imgSrc = "./img/start.png";
          var imgArray = $(".start-list img");
          for (var k = 0; k < imgArray.length; k++) {
            imgArray[k].src = imgSrc;
          }
          getComment();
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.info("error.");
        if (xhr.status == 200) {
          console.log(ajaxOptions);
        } else {
          console.log(xhr.status);
          console.log(thrownError);
        }
      }
    });
  });

  startArray = (num) => {
    let imgSrc = "./img/start.png"; //没有填色的星星
    let imgSrc_2 = "./img/start-active.png"; //打分后有颜色的星星,这里的star_full图片时实心的有颜色的五星。
    let imgArray = $(".start-list img");
    // if(isClick){
      for (let j = 0; j < imgArray.length; j++) {
        if (j <= num - 1) {
          imgArray.eq(j).attr("src",imgSrc_2);
        } else {
          imgArray.eq(j).attr("src",imgSrc);
        }
      }
    // }

  };
  $(".start-list img").mouseover(function () {
      target_num=this.dataset.index;
      if(target_num<start_num){
        startArray(start_num);
      }else{
        startArray(target_num);
      }
      
  });
  
  $(".start-list img").mouseout(function () {
    if(start_num>0){
      startArray(start_num);
    }else{
      startArray(0);
    }
  });
  $(".start-list img").click(function() {
    start_num = this.dataset.index;
    startArray(start_num);
  });
  //   for (var i = 0; i < imgArray.length; i++) {
  //   imgArray[i]._num = i;
  //   imgArray[i].onclick = function() {
  //     // if (obj.rateFlag) return;
  //     obj.rateFlag = true;
  //     start_num = target._num + 1;
  //     // return;
  //     // console.log("imgArray",target._num)
  //   };
  // }
});

// function changeVideo(obj) {
//     //获取播放器对象
//     var player = videojs('my_video_1');
//     if (obj == '1') {
//         //获取当前播放器的播放时间
//         var curtime = player.currentTime();
//         //设置播放器的src
//         player.src("url1");
//         //重新加载播放器
//         player.load();
//         //设置播放器从curtime开始播放
//         player.currentTime(curtime);
//     } else {
//         var curtime = player.currentTime();
//         player.src("url2");
//         player.load();
//         player.currentTime(curtime);
//     }
// }
