// Select map tab
$(".map-tab").click(function(){
   $(".map-tab").css("background-color", "whitesmoke");
   $(this).css("background-color", "rgb(211, 211, 211)");

   console.log($(this).text())
   if($(this).text() == "US Map"){
        $(".covid-legend").css("display", "block")
        $('.county-info').css('display', 'none');

        $("#search").attr("placeholder", "Search state ...");
        $('.highest').text('>5000');
        $('.higher').text('5000-1001');
        $('.high').text('1000-501');
        $('.mid').text('500-101');
        $('.low').text('100-51');
        $('.lowest').text('0');
   }else if($(this).text() == "World Map"){
        $(".covid-legend").css("display", "block");
        $('.county-info').css('display', 'none');

        $("#search").attr("placeholder", "Search country ...");
        $('.highest').text('>50000');
        $('.higher').text('50000-10001');
        $('.high').text('10000-1001');
        $('.mid').text('1000-101');
        $('.low').text('100-1');
        $('.lowest').text('0');
    }else if($(this).text() == "US County"){
        $(".covid-legend").css("display", "block")
        $('.county-info').css('display', 'none');

        $("#search").attr("placeholder", "Search county ...");
        $('.highest').text('>100');
        $('.higher').text('100-51');
        $('.high').text('50-31');
        $('.mid').text('30-11');
        $('.low').text('10-1');
        $('.lowest').text('0');
    }
   $(".country-info").css('display', 'none');
   initMap();
});

$("#map-icon").click(function(){
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
            initMap(pos);

            }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

});

