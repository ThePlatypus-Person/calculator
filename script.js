let displayTop = document.querySelector(".display .top");
let displayBottom = document.querySelector(".display .bottom");

let result = null;
let temp = "";
let operator = null;

let keyList = document.querySelectorAll(".key");

keyList.forEach(key => key.addEventListener("click", (e) => runCalculator(e)));

function runCalculator(e) {
    if (e.target.classList[1] === "number") {

        if (e.target.id === "decimal") {
            temp += ".";
        } else {
            temp += e.target.id;
        }

        displayBottom.textContent = temp;

    } else if (e.target.classList[1] === "operator") {
        if (result === null) {
            result = +temp;
            temp = "";
        }

        if (operator === null)
            operator = e.target.id;

        let symbol = getSymbol(operator);

        if (temp !== "") {
            let tempResult = Math.round(result * 100) / 100;
            console.log(`tempResult: ${tempResult}`);
            result = operate(result, +temp, operator);
            let dispResult = Math.round(result * 100) / 100;

            if (e.target.id === "equals") {
                displayTop.textContent = `${tempResult} ${symbol} ${temp} = ${dispResult}`;

                operator = null;

            } else {
                operator = e.target.id;
                let dispResult = Math.round(result * 100) / 100;
                displayTop.textContent = `${dispResult} ${symbol}`;
            }

            temp = "";
        }

    }
}

function operate(val1, val2, operator) {
    switch (operator) {
        case "multiply":
            //          console.log(`${val1} x ${val2}`);
            return multiply(val1, val2);
        case "divide":
            //          console.log(`${val1} / ${val2}`);
            return divide(val1, val2);
        case "add":
            //          console.log(`${val1} + ${val2}`);
            return add(val1, val2);
        case "subtract":
            //          console.log(`${val1} - ${val2}`);
            return subtract(val1, val2);
    }
}

function getSymbol(operator) {
    switch (operator) {
        case "multiply":
            return "×";
        case "divide":
            return "÷";
        case "add":
            return "+";
        case "subtract":
            return "-";
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


