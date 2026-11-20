import { useState } from "react";
import { ParticipantsSection } from "@/components/ParticipantsSection";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { SummarySection } from "@/components/SummarySection";
import { validateParticipantName } from "@/logic/validate";
import { computeBalances } from "@/logic/balances";
import { suggestSettlements } from "@/logic/settle";
import type { Expense } from "@/logic/types";

function App() {
  const [participants, setParticipants] = useState<string[]>(["Alice", "Bob"]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addParticipant = (name: string): string | null => {
    const error = validateParticipantName(name, participants);
    if (error) return error;
    setParticipants([...participants, name.trim()]);
    return null;
  };

  const removeParticipant = (name: string) => {
    setParticipants(participants.filter((p) => p !== name));
    setExpenses(
      expenses
        .filter((e) => e.paidBy !== name)
        .map((e) => ({ ...e, sharedBy: e.sharedBy.filter((s) => s !== name) }))
        .filter((e) => e.sharedBy.length > 0)
    );
  };

  const addExpense = (expense: Omit<Expense, "id">) => {
    setExpenses([...expenses, { ...expense, id: crypto.randomUUID() }]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const balances = computeBalances(expenses);
  const transfers = suggestSettlements(balances);

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto w-full max-w-2xl px-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Expense Splitter
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Record who paid what, then settle up with the fewest payments.
          </p>
        </header>
        <main className="space-y-6">
          <ParticipantsSection
            participants={participants}
            onAdd={addParticipant}
            onRemove={removeParticipant}
          />
          <ExpenseForm participants={participants} onAdd={addExpense} />
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          <SummarySection balances={balances} transfers={transfers} />
        </main>
      </div>
    </div>
  );
}

export default App;
