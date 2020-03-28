$('.search').click(function(){
    if($('.titles').css('display')=='none'){
        $('.titles').css('display', 'block');
        $('.search-inp').css('display', 'none');
    }else{
        $('.titles').css('display', 'none');
        $('.search-inp').css('display', 'block');

    }
})

$('#svg2 path').mouseenter(function(){
    $('.country-info').css('display', 'block');
    $('.country-title').text($(this).attr('data-name'));
    $('.country-cases').text(this.id)

})

$('#svg2 path').mouseout(function(){
    $('.country-info').css('display', 'none');
})

