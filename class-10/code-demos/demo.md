# Debugging

## Order of Execution

```javascript
showMsg();
msgExpression();

function showMsg() {
  console.log('I am the showMsg function');
}

var msgExpression = function() {
  console.log('I am the msgExpression function expression');
};
```

1. create new scope
1. read all variable/function declarations & create values
1. execute: assign values to vars, run functions, execute statements


## Execution Context

```javascript

//global scope
var name = 'Dan';
function globalFunc() {
  console.log('I can be called anywhere');
}

//function scope
function scopyFunc(doggy) {
  function privateFunc() {
    var privateVar = 'woof!';
    return doggy + ' says ' + privateVar;
  }
  console.log(privateVar);
  console.log('doggy is only defined inside scopyFunc: ' + doggy );
  return privateFunc();
}

scopyFunc('Fido');

//object context
var teacherBot = {
  first: 'Dan',
  last: 'Schwartz',
  age: 35,
  speak: function() {
    return 'Hello humanoid, I am ' + this.first + ' ' + this.last;
  }
};

teacherBot.age    //35
teacherBot.speak  //'Hello humanoid, I am Dan Schwartz'
age               //age is not defined
```

## The Stack

```javascript
function add(x,y) {
  console.log('now running add');
  return x + y;
}

function multiply(x,y) {
  console.log('now running multiply');
  return x * y;
}

function report(x,y) {
  console.log('now running report');
  var sum = 'The sum of ' + x + ' and ' + y + ' is ' + add(x,y);
  var product = 'The product of ' + x + ' and ' + y + ' is ' + multiply(x,y);
  return 'The sum is ' + sum + '. The product is ' + product;
}

report(2,4);
```

## Errors

- SyntaxError: usually typos
- ReferenceError: try to reference a variable or function that doesn't exist or is out of scope:
  - undefined vs. not defined
  - `var a = b;`
  - `someFunc();`

- TypeError: try to operate on the wrong kind of data. often signals an error with the data object. Might be caused by trying to perform illegal type coercion

```javascript
var someObj = {
  a: 10,
  b: 9
};

someObj.push(20);
```

- RangeError: try to call a function with an unacceptable numerical value:

```javascript
var price = 10;
price.toFixed(25);

var impossibleArray = new Array(-1);
```

```javascript
try {
  //try to do this
} catch (exception) {
  //do this if there's an exception
} finally {
  //always do this
}
```

## Debugging

- The adjacent folder `debugging-salmon-cookies` contains a series of bugs separated by type. Have the students take turns identifying the type of error and its message, finding the error location, and fixing the bug
