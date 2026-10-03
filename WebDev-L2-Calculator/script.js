const buttons = document.querySelectorAll("button");
const screen = document.getElementById("screen");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach(button => {

    button.addEventListener("click", () => {

        if (screen.value === "Error") {
        currentInput = "";
        previousInput = "";
        operator = "";
    }

        switch (button.textContent) {

            case "+":
            case "-":
            case "*":
            case "/":

                if (currentInput === "") {
                    operator = button.textContent;
                    return;
                }

                if (previousInput !== "" && currentInput !== "") {

                    const firstNumber = parseFloat(previousInput);
                    const secondNumber = parseFloat(currentInput);

                    const result = calculate(
                        firstNumber,
                        secondNumber,
                        operator
                    );

                    previousInput = result.toString();

                } else {


                    previousInput = currentInput;
                }


                operator = button.textContent;


                currentInput = "";

                screen.value = previousInput;

                break;

            case "=":

                if (
                    previousInput !== "" &&
                    currentInput !== "" &&
                    operator !== ""
                ) {

                    const firstNumber = parseFloat(previousInput);
                    const secondNumber = parseFloat(currentInput);

                    const result = calculate(
                        firstNumber,
                        secondNumber,
                        operator
                    );

                    screen.value = result;


                    currentInput = result.toString();


                    previousInput = "";
                    operator = "";
                }

                break;


            case "C":

                currentInput = "";
                previousInput = "";
                operator = "";

                screen.value = "0";

                break;


            case "DEL":

                currentInput = currentInput.slice(0, -1);

                screen.value = currentInput || "0";

                break;


            default:

                if (button.textContent === ".") {


                    if (!currentInput.includes(".")) {
                        currentInput += ".";
                    }

                } else {

                    currentInput += button.textContent;
                }

                screen.value = currentInput;

                break;
        }

    });

});


function calculate(firstNumber, secondNumber, operator) {

    switch (operator) {

        case "+":
            return firstNumber + secondNumber;

        case "-":
            return firstNumber - secondNumber;

        case "*":
            return firstNumber * secondNumber;

        case "/":

            if (secondNumber === 0) {
                return "Error";
            }

            return firstNumber / secondNumber;

        default:
            return secondNumber;
    }
}