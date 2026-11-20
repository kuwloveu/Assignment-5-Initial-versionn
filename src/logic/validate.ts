export function validateParticipantName(name: string, existing: string[]): string | null {
  const trimmed = name.trim();
  if (trimmed === "") {
    return "Name cannot be empty.";
  }
  if (existing.some((n) => n.toLowerCase() === trimmed.toLowerCase())) {
    return `"${trimmed}" is already a participant.`;
  }
  return null;
}

export function validateExpense(
  description: string,
  amount: string,
  payer: string,
  sharedBy: string[],
  participants: string[]
): string | null {
  if (description.trim() === "") {
    return "Description cannot be empty.";
  }
  const trimmed = amount.trim();
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) {
    return "Amount must be a positive number with at most 2 decimal places.";
  }
  const [wholePart, decimalPart = ""] = trimmed.split(".");
  const cents =
    parseInt(wholePart, 10) * 100 +
    (decimalPart.length === 1 ? parseInt(decimalPart, 10) * 10 : parseInt(decimalPart || "0", 10));
  if (cents <= 0) {
    return "Amount must be greater than zero.";
  }
  if (!participants.includes(payer)) {
    return "Payer must be one of the participants.";
  }
  if (sharedBy.length === 0) {
    return "At least one person must share this expense.";
  }
  return null;
}
