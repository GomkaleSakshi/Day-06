import type { Employee, SortDirection, SortField } from "../types";

interface EmployeeTableProps {
  employees: Employee[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const salaryFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const initials = (name: string): string => name.split(" ").map((part) => part[0] ?? "").slice(0, 2).join("").toUpperCase();

function SortableHeading({ field, current, direction, onSort, children }: {
  field: SortField;
  current: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  children: React.ReactNode;
}) {
  return (
    <button className="sort-heading" type="button" onClick={() => onSort(field)} aria-label={`Sort by ${field}`}>
      {children}<span className="sort-indicator">{current === field ? direction === "asc" ? "↑" : "↓" : "↕"}</span>
    </button>
  );
}

export function EmployeeTable({ employees, sortField, sortDirection, onSort, onView, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <div className="table-scroll">
      <table className="employee-table">
        <thead><tr>
          <th><SortableHeading field="name" current={sortField} direction={sortDirection} onSort={onSort}>Employee</SortableHeading></th>
          <th><SortableHeading field="department" current={sortField} direction={sortDirection} onSort={onSort}>Department</SortableHeading></th>
          <th>Location</th>
          <th><SortableHeading field="salary" current={sortField} direction={sortDirection} onSort={onSort}>Salary</SortableHeading></th>
          <th><span className="sr-only">Actions</span></th>
        </tr></thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id} style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}>
              <td>
                <button className="employee-cell" type="button" onClick={() => onView(employee)}>
                  <span className={`employee-avatar avatar-${index % 6}`}>{initials(employee.name)}</span>
                  <span className="employee-name-stack"><span className="employee-name">{employee.name}</span><span className="employee-position">{employee.position}</span></span>
                </button>
              </td>
              <td><span className="department-label"><span className={`department-dot department-${employee.department.toLowerCase().replace(/[^a-z]/g, "")}`} />{employee.department}</span></td>
              <td className="location-cell">{employee.location}</td>
              <td className="salary-cell">{salaryFormat.format(employee.salary)}</td>
              <td>
                <div className="row-actions">
                  <button type="button" aria-label={`View ${employee.name}`} title="View details" onClick={() => onView(employee)}>↗</button>
                  <button type="button" aria-label={`Edit ${employee.name}`} title="Edit employee" onClick={() => onEdit(employee)}>✎</button>
                  <button type="button" aria-label={`Delete ${employee.name}`} title="Delete employee" onClick={() => onDelete(employee)}>×</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}