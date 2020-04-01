
$(".map-tab").click(function(){
   $(".map-tab").css("background-color", "whitesmoke");
   $(this).css("background-color", "rgb(211, 211, 211)");
   initMap();
});

var map;
var infoWindow;

function initMap() {
    if($("#world-tab").css('background-color') == 'rgb(211, 211, 211)'){
        var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(31.8686,0),
            zoom: 3,
            streetViewControl: false,
            mapTypeControl: false,
        });

        // Load geojson file to display data layer over map
        map.data.loadGeoJson('dash/json/countries.geo.json');
        
        // Api Url
        getUrlSum = "https://api.covid19api.com/summary"

        // store country and totalconfirmed in dict
        var json_countries = {}

        // request json data from covid summary api url
        $.getJSON(getUrlSum, function(data){
            for(x in data['Countries']){
                for(y in data['Countries'][x]){
                    json_countries[data['Countries'][x]['Country']] = [data['Countries'][x]['TotalConfirmed'],data['Countries'][x]['NewConfirmed']] ;
                }
            }
        }).done(function(){
            var ccs = {
                "Antarctica": "",
                "French Southern and Antarctic Lands": "",
                "Bermuda": "",
                "Democratic Republic of the Congo": "",
                "Czech Republic": "",
                "Falkland Islands": "",
                "Guinea Bissau": "",
                "Lesotho": "",
                "Macedonia": "",
                "Myanmar": "",
                "Malawi": "",
                "New Caledonia": "",
                "North Korea": "",
                "Western Sahara": "",
                "South Sudan": "",
                "Solomon Islands": "",
                "Somaliland": "",
                "Republic of Serbia": "",
                "Swaziland": "",
                "Tajikistan": "",
                "Turkmenistan": "",
                "United Republic of Tanzania": "",
                "United States of America": "US",
                "Vanuatu": "",
                "West Bank": "",
                "Yemen": ""
            }
            // Set style of map
            map.data.setStyle(function(feature){
                // console.log(json_countries[feature.getProperty('name')]);
                if(json_countries[feature.getProperty('name')] == undefined){
                    console.log(feature.getProperty('name'));
                    if(json_countries[ccs[feature.getProperty('name')]][0] > 50000){

                        return /** @type {!google.maps.Data.StyleOptions} */({
                            fillColor: "red",
                            strokeColor: 'red',
                            strokeWeight:1
                        });
                    }else if(json_countries[ccs[feature.getProperty('name')]][0] >= 10001 && json_countries[ccs[feature.getProperty('name')]][0] < 50000){
                        return /**= @type {!google.maps.Data.StyleOptions} */({
                            fillColor: "orange",
                            strokeColor: 'orange',
                            strokeWeight:1
                        });
                    }else if(json_countries[ccs[feature.getProperty('name')]][0] >= 1001 && json_countries[ccs[feature.getProperty('name')]][0] < 10000){
                        return /** @type {!google.maps.Data.StyleOptions} */({
                            fillColor: "yellow",
                            strokeColor: 'yellow',
                            strokeWeight:1
                        });
                    }else if(json_countries[ccs[feature.getProperty('name')]][0] >= 101 && json_countries[ccs[feature.getProperty('name')]][0] < 1000){
                        return /** @type {!google.maps.Data.StyleOptions} */({
                            fillColor: "darkblue",
                            strokeColor: 'darkblue',
                            strokeWeight:1
                        });
                    }else if(json_countries[ccs[feature.getProperty('name')]][0] >= 1 && json_countries[ccs[feature.getProperty('name')]][0] < 100){
                        return /** @type {!google.maps.Data.StyleOptions} */({
                            fillColor: "green",
                            strokeColor: 'green',
                            strokeWeight:1
                        });
                    }else if(json_countries[ccs[feature.getProperty('name')]][0] == 0 && feature.getProperty('name') != "Antarctica"){
                        return /** @type {!google.maps.Data.StyleOptions} */({
                            fillColor: "lightgreen",
                            strokeColor: 'lightgreen',
                            strokeWeight:1
                        });
                    }
                }
                if(json_countries[feature.getProperty('name')][0] >= 50000){
                    // feature.setProperty("fillColor") = "red";
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "red",
                        strokeColor: 'red',
                        strokeWeight:1
                    });
                }
                else if (json_countries[feature.getProperty('name')][0] >= 10001 && json_countries[feature.getProperty('name')][0] < 50000) {
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "orange",
                        strokeColor: 'orange',
                        strokeWeight:1
                    });
                }else if(json_countries[feature.getProperty('name')][0] >= 1001 && json_countries[feature.getProperty('name')][0] < 10000){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "yellow",
                        strokeColor: "yellow",
                        strokeWeight:1
                    });
                }else if(json_countries[feature.getProperty('name')][0] >= 101 && json_countries[feature.getProperty('name')][0] < 1000){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "darkblue",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }else if(json_countries[feature.getProperty('name')][0] >= 1 && json_countries[feature.getProperty('name')][0] < 100){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "green",
                        strokeColor: 'green',
                        strokeWeight:1
                    });
                }else if(json_countries[feature.getProperty('name')][0] == 0 && feature.getProperty('name') != "Antarctica"){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "lightgreen",
                        strokeColor: 'lightgreen',
                        strokeWeight:1
                    });
                }
            });
            map.data.addListener('mouseover', function(event) {
                if(event.feature.getProperty("name") != "Antarctica"){
                    $('.country-info').css('display', 'block');
                    $('.country-title').text(event.feature.getProperty("name"));

                    if(json_countries[event.feature.getProperty('name')] == undefined){
                        $('.map-total').text(json_countries[ccs[event.feature.getProperty("name")]][0]);
                        $('.map-new').text(json_countries[ccs[event.feature.getProperty("name")]][1]);
                    }else{
                        $('.map-total').text(json_countries[event.feature.getProperty("name")][0]);
                        $('.map-new').text(json_countries[event.feature.getProperty("name")][1]);
                    }
                }   
            });
        });

        
        map.data.addListener('mouseover', function(event){
            // map.data.overrideStyle(event.feature, {fillColor: "darkblue",strokeColor: 'red',});
            // console.log(event.feature.getProperty("fillColor"));
        });

        map.data.addListener('mouseout', function(event) {
            // map.data.overrideStyle(event.feature, {fillColor: 'blue',strokeColor: 'darkblue'});
            $('.country-info').css('display', 'none');
        }); 

        }else if($('#us-tab').css('background-color') == 'rgb(211, 211, 211)'){
            var map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(39.0119,-98.4842),
                zoom: 4,
                streetViewControl: false,
                mapTypeControl: false,
            });

            map.data.loadGeoJson('dash/json/gz_2010_us_040_00_500k.json');

            map.data.setStyle(function(feature){
                return /** @type {!google.maps.Data.StyleOptions} */({
                    fillColor: "darkblue",
                    strokeColor: 'darkblue',
                    strokeWeight:1
                });
        })   
    }else if($('#loc-tab').css('background-color') == 'rgb(211, 211, 211)'){
        
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 7,
            streetViewControl: false,
            mapTypeControl: false,
        });

        infoWindow = new google.maps.InfoWindow;


        map.data.loadGeoJson('dash/json/gz_2010_us_040_00_500k.json');

        map.data.setStyle(function(feature){
            return /** @type {!google.maps.Data.StyleOptions} */({
                fillColor: "darkblue",
                strokeColor: 'darkblue',
                strokeWeight:1
            });
        });
        console.log(navigator)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            map.setCenter(pos);
            }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
        
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
        }
    
    
    }   
}



