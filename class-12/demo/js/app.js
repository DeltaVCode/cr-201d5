'use strict';
console.log('This is the Pizza Tracker, linking up');


//These are in an html collection(array) use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each image's click amount.

var imageElements = document.getElementsByTagName('img');

// var img1Clicked = 0;
// var img2Clicked = 0;
var pizzaIndex1 = 0;
var pizzaIndex2 = 1;
var rounds = 25;
var allPizzas = [];

//Add a constructor function for our pizzas
function Pizza(name, imageUrl){
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  this.timesShown = 0;
  allPizzas.push(this);
}


function getPizzaArray(nameOfThePropertyIWant) {
  var answer = [];
  for(var i = 0; i < allPizzas.length; i++){
    answer[i] = allPizzas[i][nameOfThePropertyIWant];
  }
  console.log(answer);
  return answer;
}

Pizza.prototype.toPercentage = function(){
 

};

// actually create our Pizza's
new Pizza('Brick Oven Pizza', 'images/brickOvenPizza.jpeg');
new Pizza('Calzone', 'images/calzonePizza.jpeg');
new Pizza('Chicago Deep Dish', 'images/chicagoPizza.jpeg');
new Pizza('Chicago Pizza & Oven Grinder', 'images/cpoGinderPizza.jpeg');
new Pizza('Detroit Style', 'images/detroitPizza.jpeg');
new Pizza('Papa Vito\'s Thin', 'images/mwDeluxePizzaThinCrust.jpg');
new Pizza('New York Thin', 'images/newYorkPizza.jpeg');
new Pizza('Detroit Style', 'images/sgDansHtossedMeatLovPizza.jpg');



var totalClicks = 0;
function imageWasClicked(event){
  //track total clicks.
  totalClicks++;
  //   console.log('image was clicked');
  if(event.srcElement.id === '1'){
    allPizzas[pizzaIndex1].timesClicked++;
    // img1Clicked++;
  } else if (event.srcElement.id === '2'){
    allPizzas[pizzaIndex2].timesClicked++;
    // img2Clicked++;
  }



  //Add logic so that we dont see the same images from click to click.

  var nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  while ((nextPizzaIndex1 === pizzaIndex1) || (nextPizzaIndex2 === nextPizzaIndex1)){
    nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  }


  var nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  while((nextPizzaIndex2 === pizzaIndex2) || (nextPizzaIndex2 === nextPizzaIndex1)){
    nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  }




  //Set up a ref to pizzaIndex1
  pizzaIndex1 = nextPizzaIndex1;
  pizzaIndex2 = nextPizzaIndex2;


  //Pick a random picture to display
  imageElements[0].src = allPizzas[pizzaIndex1].imageUrl;
  allPizzas[pizzaIndex1].timesShown++;
  imageElements[1].src = allPizzas[pizzaIndex2].imageUrl;
  allPizzas[pizzaIndex2].timesShown++;





  if(totalClicks >= rounds) {
    var footerElement = document.getElementsByTagName('footer')[0];
    //remove the first child the h2
    if(footerElement.firstElementChild){
      footerElement.firstElementChild.remove();
    }
    // footerElement.textContent = 'You picked pizzas alot of times.';

    var asideUl = document.getElementById('voteResults');
    for(i = 0; i < allPizzas.length; i++){
      var voteResultListItem = document.createElement('li');
      voteResultListItem.textContent = `${allPizzas[i].name} was clicked on 
       ${allPizzas[i].timesClicked} times and was shown ${allPizzas[i].timesShown} times.`;
      asideUl.appendChild(voteResultListItem);
      var percentageListItem = document.createElement('li');

      if(allPizzas[i].timesClicked === 0){
        var math = `ZERO clicks and shown ${allPizzas[i].timesShown} times`;
      } else {
        math = Math.round(((allPizzas[i]['timesClicked'] / allPizzas[i]['timesShown']).toFixed(2) * 100)) + '%';
      }
      percentageListItem.textContent = `${allPizzas[i].name} percentage of clicked on vs times shown is ` + math;
      // percentageListItem.textContent = `${allPizzas[i].name} percentage of clicked on vs times shown is ${allPizzas[i]['timesClicked'] / allPizzas[i]['timesShown']}`;

      asideUl.appendChild(percentageListItem);

    }


    //remove add event listener
    for(var i = 0; i < imageElements.length; i++){
      imageElements[i].removeEventListener('click', imageWasClicked);
    }
    runMyChartsNow();
  }
}









function runMyChartsNow() {
  // chart code thanks to https://www.chartjs.org/docs/latest/
  var ctx = document.getElementById('resultsChart').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
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
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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
}


for(var i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the click on pizza event');
  //   debugger;
  imageElements[i].addEventListener('click', imageWasClicked);
}
