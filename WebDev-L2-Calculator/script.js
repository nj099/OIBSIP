const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let expression = [];
let result = "";
let justCalculated = false;
let errorState = false;

function showError() {
  screen.textContent = "Error";

  currentInput = "";
  expression = [];
  result = "";
  justCalculated = false;
  errorState = true;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = btn.textContent;

    if (errorState && value !== "C") {
      return;
    }

    switch (value) {
      case "+":
      case "-":
      case "*":
      case "/":
        if (justCalculated) {
          expression = [String(result)];
          justCalculated = false;
          currentInput = "";
        }

        if (currentInput !== "") {
          expression.push(currentInput);
          currentInput = "";
        }

        if (["+", "-", "*", "/"].includes(expression[expression.length - 1])) {
          expression[expression.length - 1] = value;
        } else {
          expression.push(value);
        }

        screen.textContent = expression.join("");

        break;

      case "=":
        if (currentInput !== "") {
          expression.push(currentInput);
        }

        if (
          expression.length === 0 ||
          ["+", "-", "*", "/"].includes(expression[expression.length - 1])
        ) {
          return;
        }
        for (let i = 0; i < expression.length; i++) {
          if (expression[i] == "*") {
            let left = Number(expression[i - 1]);
            let right = Number(expression[i + 1]);
            result = left * right;
            expression.splice(i - 1, 3, String(result));
            i = -1;
          }
          if (expression[i] == "/") {
            let left = Number(expression[i - 1]);
            let right = Number(expression[i + 1]);
            if (right === 0) {
              showError();
              return;
            }
            result = left / right;
            expression.splice(i - 1, 3, String(result));
            i = -1;
          }
        }
        for (let i = 0; i < expression.length; i++) {
          if (expression[i] == "+") {
            let left = Number(expression[i - 1]);
            let right = Number(expression[i + 1]);
            result = left + right;
            expression.splice(i - 1, 3, String(result));
            i = -1;
          }
          if (expression[i] == "-") {
            let left = Number(expression[i - 1]);
            let right = Number(expression[i + 1]);
            result = left - right;
            expression.splice(i - 1, 3, String(result));
            i = -1;
          }
        }
        screen.textContent = result;
        justCalculated = true;
        currentInput = "";

        break;

      case "C":
        currentInput = "";
        expression = [];
        result = "";
        justCalculated = false;
        errorState = false;

        screen.textContent = "0";

        break;
      case "DEL":
        if (!justCalculated) {
          currentInput = currentInput.slice(0, -1);
          screen.textContent = expression.join("") + currentInput;
        }

        break;

      case ".":
        if (justCalculated) {
          expression = [];
          currentInput = "";
          result = "";
          justCalculated = false;
        }

        if (!currentInput.includes(".")) {
          if (currentInput === "") {
            currentInput = "0.";
          } else {
            currentInput += ".";
          }
        }

        screen.textContent = expression.join("") + currentInput;

        break;

      default:
        if (justCalculated) {
          expression = [];
          currentInput = "";
          result = "";
          justCalculated = false;
        }

        currentInput += value;

        screen.textContent = expression.join("") + currentInput;

        break;
    }
  });
});
