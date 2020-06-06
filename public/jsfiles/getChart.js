const api_url = "https://api.covid19india.org/data.json";
const Peoplerecoverd = [];
const days = [];
let totalRecoveredPeople =0;

async function getdata() {
    const response = await fetch(api_url);
    const data = await response.json();
    data.cases_time_series.forEach(function (data) {
        Peoplerecoverd.push(data.totalrecovered);
        days.push(data.date.substring(0, 6));
    })
    totalRecoveredPeople = data.statewise[0].recovered;
    console.log(Peoplerecoverd);
    console.log(days);

}
mkchart();
async function mkchart(){
await getdata();
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'Recovered People #Total_recovered = '+totalRecoveredPeople,
            data: Peoplerecoverd,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
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