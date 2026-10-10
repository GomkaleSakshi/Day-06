import type { Employee, EmployeeInput, EmployeeLoadResult } from "../types";

const STORAGE_KEY = "day06-employees-v1";
const API_URL = "https://jsonplaceholder.typicode.com/users";

const sampleEmployees: Employee[] = [
  { id: "emp-1001", name: "Olivia Bennett", email: "olivia.bennett@northstar.example", department: "Engineering", position: "Senior Software Engineer", salary: 128000, location: "Seattle, WA" },
  { id: "emp-1002", name: "Ethan Brooks", email: "ethan.brooks@northstar.example", department: "Product", position: "Product Manager", salary: 116000, location: "Austin, TX" },
  { id: "emp-1003", name: "Maya Chen", email: "maya.chen@northstar.example", department: "Design", position: "Product Designer", salary: 98000, location: "Portland, OR" },
  { id: "emp-1004", name: "Noah Williams", email: "noah.williams@northstar.example", department: "People", position: "People Operations Partner", salary: 87000, location: "Chicago, IL" },
  { id: "emp-1005", name: "Ava Patel", email: "ava.patel@northstar.example", department: "Finance", position: "Financial Analyst", salary: 92000, location: "New York, NY" },
  { id: "emp-1006", name: "Liam Garcia", email: "liam.garcia@northstar.example", department: "Engineering", position: "Frontend Engineer", salary: 108000, location: "Denver, CO" },
  { id: "emp-1007", name: "Isabella Reed", email: "isabella.reed@northstar.example", department: "Marketing", position: "Content Strategist", salary: 82000, location: "Boston, MA" },
  { id: "emp-1008", name: "Lucas Kim", email: "lucas.kim@northstar.example", department: "Sales", position: "Account Executive", salary: 95000, location: "San Diego, CA" },
  { id: "emp-1009", name: "Amara Johnson", email: "amara.johnson@northstar.example", department: "Operations", position: "Operations Manager", salary: 103000, location: "Atlanta, GA" },
  { id: "emp-1010", name: "Theo Martin", email: "theo.martin@northstar.example", department: "Design", position: "UX Researcher", salary: 101000, location: "Remote" },
];

interface DemoUser {
  id: number;
  name: string;
  email: string;
  address: { city: string };
}

function readSavedEmployees(): Employee[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every(isEmployee)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function isEmployee(value: unknown): value is Employee {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === "string"
    && typeof record.name === "string"
    && typeof record.email === "string"
    && typeof record.department === "string"
    && typeof record.position === "string"
    && typeof record.salary === "number"
    && typeof record.location === "string";
}

function saveEmployees(employees: Employee[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

async function fetchDemoEmployees(): Promise<Employee[]> {
  const response = await fetch(API_URL, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Demo API returned ${response.status}.`);
  const users: DemoUser[] = await response.json() as DemoUser[];
  if (!Array.isArray(users) || users.length < sampleEmployees.length) {
    throw new Error("Demo API returned an unexpected employee list.");
  }

  return sampleEmployees.map((sample, index) => {
    const user = users[index];
    return {
      ...sample,
      id: `api-${user.id}`,
      name: user.name,
      email: user.email,
      location: user.address.city,
    };
  });
}

export async function loadEmployees(): Promise<EmployeeLoadResult> {
  const saved = readSavedEmployees();
  if (saved) return { employees: saved, source: "local" };

  try {
    const employees = await fetchDemoEmployees();
    saveEmployees(employees);
    return { employees, source: "api" };
  } catch (error) {
    return {
      employees: sampleEmployees,
      source: "sample",
      warning: error instanceof Error ? error.message : "The demo API could not be reached.",
    };
  }
}

export function createEmployee(input: EmployeeInput, employees: Employee[]): Employee[] {
  const employee: Employee = { ...input, id: `emp-${crypto.randomUUID()}` };
  const updated = [employee, ...employees];
  saveEmployees(updated);
  return updated;
}

export function updateEmployee(id: string, input: EmployeeInput, employees: Employee[]): Employee[] {
  const updated = employees.map((employee) => employee.id === id ? { ...input, id } : employee);
  saveEmployees(updated);
  return updated;
}

export function deleteEmployee(id: string, employees: Employee[]): Employee[] {
  const updated = employees.filter((employee) => employee.id !== id);
  saveEmployees(updated);
  return updated;
}