import { describe, it, expect } from "vitest";
import { parseAmountToCents, formatCents } from "./money";

describe("parseAmountToCents", () => {
  it("parses a whole number", () => {
    expect(parseAmountToCents("10")).toBe(1000);
  });

  it("parses two decimal places", () => {
    expect(parseAmountToCents("12.50")).toBe(1250);
  });

  it("parses one decimal place as ten cents", () => {
    expect(parseAmountToCents("0.1")).toBe(10);
  });

  it("rejects non-numeric input", () => {
    expect(parseAmountToCents("abc")).toBeNull();
  });

  it("rejects more than 2 decimal places", () => {
    expect(parseAmountToCents("1.234")).toBeNull();
  });

  it("rejects zero", () => {
    expect(parseAmountToCents("0")).toBe(0);
  });
});

describe("formatCents", () => {
  it("formats 1250 as 12.50", () => {
    expect(formatCents(1250)).toBe("12.50");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("0.00");
  });

  it("formats negative amounts", () => {
    expect(formatCents(-333)).toBe("-3.33");
  });
});
