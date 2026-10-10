import { useEffect, useState } from "react";
import type { Employee, EmployeeInput, EmployeeLoadResult } from "../types";
import { createEmployee, deleteEmployee, loadEmployees, updateEmployee } from "../services/employeeService";

interface UseEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string;
  source: EmployeeLoadResult["source"] | null;
  addEmployee: (input: EmployeeInput) => void;
  editEmployee: (id: string, input: EmployeeInput) => void;
  removeEmployee: (id: string) => void;
}

export function useEmployees(): UseEmployeesResult {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [source, setSource] = useState<UseEmployeesResult["source"]>(null);

  useEffect(() => {
    let active = true;
    loadEmployees().then((result) => {
      if (!active) return;
      setEmployees(result.employees);
      setSource(result.source);
      setError(result.warning ?? "");
    }).catch((loadError: unknown) => {
      if (!active) return;
      setError(loadError instanceof Error ? loadError.message : "Employees could not be loaded.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  function addEmployee(input: EmployeeInput): void {
    setEmployees((current) => createEmployee(input, current));
    setError("");
  }

  function editEmployee(id: string, input: EmployeeInput): void {
    setEmployees((current) => updateEmployee(id, input, current));
    setError("");
  }

  function removeEmployee(id: string): void {
    setEmployees((current) => deleteEmployee(id, current));
    setError("");
  }

  return { employees, loading, error, source, addEmployee, editEmployee, removeEmployee };
}