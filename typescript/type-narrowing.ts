type Contact =
  | { kind: "employee"; name: string; email: string }
  | { kind: "contractor"; name: string; agency: string };

function describeContact(contact: Contact): string {
  if (contact.kind === "employee") {
    return `${contact.name} can be reached at ${contact.email}.`;
  }
  return `${contact.name} is assigned through ${contact.agency}.`;
}

function isEmployee(value: Contact): value is Extract<Contact, { kind: "employee" }> {
  return value.kind === "employee";
}

function formatEmployeeCount(value: number | string): string {
  const count = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(count) || count < 0) {
    return "Employee count is invalid.";
  }
  return `${count} ${count === 1 ? "employee" : "employees"}`;
}

const contact: Contact = {
  kind: "employee",
  name: "Jamie Park",
  email: "jamie.park@example.com",
};

console.log(describeContact(contact));
console.log("Is employee:", isEmployee(contact));
console.log(formatEmployeeCount("12"));