export interface Expense {
  id: string;
  description: string;
  amountCents: number;
  paidBy: string;
  sharedBy: string[];
}

export interface Balance {
  name: string;
  balanceCents: number;
}

export interface Transfer {
  from: string;
  to: string;
  amountCents: number;
}
