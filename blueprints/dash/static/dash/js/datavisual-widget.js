var confirmed_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
var deaths_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
var recovered_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';

window.addEventListener('load', setup2);

async function setup2() {
  const ctx2 = document.getElementById('active-bar').getContext('2d');
  const World = await getData2();
  const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: World.dates,
      datasets: [
        {
          label: 'Active Cases',
          data: World.cases_active,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Active Cases (World)'
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

//get data from csv
async function getData2() {
  console.log('getdata');

  const data_all = await fetchURLs();
  var data_confirmed = data_all[0];
  var data_recovered = data_all[1];
  var data_deaths = data_all[2];

  const dates = [];
  var cases_active = [];
  const first_row = data_confirmed.split('\n')[0].split(',');

  for (var i = 4; i < first_row.length; ++i) {
    var date = first_row[i].substring(0, 4);
    if (date[date.length - 1] == '/') { date = date.substring(0, 3); }
    dates.push(date);
  }

  const second_row = data_confirmed.split('\n').slice(1)[0].split(',');

  for (var i = 4; i < second_row.length; ++i) {
    cases_active.push(parseInt(second_row[i]));
  }

  const rows_after_two = data_confirmed.split('\n').slice(2);
  const rat_death = data_deaths.split('\n').slice(2);
  const rat_recovered = data_recovered.split('\n').slice(2);

  for (var i = 0; i < rows_after_two.length; ++i) {
    const cols = rows_after_two[i].split(',');
    const cols2 = rat_death[i].split(',');
    //FIX LATER
    //const cols3 = rat_recovered[i].split(',');

    for (var j = 4; j < cols.length; ++j) {
      let push_val = parseInt(cols[j]) - parseInt(cols2[j]);// - parseInt(cols2[j]);
      cases_active[j] += push_val;
    }

  }
  return { dates, cases_active };
}

async function fetchURLs() {
  console.log('fetchURLs');

  try {
    // Promise.all() lets us coalesce multiple promises into a single super-promise
    var data = await Promise.all([
      fetch(confirmed_url).then((response) => response.text()),// parse each response as text
      fetch(recovered_url).then((response) => response.text()),
      fetch(deaths_url).then((response) => response.text())
    ]);

    //FOR DEBUG
    // for (var i of data) {
    //   console.log(`RESPONSE ITEM \n`);
    //   for (var obj of i) {
    //     console.log(obj);
    //     //logger utility method, logs output to screen
    //     console.log(obj);
    //   }
    // }

    return data;

  } catch (error) {
    console.log(error);
  }
}