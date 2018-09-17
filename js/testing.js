$(document).ready(function() {
  let testname = "",
    testid = "",
    testLen = 0,
    doneNum = 49,
    // "1":"3",
    myobj = {
      // "1":"3",
      "2": "2",
      "3": "0",
      "4": "0",
      "5": "3",
      "6": "1",
      "7": "1",
      "8": "0",
      "9": "0",
      "10": "2",
      "11": "1",
      "12": "0",
      "13": "2",
      "14": "0",
      "15": "3",
      "16": "2",
      "17": "1",
      "18": "0",
      "19": "2",
      "20": "0",
      "21": "0",
      "22": "0",
      "23": "1",
      "24": "2",
      "25": "1",
      "26": "1",
      "27": "2",
      "28": "2",
      "29": "0",
      "30": "1",
      "31": "2",
      "32": "0",
      "33": "0",
      "34": "1",
      "35": "0",
      "36": "1",
      "37": "1",
      "38": "1",
      "39": "2",
      "40": "2",
      "41": "0",
      "42": "0",
      "43": "1",
      "44": "2",
      "45": "1",
      "46": "1",
      "47": "1",
      "48": "0",
      "49": "2",
      "50": "1"
    },
    
      // 
    // myobj={},
    testDate = [],
    score = 0,
    oneScore = 0,
    timeout = false,
    answers = [],
    uid = sessionStorage.getItem("uid"),
    store_id=0;
  let getDate = new Date();
  let examinationdate = format(getDate, "yyyy-MM-dd HH:mm:ss");
  // let str="A．National Forget About It Week should be held to stop awareness weeks.";
  // let str2="A. called over"
  // // console.log(str.substring(str.indexOf(".") + 1).replace(/^\s*|\s*$/g, ""))
  // console.log(str2.substring(2));
  _getId = () => {
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == "testid") {
        testid = pair[1];
      }
      if (pair[0] == "testname") {
        testname = pair[1];
      }
    }
    $(".lamp span").text(testname);
    $(".testComponent p").text(testname);
    return;
  };
  test = testOption => {
    const { title, option1, option2, option3, option4, answer } = testOption;
    let num = title.substring(0, title.indexOf("."));
    let optionArray = [];
    let optionStr = "";
    optionArray.push(option1, option2, option3, option4);
    optionArray = optionArray.filter(optionItem => optionItem != "");

    if (doneNum >= testLen || timeout) {
      // if(myobj[num]==answer){
      //     imgBtn=`<img style="float:left;" class="choose" src="./img/选中.png" alt="">`
      // }
      optionArray.map((optionItem, index) => {
        let imgBtn = "";
        let letter = optionItem.substring(0, 1);
        imgBtn = `<img style="float:left;" src="./img/${letter}.png" alt="">`;
        optionItem = optionItem.substring(2).replace(/^\s*|\s*$/g, "");
        if (index == answer) {
          imgBtn = `<img style="float:left;"  src="./img/对.png" alt="">`;
        }
        console.log(index, myobj[num], answer);
        if (index == myobj[num]) {
          if (myobj[num] != answer) {
            imgBtn = `<img style="float:left;" src="./img/错.png" alt="">`;
          }
        }

        optionStr += `
            <div data-option=${index} class="test-anwsers">
                ${imgBtn}
                <div style="margin-left:31px;">${optionItem}</div>
            </div>
        `;
      });
    } else {
      optionArray.map((optionItem, index) => {
        let letter = optionItem.substring(0, 1);

        //     optionItem=optionItem
        //   .substring(optionItem.indexOf(".") + 1)
        //   .replace(/^\s*|\s*$/g, "");
        optionItem = optionItem.substring(2).replace(/^\s*|\s*$/g, "");
        //   console.log(optionItem);
        optionStr += `
            <div data-option=${index} class="test-anwsers test-ing">
                <img style="float:left;" class="no-choose" src="./img/${letter}.png" alt="">
                <img style="float:left;" class="choose" src="./img/选中.png" alt="">
                <div style="margin-left:31px;">${optionItem}</div>
            </div>
      `;
      });
    }

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
    $.ajax({
      url:
        "https://kaopeixia.com/webapi/choicequestion/getchoicequestionbyexaminationid",
      type: "GET",
      data: {
        examination_id: testid
      },
      dataType: "json",
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "200") {
          testDate = result.data;
          testLen = testDate.length;
          answers.length=testLen;
          oneScore = 100 / testLen;
          $(".testNum").text(testLen);
          $(".done").text(0);
          testDate.map((testOption, index) => {
            console.log(testOption);
            test(testOption);
          });
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
  }
  _getId();
  getAjax();
  $(document).on("click", ".test-ing img", function() {
    let option = $(this).parent(".test-anwsers")[0].dataset.option;
    // console.log($(this).parent(".test-anwsers"));
    let testnum = $(this)
      .parent(".test-anwsers")
      .siblings(".test-question")[0].dataset.num;
    console.log(testnum);
    if (!myobj[testnum]) {
      doneNum++;
      $(".done").text(doneNum);
    }
    myobj[testnum] = option;
    console.log(myobj, doneNum);
    //   console.log()
    if (decodeURI(this.src.substring(this.src.indexOf("img/") + 4)) == "选中.png")
      return;
    $(this)
      .parent(".test-anwsers")
      .siblings(".test-anwsers")
      .children(".choose")
      .css("display", "none");
    $(this)
      .parent(".test-anwsers")
      .siblings(".test-anwsers")
      .children(".no-choose")
      .css("display", "inline-block");
    $(this).css("display", "none");
    $(this)
      .next()
      .css("display", "inline-block");
  });

  // 倒计时
  var timer = null;
  var t = 0;
  // Math.round(new Date().getTime()/1000);
  function getCountDown(timestamp) {
    timer = setInterval(function() {
      var nowTime = new Date();
      var endTime = new Date(timestamp);

      t = endTime.getTime() - nowTime.getTime();
      //            var d=Math.floor(t/1000/60/60/24);
      var hour = Math.floor((t / 1000 / 60 / 60) % 24);
      var min = Math.floor((t / 1000 / 60) % 60);
      var sec = Math.floor((t / 1000) % 60);
      //   (hour = 0), (min = 0), (sec = 0);
      if (hour == 0 && min == 0 && sec == 0) {
        timeout = true;
        $(".submit-btn").click();
        clearInterval(timer);
        //   $(".btn12").click();
      }
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
  document.addEventListener(
    "visibilitychange",
    function() {
      if (document.visibilityState == "hidden") {
        clearInterval(timer);
      } else {
        if (timeout) {
          clearInterval(timer);
        } else {
          getCountDown(new Date().getTime() + t);
        }
      }
    },
    false
  );

  // 弹出框
  $(".submit-btn").click(function() {
    if (timeout) {
      $(".btn11").css("display", "none");
      $(".btn12")
        .text("我知道了")
        .addClass("btn-primary");
      $(".modal-body").text("答题时间已经到了，系统将自动提交");
      return;
    }
    if (doneNum < testLen) {
      $(".btn12").css("display", "none");
      $(".btn11")
        .text("确定")
        .addClass("btn-primary");
      $(".modal-body").text("你还未答完题，不能提交！");
    } else {
      $(".btn12")
        .css("display", "inline-block")
        .text("确定")
        .addClass("btn-primary");
      $(".btn11")
        .text("取消")
        .removeClass("btn-primary")
        .addClass("btn-default");
      $(".modal-body").text("你确定要提交吗！");
    }
    // $(".modal-part").css("display", "block");
  });
  $(".btn12").click(function() {
    //   testDate.map((testItem)=>{
    //       test(testOption);
    //   })
    for (var i = 1; i <= testLen; i++) {
      if (myobj[i]) {
        answers[i-1]=Number(myobj[i]);
      } else {
        answers[i-1]="";
      }

      if (myobj[i] == testDate[i - 1].answer) {
        score += oneScore;
      }
    }
    console.log(answers)
    $(".btn11").click();
    $(".score-num").text(score);
    $(".modal-part").css("display", "block");
        $.ajax({
      url:
        "https://kaopeixia.com/webapi/examinationrecord/createexaminationrecord",
      type: "POST",
      data: {
        examination_id: testid,
        user_id: uid,
        examinationdate: examinationdate,
        answers: answers
      },
      dataType: "json",
      traditional: true,
      xhrFields: { withCredentials: true },
      success: function(result) {
        if (result.status == "201") {
          store_id=result.id;
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
  $(".modal-wrap").click(function() {
    $(".modal-part").css("display", "none");
  });
  $(".study-btn").click(function() {
    window.location.href = "./languagetest.html";
    $(".modal-part").css("display", "none");
  });
  $(".check-btn").click(function() {
    $(".modal-part").css("display", "none");
    $(".test-con").text("");
    $(".test-right").text("");
              testDate.map((testOption, index) => {
              console.log(testOption);
              test(testOption);
            });
  })
  //   $.ajax({
  //     url:
  //       "https://kaopeixia.com/webapi/examinationrecord/geterrorexam",
  //     type: "GET",
  //     data: {
  //       user_id: uid,
  //       id:store_id,
  //     },
  //     dataType: "json",
  //     traditional: true,
  //     xhrFields: { withCredentials: true },
  //     success: function(result) {
  //       console.log(result);
  //       // if (result.status == "200") {
  //       //   console.log(result);
  //       // }
  //     },
  //     error: function(xhr, ajaxOptions, thrownError) {
  //       console.info("error.");
  //       if (xhr.status == 200) {
  //         console.log(ajaxOptions);
  //       } else {
  //         console.log(xhr.status);
  //         console.log(thrownError);
  //       }
  //     }
  //   });
  // });
});
