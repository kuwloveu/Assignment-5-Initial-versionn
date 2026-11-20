import { describe, it, expect } from "vitest";
import { splitEqually } from "./split";

describe("splitEqually", () => {
  it("splits 10.00 three ways with remainder to first participants (AC2)", () => {
    const shares = splitEqually(1000, ["Alice", "Bob", "Carol"]);
    expect(shares.get("Alice")).toBe(334);
    expect(shares.get("Bob")).toBe(333);
    expect(shares.get("Carol")).toBe(333);
  });

  it("shares always sum exactly to the amount (AC2)", () => {
    const shares = splitEqually(999, ["Alice", "Bob", "Carol", "Dave"]);
    const sum = [...shares.values()].reduce((a, b) => a + b, 0);
    expect(sum).toBe(999);
  });

  it("splits evenly when amount divides evenly", () => {
    const shares = splitEqually(1000, ["Alice", "Bob"]);
    expect(shares.get("Alice")).toBe(500);
    expect(shares.get("Bob")).toBe(500);
  });

  it("is deterministic for the same input order", () => {
    const a = splitEqually(101, ["X", "Y", "Z"]);
    const b = splitEqually(101, ["X", "Y", "Z"]);
    expect([...a.entries()]).toEqual([...b.entries()]);
  });

  it("returns an empty map for no participants", () => {
    expect(splitEqually(100, []).size).toBe(0);
  });
});
