$('.search').click(function(){
    if($('.titles').css('display')=='none'){
        $('.titles').css('display', 'block');
        $('.search-inp').css('display', 'none');
    }else{
        $('.titles').css('display', 'none');
        $('.search-inp').css('display', 'block');

    }
})