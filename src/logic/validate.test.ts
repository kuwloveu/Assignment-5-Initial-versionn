import { describe, it, expect } from "vitest";
import { validateParticipantName, validateExpense } from "./validate";

describe("validateParticipantName", () => {
  it("rejects empty name (AC4)", () => {
    expect(validateParticipantName("  ", [])).toMatch(/empty/i);
  });

  it("rejects duplicates (AC4)", () => {
    expect(validateParticipantName("Alice", ["Alice"])).toMatch(/already/i);
  });

  it("accepts a new name", () => {
    expect(validateParticipantName("Bob", ["Alice"])).toBeNull();
  });
});

describe("validateExpense", () => {
  const participants = ["Alice", "Bob", "Carol"];

  it("rejects non-numeric amount (AC4)", () => {
    expect(validateExpense("Dinner", "abc", "Alice", ["Alice"], participants)).toMatch(/number/i);
  });

  it("rejects non-positive amount (AC4)", () => {
    expect(validateExpense("Dinner", "0", "Alice", ["Alice"], participants)).toMatch(/greater than zero/i);
  });

  it("rejects more than 2 decimal places (AC4)", () => {
    expect(validateExpense("Dinner", "10.123", "Alice", ["Alice"], participants)).toMatch(/2 decimal/i);
  });

  it("rejects payer not in participant list (AC4)", () => {
    expect(validateExpense("Dinner", "10", "Zed", ["Alice"], participants)).toMatch(/payer/i);
  });

  it("rejects empty shared-by list (AC4)", () => {
    expect(validateExpense("Dinner", "10", "Alice", [], participants)).toMatch(/at least one/i);
  });

  it("accepts a valid expense", () => {
    expect(validateExpense("Dinner", "10.50", "Alice", ["Alice", "Bob"], participants)).toBeNull();
  });
});
