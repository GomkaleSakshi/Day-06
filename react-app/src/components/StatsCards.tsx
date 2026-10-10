interface StatsCardsProps {
  employeeCount: number;
  averageSalary: number;
  departmentCount: number;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function StatsCards({ employeeCount, averageSalary, departmentCount }: StatsCardsProps) {
  return (
    <section className="stats-grid" aria-label="Workforce overview">
      <article className="stat-card stat-card-mint">
        <div className="stat-topline"><span>Total employees</span><span className="stat-glyph glyph-people" aria-hidden="true">↗</span></div>
        <div className="stat-value">{employeeCount.toLocaleString()}</div>
        <div className="stat-foot"><span className="status-dot" /> Current directory</div>
      </article>
      <article className="stat-card stat-card-ivory">
        <div className="stat-topline"><span>Average salary</span><span className="stat-glyph" aria-hidden="true">$</span></div>
        <div className="stat-value">{currency.format(averageSalary)}</div>
        <div className="stat-foot">Annualized across directory</div>
      </article>
      <article className="stat-card stat-card-lilac">
        <div className="stat-topline"><span>Departments</span><span className="stat-glyph" aria-hidden="true">▦</span></div>
        <div className="stat-value">{departmentCount.toString().padStart(2, "0")}</div>
        <div className="stat-foot">Represented in this workspace</div>
      </article>
    </section>
  );
}