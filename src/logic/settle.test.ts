import { describe, it, expect } from "vitest";
import { suggestSettlements } from "./settle";
import type { Balance } from "./types";

function apply(balances: Balance[], transfers: { from: string; to: string; amountCents: number }[]): Balance[] {
  const result = balances.map((b) => ({ ...b }));
  for (const t of transfers) {
    result.find((b) => b.name === t.from)!.balanceCents += t.amountCents;
    result.find((b) => b.name === t.to)!.balanceCents -= t.amountCents;
  }
  return result;
}

describe("suggestSettlements", () => {
  it("settles a simple two-person debt", () => {
    const balances: Balance[] = [
      { name: "Alice", balanceCents: 500 },
      { name: "Bob", balanceCents: -500 },
    ];
    const transfers = suggestSettlements(balances);
    expect(transfers).toEqual([{ from: "Bob", to: "Alice", amountCents: 500 }]);
  });

  it("applying transfers zeroes every balance (AC3)", () => {
    const balances: Balance[] = [
      { name: "Alice", balanceCents: 666 },
      { name: "Bob", balanceCents: -333 },
      { name: "Carol", balanceCents: -333 },
    ];
    const settled = apply(balances, suggestSettlements(balances));
    expect(settled.every((b) => b.balanceCents === 0)).toBe(true);
  });

  it("transfer count is at most (nonzero balances - 1) (AC3)", () => {
    const balances: Balance[] = [
      { name: "Alice", balanceCents: 1000 },
      { name: "Bob", balanceCents: -400 },
      { name: "Carol", balanceCents: -600 },
    ];
    const transfers = suggestSettlements(balances);
    expect(transfers.length).toBeLessThanOrEqual(balances.length - 1);
  });

  it("returns no transfers when everyone is settled", () => {
    const balances: Balance[] = [
      { name: "Alice", balanceCents: 0 },
      { name: "Bob", balanceCents: 0 },
    ];
    expect(suggestSettlements(balances)).toEqual([]);
  });

  it("handles a complex web of debts", () => {
    const balances: Balance[] = [
      { name: "Alice", balanceCents: 1000 },
      { name: "Bob", balanceCents: -250 },
      { name: "Carol", balanceCents: -750 },
    ];
    const transfers = suggestSettlements(balances);
    const settled = apply(balances, transfers);
    expect(settled.every((b) => b.balanceCents === 0)).toBe(true);
  });
});
