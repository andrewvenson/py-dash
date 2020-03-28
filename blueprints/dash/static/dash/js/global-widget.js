$('.search').click(function(){
    if($('.titles').css('display')=='none'){
        $('.titles').css('display', 'block');
        $('.search-inp').css('display', 'none');
    }else{
        $('.titles').css('display', 'none');
        $('.search-inp').css('display', 'block');
    }
});

$('.minimize').click(function(){
    $('.sd-hgt-xtnd').css('display', 'none');
    $('.shrunkdv').css('display', 'block');
});

$('.maximize').click(function(){
    $('.shrunkdv').css('display', 'none');
    $('.sd-hgt-xtnd').css('display', 'block');
});
