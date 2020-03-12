'use strict';
console.log('This is the Pizza Tracker, linking up');


//These are in an html collection(array) use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each image's click amount.

var imageElements = document.getElementsByTagName('img');

// var img1Clicked = 0;
// var img2Clicked = 0;
var pizzaIndex1 = 0;
var pizzaIndex2 = 1;
var rounds = 25;


//  var allPizzas;
console.log('This is for the console log demo of toString');
//////////////New ////////////////////////////////////////////////////////////////////////
//Return a string representation of
//Because this is a proto all instances have access to this
Pizza.prototype.toString = function(){
  return `${this.name} pizza is from our this.name for the specified array index, clicked ${this.timesClicked} times`;
};



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
  console.log(allPizzas[pizzaIndex1]);
  imageElements[1].src = allPizzas[pizzaIndex2].imageUrl;
  allPizzas[pizzaIndex2].timesShown++;
  console.log(allPizzas[pizzaIndex2]);




  if(totalClicks >= rounds) {
    localStorage.setItem('savedPizza', JSON.stringify(allPizzas));

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
    // runMyChartsNow();
  }
}




















for(i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the click on pizza event');
  //   debugger;
  imageElements[i].addEventListener('click', imageWasClicked);
}



var nameForm = document.getElementById('nameForm');
nameForm.addEventListener('submit',function(event){
  event.preventDefault(); 
  console.log('name form listeing!');

  //Add in actual requirements
  //1. grab what the user typed in 
  var nameUserProvided = document.getElementById('name').value;
  console.log(nameUserProvided);

  //2. save that into localstorage

  localStorage.setItem('userName', nameUserProvided);


  //3. show that info on the page
  //Lets get rid of the form by setting the text of the nameForm

  nameForm.textContent = 'Welcome back ' + nameUserProvided;
  // localStorage.getItem('userName');
  // "bob"

});

var savedName = localStorage.getItem('userName');
// nameForm.textContent = savedName;

//Add the form back in after we clear storage and refresh the page. 
if(!savedName){
  nameForm.textContent = savedName;
} else {
  localStorage.clear();
}
