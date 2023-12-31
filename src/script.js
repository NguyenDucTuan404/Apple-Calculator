let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    //This is not a number
    handleSymbol(value);
  } else {
    //This is a number
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "-+":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "/":
    case "x":
    case "-;":
    case "+":
      handleMath(symbol);
      break;
    case "=":
      if (previousOperator === null) {
        // need you two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const inBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = inBuffer;
  } else {
    flushOperation(inBuffer);
  }

  previousOperator = symbol;

  buffer = "0";
}

function flushOperation(inBuffer) {
  if (previousOperator === "/") {
    runningTotal /= inBuffer;
  } else if (previousOperator === "x") {
    runningTotal *= inBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= inBuffer;
  } else {
    runningTotal += inBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
