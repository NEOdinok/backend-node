// input
const transactions: any = [
  { userId: 1, type: "credit", amount: 100 },
  { userId: 1, type: "debit", amount: 50 },
  { userId: 1, type: "credit", amount: 200 },
  { userId: 2, type: "debit", amount: 70 },
  { userId: 2, type: "credit", amount: 130 },
  { userId: 2, type: "debit", amount: 30 },
];

// output

// output
// {
//   1: {
//     credit: {
//       total: 300,
//       transactions: [
//         { userId: 1, type: "credit", amount: 100 },
//         { userId: 1, type: "credit", amount: 200 }
//       ]
//     },
//     debit: {
//       total: 50,
//       transactions: [
//         { userId: 1, type: "debit", amount: 50 }
//       ]
//     }
//   },
//   2: {
//     credit: {
//       total: 130,
//       transactions: [
//         { userId: 2, type: "credit", amount: 130 }
//       ]
//     },
//     debit: {
//       total: 100,
//       transactions: [
//         { userId: 2, type: "debit", amount: 70 },
//         { userId: 2, type: "debit", amount: 30 }
//       ]
//     }
//   }
// }
