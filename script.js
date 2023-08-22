let displayTop = document.querySelector(".display .top");
let displayBottom = document.querySelector(".display .bottom");

let result = null;
let temp = "";
let operator = null;

let keyList = document.querySelectorAll(".key");

keyList.forEach(key => key.addEventListener("click", (e) => runCalculator(e.target)));

function runCalculator(element) {
    console.log(element);
    console.log(element.dataset.key);
    if (element.classList[1] === "number") {

        if (element.dataset.key === ".") {
            temp += ".";
        } else {
            temp += element.dataset.key;
        }

        let tempResult = Math.round(result * 100) / 100;

        if (operator !== null)
            displayTop.textContent = `${tempResult} ${operator}`;

        displayBottom.textContent = temp;

    } else if (element.classList[1] === "operator") {
        if (result === null) {
            result = +temp;
            temp = "";
        }

        if (operator === null)
            operator = element.dataset.key;

        if (temp !== "") {
            let tempResult = Math.round(result * 100) / 100;
            console.log(`tempResult: ${tempResult}`);
            result = operate(result, +temp, operator);
            let dispResult = Math.round(result * 100) / 100;

            if (element.dataset.key === "Enter") {
                displayTop.textContent = `${tempResult} ${operator} ${temp} = ${dispResult}`;

                operator = null;

            } else {
                operator = element.dataset.key;
                let dispResult = Math.round(result * 100) / 100;
                displayTop.textContent = `${dispResult} ${operator}`;
            }
            temp = "";
        }
    } else if (element.classList[1] === "command") {
        let command = element.dataset.key;
        if (command === "Delete") {
            result = null;
            temp = "";
            operator = null;
            displayTop.textContent = "";
            displayBottom.textContent = "";
        } else if (command === "Backspace") {
            temp = temp.slice(0, -1);
            displayBottom.textContent = temp;
        }
    }
}

function operate(val1, val2, operator) {
    switch (operator) {
        case "*":
            return multiply(val1, val2);
        case "/":
            return divide(val1, val2);
        case "+":
            return add(val1, val2);
        case "-":
            return subtract(val1, val2);
    }
}

function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return (a * b);
}

function divide(a, b) {
    return (a / b);
}


window.addEventListener("keydown", (e) => {
    const btn = document.querySelector(`.key[data-key="${e.key}"]`);
    runCalculator(btn);
});
