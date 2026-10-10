interface EmployeeSummary {
  id: number;
  name: string;
}

function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const employees: EmployeeSummary[] = [
  { id: 401, name: "Morgan Chen" },
  { id: 402, name: "Riley Brooks" },
];
const match = findById(employees, 402);

console.log("Employee lookup:", match?.name ?? "No employee found");