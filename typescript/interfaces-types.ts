interface EmployeeProfile {
  id: number;
  name: string;
  department: string;
  email: string;
  manager?: string;
}

type EmployeeStatus = "active" | "on-leave" | "departed";

enum WorkMode {
  Office = "Office",
  Hybrid = "Hybrid",
  Remote = "Remote",
}

const profile: EmployeeProfile = {
  id: 203,
  name: "Casey Patel",
  department: "Design",
  email: "casey.patel@example.com",
};
const status: EmployeeStatus = "active";
const workMode: WorkMode = WorkMode.Hybrid;

console.log(`${profile.name} is ${status} in ${profile.department}.`);
console.log("Manager:", profile.manager ?? "Not assigned");
console.log("Work mode:", workMode);