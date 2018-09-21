$(document).ready(function () {
    let videoid = 0,
        courseid = 0,
        courselist = "",
        coursename = "",
        teacher = "",
        uid = sessionStorage.getItem("uid"),
        start_num = 0,
        target_num = 0,
        type = "",
        filename_active = "",
        startTime=new Date(),
        duration=0;
    if(uid==null){
        $(".mymodal-part").css("display","block");
    }
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
    $(".language-type-page").click(function () {
        if (from == "课程") {
            window.location.href = "./index.html#" + type;
        } else if (from == "我的课程") {
            window.location.href = "./myclasses.html#" + type;
        }
    });
    $(document).on("click", ".course_list_btn", function () {
        let url = "./videoDetail.html?videoid=" + this.dataset.videoid + "&courseid=" + courseid + "&coursename=" + coursename + "&teacher=" + teacher + "&type=" + type + "&from=课程";
        window.location.href = url;
    });
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
        setAjax("https://kaopeixia.com/webapi/coursedetail/getcoursedetailbyid", "GET", { id: videoid }, function (result) {
            if (result.status == "200") {
                // console.log("video", result);
                filename_active = result.data[0].filename;
                let src =
                    "https://v.qq.com/txp/iframe/player.html?vid=" +
                    result.data[0].fileaddress;
                $("#my-videos").attr("src", src);
                setAjax("https://kaopeixia.com/webapi/coursedetail/getcoursedetailbycourselistidp", "GET", { courselist_id: courseid }, function (result) {
                    if (result.status == "200") {
                        let video_list = result.data;
                        getCourseList(video_list);
                    }
                })
            }
        })

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
            comment_reply.map(replyItem => {
                const { reply } = replyItem;
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
        let commentData = {
            coursedetail_id: courseid,
            clientPage: 1,
            everyPage: 20
        }
        setAjax("https://kaopeixia.com/webapi/comment/getcommentbycoursedetailid", "GET", commentData, function (result) {
            if (result.status == "200") {
                let commentData = result.data;
                $(".comment-title span").text(commentData.length);
                commentData.map(index => {
                    showComment(index);
                });

                // console.log(result);
            }
        })
    };
    function getInfo() {
        setAjax("https://kaopeixia.com/webapi/user/getuserbyid", "GET", { id: uid }, function (result) {
            if (result.status == "200") {
                $(".avatar")[0].src = result.data[0].headimg;
            }
        })
    }
    _getId();
    getAjax();
    getComment();
    getInfo();

    $(".mymodal-cancel").click(function(){
        window.history.go(-1);
    })
    $(".mymodal-login").click(function(){
        window.location.href="./login.html"
    })
    $(".add-class").click(function () {
        let getDate = new Date();
        let joindate = format(getDate, "yyyy-MM-dd");
        let addClassData={
            user_id: uid,
            courselist_id: courseid,
            joindate: joindate
        }
        setAjax("https://kaopeixia.com/webapi/usercourse/createusercourse", "POST", addClassData, function (result) {
            if (result.status == "200") {
                success_prompt("添加成功", 1500);
            } else {
                fail_prompt("已添加过该课程", 1500);
            }
        })
    });

    $(".sumbit-btn").click(function () {
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
        let subCommetData={
            user_id: uid,
            coursedetail_id: courseid,
            comment: comment,
            commentdate: commentdate,
            score: start_num
        }
        setAjax("https://kaopeixia.com/webapi/comment/createcomment", "POST", subCommetData, function (result) {
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
        })
    });

    startArray = (num) => {
        let imgSrc = "./img/start.png"; //没有填色的星星
        let imgSrc_2 = "./img/start-active.png"; //打分后有颜色的星星,这里的star_full图片时实心的有颜色的五星。
        let imgArray = $(".start-list img");
        for (let j = 0; j < imgArray.length; j++) {
            if (j <= num - 1) {
                imgArray.eq(j).attr("src", imgSrc_2);
            } else {
                imgArray.eq(j).attr("src", imgSrc);
            }
        }
    };
    $(".start-list img").mouseover(function () {
        target_num = this.dataset.index;
        if (target_num < start_num) {
            startArray(start_num);
        } else {
            startArray(target_num);
        }

    });

    $(".start-list img").mouseout(function () {
        if (start_num > 0) {
            startArray(start_num);
        } else {
            startArray(0);
        }
    });
    $(".start-list img").click(function () {
        start_num = this.dataset.index;
        startArray(start_num);
    });
    document.addEventListener(
        "visibilitychange",
        function() {
          if (document.visibilityState == "hidden") {
            let endTime=new Date();
            duration = endTime.getTime() - startTime.getTime();
            
          } else {
            startTime=new Date();
          }
        },
        false
      );
    window.onbeforeunload = function(e) {
        let endTime=new Date();
        t = endTime.getTime() - startTime.getTime()+duration;
        let hour = Math.floor((t / 1000 / 60 / 60) % 24);
        let min = Math.floor((t / 1000 / 60) % 60);
        let sec = Math.floor((t / 1000) % 60);
        // console.log(hour+"小时"+min+"分钟"+sec+"秒");
        studytime=hour+"小时"+min+"分钟"+sec+"秒";
        let studydate = format(startTime, "yyyy-MM-dd HH:mm:ss");
        let learnData={
            studydate,
            user_id:uid,
            coursedetail_id:courseid,
            studytime
        }
        setAjax("https://kaopeixia.com/webapi/studyrecord/createstudyrecord", "POST", learnData, function (result) {
            // console.log(result);
        })
        // return '确认离开网页？';
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


  // $("#my-videos").load(function(){
  //     console.log($(".txp_time_current").text());
  // })

	//获取iframe子页面内容高度给iframe动态设置高度
	// function iFrameHeight() {
  //   var ifm= document.getElementById("my-videos");
  //     var subWeb = document.frames ? document.frames["my-videos"].document : ifm.contentDocument;
  //     if(ifm != null && subWeb != null) {
  //       console.log($(".txp_time_current").text());
  //       // ifm.style.height = 'auto';//关键这一句，先取消掉之前iframe设置的高度
  //       // ifm.style.height = subWeb.body.scrollHeight+'px';
  //     }
  //   };
  //   iFrameHeight();


          // https://v.qq.com/txp/iframe/player.html?vid=m07648ha11e

        // var videoSrc = "https://dl.laobai.com/movie/ebaolife2018072702.mp4"; //新的视频播放地址

        // let videoStr = `
        //               <video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" poster="./img/m.jpg" data-setup="{}">
        //                   <source src=${videoSrc} type="">
        //               </video>
        //           `;
        // $(".video-part").append(videoStr);
        // var myPlayer = videojs("#my-video");
        // myPlayer.load();