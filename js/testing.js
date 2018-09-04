$(document).ready(function(){
    $(".test-anwsers img").click(function () {
        $(this).parent(".test-anwsers").siblings(".test-anwsers").children(".choose").css('display', 'none');
        $(this).parent(".test-anwsers").siblings(".test-anwsers").children(".no-choose").css('display', 'block');
        $(this).css('display', 'none');
        $(this).next().css('display', 'block');
    
    })
})
