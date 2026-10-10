const employeeName: string = "Avery Morgan";
const employeeAge: number = 29;
const isFullTime: boolean = true;
const officeLocation: string | null = "Seattle";

console.log("Employee:", employeeName);
console.log("Age:", employeeAge);
console.log("Full-time:", isFullTime);
console.log("Office:", officeLocation ?? "Not assigned");