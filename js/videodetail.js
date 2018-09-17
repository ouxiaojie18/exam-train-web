$(document).ready(function() {
  let videoid = 0;
  let courseid = 0;
  let courselist = "";
  let coursename = "";
  let teacher = "";
  let uid = sessionStorage.getItem("uid");
  let start_num = 0;
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
    }
    $(".card-wrap").append(`
            <p class="detail-title">${coursename}</p>
            <p class="detail-person">主讲人：${teacher}</p>
        `);
    return;
  };
  $(document).on("click", ".course_list_btn", function() {
    // let videoid = 0;
    window.location.href =
      "./videoDetail.html?videoid=" +
      this.dataset.videoid +
      "&courseid=" +
      courseid;
  });
  getCourseList = video_list => {
    let str = "";
    video_list.map((courseItem, index) => {
      //   console.log(courseItem);
      const { filename, id } = courseItem;
      str += `
            <li class="course_list_btn" data-videoid=${id}>
                <img src="./img/video.png" alt="">
                <p>${filename}</p>
            </li>
            `;
    });
    $(".class-list ul").append(`
            ${str}
        `);
  };
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
          // let source_list = $("#my-video source");
          // for (let i = 0; i < source_list.length; i++) {
          //     // source_list[i].src = result.data[0].fileaddress;
          //     source_list[i].src = "http://vjs.zencdn.net/v/oceans.mp4"
          // }
          // http://vjs.zencdn.net/v/oceans.mp4
          var videoSrc = "https://dl.laobai.com/movie/ebaolife2018072702.mp4"; //新的视频播放地址

          let videoStr = `
                        <video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" poster="./img/m.jpg" data-setup="{}">
                            <source src=${videoSrc} type="">
                        </video>
                    `;
          $(".video-part").append(videoStr);
          var myPlayer = videojs("#my-video");
          myPlayer.load();
          // videojs("#my-video").ready(function () {
          //     var myPlayer = this;
          //     myPlayer.play();
          // });
          // document.getElementById("my-video").src= videoSrc;
          //你在动态赋值src后要加载这个视频文件即:
          // $("#my-video").load();
          // //然后在判断是否可以播放了,在播放即:
          // $("#my-video").addEventListener("canplaythrough", function() {
          //     $("#my-video").play();
          // } );

          //   console.log(result);
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
  showComment=(comment_info)=>{
    const {comment,commentdate,headimg,nickname,comment_reply=[],score} = comment_info;
    let str ="";
    let scoreStr=""
    if(comment_reply!=null){
      comment_reply.map((reply)=>{
        str +=`
            <div class="replay-list">
                <p class="replay-title">主讲人回复</p>
                <p class="replay-content">${reply}</p>
            </div>
        `;
      })
    }
    for(let i=0;i<5;i++){
      if(i<score){
        scoreStr+=`<img src="./img/start-active.png" alt="">`
      }else{
        scoreStr+=`<img src="./img/start.png" alt="">`
      }
      
    }
    // <img class="avatar" src=${headimg} alt="">
    $(".comment-list-wrap").append(
      `
      <div class="comment comment-list">
        <img class="avatar" src="./img/登录注册.png" alt="">
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
    ) 
  }
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
          let commentData=result.data;
          commentData.map((index)=>{
            showComment(index);
          })

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
  getCourseRight();
  getComment();
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
          $(".comment-input").val("");
          var imgSrc = "./img/start.png";
          var imgArray = $(".start-list img");
          for (var k = 0; k < imgArray.length; k++) {
            imgArray[k].src = imgSrc;
          }
          $(".start-list").rateFlag=false;
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
  rate = (obj, oEvent) => {
    // 图片地址设置
    var imgSrc = "./img/start.png"; //没有填色的星星
    var imgSrc_2 = "./img/start-active.png"; //打分后有颜色的星星,这里的star_full图片时实心的有颜色的五星。
    if (obj.rateFlag) return;
    var e = oEvent || window.event;
    var target = e.target || e.srcElement;
    var imgArray = obj.getElementsByTagName("img");
    for (var i = 0; i < imgArray.length; i++) {
      imgArray[i]._num = i;
      imgArray[i].onclick = function() {
        if (obj.rateFlag) return;
        obj.rateFlag = true;
        start_num = target._num + 1;
        // console.log("imgArray",target._num)
      };
    }
    if (target.tagName == "IMG") {
      for (var j = 0; j < imgArray.length; j++) {
        if (j <= target._num) {
          imgArray[j].src = imgSrc_2;
        } else {
          imgArray[j].src = imgSrc;
        }
      }
    } else {
      for (var k = 0; k < imgArray.length; k++) {
        imgArray[k].src = imgSrc;
      }
    }
  };
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
