$(document).ready(function () {
    let videoid = 0;
    let courseid = 0;
    let courselist = '';

    // console.log($(".video-part").height());
    _getId = () => {
        var query = window.location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == 'videoid') { videoid = pair[1]; }
            if (pair[0] == 'courseid') { courseid = pair[1]; }
        }
        return;
    }
    $(document).on("click", ".course_list_btn", function () {
        // let videoid = 0;
        window.location.href = "./videoDetail.html?videoid="+this.dataset.videoid+"&courseid="+courseid;

    })
    getCourseList = (video_list) => {
        let str = ''
        video_list.map((courseItem, index) => {
            console.log(courseItem);
            const { filename,id } = courseItem;
            str += `
            <li class="course_list_btn" data-videoid=${id}>
                <img src="./img/video.png" alt="">
                <p>${filename}</p>
            </li>
            `
        })
        $(".class-list ul").append(`
            ${str}
        `);
    }
    getCourseRight = (item, num, course_info) => {
        $.ajax({
            url: "https://kaopeixia.com/webapi/coursedetail/getcoursedetailbycourselistidp",
            type: "GET",
            data: {
                'courselist_id': courseid,
            },
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status == "200") {
                    let video_list = result.data;
                    getCourseList(video_list);
                }
                //     let obj={
                //         course_info,
                //         course_video:result.data
                //     }
                //     courseData[num].course_line.course.push(obj);
                // }else{
                //     let obj={
                //         course_info,
                //         course_video:[]
                //     }
                //     courseData[num].course_line.course.push(obj);
                // }
            },
            error: function (xhr, ajaxOptions, thrownError) {
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

    getAjax = () => {
        $.ajax({
            url: "https://kaopeixia.com/webapi/coursedetail/getcoursedetailbyid",
            type: "GET",
            data: {
                'id': videoid,
            },
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status == "200") {
                    // let source_list = $("#my-video source");
                    // for (let i = 0; i < source_list.length; i++) {
                    //     // source_list[i].src = result.data[0].fileaddress;
                    //     source_list[i].src = "http://vjs.zencdn.net/v/oceans.mp4"
                    // }
                    var videoSrc = "http://vjs.zencdn.net/v/oceans.mp4";//新的视频播放地址
                    let videoStr=`
                        <video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" poster="./img/m.jpg" data-setup="{}">
                            <source src=${videoSrc} type="">
                        </video>
                    `
                    $(".video-part").append(videoStr);
                    var myPlayer = videojs('#my-video');
                    // myPlayer.src(result.data[0].fileaddress);
                    // player.load();
                    videojs("#my-video").ready(function () {
                        var myPlayer = this;
                        myPlayer.play();
                    });
                    // document.getElementById("my-video").src= videoSrc; 
                    //你在动态赋值src后要加载这个视频文件即:
                    // $("#my-video").load();
                    // //然后在判断是否可以播放了,在播放即:
                    // $("#my-video").addEventListener("canplaythrough", function() { 
                    //     $("#my-video").play();
                    // } );

                    console.log(result)
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
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
    _getId();
    getAjax();
    getCourseRight();
    rate = (obj, oEvent) => {
        // 图片地址设置
        var imgSrc = './img/start.png'; //没有填色的星星
        var imgSrc_2 = './img/start-active.png'; //打分后有颜色的星星,这里的star_full图片时实心的有颜色的五星。
        if (obj.rateFlag) return;
        var e = oEvent || window.event;
        var target = e.target || e.srcElement;
        var imgArray = obj.getElementsByTagName("img");
        for (var i = 0; i < imgArray.length; i++) {
            imgArray[i]._num = i;
            imgArray[i].onclick = function () {
                if (obj.rateFlag) return;
                obj.rateFlag = true;
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
    }

})


