$(document).ready(function () {
	let uid = sessionStorage.getItem("uid");
	//https://kpx.oss-cn-beijing.aliyuncs.com/%E8%80%83%E5%9F%B9%E4%BE%A01zsfrM4TYrp.png
	var categoryType = $(".language-list .active span").text();
	var posterType = ".ielts-test-poster";
	var clientPage = 1;
	var num = 1;
	var courseData = [];
	$(document).on("click", ".video-btn", function () {
		let videoid = 0;
		let url =
			"./videoDetail.html?videoid=" +
			this.dataset.videoid +
			"&courseid=" +
			this.dataset.parentid +
			"&coursename=" +
			encodeURI(this.dataset.coursename) +
			"&teacher=" +
			encodeURI(this.dataset.teacher) + "&type=" + categoryType + "&from=我的课程";
		window.location.href = url;
	});
	getCourseTop = course => {
		const { coursename, course_info = [] } = course;
		let str = "";
		course_info.map(course_info => {
			const { teacher, id, courselistname, course_video = [] } = course_info;
			let courseType = courselistname.substring(courselistname.length - 2);
			let videoLen = course_video.length;
			let videoBtn = "";
			let videoId = 0;

			for (let i = 0; i < videoLen; i++) {
				if (i > 6) {
					videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid="all" class="video-btn">全部</div>`;
					break;
				}
				videoId = course_video[i].id;
				if (i == 0) {
					videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid=${videoId} class="video-btn active">1</div>`;
				} else if (i == videoLen - 1) {
					videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid="all" class="video-btn">全部</div>`;
				} else {
					videoBtn += `<div data-coursename=${coursename} data-teacher=${teacher} data-parentid=${id} data-videoid=${videoId} class="video-btn">${i +
						1}</div>`;
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

            `;
		});

		$(posterType).append(`
            <div>
                <div class="stage-card-list">${str}</div>
            </div>
        `);
	};

	getCourseLeft = (item, index) => {
		//, num, video_num
		$.ajax({
			url: "https://kaopeixia.com/webapi/courselist/getcourselistbycourseidx",
			type: "GET",
			async: false,
			data: {
				course_id: item.id
			},
			dataType: "json",
			xhrFields: { withCredentials: true },
			success: function (result) {
				if (result.status == "200") {
					courseData[index].course_info = [];
					courseData[index].course_info = result.data;
					// console.log("getCourseLeft", courseData)
					result.data.map((item1, index1) => {
						getCourseRight(item1, index, index1);
					});
					//     getCourseRight(item,num,result.data);
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.info("error.");
				if (xhr.status == 200) {
					alert(ajaxOptions);
				} else {
					alert(xhr.status);
					alert(thrownError);
				}
			}
		});
	};
	getCourseRight = (item, index, index1) => {
		//,num, course_info
		$.ajax({
			url:
				"https://kaopeixia.com/webapi/coursedetail/getcoursedetailbycourselistid",
			type: "GET",
			async: false,
			data: {
				user_id: uid,
				courselist_id: item.id
			},
			dataType: "json",
			xhrFields: { withCredentials: true },
			success: function (result) {
				courseData[index].course_info[index1].course_video = [];
				// console.log("getCourseRight", courseData);
				if (result.status == "200") {
					courseData[index].course_info[index1].course_video = result.data;
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.info("error.");
				if (xhr.status == 200) {
					alert(ajaxOptions);
				} else {
					alert(xhr.status);
					alert(thrownError);
				}
			}
		});
	};
	getAjax = (categoryType, clientPage, everyPage) => {
		$.ajax({
			url: "https://kaopeixia.com/webapi/usercourse/getusercoursebyuserid",
			type: "GET",
			headers: {
				Authorization: "wechat"
			},
			data: {
				user_id: uid,
				category: categoryType,
				clientPage: clientPage,
				everyPage: everyPage
			},
			success: function (result) {
				if (result.status == "200") {
					$(posterType).text("");
					courseData.length = 0;
					filterObj = objcArray => {
						for (var i = 0; i < objcArray.length; i++) {
							for (var j = i + 1; j < objcArray.length;) {
								if (objcArray[i].id == objcArray[j].id) {
									//通过id属性进行匹配；
									objcArray.splice(j, 1); //去除重复的对象；
								} else {
									j++;
								}
							}
						}
						return objcArray;
					};
					courseData = filterObj(result.data);
					result.data.map((item, index) => {
						getCourseLeft(item, index);
					});
					courseData.map((item, index) => {
						// console.log(item)
						getCourseTop(item);
					});
					num = Math.ceil(result.pager.sumpage / result.pager.everypage);
					getPagination(num);
					console.log($(`${posterType} .page-btn`).eq(clientPage - 1));
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
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.info("error.");
				if (xhr.status == 200) {
					alert(ajaxOptions);
				} else {
					alert(xhr.status);
					alert(thrownError);
				}
			}
		});
	};
	getAjax(categoryType, 1, 100);
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

	$(document).on("click", ".laquo", function () {
		if (clientPage - 1 <= 0) {
			clientPage = clientPage;
		} else {
			clientPage = clientPage - 1;
		}

		getAjax(categoryType, clientPage, 4);
	});
	$(document).on("click", ".raquo", function () {
		if (clientPage + 1 >= num) {
			clientPage = clientPage;
		} else {
			clientPage = clientPage + 1;
		}
		getAjax(categoryType, clientPage, 4);
	});
	$(document).on("click", ".pagination>li .page-btn", function () {
		clientPage = $(this).text();
		getAjax(categoryType, clientPage, 4);
	});
	$(".language-list li").click(function () {
		$(posterType).text("");
		$(".language-list li").removeClass("active");
		$(this).addClass("active");
		categoryType = $(".language-list .active span").text();
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
		getAjax(categoryType, 1, 100);
	});
});
