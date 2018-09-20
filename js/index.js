$(document).ready(function () {
    //https://kpx.oss-cn-beijing.aliyuncs.com/%E8%80%83%E5%9F%B9%E4%BE%A01zsfrM4TYrp.png
    var categoryType = $(".language-list .active span").text();
    var posterType = ".ielts-test-poster";
    var clientPage = 1;
    // courseData:[
    //     {
    //         stage:"A",
    //         course_line:{
    //             course_left:{},
    //             course:[{
    //                 course_info:[],
    //                 course_video:[]
    //             }],
    //         },
    //     }
    // ]
    var num = 1;
    var courseData = [];
    var hash;
    hash = window.location.hash ? decodeURI(window.location.hash).substring(1) : "雅思";


    $(document).on("click", ".video-btn", function () {
        let url = "./videoDetail.html?videoid=" + this.dataset.videoid + "&courseid=" + this.dataset.parentid + "&coursename=" + encodeURI(this.dataset.coursename) + "&teacher=" + encodeURI(this.dataset.teacher)+ "&type=" + categoryType+"&from=课程";
        window.location.href = url;

    })
    getCourseTop = (stage, categoryType, course_line) => {
        const { course_left, course } = course_line;
        const { coursename, teacher } = course_left;
        let constLen = course.length;
        let str = '';

        course.map((courseItem, index) => {
            const { course_info, course_video = [] } = courseItem;
            const { teacher, courselistname, id } = course_info[0];
            let courseType = courselistname.substring(courselistname.length - 2);

            let videoLen = course_video.length;
            let videoBtn = '';
            let videoId = 0;

            for (let i = 0; i < videoLen; i++) {
                if (i > 6) {
                    videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid="all" class="video-btn">全部</div>`
                    break;
                }
                videoId = course_video[i].id;
                if (i == 0) {

                    videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid=${videoId} class="video-btn active">1</div>`
                } else if (i == (videoLen - 1)) {
                    videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid="all" class="video-btn">全部</div>`
                } else {
                    videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid=${videoId} class="video-btn">${i + 1}</div>`
                }
            }

            str += `
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
                    <div class="video-btn-wrap">
                        ${videoBtn}
                    </div>
                </div>

            `
        })
        $(posterType).append(`
            <div class="course-content-wrap">
                <div class="stage-title">
                    <img src="./img/title_ABC/${stage}.png" alt="">
                    <p>${coursename}
                        <span>注重培养学生学习${categoryType}的一系列基础问题</span>
                    </p>
                </div>
                <div class="stage-left">
                    <img src="./img/图层 5 拷贝.png" alt="">
                    <div class="stage-left-info-wrap">
                        <img class="poster-bottom" src="./img/海报底部.png" alt="">
                        <div class="poster-letter">
                            <img src="./img/poster_ABC/${stage}.png" alt="">
                        </div>
                        <div class="stage-left-info">
                            <h4>${coursename}</h4>
                            <div class="teacher-wrap">${teacher}等</div>
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
            </div>
        `);
    }

    getCourseLeft = (item, num, video_num) => {
        $.ajax({
            url: "https://kaopeixia.com/webapi/courselist/getcourselistbyid",
            type: "GET",
            async: false,
            headers: {
                'Authorization': 'wechat'
            },
            data: {
                'id': item.id,
            },
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status == "200") {
                    getCourseRight(item, num, result.data);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.info("error.");
                if (xhr.status == 200) {
                    console.log(ajaxOptions);
                }
                else {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            }
        });
    }
    getCourseRight = (item, num, course_info) => {
        $.ajax({
            url: "https://kaopeixia.com/webapi/coursedetail/getcoursedetailbycourselistidp",
            type: "GET",
            headers: {
                'Authorization': 'wechat'
            },
            async: false,
            data: {
                'courselist_id': item.id,
            },
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status == "200") {
                    let obj = {
                        course_info,
                        course_video: result.data
                    }
                    courseData[num].course_line.course.push(obj);
                } else {
                    let obj = {
                        course_info,
                        course_video: []
                    }
                    courseData[num].course_line.course.push(obj);
                }
                // d2.resolve("Pizza");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.info("error.");
                if (xhr.status == 200) {
                    console.log(ajaxOptions);
                }
                else {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            }
        });
    }
    getAjax = (categoryType, clientPage, everyPage) => {
        $.ajax({
            url: "https://kaopeixia.com/webapi/course/getcoursebysearchv2",
            type: "GET",
            headers: {
                'Authorization': 'wechat'
            },
            data: {
                'category': categoryType,
                'clientPage': clientPage,
                'everyPage': everyPage
            },
            success: function (result) {
                if (result.status == "200") {
                    // debugger;
                    // console.log(categoryType, clientPage, everyPage)
                    $(posterType).text('');
                    courseData.length = 0;

                    result.data.map((item, index) => {
                        // console.log(result)
                        // var d1 = $.Deferred();
                        // var d2 = $.Deferred();

                        let reg = /[A-Z]/g;
                        let stage = item.courselistname.match(reg)[0];
                        let isHas = false;
                        let num = 0, video_num = 0;
                        for (let i = 0; i < courseData.length; i++) {
                            if (stage == courseData[i].stage) {
                                isHas = true;
                                num = i;
                                break;
                            }
                        }
                        if (!isHas) {
                            let obj = {
                                stage: '',
                                course_line: {
                                    course_left: {},
                                    course: []
                                }
                            };
                            obj.stage = stage;
                            obj.course_line.course_left = item;
                            courseData.push(obj);
                            num = courseData.length - 1;
                        }

                        video_num = courseData[num].course_line.course.length - 1;
                        getCourseLeft(item, num, video_num);
                        // getCourseRight(item,num, video_num);
                        // $.when(d1, d2).done(function (v1, v2) {
                        // });
                    })
                    $(posterType).append(`
                        <div class="language-poster-big">
                            <img src="./img/index图/${categoryType}.png" alt="">
                        </div>
                    `)
                    courseData.map((item, index) => {
                        // console.log(item);
                        const { stage, course_line } = item;
                        getCourseTop(stage, categoryType, course_line, );
                    })
                    num = Math.ceil(result.pager.sumpage / result.pager.everypage);
                    getPagination(num);
                    // console.log($(`${posterType} .page-btn`).eq(clientPage - 1));
                    $(`${posterType} .page-btn`).eq(clientPage - 1).css({
                        zIndex: "2",
                        color: "#23527c",
                        backgroundColor: "#eee",
                        borderColor: "#ddd",
                    })

                    if (clientPage == 1) {
                        $(".laquo").children().css('color', '#ddd');
                        $(".laquo").addClass("disabled");
                    } else {
                        $(".laquo").children().css('color', '#337ab7');
                        $(".laquo").removeClass("disabled");
                    }
                    if (clientPage == num) {
                        $(".raquo").children().css('color', '#ddd');
                        $(".raquo").addClass("disabled");
                    } else {
                        $(".raquo").children().css('color', '#337ab7');
                        $(".raquo").removeClass("disabled");
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.info("error.");
                if (xhr.status == 200) {

                    console.log(ajaxOptions);
                }
                else {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            }
        });
    }
    // getAjax(categoryType, 1,4)
    if (hash != "") {
        switch (hash) {
            case "托福":
                $(".language-list li").removeClass("active");
                $(".language-list li").eq(1).addClass("active");
                getAjax("托福", 1, 12);
                break;
            case "日语":
                $(".language-list li").removeClass("active");
                $(".language-list li").eq(2).addClass("active");
                getAjax("日语", 1, 12);
                break;
            case "韩语":
                $(".language-list li").removeClass("active");
                $(".language-list li").eq(3).addClass("active");
                getAjax("韩语", 1, 12);
                break;
            default:
                $(".language-list li").removeClass("active");
                $(".language-list li").eq(0).addClass("active");
                getAjax("雅思", 1, 12);
        }
    }
    
    function getPagination(num) {
        var divWrap = $('<div style="text-align:center"></div>');
        var ulPagi = $('<ul class="pagination"></ul>');
        var laquo = $('<li class="laquo"><span>&laquo;</span></li>');
        var raquo = $('<li class="raquo"><span>&raquo;</span></li>');

        var liList = ""
        for (var i = 1; i <= num; i++) {
            liList += `<li><span class="page-btn">${i}</span></li>`
        }
        ulPagi.append(laquo, liList, raquo);
        divWrap.append(ulPagi);
        $(posterType).append(divWrap);
    }

    $(document).on("click", ".laquo", function () {
        if (clientPage - 1 <= 0) {
            clientPage = clientPage;
        } else {
            clientPage = clientPage - 1;
        }

        getAjax(categoryType, clientPage, 12)

    })
    $(document).on("click", ".raquo", function () {
        if (clientPage + 1 >= num) {
            clientPage = clientPage;
        } else {
            clientPage = clientPage + 1;
        }
        getAjax(categoryType, clientPage, 12)

    })
    $(document).on("click", ".pagination>li .page-btn", function () {
        clientPage = $(this).text();
        getAjax(categoryType, clientPage, 12)
    })
    $(".language-list li").click(function () {
        $(".language-list li").removeClass("active");
        $(this).addClass("active");
        categoryType = $(".language-list .active span").text();
        window.location.hash = categoryType;
        var index = $(this).data("index");
        $(".test-poster").css('display', 'none');
        clientPage = 1;
        switch (index) {
            case 1:
                posterType = ".ielts-test-poster";
                $(".ielts-test-poster").css('display', 'block');
                break;
            case 2:
                posterType = ".toefl-test-poster";
                $(".toefl-test-poster").css('display', 'block');
                break;
            case 3:
                posterType = ".japan-test-poster";
                $(".japan-test-poster").css('display', 'block');
                break;
            case 12:
                posterType = ".korea-test-poster";
                $(".korea-test-poster").css('display', 'block');
                break;
        }
        getAjax(categoryType, 1, 12);
    })
})

