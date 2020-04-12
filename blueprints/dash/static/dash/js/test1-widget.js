// // NOT EFFECTIVE



// //api for testing
// //const api_url = 'https://api.covid19api.com/total/country/south-africa/status/confirmed';

// // api url for country list
// const country_api = 'https://api.covid19api.com/countries';

// //append country slug & condition string
// const cases_active = "https://api.covid19api.com/total/country/" ;
// const confirmed = "/status/confirmed";
// const recovered = "/status/recovered";
// const deaths = "/status/deaths";

// window.addEventListener('load', setup);

// async function setup(){
//     const ctx = document.getElementById('myChart').getContext('2d');
//     const World_Cases = await getData();
//     const myChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: World_Cases.dates,
//         datasets: [
//           {
//             label: 'Confirmed Cases',
//             data: World_Cases.cases,
//             fill: false,
//             borderColor: 'rgba(255, 99, 132, 1)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             borderWidth: 1
//           }
//         ]
//       },
//       options: {
//           title: {
//             display: true,
//             text: 'Confirmed Cases (World)'
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//       }
//     });
//   }

//   async function getData() {
//     const dates = [];
//     var cases_sum = [];
//     var first_run = true;

//     //get country slug data to change api url
//     const country_response = await fetch(country_api);
//     const country_list = await country_response.json();
//     const country_slug = [];

//     //save country slug(will be used for api urls)
//     country_list.forEach(obj =>{
//       for(const key in obj){
//         if(key == "Slug") { country_slug.push(obj[key]);}
//       }
//     });

//     //go through each country,and add numbers (all dates start at 1-22)
//     //if it is the first iteration, push back the dates to dates array
//     for(let i = 0; i < country_slug.length; ++i)
//     {
//       var slug_string = country_slug[i];
//       const api_url = cases_active + slug_string + confirmed;
//       //console.log(api_url);

//       const response = await fetch(api_url);
//       const data = await response.json();

//       data.forEach(obj => {
//         let index = 0;
//         for(const key in obj){
//           if(first_run && key == "Date") {dates.push(obj[key].substring(5,10));}
//           else if(key == "Cases")
//           {
//             if(first_run) { cases_sum.push(obj[key]);}
//             else if(obj[key] > 0){ cases_sum[index++] += obj[key];}
//           }
//         }
//       });

//       first_run = false;
//     }
//       return {dates, cases_sum};
//   }

// // Select map tab
// $(".graph-tab").click(function(){
//     $(".graph-tab").css("background-color", "whitesmoke");
//     $(this).css("background-color", "rgb(211, 211, 211)");
 
//     if($(this).text() == "Linear"){
 
//     }else if($(this).text() == "Logarithmic"){
//     }

//  });