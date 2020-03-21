function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const prior = { '-': 0, '+': 0, '*': 1, '/': 1 }
    const actions = {
        '-': (a, b) => { return a - b },
        '*': (a, b) => { return a * b },
        '+': (a, b) => { return +a + +b },
        '/': (a, b) => { return a / b },
    };

    let numbers = [];
    let signs = [];

    if (expr.split('').includes(' ') === false) expr = expr.split('').join(' ').trim();

    let openBracets = expr.split('').filter(el => el === '(').length;
    let closeBracets = expr.split('').filter(el => el === ')').length;
    if (openBracets !== closeBracets) throw new Error('ExpressionError: Brackets must be paired');

    let exprArray = expr.split(" ");
    while (exprArray.includes("")) exprArray.splice(exprArray.indexOf(""), 1);

    exprArray.forEach(el => {
        if (/[0-9]/.test(el)) numbers.push(el);
        else if (el === ")") {
            while (signs[signs.length - 1] !== '(') {
                let lastOperation = signs.pop();
                let b = numbers.pop();
                let a = numbers.pop();
                if (lastOperation == '/' && b == 0) throw new Error("TypeError: Division by zero.");
                numbers.push(actions[lastOperation](a, b));
            }
            signs.pop();
        } else if (el === '(' || prior[signs[signs.length - 1]] < prior[el]) signs.push(el);
        else {
            while (prior[el] <= prior[signs[signs.length - 1]]) {
                let lastOperation = signs.pop();
                let b = numbers.pop();
                let a = numbers.pop();
                if (lastOperation == '/' && b == 0) throw new Error("TypeError: Division by zero.");
                numbers.push(actions[lastOperation](a, b));
            }
            signs.push(el);
        }
    })
    while (signs.length > 0) {
        let lastOperation = signs.pop();
        let b = numbers.pop();
        let a = numbers.pop();
        if (lastOperation == '/' && b == 0) throw new Error("TypeError: Division by zero.");
        numbers.push(actions[lastOperation](a, b));
    }
    return Number(numbers.join())
}

module.exports = {
    expressionCalculator
}