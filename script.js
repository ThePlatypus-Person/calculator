const topDisplay = document.querySelector('.display .top');
const bottomDisplay = document.querySelector('.display .bottom');


let firstNum = '';
let result = null;
let prevOperator = null;

const buttons = document.querySelectorAll('.keyboard button');
buttons.forEach(
    button => button.addEventListener('click', runCalculator)
);


function runCalculator(e) {
    const targetClass = e.target.classList[0];
    const value = e.target.dataset.value;

    if (value === 'clear') {
        firstNum = '';
        result = null;
        prevOperator = null;
        bottomDisplay.textContent = '';
        topDisplay.textContent = '';
        return;
    }


    if (value === 'delete') {
        firstNum = firstNum.slice(0, -1);
        bottomDisplay.textContent = firstNum;
        return;
    }


    if (
        value === '=' 
        && (prevOperator !== null || prevOperator === '=')
        && firstNum !== ''
    ) {
        let tempOperator = 
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
        topDisplay.textContent = `${result} ${e.target.textContent}`;
    }
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
