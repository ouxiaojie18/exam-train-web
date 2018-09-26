/* jshint esversion: 6 */
$(document).ready(function () {
	let uid = sessionStorage.getItem("uid"),
		categoryType = $(".language-list .active span").text(),
		posterType = ".ielts-test-poster",
		clientPage = 1,
		everyPage = 12,
		num = 1,
		courseData = [];
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
		course_info.map((course_info) => {
			const { teacher, id, courselistname, course_video = [] } = course_info;
			let courseType = courselistname.substring(courselistname.length - 2);
			let videoLen = course_video.length;
			let videoBtn = "";
			let videoId = 0;
			if (videoLen == 0) {
				videoBtn = "课程即将上线，敬请期待！"
			} else {
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
					result.data.map((item1, index1) => {
						getCourseRight(item1, index, index1);
					});
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
									objcArray.splice(j, 1);
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
						getCourseTop(item);
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
							function (event) {
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
							function (event) {
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
							function (event) {
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
							function (event) {
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
	getAjax(categoryType, 1, everyPage);
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
		getAjax(categoryType, 1, everyPage);
	});
});
