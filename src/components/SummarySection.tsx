import { formatCents } from "@/logic/money";
import type { Balance, Transfer } from "@/logic/types";

interface Props {
  balances: Balance[];
  transfers: Transfer[];
}

export function SummarySection({ balances, transfers }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">4. Balances &amp; settlements</h2>
      {balances.length === 0 ? (
        <p className="mt-3 text-sm italic text-slate-400">Add participants and expenses to see balances.</p>
      ) : (
        <>
          <ul className="mt-4 space-y-1">
            {balances.map((b) => (
              <li key={b.name} className="flex items-center justify-between py-1">
                <span className="text-slate-700">{b.name}</span>
                <span
                  className={
                    "font-semibold tabular-nums " +
                    (b.balanceCents > 0
                      ? "text-emerald-600"
                      : b.balanceCents < 0
                        ? "text-red-600"
                        : "text-slate-400")
                  }
                >
                  {b.balanceCents > 0 ? "+" : ""}
                  {formatCents(b.balanceCents)}
                </span>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Suggested settlements
          </h3>
          {transfers.length === 0 ? (
            <p className="mt-2 text-sm italic text-slate-400">Everyone is settled up.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {transfers.map((t, i) => (
                <li key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-slate-900">
                  <span className="font-medium">{t.from}</span> pays{" "}
                  <span className="font-medium">{t.to}</span>: {formatCents(t.amountCents)}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
