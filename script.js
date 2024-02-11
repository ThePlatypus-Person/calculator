const topDisplay = document.querySelector('.display .top');
const bottomDisplay = document.querySelector('.display .bottom');


let firstNum = '';
let result = null;
let prevOperator = null;

const buttons = document.querySelectorAll('.keyboard button');
buttons.forEach(
    button => button.addEventListener('click', e => {

        const targetClass = e.target.classList[0];
        const value = e.target.dataset.value;
        const content = e.target.textContent;

        runCalculator(targetClass, value, content);
    })
);

window.addEventListener('keypress', e => {
    const element = document.querySelector(`.keyboard button[data-value='${e.key}']`);

    if (element === null) {
        if (e.key === 'Backspace') {
            calculatorDelete();
        } else if (e.key === 'Escape') {
            calculatorClear();
        } else if (e.key === 'Enter' || e.key === '=') {
            calculatorEquals();
        }

        return;
    }

    const targetClass = element.classList[0];
    const value = element.dataset.value;
    const content = element.textContent;

    runCalculator(targetClass, value, content);
});


function runCalculator(targetClass, value, content) {
    if (value === 'clear') {
        calculatorClear();
        return;
    }

    if (value === 'delete') {
        calculatorDelete();
        return;
    }


    if (value === '=' ) {
        calculatorEquals();
        return;
    }


    if (targetClass === 'key' && prevOperator !== '=') {
        const valueIsDot = value === '.';
        const lastNumIsDot = firstNum[firstNum.length - 1] === '.';
        if (valueIsDot && lastNumIsDot) return;

        firstNum += value;
        bottomDisplay.textContent = firstNum;
        return;
    } 
    

    if (targetClass === 'operator') {
        if (result === null)
            result = Number(firstNum);

        if (prevOperator === null || prevOperator === '=') {
            prevOperator = value;
        } else {
            result = evaluate(prevOperator, result, Number(firstNum));

            if (!Number.isInteger(result))
                result = result.toFixed(3);

            prevOperator = value;
            bottomDisplay.textContent = '';
        }

        firstNum = '';
        topDisplay.textContent = `${result} ${content}`;
    }
}

function calculatorClear() {
    firstNum = '';
    result = null;
    prevOperator = null;
    bottomDisplay.textContent = '';
    topDisplay.textContent = '';
    return;
}

function calculatorDelete() {
    firstNum = firstNum.slice(0, -1);
    bottomDisplay.textContent = firstNum;
    return;
}

function calculatorEquals() {
    if (
        prevOperator === null 
        || prevOperator === '='
        || firstNum === ''
    ) 
        return;

    const tempOperator = 
        (prevOperator === '*') ? '×' 
        : (prevOperator === '/') ? '÷' 
        : prevOperator;

    topDisplay.textContent = `${result} ${tempOperator} ${firstNum} =`;
    result = evaluate(prevOperator, result, Number(firstNum));

    if (!Number.isInteger(result))
        result = result.toFixed(3);

    bottomDisplay.textContent = `${result}`;

    prevOperator = '=';
    firstNum = '';
    return;
}

function evaluate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
    }
}
