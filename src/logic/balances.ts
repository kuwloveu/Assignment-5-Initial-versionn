import type { Balance, Expense } from "./types";

export function computeBalances(expenses: Expense[]): Balance[] {
  const net = new Map<string, number>();
  for (const expense of expenses) {
    const shareCount = expense.sharedBy.length;
    if (shareCount === 0) {
      continue;
    }
    const base = Math.floor(expense.amountCents / shareCount);
    const remainder = expense.amountCents % shareCount;
    expense.sharedBy.forEach((name, index) => {
      const share = index < remainder ? base + 1 : base;
      net.set(name, (net.get(name) ?? 0) - share);
    });
    net.set(expense.paidBy, (net.get(expense.paidBy) ?? 0) + expense.amountCents);
  }
  return [...net.entries()]
    .map(([name, balanceCents]) => ({ name, balanceCents }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
