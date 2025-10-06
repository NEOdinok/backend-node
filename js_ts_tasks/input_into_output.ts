type TxType = "credit" | "debit";

// input
interface Transaction {
  userId: number;
  type: TxType; // "credit" or "debit"
  amount: number; // positive number
}

const transactions: Transaction[] = [
  { userId: 1, type: "credit", amount: 100 },
  { userId: 1, type: "debit", amount: 50 },
  { userId: 1, type: "credit", amount: 200 },
  { userId: 2, type: "debit", amount: 70 },
  { userId: 2, type: "credit", amount: 130 },
  { userId: 2, type: "debit", amount: 30 },
];

// output
type Output = Record<
  number,
  {
    credit: { total: number; transactions: Transaction[] };
    debit: { total: number; transactions: Transaction[] };
  }
>;

/* 
{
  1: {
    credit: {
      total: 300,
      transactions: [
        { userId: 1, type: 'credit', amount: 100 },
        { userId: 1, type: 'credit', amount: 200 }
      ]
    },
    debit: {
      total: 50,
      transactions: [
        { userId: 1, type: 'debit', amount: 50 }
      ]
    }
  },
  2: {
    credit: {
      total: 130,
      transactions: [
        { userId: 2, type: 'credit', amount: 130 }
      ]
    },
    debit: {
      total: 100,
      transactions: [
        { userId: 2, type: 'debit', amount: 70 },
        { userId: 2, type: 'debit', amount: 30 }
      ]
    }
  }
}
*/

// Example usage

console.log(JSON.stringify(groupTransactions(transactions), null, 2));

/* Your Code */
function groupTransactions(transactions: Transaction[]): Output | null {
  return null;
}
