$('#svg2 path').mouseenter(function(){
    $('.country-info').css('display', 'block');
    $('.country-title').text($(this).attr('data-name'));
    $('.country-cases').text(this.id)
});

$('#svg2 path').mouseout(function(){
    $('.country-info').css('display', 'none');
});

$('#max').click(function(){
    var img_width = $('#svg2').width();
    var img_height = $('#svg2').height();
    console.log(img_width)
    console.log(img_height)

    var wid_val = img_width + 100;
    var hgt_val = img_height + 100;

    document.getElementById('svg2').style.width = wid_val.toString() + "px" 
    document.getElementById('svg2').style.height = hgt_val.toString() + "px" 
});

$('#min').click(function(){
    var img_width = $('#svg2').width();
    var img_height = $('#svg2').height();
    console.log(img_width)
    console.log(img_height)

    var wid_val = img_width - 100;
    var hgt_val = img_height - 100;

    document.getElementById('svg2').style.width = wid_val.toString() + "px" 
    document.getElementById('svg2').style.height = hgt_val.toString() + "px" 
});

$('#reset').click(function(){

    document.getElementById('svg2').style.width = "100%";
    document.getElementById('svg2').style.height = "100%"; 
});
