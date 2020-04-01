function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(0,0),
        zoom: 2,
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
                if(json_countries[ccs[feature.getProperty('name')]] > 50000){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "red",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }else if(json_countries[ccs[feature.getProperty('name')]] >= 10001 && json_countries[ccs[feature.getProperty('name')]] < 50000){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "yellow",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }else if(json_countries[ccs[feature.getProperty('name')]] >= 1001 && json_countries[ccs[feature.getProperty('name')]] < 10000){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "darkblue",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }else if(json_countries[ccs[feature.getProperty('name')]] >= 101 && json_countries[ccs[feature.getProperty('name')]] < 1000){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "blue",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }else if(json_countries[ccs[feature.getProperty('name')]] >= 1 && json_countries[ccs[feature.getProperty('name')]] < 100){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "lightblue",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }else if(json_countries[ccs[feature.getProperty('name')]] == 0 && feature.getProperty('name') != "Antarctica"){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "green",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }
            }
            if(json_countries[feature.getProperty('name')] >= 50000){
                return /** @type {!google.maps.Data.StyleOptions} */({
                    fillColor: "red",
                    strokeColor: 'darkblue',
                    strokeWeight:1
                });
            }
            else if (json_countries[feature.getProperty('name')] >= 10001 && json_countries[feature.getProperty('name')] < 50000) {
                return /** @type {!google.maps.Data.StyleOptions} */({
                    fillColor: "yellow",
                    strokeColor: 'darkblue',
                    strokeWeight:1
                });
            }else if(json_countries[feature.getProperty('name')] >= 1001 && json_countries[feature.getProperty('name')] < 10000){
                return /** @type {!google.maps.Data.StyleOptions} */({
                    fillColor: "darkblue",
                    strokeColor: 'darkblue',
                    strokeWeight:1
                });
            }else if(json_countries[feature.getProperty('name')] >= 101 && json_countries[feature.getProperty('name')] < 1000){
                return /** @type {!google.maps.Data.StyleOptions} */({
                    fillColor: "blue",
                    strokeColor: 'darkblue',
                    strokeWeight:1
                });
            }else if(json_countries[feature.getProperty('name')] >= 1 && json_countries[feature.getProperty('name')] < 100){
                return /** @type {!google.maps.Data.StyleOptions} */({
                    fillColor: "lightblue",
                    strokeColor: 'darkblue',
                    strokeWeight:1
                });
            }else if(json_countries[feature.getProperty('name')] == 0 && feature.getProperty('name') != "Antarctica"){
                return /** @type {!google.maps.Data.StyleOptions} */({
                    fillColor: "green",
                    strokeColor: 'darkblue',
                    strokeWeight:1
                });
            }
        });
    });

    map.data.addListener('mouseover', function(event) {
        if(event.feature.getProperty("name") != "Antarctica"){
            // map.data.overrideStyle(event.feature, {fillColor: "darkblue",strokeColor: 'red',});
            $('.country-info').css('display', 'block');
            $('.country-title').text(event.feature.getProperty("name"));
        }   
    });
    
    map.data.addListener('mouseout', function(event) {
        // map.data.overrideStyle(event.feature, {fillColor: 'blue',strokeColor: 'darkblue'});
        $('.country-info').css('display', 'none');
    });

    
}   