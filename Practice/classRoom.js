let Student = require('./test');
let Roster = require('./roster');

let student1 = new Student('Bob');
student1.addGrade(75);
student1.addGrade(100);
let student2 = new Student('Sue');
student2.addGrade(90);
student2.addGrade(100);

let roster = new Roster();
roster.addStudent(student1);
roster.addStudent(student2);
console.log(student1.name, student2.name);
console.log(roster.calcGrades());