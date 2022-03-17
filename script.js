function add(first, second) {
  return first + second;
}

function subtract(first, second) {
  return first - second;
}

function multiply(first, second) {
  return first * second;
}

function divide(first, second) {
  return first / second;
}

function operate(first, second, op) {
  if (op === "+") {
    return add(first, second);
  }
  if (op === "-") {
    return subtract(first, second);
  }
  if (op === "*") {
    return multiply(first, second);
  }
  if (op === "/") {
    return divide(first, second);
  }
}

const body = document.querySelector('body');
const container = document.querySelector('.container');
body.appendChild(container);

let currentInput = '';
let firstInput = Infinity;
let secondInput = -Infinity;
let operator = '';
let result = 0;
const display = document.querySelector('.display');
const numBtn = document.querySelectorAll('.number');
numBtn.forEach((button) => {
  button.addEventListener('click', () => {
    currentInput += button.id;
    //have string to display update (concat) with every number pressed
    //keep string and concat for display only
    if (display.textContent === "Display") {
      display.textContent = (`${button.id}`);
    } else {
      display.textContent += (`${button.id}`);
    }
    //console.log('currentInput: ' + currentInput);
  });
});

const decimalBtn = document.querySelector('#decimal');
decimalBtn.addEventListener('click', () => {
  if (display.textContent === "Display") {
    display.textContent = ('.');
  } else if (currentInput.indexOf('.') === -1) {
    currentInput += ('.');
    display.textContent += ('.');
  }
  //console.log('currentInput: ' + currentInput);
})

const opBtn = document.querySelectorAll('.operator');
opBtn.forEach((button) => {
  button.addEventListener('click', () => {
    //save previous numbers as input in value
    currentInput = Number(currentInput);
    console.log('currentInput: ' + currentInput);
    if (firstInput === Infinity) {
      firstInput = currentInput;
    } else if (secondInput === -Infinity) {
      secondInput = currentInput;
    }
    console.log('firstInput: ' + firstInput);
    console.log('secondInput: ' + secondInput);
    currentInput = '';
    if (secondInput === 0 && operator === "/") {
      currentInput = '';
      firstInput = Infinity;
      secondInput = -Infinity;
      operator = '';
      result = 0;
      display.textContent = 'ERROR divide by 0';
    }
    //only operate if both inputs and an operator are set
    if (firstInput !== Infinity && secondInput !== -Infinity && operator !== '') {
      //call operator function and use input num and operator values
      result = operate(firstInput, secondInput, operator);
      if (result !== Math.floor(result)) {
        display.textContent = result.toFixed(2);
      } else {
        display.textContent = result;
      }
      console.log("result: " + result);
      firstInput = result;
    }
    //save operator in value
    operator = `${button.id}`;
    //update display concating input and operator
    display.textContent += (` ${button.id} `);
    console.log('currentInput: ' + currentInput);
    console.log('operator: ' + operator);
  });
});

const equalBtn = document.querySelector('#equals');
equalBtn.addEventListener('click', () => {
  //save previous numbers as currentInput in value
  currentInput = Number(currentInput);
  console.log('currentInput: ' + currentInput);
  //make currentInput firstInput if somehow button is pressed before an operator or second input
  if (firstInput === Infinity) {
    firstInput = currentInput;
  } else {
    secondInput = currentInput;
  }
  console.log('firstInput: ' + firstInput);
  console.log('secondInput: ' + secondInput);
  if (secondInput === 0 && operator === "/") {
    currentInput = '';
    firstInput = Infinity;
    secondInput = -Infinity;
    operator = '';
    result = 0;
    display.textContent = 'ERROR divide by 0';
  }
  //only operate if both inputs and an operator are set
  if (firstInput !== Infinity && secondInput !== -Infinity && operator !== '') {
    //call operator function and use input num and operator values
    result = operate(firstInput, secondInput, operator);
    //update display with result (concated to string?)
    console.log('currentInput after calc: ' + currentInput);
    if (result !== Math.floor(result)) {
      display.textContent = result.toFixed(2);
    } else {
      display.textContent = result;
    }
    console.log("result: " + result);
    firstInput = result;
    secondInput = -Infinity;
    operator = '';
  } else {
    firstInput = Infinity;
    secondInput = -Infinity;
    operator = '';
  }
});

const cancelBtn = document.querySelector('#clear');
cancelBtn.addEventListener('click', () => {
  currentInput = '';
  firstInput = Infinity;
  secondInput = -Infinity;
  operator = '';
  result = 0;
  display.textContent = "Display";
});