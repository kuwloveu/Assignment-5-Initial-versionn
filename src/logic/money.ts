export function parseAmountToCents(input: string): number | null {
  const trimmed = input.trim();
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) {
    return null;
  }
  const [wholePart, decimalPart = ""] = trimmed.split(".");
  const whole = parseInt(wholePart, 10);
  const decimal = decimalPart.length === 0 ? 0 : decimalPart.length === 1 ? parseInt(decimalPart, 10) * 10 : parseInt(decimalPart, 10);
  return whole * 100 + decimal;
}

export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100);
  const remainder = abs % 100;
  return `${sign}${whole}.${String(remainder).padStart(2, "0")}`;
}
