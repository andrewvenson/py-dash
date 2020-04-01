function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(0,0),
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
                json_countries[data['Countries'][x]['Country']] = data['Countries'][x]['TotalConfirmed'];
            }
        }
    }).done(function(){

        for(x in json_countries){
            console.log(x, json_countries[x])
        }

        // Set style of map
        map.data.setStyle(function(feature){
            if (feature.getProperty('name') != "Antarctica") {
                return /** @type {!google.maps.Data.StyleOptions} */({
                fillColor: 'blue',
                strokeColor: 'darkblue',
                strokeWeight:1
            });
            }
        });
    });

    
    

    map.data.setStyle(function(feature){
        
        if (feature.getProperty('name') != "Antarctica") {
            return /** @type {!google.maps.Data.StyleOptions} */({
            fillColor: 'blue',
            strokeColor: 'darkblue',
            strokeWeight:1
        });
        }
    });

    map.data.addListener('mouseover', function(event) {
        if(event.feature.getProperty("name") != "Antarctica"){
            map.data.overrideStyle(event.feature, {fillColor: "darkblue",strokeColor: 'red',});
            $('.country-info').css('display', 'block');
            $('.country-title').text(event.feature.getProperty("name"));
        }   
    });
    
    map.data.addListener('mouseout', function(event) {
            map.data.overrideStyle(event.feature, {fillColor: 'blue',strokeColor: 'darkblue'});
        $('.country-info').css('display', 'none');
    });

}   