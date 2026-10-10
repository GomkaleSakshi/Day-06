interface HeaderProps {
  onAddEmployee: () => void;
  employeeCount: number;
}

export function Header({ onAddEmployee, employeeCount }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">N</div>
        <span>northstar<span className="brand-dot">.</span></span>
      </div>
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="nav-link nav-link-active" href="#directory">People</a>
        <span className="nav-divider" />
        <span className="nav-context">Workspace / Directory</span>
      </nav>
      <div className="topbar-actions">
        <span className="team-count">{employeeCount} people</span>
        <button className="button button-primary button-small" onClick={onAddEmployee} type="button">
          <span className="button-plus" aria-hidden="true">+</span> Add employee
        </button>
        <div className="profile-avatar" aria-label="Signed in as Alex Morgan">AM</div>
      </div>
    </header>
  );
}