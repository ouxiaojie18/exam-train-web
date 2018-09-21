// $(document).ready(function () {
//     var categoryType = $(".language-list .active span").text();
//     var posterType = ".ielts-test-poster";
//     var clientPage = 1;
//     var num = 1;
//     let uid = sessionStorage.getItem('uid');
//     var hash;
//     hash = window.location.hash ? decodeURI(window.location.hash).substring(1) : "雅思";
//     if (hash != "") {
//         switch (hash) {
//             case "托福":
//                 $(".language-list li").removeClass("active");
//                 $(".language-list li").eq(1).addClass("active");

//                 getAjax("托福", 1, 12);
//                 break;
//             case "日语":
//                 $(".language-list li").removeClass("active");
//                 $(".language-list li").eq(2).addClass("active");
//                 getAjax("日语", 1, 12);
//                 break;
//             case "韩语":
//                 $(".language-list li").removeClass("active");
//                 $(".language-list li").eq(3).addClass("active");
//                 getAjax("韩语", 1, 12);
//                 break;
//             default:
//                 $(".language-list li").removeClass("active");
//                 $(".language-list li").eq(0).addClass("active");
//                 getAjax("雅思", 1, 12);
//         }
//     }
    
    
//     function getDocCard(name, time, id) {
//         $(posterType).append(`
//             <div class="video-card test-card">
//                 <div class="test-card-left">
//                     <div class="test-card-title">${name}</div>
//                     <p>满 分：100分</p>
//                     <p>测试时长：${time}分钟</p>
//                     <div data-errorid=${id} data-testname=${name} class="start-test">查看错题</div>
//                 </div>
//                 <img src="./img/测试.png" alt="">
//             </div>
//             `);
//     }

//     function getPagination(num) {
//         var divWrap = $('<div style="text-align:center"></div>');
//         var ulPagi = $('<ul class="pagination"></ul>');
//         var laquo = $('<li class="laquo"><span>&laquo;</span></li>');
//         var raquo = $('<li class="raquo"><span>&raquo;</span></li>');

//         var liList = "";
//         for (var i = 1; i <= num; i++) {
//             liList += `<li><span class="page-btn">${i}</span></li>`;
//         }
//         ulPagi.append(laquo, liList, raquo);
//         divWrap.append(ulPagi);
//         $(posterType).append(divWrap);
//     }
//     function getAjax(category, clientPage, everyPage) {
//         let myTestData = {
//             user_id: uid,
//             category: category,
//             clientPage: clientPage,
//             everyPage: everyPage
//         }
//         setAjax("https://kaopeixia.com/webapi/examinationrecord/getexaminationrecordbyuseridx", "GET", myTestData, function (result) {
//             if (result.status == "200") {
//                 $(posterType).text("");
//                 var data = result.data;
//                 data.map((item, index) => {
//                     const { name, time, id } = item;
//                     getDocCard(name, time, id);
//                 });
//                 num = Math.ceil(result.pager.sumpage / result.pager.everypage);
//                 getPagination(num);
//                 $(`${posterType} .page-btn`)
//                     .eq(clientPage - 1)
//                     .css({
//                         zIndex: "2",
//                         color: "#23527c",
//                         backgroundColor: "#eee",
//                         borderColor: "#ddd"
//                     });

//                 if (clientPage == 1) {
//                     $(".laquo")
//                         .children()
//                         .css("color", "#ddd");
//                     $(".laquo").addClass("disabled");
//                 } else {
//                     $(".laquo")
//                         .children()
//                         .css("color", "#337ab7");
//                     $(".laquo").removeClass("disabled");
//                 }
//                 if (clientPage == num) {
//                     $(".raquo")
//                         .children()
//                         .css("color", "#ddd");
//                     $(".raquo").addClass("disabled");
//                 } else {
//                     $(".raquo")
//                         .children()
//                         .css("color", "#337ab7");
//                     $(".raquo").removeClass("disabled");
//                 }
//             }
//         })
//     }
//     $(document).on("click", ".start-test", function () {
//         let url = "./errortest.html?errorid=" + this.dataset.errorid + "&testname=" + this.dataset.testname + "&type=" + categoryType + "&from=我的测试";
//         window.location.href = url;
//     });
//     $(document).on("click", ".laquo", function () {
//         if (clientPage - 1 <= 0) {
//             clientPage = clientPage;
//         } else {
//             clientPage = clientPage - 1;
//         }

