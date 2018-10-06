function math(expression){
    var parts = expression.split (" ");
    switch(parts[1]){
        case "+":
            return parseFloat(parts[0]) + parseFloat(parts[2]);
            break;
        case "-":
            return parts [0] - parts [2];
            break;
        case "*":
            return parts [0] * parts [2];
            break;
        case "/":
            return parts [0] / parts [2];
            break;
        default:
            return "invalid expression";
    }
}

console.log(math("4 + 5"));
console.log(math("4 * 5"));