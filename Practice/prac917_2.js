function range(num1, num2){
    if ((num1 < 40 ) || (num1 > 60) || (num2 < 40) || (num2 > 60))
    {
    return 'out of range';
    }
    if (num1 > num2){
        return "num1 is greater than num2: "   +num1
    }
    else if (num2 > num1){
        return 'num2 is greater than num1: ' +num2
    }
    else{
        return 'num1 is equal to num2'
    } 
}

console.log(range(55, 45));