// $(document).ready(function() {
//提示框
var prompt = function (message, style, time) {
    style = style === undefined ? "alert-success" : style;
    time = time === undefined ? 1200 : time;
    $("<div>")
        .appendTo("body")
        .addClass("alert " + style)
        .html(message)
        .show()
        .delay(time)
        .fadeOut();
};

// 成功提示
var success_prompt = function (message, time) {
    prompt(message, "alert-success", time);
};

// 失败提示
var fail_prompt = function (message, time) {
    prompt(message, "alert-danger", time);
};

// 提醒
var warning_prompt = function (message, time) {
    prompt(message, "alert-warning", time);
};

// 信息提示
var info_prompt = function (message, time) {
    prompt(message, "alert-info", time);
};
// fail_prompt("请完善收货信息", 1500);
// });

format = (time, format) => {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? "0" : "") + i;
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case "yyyy":
                return tf(t.getFullYear());
                break;
            case "MM":
                return tf(t.getMonth() + 1);
                break;
            case "mm":
                return tf(t.getMinutes());
                break;
            case "dd":
                return tf(t.getDate());
                break;
            case "HH":
                return tf(t.getHours());
                break;
            case "ss":
                return tf(t.getSeconds());
                break;
        }
    });
}
