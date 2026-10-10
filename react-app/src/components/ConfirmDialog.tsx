import type { Employee } from "../types";

interface ConfirmDialogProps {
  employee: Employee;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ employee, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
      <section className="modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description">
        <div className="confirm-symbol" aria-hidden="true">!</div><h2 id="delete-title">Remove this employee?</h2><p id="delete-description"><strong>{employee.name}</strong> will be removed from this directory. This change is saved in this browser.</p>
        <div className="modal-actions"><button className="button button-quiet" type="button" onClick={onCancel}>Keep employee</button><button className="button button-danger" type="button" onClick={onConfirm}>Remove employee</button></div>
      </section>
    </div>
  );
}