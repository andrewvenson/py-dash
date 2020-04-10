$('.global-btn').click(function(){
    $('.global-numbers-shrunk-div').css('display', 'block');
    $('.close-global').css("display", "block");
    $(this).css('display', 'none')
});

$('.close-global').click(function(){
    $('.global-btn').css("display", "block");
    $(this).css('display', 'none')
    $('.global-numbers-shrunk-div').css('display', 'none');
});