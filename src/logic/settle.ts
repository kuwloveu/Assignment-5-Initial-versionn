import type { Balance, Transfer } from "./types";

export function suggestSettlements(balances: Balance[]): Transfer[] {
  const debtors = balances
    .filter((b) => b.balanceCents < 0)
    .map((b) => ({ name: b.name, cents: -b.balanceCents }));
  const creditors = balances
    .filter((b) => b.balanceCents > 0)
    .map((b) => ({ name: b.name, cents: b.balanceCents }));
  const transfers: Transfer[] = [];

  while (debtors.length > 0 && creditors.length > 0) {
    debtors.sort((a, b) => b.cents - a.cents);
    creditors.sort((a, b) => b.cents - a.cents);
    const debtor = debtors[0];
    const creditor = creditors[0];
    const amount = Math.min(debtor.cents, creditor.cents);
    transfers.push({ from: debtor.name, to: creditor.name, amountCents: amount });
    debtor.cents -= amount;
    creditor.cents -= amount;
    if (debtor.cents === 0) debtors.shift();
    if (creditor.cents === 0) creditors.shift();
  }
  return transfers;
}
