'use strict';
console.log('This is the common js file');



var allPizzas = [];

//Add a constructor function for our pizzas
function Pizza(name, imageUrl, timesClicked){
  this.name = name;
  this.imageUrl = imageUrl;
  if(timesClicked){
    this.timesClicked = timesClicked;
  } else {
    this.timesClicked = 0;
  }
  this.timesShown = 0;
  allPizzas.push(this);
}




//Do a local storage Check to see if this data is already in local storage. 
//1. is there saved data to create pizza instances?
var savedPizzaString = localStorage.getItem('savedPizza');
if(savedPizzaString){
  //2. if true, use that data
  var arrayOfNotPizzaObjects = JSON.parse(savedPizzaString);

  //turn string into pizza object
  for(var i = 0; i < arrayOfNotPizzaObjects.length; i++){
    new Pizza(arrayOfNotPizzaObjects[i].name,
      arrayOfNotPizzaObjects[i].imageUrl,
      arrayOfNotPizzaObjects[i].timesClicked);
  }
} else {
  //3. else create it this way
  // actually create our Pizza's
  new Pizza('New York Thin', 'images/newYorkPizza.jpeg');
  new Pizza('Detroit Style', 'images/detroitPizza.jpeg');
  new Pizza('Shot Gun Dans', 'images/sgDansHtossedMeatLovPizza.jpg');
  new Pizza('Brick Oven Pizza', 'images/brickOvenPizza.jpeg');
  new Pizza('Calzone', 'images/calzonePizza.jpeg');
  new Pizza('Chicago Deep Dish', 'images/chicagoPizza.jpeg');
  new Pizza('Chicago Pizza & Oven Grinder', 'images/cpoGinderPizza.jpeg');
  new Pizza('Papa Vito\'s Thin', 'images/mwDeluxePizzaThinCrust.jpg');

}
allPizzas[0].timesShown++;
allPizzas[1].timesShown++;
