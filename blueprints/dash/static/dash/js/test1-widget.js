window.addEventListener('load', setup);

async function setup() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const World = await getData();
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: World.dates,
      datasets: [
        {
          label: 'Confirmed Cases',
          data: World.cases_sum,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Confirmed Cases (World)'
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}
//get data from csv
async function getData() {
  const response = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv');
  var data = await response.text();

  const dates = [];
  var cases_sum = [];
  const first_row = data.split('\n')[0].split(',');

  for (var i = 4; i < first_row.length; ++i) {
    var date = first_row[i].substring(0, 4);
    if (date[date.length - 1] == '/') { date = date.substring(0, 3); }
    dates.push(date);
  }

  const second_row = data.split('\n').slice(1)[0].split(',');

  for (var i = 4; i < second_row.length; ++i) {
    cases_sum.push(parseInt(second_row[i]));
  }

  const rows_after_two = data.split('\n').slice(2);
  for (var i = 0; i < rows_after_two.length; ++i) {
    const cols = rows_after_two[i].split(',');
    for (var j = 4; j < cols.length; ++j) {
      cases_sum[j] += parseInt(cols[j]);
    }
  }

  return { dates, cases_sum };
}

// //Select map tab (implement later)
// $(".graph-tab").click(function(){
//     $(".graph-tab").css("background-color", "whitesmoke");
//     $(this).css("background-color", "rgb(211, 211, 211)");

//     if($(this).text() == "Linear"){

//     }else if($(this).text() == "Logarithmic"){
//     }
//  });