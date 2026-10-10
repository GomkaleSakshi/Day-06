import type { Employee } from "../types";

interface EmployeeDetailsProps {
  employee: Employee;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
}

const salaryFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function EmployeeDetails({ employee, onClose, onEdit }: EmployeeDetailsProps) {
  const initials = employee.name.split(" ").map((part) => part[0] ?? "").slice(0, 2).join("").toUpperCase();
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal details-modal" role="dialog" aria-modal="true" aria-labelledby="employee-details-title">
        <div className="modal-heading"><span className="eyebrow">EMPLOYEE PROFILE</span><button className="icon-button" type="button" onClick={onClose} aria-label="Close details">×</button></div>
        <div className="profile-summary"><div className="profile-large-avatar">{initials}</div><div><h2 id="employee-details-title">{employee.name}</h2><p>{employee.position}</p><span className="detail-department">{employee.department}</span></div></div>
        <dl className="details-list"><div><dt>Work email</dt><dd><a href={`mailto:${employee.email}`}>{employee.email}</a></dd></div><div><dt>Location</dt><dd>{employee.location}</dd></div><div><dt>Department</dt><dd>{employee.department}</dd></div><div><dt>Annual salary</dt><dd>{salaryFormat.format(employee.salary)}</dd></div><div><dt>Employee ID</dt><dd className="detail-id">{employee.id}</dd></div></dl>
        <div className="modal-actions"><button className="button button-quiet" type="button" onClick={onClose}>Close</button><button className="button button-primary" type="button" onClick={() => onEdit(employee)}>Edit profile</button></div>
      </section>
    </div>
  );
}