import { describe, it, expect } from "vitest";
import { computeBalances } from "./balances";
import type { Expense } from "./types";

function makeExpense(partial: Partial<Expense>): Expense {
  return {
    id: "e1",
    description: "Dinner",
    amountCents: 1000,
    paidBy: "Alice",
    sharedBy: ["Alice", "Bob"],
    ...partial,
  };
}

describe("computeBalances", () => {
  it("sum of all balances is exactly 0 (AC1)", () => {
    const expenses = [
      makeExpense({ id: "1", paidBy: "Alice", sharedBy: ["Alice", "Bob", "Carol"], amountCents: 1000 }),
      makeExpense({ id: "2", paidBy: "Bob", sharedBy: ["Bob", "Carol"], amountCents: 501 }),
    ];
    const total = computeBalances(expenses).reduce((sum, b) => sum + b.balanceCents, 0);
    expect(total).toBe(0);
  });

  it("a lone payer who shares alone has zero balance", () => {
    const balances = computeBalances([makeExpense({ paidBy: "Alice", sharedBy: ["Alice"] })]);
    expect(balances.find((b) => b.name === "Alice")?.balanceCents).toBe(0);
  });

  it("payer is owed and sharers owe", () => {
    const balances = computeBalances([
      makeExpense({ paidBy: "Alice", sharedBy: ["Alice", "Bob"], amountCents: 1000 }),
    ]);
    expect(balances.find((b) => b.name === "Alice")?.balanceCents).toBe(500);
    expect(balances.find((b) => b.name === "Bob")?.balanceCents).toBe(-500);
  });

  it("handles uneven three-way split in integer cents", () => {
    const balances = computeBalances([
      makeExpense({ paidBy: "Alice", sharedBy: ["Alice", "Bob", "Carol"], amountCents: 1000 }),
    ]);
    expect(balances.find((b) => b.name === "Alice")?.balanceCents).toBe(666);
    expect(balances.find((b) => b.name === "Bob")?.balanceCents).toBe(-333);
    expect(balances.find((b) => b.name === "Carol")?.balanceCents).toBe(-333);
  });
});
