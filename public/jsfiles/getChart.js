const api_url = "https://api.covid19india.org/data.json";
const Peoplerecoverd = [];
const days = [];
let totalRecoveredPeople=0;

async function getdata() {
    const response = await fetch(api_url);
    const data = await response.json();
    data.cases_time_series.forEach(function (data) {
        Peoplerecoverd.push(data.dailyrecovered);
        days.push(data.date);
    })
     document.getElementById("totalRecovered").innerText = "Total Recovered: "+data.statewise[0].recovered;
    console.log(Peoplerecoverd);
    console.log(days);
// #Total_recovered = totalRecoveredPeople 
}
mkchart();
async function mkchart(){
await getdata();
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days.slice(83,days.length),
        datasets: [{
            label: 'Recovered People',
            data: Peoplerecoverd.slice(83,days.length),
            backgroundColor: [
                'rgba(0, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(0, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
 
};

