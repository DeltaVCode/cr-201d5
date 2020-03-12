
'use strict';
console.log('this is the charts js file');





function getPizzaArray(nameOfThePropertyIWant) {
  var answer = [];
  for(var i = 0; i < allPizzas.length; i++){
    answer[i] = allPizzas[i][nameOfThePropertyIWant];
  }
  console.log(answer);
  return answer;
}



  
// chart code thanks to https://www.chartjs.org/docs/latest/
var ctx = document.getElementById('resultsChart').getContext('2d');
// eslint-disable-next-line no-undef
new Chart(ctx, {
  type: 'doughnut',
  data: {
    // what does labels do?
    labels: getPizzaArray('name'),
    // what does datasets do?
    // it's an array of objects
    datasets: [{
      // what does this label do?
      // key, legend
      label: '# of Votes',
      // what does this data do?
      // actually the values in the chart
      data: getPizzaArray('timesClicked'),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(53, 102, 255, 0.2)',
        'rgba(153, 10, 125, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(53, 102, 255, 0.2)',
        'rgba(153, 10, 125, 0.2)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    }
  }
});