// initialize map and datalayer
function initMap(pos) {
    
    if($("#world-tab").css('background-color') == 'rgb(211, 211, 211)'){        
        if(pos!=undefined){
            var map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(39.0119,-30.4842),
                zoom: 8,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            });
            map.setCenter(pos);
            console.log("iIt's a go")
        }else{
            var map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(39.0119,-30.4842),
                zoom: 3,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            });
        }

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
                    json_countries[data['Countries'][x]['Country']] = [data['Countries'][x]['TotalConfirmed'],data['Countries'][x]['NewConfirmed'],data['Countries'][x]['TotalDeaths'],data['Countries'][x]['NewDeaths']] ;
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
                    // console.log(feature.getProperty('name'));
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
                            fillColor: "white",
                            strokeColor: 'white',
                            strokeWeight:1
                        });
                    }
                }
                if(json_countries[feature.getProperty('name')] == undefined){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "navy",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }else if(json_countries[feature.getProperty('name')][0] >= 50000){
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
                        fillColor: "white",
                        strokeColor: 'white',
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
                        $('.map-totaldeaths').text(json_countries[ccs[event.feature.getProperty("name")]][2]);
                        $('.map-newdeaths').text(json_countries[ccs[event.feature.getProperty("name")]][3]);
                    }else{
                        $('.map-total').text(json_countries[event.feature.getProperty("name")][0]);
                        $('.map-new').text(json_countries[event.feature.getProperty("name")][1]);
                        $('.map-totaldeaths').text(json_countries[event.feature.getProperty("name")][2]);
                        $('.map-newdeaths').text(json_countries[event.feature.getProperty("name")][3]);
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
            // $('.country-info').css('display', 'none');
        }); 

        }else if($('#us-tab').css('background-color') == 'rgb(211, 211, 211)'){
            
            if(pos!=undefined){
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(39.0119,-98.4842),
                    zoom: 8,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                });
                map.setCenter(pos);
                console.log("iIt's a go")
            }else{
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(39.0119,-98.4842),
                    zoom: 4,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                });
            }

            // holds states
            var json_states = {}

            map.data.loadGeoJson('dash/json/gz_2010_us_040_00_500k.json');

            var today = new Date();
            var month = "";
            var date = "";

            if(today.getMonth().toString().length == 1){
                month = "0" + (today.getMonth()+1).toString();

            }else{
                month = (today.getMonth()+1).toString();
            }
            
            if(today.getDate().toString().length == 1){
                date = "0" + today.getDate().toString();
                yester_date = "0" + (today.getDate()-1).toString();
                
            }else{
                date = today.getDate().toString();
                yester_date = (today.getDate()-1).toString();

            }


            var today_dt = today.getFullYear() + "-" + month + "-" + date;
            var yest_dt = today.getFullYear() + "-" + month + "-" + yester_date;

            $.getJSON("https://covidtracking.com/api/states/daily", function(data){
                for(x in data){
                    // console.log("todays", today_dt);
                    if(data[x]["dateChecked"] == today_dt + "T20:00:00Z"){
                        json_states[data[x]["state"]] = [data[x]["positive"], data[x]["positiveIncrease"],data[x]["death"],data[x]["deathIncrease"]];
                    }else if(data[x]["dateChecked"] == yest_dt + "T20:00:00Z"){
                        json_states[data[x]["state"]] = [data[x]["positive"], data[x]["positiveIncrease"],data[x]["death"],data[x]["deathIncrease"]];
                    }
                }
                    // console.log(json_states[0]);
                }).done(function(){
                    var ssa = {
                        "Alabama": 	"AL",
                        "Alaska": 	"AK",
                        "Arizona": 	"AZ",
                        "Arkansas": 	"AR",
                        "California": 	"CA",
                        "Colorado": 	"CO",
                        "Connecticut": 	"CT",
                        "Delaware": 	"DE",
                        "Florida": 	"FL",
                        "Georgia": 	"GA",
                        "Hawaii": 	"HI",
                        "Idaho": 	"ID",
                        "Illinois": 	"IL",
                        "Indiana": 	"IN",
                        "Iowa": 	"IA",
                        "Kansas": 	"KS",
                        "Kentucky": 	"KY",
                        "Louisiana": 	"LA",
                        "Maine": 	"ME",
                        "Maryland": 	"MD",
                        "Massachusetts": 	"MA",
                        "Michigan": 	"MI",
                        "Minnesota": 	"MN",
                        "Mississippi": 	"MS",
                        "Missouri": 	"MO",
                        "Montana": 	"MT",
                        "Nebraska": 	"NE",
                        "Nevada": 	"NV",
                        "New Hampshire": 	"NH",
                        "New Jersey": 	"NJ",
                        "New Mexico": 	"NM",
                        "New York": 	"NY",
                        "North Carolina": 	"NC",
                        "North Dakota": 	"ND",
                        "Ohio": 	"OH",
                        "Oklahoma": 	"OK",
                        "Oregon": 	"OR",
                        "Pennsylvania": 	"PA",
                        "Rhode Island": 	"RI",
                        "South Carolina": 	"SC",
                        "South Dakota": 	"SD",
                        "Tennessee": 	"TN",
                        "Texas": 	"TX",
                        "Utah": 	"UT",
                        "Vermont": 	"VT",
                        "Virginia": 	"VA",
                        "Washington": 	"WA",
                        "West Virginia": 	"WV",
                        "Wisconsin": 	"WI",
                        "Wyoming": 	"WY"}

                        map.data.setStyle(function(feature){
                        if(json_states[ssa[feature.getProperty('NAME')]] == undefined){
                            return /** @type {!google.maps.Data.StyleOptions} */({
                                fillColor: "navy",
                                strokeColor: 'darkblue',
                                strokeWeight:1
                            });
                        }else if(json_states[ssa[feature.getProperty('NAME')]][0] >= 5001){
        
                            return /** @type {!google.maps.Data.StyleOptions} */({
                                fillColor: "red",
                                strokeColor: 'red',
                                strokeWeight:1
                            });
                        }else if(json_states[ssa[feature.getProperty('NAME')]][0] >= 1001 && json_states[ssa[feature.getProperty('NAME')]][0] < 5001){
                            return /** @type {!google.maps.Data.StyleOptions} */({
                                fillColor: "orange",
                                strokeColor: 'orange',
                                strokeWeight:1
                            });
                        }else if(json_states[ssa[feature.getProperty('NAME')]][0] >= 501 && json_states[ssa[feature.getProperty('NAME')]][0] < 1001){
                            return /** @type {!google.maps.Data.StyleOptions} */({
                                fillColor: "yellow",
                                strokeColor: 'gold',
                                strokeWeight:1
                            });
                        }else if(json_states[ssa[feature.getProperty('NAME')]][0] >= 101 && json_states[ssa[feature.getProperty('NAME')]][0] < 501){
                            return /** @type {!google.maps.Data.StyleOptions} */({
                                fillColor: "darkblue",
                                strokeColor: 'darkblue',
                                strokeWeight:1
                            });
                        }else if(json_states[ssa[feature.getProperty('NAME')]][0] >=51 && json_states[ssa[feature.getProperty('NAME')]][0] < 101){
                            return /** @type {!google.maps.Data.StyleOptions} */({
                                fillColor: "green",
                                strokeColor: 'green',
                                strokeWeight:1
                            });
                        }else if(json_states[ssa[feature.getProperty('NAME')]][0] == 0){
                            return /** @type {!google.maps.Data.StyleOptions} */({
                                fillColor: "white",
                                strokeColor: 'white',
                                strokeWeight:1
                            });
                        }
                    });

                map.data.addListener('mouseover', function(event) {
                    
                    $('.country-info').css('display', 'block');
                    $('.country-title').text(event.feature.getProperty("NAME"));

                    $('.map-total').text(json_states[ssa[event.feature.getProperty("NAME")]][0]);
                    $('.map-new').text(json_states[ssa[event.feature.getProperty("NAME")]][1]);
                    $('.map-totaldeaths').text(json_states[ssa[event.feature.getProperty("NAME")]][2]);
                    $('.map-newdeaths').text(json_states[ssa[event.feature.getProperty("NAME")]][3]);
                
            });
        }); 
    }else if($('#county-tab').css('background-color') == 'rgb(211, 211, 211)'){
        

        if(pos!=undefined){
            var map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(39.0119,-98.4842),
                zoom: 10,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            });
            map.setCenter(pos);
            console.log("iIt's a go")
        }else{
            var map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(39.0119,-98.4842),
                zoom: 5,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            });
        }
        
        map.data.loadGeoJson('dash/json/us-countiesgeo.json');

        json_counties = {}
        $.getJSON("/counties", function(data){
            
            for (x in data){
                if(data[x]["date"] == "2020-04-01"){
                    json_counties[data[x]["county"]] = [data[x]["cases"], data[x]["deaths"]]
                }
            }
        }).done(function(){
            map.data.setStyle(function(feature){
                if(json_counties[feature.getProperty('name')] == undefined){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "black",
                        strokeColor: 'black',
                        strokeWeight:1
                    });
                }else if(json_counties[feature.getProperty('name')][0] >= 101){

                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "red",
                        strokeColor: 'red',
                        strokeWeight:1
                    });
                }else if(json_counties[feature.getProperty('name')][0] >= 51 &&  json_counties[feature.getProperty('name')][0] < 101){

                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "orange",
                        strokeColor: 'orange',
                        strokeWeight:1
                    });
                }else if(json_counties[feature.getProperty('name')][0] >= 31 && json_counties[feature.getProperty('name')][0] < 51){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "yellow",
                        strokeColor: 'gold',
                        strokeWeight:1
                    });
                }else if(json_counties[feature.getProperty('name')][0] >= 11 && json_counties[feature.getProperty('name')][0] < 31){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "darkblue",
                        strokeColor: 'darkblue',
                        strokeWeight:1
                    });
                }else if(json_counties[feature.getProperty('name')][0] >= 1 && json_counties[feature.getProperty('name')][0] < 11){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "darkgreen",
                        strokeColor: 'darkgreen',
                        strokeWeight:1
                    });
                }else if(json_counties[feature.getProperty('name')][0] == 0){
                    return /** @type {!google.maps.Data.StyleOptions} */({
                        fillColor: "lightgray",
                        strokeColor: 'lightgray',
                        strokeWeight:1
                    });
                }
            });

            map.data.addListener('mouseover', function(event) {
                if(json_counties[event.feature.getProperty('name')] == undefined){
                    $('.county-total').text("no data");
                    $('.county-totaldeaths').text("no data");
                }else{
                    $('.county-info').css('display', 'block');
                    $('.county-title').text(event.feature.getProperty("name"));
                    $('.county-total').text(json_counties[event.feature.getProperty('name')][0]);
                    $('.county-totaldeaths').text(json_counties[event.feature.getProperty('name')][1]);
                }
            });
        });
    }   
}

 // console.log(navigator)
        
        
        // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        // infoWindow.setPosition(pos);
        // infoWindow.setContent(browserHasGeolocation ?
        //                         'Error: The Geolocation service failed.' :
        //                         'Error: Your browser doesn\'t support geolocation.');
        // infoWindow.open(map);
        // }


