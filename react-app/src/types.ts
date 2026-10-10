export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  location: string;
}

export type EmployeeInput = Omit<Employee, "id">;
export type SortField = "name" | "salary" | "department";
export type SortDirection = "asc" | "desc";

export interface EmployeeLoadResult {
  employees: Employee[];
  source: "local" | "api" | "sample";
  warning?: string;
}