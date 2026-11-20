export function splitEqually(amountCents: number, participants: string[]): Map<string, number> {
  const shares = new Map<string, number>();
  if (participants.length === 0) {
    return shares;
  }
  const base = Math.floor(amountCents / participants.length);
  const remainder = amountCents % participants.length;
  participants.forEach((name, index) => {
    const share = index < remainder ? base + 1 : base;
    shares.set(name, share);
  });
  return shares;
}
