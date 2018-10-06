function replaceString(string1, string2, string3){
    return string1.replace(/l/g,"t");
    //return string1.split(string2).join(string3);
}

console.log(replaceString('Hello World', 'l', 't'));