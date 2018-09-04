$(document).ready(function(){
    $(".language-list li").click(function(){
        $(".language-list li").removeClass("active");
        $(this).addClass("active");
        var index=$(this).data("index");
        $(".language-poster-big img").css('display','none');
        var str = ".language-poster-big img:nth-child("+index+")";
        $(str).css('display','block');
    })
})