//         getAjax(categoryType, clientPage, 12);
//     });
//     $(document).on("click", ".raquo", function () {
//         if (clientPage + 1 >= num) {
//             clientPage = clientPage;
//         } else {
//             clientPage = clientPage + 1;
//         }
//         getAjax(categoryType, clientPage, 12);
//     });
//     $(document).on("click", ".pagination>li .page-btn", function () {
//         clientPage = $(this).text();
//         getAjax(categoryType, clientPage, 12);
//     });
//     $(".language-list li").click(function () {
//         $(".language-list li").removeClass("active");
//         $(this).addClass("active");
//         categoryType = $(".language-list .active span").text();
//         window.location.hash = categoryType;
//         var index = $(this).data("index");
//         $(".test-poster").css("display", "none");
//         clientPage = 1;
//         switch (index) {
//             case 1:
//                 posterType = ".ielts-test-poster";
//                 $(".ielts-test-poster").css("display", "block");
//                 break;
//             case 2:
//                 posterType = ".toefl-test-poster";
//                 $(".toefl-test-poster").css("display", "block");
//                 break;
//             case 3:
//                 posterType = ".japan-test-poster";
//                 $(".japan-test-poster").css("display", "block");
//                 break;
//             case 4:
//                 posterType = ".korea-test-poster";
//                 $(".korea-test-poster").css("display", "block");
//                 break;
//         }
//         getAjax(categoryType, 1, 12);
//     });
// });
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('$(y).1N(c(){8 l=$(".b-a .9 k").A();8 g=".Z-7-f";8 5=1;8 t=1;U 13=1q.1v(\'13\');8 r;r=Q.M.r?1w(Q.M.r).1u(1):"1j";w(r!=""){1e(r){o"1d":$(".b-a 6").u("9");$(".b-a 6").C(1).s("9");h("1d",1,12);q;o"1k":$(".b-a 6").u("9");$(".b-a 6").C(2).s("9");h("1k",1,12);q;o"1l":$(".b-a 6").u("9");$(".b-a 6").C(3).s("9");h("1l",1,12);q;1I:$(".b-a 6").u("9");$(".b-a 6").C(0).s("9");h("1j",1,12)}}c 16(F,J,G){$(g).L(`<d j="1L-N 7-N"><d j="7-N-1J"><d j="7-N-1z">${F}</d><p>1F 1C：1D</p><p>1E：${J}1B</p><d v-T=${G}v-S=${F}j="1n-7">1y</d></d><1a 1A="./1a/1K.1G"1H=""></d>`)}c 17(t){8 W=$(\'<d 1x="A-1r:1s"></d>\');8 Y=$(\'<1c j="1i"></1c>\');8 n=$(\'<6 j="n"><k>«</k></6>\');8 m=$(\'<6 j="m"><k>»</k></6>\');8 10="";1t(8 i=1;i<=t;i++){10+=`<6><k j="14-X">${i}</k></6>`}Y.L(n,10,m);W.L(Y);$(g).L(W)}c h(11,5,15){U 18={26:13,11:11,5:5,15:15}27("28://25.22/23/24/2d","2f",18,c(x){w(x.2e=="2a"){$(g).A("");8 v=x.v;v.29((19,P)=>{2c{F,J,G}=19;16(F,J,G)});t=2b.21(x.1b.1Q/x.1b.1R);17(t);$(`${g}.14-X`).C(5-1).e({1P:"2",B:"#1M",1S:"#1O",1T:"#V"});w(5==1){$(".n").K().e("B","#V");$(".n").s("R")}I{$(".n").K().e("B","#1o");$(".n").u("R")}w(5==t){$(".m").K().e("B","#V");$(".m").s("R")}I{$(".m").K().e("B","#1o");$(".m").u("R")}}})}$(y).H("z",".1n-7",c(){U 1h="./1Y.1Z?T="+D.1f.T+"&S="+D.1f.S+"&20="+l+"&1X=1U";Q.M.1V=1h});$(y).H("z",".n",c(){w(5-1<=0){5=5}I{5=5-1}h(l,5,12)});$(y).H("z",".m",c(){w(5+1>=t){5=5}I{5=5+1}h(l,5,12)});$(y).H("z",".1i>6 .14-X",c(){5=$(D).A();h(l,5,12)});$(".b-a 6").z(c(){$(".b-a 6").u("9");$(D).s("9");l=$(".b-a .9 k").A();Q.M.r=l;8 P=$(D).v("P");$(".7-f").e("E","1W");5=1;1e(P){o 1:g=".Z-7-f";$(".Z-7-f").e("E","O");q;o 2:g=".1g-7-f";$(".1g-7-f").e("E","O");q;o 3:g=".1p-7-f";$(".1p-7-f").e("E","O");q;o 4:g=".1m-7-f";$(".1m-7-f").e("E","O");q}h(l,1,12)})});',62,140,'|||||clientPage|li|test|var|active|list|language|function|div|css|poster|posterType|getAjax||class|span|categoryType|raquo|laquo|case||break|hash|addClass|num|removeClass|data|if|result|document|click|text|color|eq|this|display|name|id|on|else|time|children|append|location|card|block|index|window|disabled|testname|errorid|let|ddd|divWrap|btn|ulPagi|ielts|liList|category||uid|page|everyPage|getDocCard|getPagination|myTestData|item|img|pager|ul|托福|switch|dataset|toefl|url|pagination|雅思|日语|韩语|korea|start|337ab7|japan|sessionStorage|align|center|for|substring|getItem|decodeURI|style|查看错题|title|src|分钟|分|100分|测试时长|满|png|alt|default|left|测试|video|23527c|ready|eee|zIndex|sumpage|everypage|backgroundColor|borderColor|我的测试|href|none|from|errortest|html|type|ceil|com|webapi|examinationrecord|kaopeixia|user_id|setAjax|https|map|200|Math|const|getexaminationrecordbyuseridx|status|GET'.split('|'),0,{}))
