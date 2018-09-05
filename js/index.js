// $(document).ready(function(){
//     $(".language-list li").click(function(){
//         $(".language-list li").removeClass("active");
//         $(this).addClass("active");
//         var index=$(this).data("index");
//         $(".language-poster-big img").css('display','none');
//         var str = ".language-poster-big img:nth-child("+index+")";
//         $(str).css('display','block');
//     })
// })
$(document).ready(function () {
    $(".language-list li").click(function () {
        $(".language-list li").removeClass("active");
        $(this).addClass("active");
        var index = $(this).data("index");
        $(".test-poster").css('display', 'none');
        switch (index) {
            case 1:
                $(".ielts-test-poster").css('display', 'block');
                break;
            case 2:
                $(".toefl-test-poster").css('display', 'block');
                break;
            case 3:
                $(".japan-test-poster").css('display', 'block');
                break;
            case 4:
                $(".korea-test-poster").css('display', 'block');
                break;
        }
    })
})