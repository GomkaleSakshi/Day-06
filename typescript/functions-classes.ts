interface EmployeeRecord {
  name: string;
  salary: number;
}

function formatSalary(employee: EmployeeRecord): string {
  return `${employee.name}: $${employee.salary.toLocaleString()} per year`;
}

const giveRaise = (employee: EmployeeRecord, amount: number): EmployeeRecord => ({
  ...employee,
  salary: employee.salary + amount,
});

class Employee {
  constructor(
    public readonly id: number,
    public name: string,
    public department: string,
  ) {}

  introduce(): string {
    return `${this.name} works in ${this.department}.`;
  }
}

const employee = new Employee(304, "Taylor Kim", "People Operations");
const analyst = { name: "Taylor Kim", salary: 72000 };

console.log(employee.introduce());
console.log(formatSalary(analyst));
console.log("After raise:", formatSalary(giveRaise(analyst, 3000)));