$(document).ready(function () {

    var categoryType = $(".language-list .active span").text();
    var posterType=".ielts-test-poster";
    var clientPage=1;

    var num=1;
    function getDocCard(name, time) {
        // var name = fileaddress.replace(/.*(\/|\\)/, "");
        // var fileExt = (/[.]/.exec(name)) ? /[^.]+$/.exec(name.toLowerCase()) : '';
        $(posterType).append(`
            <div class="video-card test-card">
                <div class="test-card-left">
                    <div class="test-card-title">${name}</div>
                    <p>满 分：100分</p>
                    <p>测试时长：${time}分钟</p>
                    <div class="start-test">开始考试</div>
                </div>
                <img src="./img/测试.png" alt="">
            </div>
            `);
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
    // console.log(sessionStorage.getItem('uid'));
    function getAjax(category, clientPage, everyPage) {
        $.ajax({
            url: "https://kaopeixia.com/webapi/document/getexaminationbysearch",
            type: "POST",
            data: {
                'category': category,
                'clientPage': clientPage,
                'everyPage': everyPage
            },
            dataType: "json",
            xhrFields: { withCredentials: true },
            success: function (result) {
                if (result.status == "200") {
                    console.info(result);
                    $(posterType).text('');
                    var data = result.data;
                    data.map((item, index) => {
                        const { name, time} = item;
                        getDocCard(name, time);
                    })
                    num=Math.ceil(result.pager.sumpage / result.pager.everypage);
                    getPagination(num);
                    console.log($(`${posterType} .page-btn`).eq(clientPage-1));
                    $(`${posterType} .page-btn`).eq(clientPage-1).css({
                        zIndex: "2",
                        color:"#23527c",
                        backgroundColor:"#eee",
                        borderColor: "#ddd",
                    })
                    
                    if(clientPage==1){
                        $(".laquo").children().css('color','#ddd');
                        $(".laquo").addClass("disabled");
                    }else{
                        $(".laquo").children().css('color','#337ab7');
                        $(".laquo").removeClass("disabled");
                    }
                    if(clientPage==num){
                        $(".raquo").children().css('color','#ddd');
                        $(".raquo").addClass("disabled");
                    }else{
                        $(".raquo").children().css('color','#337ab7');
                        $(".raquo").removeClass("disabled");
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //On error do this
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
    getAjax(categoryType, 1, 12);
    $(document).on("click", ".laquo", function () {
        if(clientPage-1<=0){
            clientPage=clientPage;
        }else{
            clientPage=clientPage-1;
        }
        
        getAjax(categoryType, clientPage, 12)

    })
        $(document).on("click", ".raquo", function () {
        if(clientPage+1>=num){
            clientPage=clientPage;
        }else{
            clientPage=clientPage+1;
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
        var index = $(this).data("index");
        $(".test-poster").css('display', 'none');
        clientPage=1;
        switch (index) {
            case 1:
                posterType=".ielts-test-poster";
                $(".ielts-test-poster").css('display', 'block');
                break;
            case 2:
                posterType=".toefl-test-poster";
                $(".toefl-test-poster").css('display', 'block');
                break;
            case 3:
                posterType=".japan-test-poster";
                $(".japan-test-poster").css('display', 'block');
                break;
            case 4:
                posterType=".korea-test-poster";
                $(".korea-test-poster").css('display', 'block');
                break;
        }
        getAjax(categoryType, 1, 12);
    })
})