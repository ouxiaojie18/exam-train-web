$(document).ready(function () {
    let testname = "",
        uid = sessionStorage.getItem("uid"),
        type = "",
        from = "",
        errorid = "",
        errorDate = [],
        answers = [];
    _getId = () => {
        var query = decodeURI(window.location.search.substring(1));
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == "errorid") {
                errorid = pair[1];
            }
            if (pair[0] == "testname") {
                testname = pair[1];
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
        $(".language-test-page").text(testname);
        $(".testComponent p").text(testname);
        return;
    };
    $(".language-type-page").click(function () {
        if (from == "语言测评") {
            window.location.href = "./languagetest.html#" + type;
        } else if (from == "我的测试") {
            window.location.href = "./mytests.html#" + type;
        }

    })
    test = (testOption, index) => {
        const { title, option1, option2, option3, option4, answer } = testOption;
        let num = 0
        num = index + 1;
        let optionArray = [];
        let optionStr = "";
        optionArray.push(option1, option2, option3, option4);
        optionArray = optionArray.filter(optionItem => optionItem != "");

            optionArray.map((optionItem, index1) => {
                
                let imgBtn = "";
                let letter = optionItem.substring(0, 1);
                imgBtn = `<img style="float:left;" src="./img/${letter}.png" alt="">`;
                optionItem = optionItem.substring(2).replace(/^\s*|\s*$/g, "");
                if (index1 == answer) {
                    imgBtn = `<img style="float:left;"  src="./img/对.png" alt="">`;
                }
                if (index1 == answers[index]) {
                    if (answers[index] != answer) {
                        imgBtn = `<img style="float:left;" src="./img/错.png" alt="">`;
                    }
                }

                optionStr += `
            <div data-option=${index1} class="test-anwsers">
                ${imgBtn}
                <div style="margin-left:31px;">${optionItem}</div>
            </div>
        `;
            });

        let str = "";
        str = `
        <div>
            <div data-num=${num} class="test-question">${title}</div>
            ${optionStr}
        </div>
    `;
        $(".test-con").append(str);
    };
    function getAjax(category, clientPage, everyPage) {
        let errorData={
            user_id: uid,
            id:errorid,
        }
        setAjax("https://kaopeixia.com/webapi/examinationrecord/geterrorexam", "GET", errorData, function (result) {
            if (result.status == "200") {
                errorDate = result.data;
                answers=result.answers;
                errorDate.map((testOption, index) => {
                    test(testOption, index);
                });
            }
        })
    }
    _getId();
    getAjax();
});
