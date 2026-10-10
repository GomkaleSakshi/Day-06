import { useState, type FormEvent } from "react";
import type { Employee, EmployeeInput } from "../types";

interface EmployeeFormProps {
  employee: Employee | null;
  departments: string[];
  onSubmit: (input: EmployeeInput) => void;
  onCancel: () => void;
}

type FormValues = EmployeeInput;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = { name: "", email: "", department: "", position: "", salary: 0, location: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Enter a name with at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid work email address.";
  if (!values.department.trim()) errors.department = "Choose or enter a department.";
  if (values.position.trim().length < 2) errors.position = "Enter a position with at least 2 characters.";
  if (!Number.isFinite(values.salary) || values.salary < 1) errors.salary = "Salary must be greater than $0.";
  if (values.location.trim().length < 2) errors.location = "Enter a location.";
  return errors;
}

export function EmployeeForm({ employee, departments, onSubmit, onCancel }: EmployeeFormProps) {
  const [values, setValues] = useState<FormValues>(employee ? {
    name: employee.name,
    email: employee.email,
    department: employee.department,
    position: employee.position,
    salary: employee.salary,
    location: employee.location,
  } : emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]): void {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit({ ...values, name: values.name.trim(), email: values.email.trim(), department: values.department.trim(), position: values.position.trim(), location: values.location.trim() });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
      <section className="modal form-modal" role="dialog" aria-modal="true" aria-labelledby="employee-form-title">
        <div className="modal-heading"><div><span className="eyebrow">PEOPLE DIRECTORY</span><h2 id="employee-form-title">{employee ? "Edit employee" : "Add an employee"}</h2><p>Keep the team directory up to date.</p></div><button className="icon-button" type="button" onClick={onCancel} aria-label="Close form">×</button></div>
        <form onSubmit={submit} noValidate>
          <div className="form-grid">
            <label className="field"><span>Full name</span><input autoFocus value={values.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Jordan Lee" aria-invalid={Boolean(errors.name)} />{errors.name && <small className="field-error">{errors.name}</small>}</label>
            <label className="field"><span>Work email</span><input type="email" value={values.email} onChange={(event) => update("email", event.target.value)} placeholder="jordan@company.com" aria-invalid={Boolean(errors.email)} />{errors.email && <small className="field-error">{errors.email}</small>}</label>
            <label className="field"><span>Department</span><input list="department-options" value={values.department} onChange={(event) => update("department", event.target.value)} placeholder="Choose or enter" aria-invalid={Boolean(errors.department)} /><datalist id="department-options">{departments.map((department) => <option key={department} value={department} />)}</datalist>{errors.department && <small className="field-error">{errors.department}</small>}</label>
            <label className="field"><span>Position</span><input value={values.position} onChange={(event) => update("position", event.target.value)} placeholder="e.g. Product Designer" aria-invalid={Boolean(errors.position)} />{errors.position && <small className="field-error">{errors.position}</small>}</label>
            <label className="field"><span>Annual salary (USD)</span><input type="number" min="1" step="1000" value={values.salary || ""} onChange={(event) => update("salary", Number(event.target.value))} placeholder="85000" aria-invalid={Boolean(errors.salary)} />{errors.salary && <small className="field-error">{errors.salary}</small>}</label>
            <label className="field"><span>Location</span><input value={values.location} onChange={(event) => update("location", event.target.value)} placeholder="City, State or Remote" aria-invalid={Boolean(errors.location)} />{errors.location && <small className="field-error">{errors.location}</small>}</label>
          </div>
          <div className="modal-actions"><button className="button button-quiet" type="button" onClick={onCancel}>Cancel</button><button className="button button-primary" type="submit">{employee ? "Save changes" : "Add employee"}</button></div>
        </form>
      </section>
    </div>
  );
}