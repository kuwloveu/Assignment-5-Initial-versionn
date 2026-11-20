import { formatCents } from "@/logic/money";
import type { Expense } from "@/logic/types";

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">3. Expenses</h2>
      {expenses.length === 0 ? (
        <p className="mt-3 text-sm italic text-slate-400">No expenses yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {expenses.map((e) => (
            <li key={e.id} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{e.description}</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  Paid by {e.paidBy} · shared by {e.sharedBy.join(", ")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-semibold tabular-nums text-slate-900">
                  {formatCents(e.amountCents)}
                </span>
                <button
                  type="button"
                  onClick={() => onDelete(e.id)}
                  aria-label={`Delete ${e.description}`}
                  className="rounded-lg px-2 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
