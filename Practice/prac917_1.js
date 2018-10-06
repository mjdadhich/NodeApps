function convert(temp, toScale){
if (toScale === 'C'){
    return (temp - 32)/1.8; 
}
else if (toScale === 'F'){
    return (temp * 1.8 + 32);
}
else {
    return 'Invalid scale';
}
}

console.log(convert(32, 'C'));
console.log(convert(100, 'G'));