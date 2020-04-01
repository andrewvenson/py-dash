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