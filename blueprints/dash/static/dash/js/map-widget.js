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


 function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(39.0119,-98.4842),
        zoom: 4,
        streetViewControl: false,
        mapTypeControl: false,

    });

    map.data.loadGeoJson('dash/json/gz_2010_us_040_00_500k.json');

    map.data.setStyle({
        fillColor: 'green',
        strokeWeight: 1
        });

    map.data.addListener('mouseover', function(event) {
        map.data.overrideStyle(event.feature, {fillColor: "#005EAA"});
        $('.country-info').css('display', 'block');
        $('.country-title').text(event.feature.getProperty("NAME"));
        });
    
    map.data.addListener('mouseout', function(event) {
        map.data.overrideStyle(event.feature, {fillColor: 'green'});
        $('.country-info').css('display', 'none');
        });

}   