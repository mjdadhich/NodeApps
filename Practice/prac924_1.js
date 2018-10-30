function Student(name, grades){
    let student = {};
    student.name = name;
    student.grades = grades;
    
    student.addGrade = function(grade){
        student.grades.push(grade);
    }
    student.totalGrades = function(){
    let total =  0
    student.grades.forEach(item=> {
        total += item;
    })
    return total;
    }
    student.averageGrades = function(){
        return student.totalGrades()/student.grades.length;
    }
    return student;
}

let student1 = new Student('Bob',[]);
console.log(student1.name);
student1.addGrade(100);
student1.addGrade(80);

console.log(student1.totalGrades());
console.log(student1.averageGrades());