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


 // Styles a map in night mode.
 function initMap() {
 var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(0,0),
    zoom: 1,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });
}