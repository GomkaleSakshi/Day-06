const employee = {
  id: 101,
  name: "Jordan Lee",
  department: "Engineering",
  skills: ["TypeScript", "React", "Testing"],
};

const team = [employee, { ...employee, id: 102, name: "Sam Rivera" }];

console.log(`${employee.name} works in ${employee.department}.`);
console.log("Skills:", employee.skills.join(", "));
console.log("Team:", team.map((member) => member.name).join(" and "));