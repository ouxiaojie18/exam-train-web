$(document).ready(function () {
    $(".test-anwsers img").click(function () {
        $(this).parent(".test-anwsers").siblings(".test-anwsers").children(".choose").css('display', 'none');
        $(this).parent(".test-anwsers").siblings(".test-anwsers").children(".no-choose").css('display', 'inline-block');
        $(this).css('display', 'none');
        $(this).next().css('display', 'inline-block');

    })

    // 倒计时
    var timer = null;
    var t = 0;
    // Math.round(new Date().getTime()/1000);
    function getCountDown(timestamp) {

        timer = setInterval(function () {
            var nowTime = new Date();
            var endTime = new Date(timestamp);

            t = endTime.getTime() - nowTime.getTime();
            //            var d=Math.floor(t/1000/60/60/24);
            var hour = Math.floor(t / 1000 / 60 / 60 % 24);
            var min = Math.floor(t / 1000 / 60 % 60);
            var sec = Math.floor(t / 1000 % 60);

            if (hour < 10) {
                hour = "0" + hour;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            var countDownTime = hour + ":" + min + ":" + sec;
            $("#has-time").html(countDownTime);

        }, 1000);
    }

    //调用函数：
    getCountDown(new Date().getTime() + 1000 * 60 * 60 * 2);
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState == 'hidden') {
            console.log('hidden');
            clearInterval(timer);
        } else {
            console.log('show');
            getCountDown(new Date().getTime() + t);
        }
    }, false);

    // 弹出框
    $(".submit-btn").click(function () {
        $(".modal-part").css('display', 'block');
    })
    $(".modal-wrap").click(function () {
        $(".modal-part").css('display', 'none');
    })
    $(".study-btn").click(function () {
        $(".modal-part").css('display', 'none');
    })
    $(".check-btn").click(function () {
        $(".modal-part").css('display', 'none');
    })
})
