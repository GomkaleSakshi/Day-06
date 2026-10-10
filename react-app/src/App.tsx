import { useMemo, useState } from "react";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeTable } from "./components/EmployeeTable";
import { Header } from "./components/Header";
import { StatsCards } from "./components/StatsCards";
import { useEmployees } from "./hooks/useEmployees";
import type { Employee, SortDirection, SortField } from "./types";
import "./styles/style.css";

type FormState = { mode: "create" } | { mode: "edit"; employee: Employee } | null;

export default function App() {
  const { employees, loading, error, source, addEmployee, editEmployee, removeEmployee } = useEmployees();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [formState, setFormState] = useState<FormState>(null);
  const [viewing, setViewing] = useState<Employee | null>(null);
  const [deleting, setDeleting] = useState<Employee | null>(null);
  const [notice, setNotice] = useState("");

  const departments = useMemo(() => [...new Set(employees.map((employee) => employee.department))].sort((a, b) => a.localeCompare(b)), [employees]);
  const visibleEmployees = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return employees.filter((employee) => {
      const matchesQuery = !query || [employee.name, employee.email, employee.department].some((value) => value.toLocaleLowerCase().includes(query));
      return matchesQuery && (department === "All departments" || employee.department === department);
    }).sort((first, second) => {
      const comparison = sortField === "salary"
        ? first.salary - second.salary
        : first[sortField].localeCompare(second[sortField], undefined, { sensitivity: "base" });
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [employees, search, department, sortField, sortDirection]);

  const averageSalary = employees.length ? employees.reduce((sum, employee) => sum + employee.salary, 0) / employees.length : 0;

  function changeSort(field: SortField): void {
    if (field === sortField) setSortDirection((direction) => direction === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDirection("asc"); }
  }

  function submitEmployee(input: Parameters<typeof addEmployee>[0]): void {
    try {
      if (formState?.mode === "edit") {
        editEmployee(formState.employee.id, input);
        setNotice(`${input.name}’s profile was updated.`);
      } else {
        addEmployee(input);
        setNotice(`${input.name} was added to the directory.`);
      }
      setFormState(null);
    } catch {
      setNotice("The change could not be saved in this browser. Check local storage settings and try again.");
    }
  }

  function confirmDelete(): void {
    if (!deleting) return;
    const name = deleting.name;
    try {
      removeEmployee(deleting.id);
      setNotice(`${name} was removed from the directory.`);
      setDeleting(null);
    } catch {
      setNotice("The employee could not be removed. Check local storage settings and try again.");
    }
  }

  return (
    <div className="app-shell">
      <Header onAddEmployee={() => setFormState({ mode: "create" })} employeeCount={employees.length} />
      <main className="main-content" id="directory">
        <section className="page-intro"><div><div className="eyebrow intro-eyebrow">PEOPLE OPERATIONS <span /> TEAM DIRECTORY</div><h1>People, at a glance.</h1><p>A thoughtful view of the people building Northstar.</p></div><div className="intro-date"><span className="date-mark" aria-hidden="true">◷</span><span>TEAM DIRECTORY<br /><strong>Updated just now</strong></span></div></section>
        <StatsCards employeeCount={employees.length} averageSalary={averageSalary} departmentCount={departments.length} />
        {error && <div className="status-banner status-warning" role="status"><span aria-hidden="true">!</span><div><strong>Sample directory loaded</strong><p>The demo API was unavailable ({error}). You can still manage this directory; changes are saved only in this browser.</p></div></div>}
        {source === "api" && <div className="status-banner status-info" role="status"><span aria-hidden="true">i</span><div><strong>Demo data loaded from JSONPlaceholder</strong><p>Role, department, and salary details are illustrative. Directory changes are stored locally.</p></div></div>}
        {notice && <div className="status-banner status-success" role="status"><span aria-hidden="true">✓</span><div>{notice}</div><button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}
        <section className="directory-panel" aria-labelledby="directory-title">
          <div className="directory-heading"><div><div className="eyebrow">YOUR WORKSPACE</div><h2 id="directory-title">Employee directory <span className="count-pill">{visibleEmployees.length}</span></h2></div><button className="button button-outline export-button" type="button" onClick={() => setNotice("Directory data stays in this browser; API records are demo-only.")}>◎ <span>Data source</span></button></div>
          <div className="directory-toolbar"><label className="search-field"><span aria-hidden="true" className="search-icon">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, or department" aria-label="Search employees"/><kbd>/</kbd></label><label className="filter-field"><span className="filter-label">Department</span><select value={department} onChange={(event) => setDepartment(event.target.value)} aria-label="Filter by department"><option>All departments</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></label><span className="results-count">Showing <strong>{visibleEmployees.length}</strong> of {employees.length}</span></div>
          {loading ? <div className="state-panel"><span className="loading-spinner" /><strong>Loading the directory</strong><p>Connecting to the demo employee source.</p></div> : visibleEmployees.length ? <EmployeeTable employees={visibleEmployees} sortField={sortField} sortDirection={sortDirection} onSort={changeSort} onView={setViewing} onEdit={(employee) => setFormState({ mode: "edit", employee })} onDelete={setDeleting} /> : <div className="state-panel empty-state"><span className="empty-mark" aria-hidden="true">⌕</span><strong>{employees.length ? "No employees match your search" : "Your directory is empty"}</strong><p>{employees.length ? "Try a different name or department filter." : "Add an employee to start building your directory."}</p><button className="button button-outline" type="button" onClick={() => { setSearch(""); setDepartment("All departments"); }}>Clear filters</button></div>}
          <div className="directory-footer"><span><span className="status-dot" /> Directory active</span><span>Employee data is stored in this browser</span></div>
        </section>
        <footer className="page-footer"><span>Northstar <span className="footer-dot">●</span> People Operations</span><span>INTERNAL DIRECTORY · DEMO WORKSPACE</span></footer>
      </main>
      {formState && <EmployeeForm employee={formState.mode === "edit" ? formState.employee : null} departments={departments} onSubmit={submitEmployee} onCancel={() => setFormState(null)} />}
      {viewing && <EmployeeDetails employee={viewing} onClose={() => setViewing(null)} onEdit={(employee) => { setViewing(null); setFormState({ mode: "edit", employee }); }} />}
      {deleting && <ConfirmDialog employee={deleting} onConfirm={confirmDelete} onCancel={() => setDeleting(null)} />}
    </div>
  );
}