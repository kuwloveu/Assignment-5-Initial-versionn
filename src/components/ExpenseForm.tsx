import { useState } from "react";
import { validateExpense } from "@/logic/validate";
import { parseAmountToCents } from "@/logic/money";

interface Props {
  participants: string[];
  onAdd: (expense: {
    description: string;
    amountCents: number;
    paidBy: string;
    sharedBy: string[];
  }) => void;
}

export function ExpenseForm({ participants, onAdd }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [sharedBy, setSharedBy] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleShared = (name: string) => {
    setSharedBy((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSubmit = () => {
    const validationError = validateExpense(
      description,
      amount,
      payer,
      sharedBy,
      participants
    );
    if (validationError) {
      setError(validationError);
      return;
    }
    const amountCents = parseAmountToCents(amount);
    if (amountCents === null) {
      setError("Amount must be a positive number with at most 2 decimal places.");
      return;
    }
    setError(null);
    onAdd({ description: description.trim(), amountCents, paidBy: payer, sharedBy });
    setDescription("");
    setAmount("");
    setPayer("");
    setSharedBy([]);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">2. Add an expense</h2>
      <p className="mt-1 text-sm text-slate-500">Who paid, and who shares the cost.</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="expense-description" className="text-sm font-medium text-slate-700">
            Description
          </label>
          <input
            id="expense-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Dinner"
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="expense-amount" className="text-sm font-medium text-slate-700">
            Amount
          </label>
          <input
            id="expense-amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 12.50"
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="expense-payer" className="text-sm font-medium text-slate-700">
            Paid by
          </label>
          <select
            id="expense-payer"
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          >
            <option value="">Select a person</option>
            {participants.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="flex flex-col gap-1">
          <legend className="text-sm font-medium text-slate-700">Shared by</legend>
          {participants.length === 0 ? (
            <p className="text-sm italic text-slate-400">Add participants first.</p>
          ) : (
            <div className="flex flex-wrap gap-x-4 gap-y-1 rounded-lg border border-slate-300 px-3 py-2">
              {participants.map((p) => (
                <label key={p} className="flex items-center gap-1.5 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={sharedBy.includes(p)}
                    onChange={() => toggleShared(p)}
                    className="h-4 w-4 accent-teal-600"
                  />
                  {p}
                </label>
              ))}
            </div>
          )}
        </fieldset>
      </div>
      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 rounded-lg bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
      >
        Add expense
      </button>
    </section>
  );
}
