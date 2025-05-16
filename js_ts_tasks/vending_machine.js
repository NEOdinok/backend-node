/**
 * --------------------------------------------------------------
 *  Coffee Machine – HackerRank-style Challenge
 * --------------------------------------------------------------
 * The vending machine accepts ONLY these coin denominations:
 *    1, 2, 5, 10, 20 and 50 cents
 *
 * It offers three coffees, priced in **cents**:
 *    • americano  –  95
 *    • latte      – 126
 *    • cappuccino – 233
 *
 * Your task is to write a function that:
 *  1. Validates the money a user inserts.
 *  2. Verifies the requested coffee type.
 *  3. If funds are sufficient, returns the change using the
 *     SMALLEST POSSIBLE NUMBER OF COINS.
 *
 * Input handed to the function by the judge:
 *  - paidCoins  (string) – comma-separated list like "50,20,5"
 *  - coffeeType (string) – coffee name (case-insensitive)
 *
 * Output (string):
 *  • ""                → exact amount paid, no change
 *  • "50,20,20"        → list of change coins, comma-separated
 *  • "Exception"       → any invalid input or insufficient funds
 */

/* --------------------------------------------------------------
 *  Solution
 * -------------------------------------------------------------- */
function coffeeMachine(paidCoins, coffeeType) {
  /* ---- constants ---- */
  const PRICES = { americano: 95, latte: 126, cappuccino: 233 };
  const COINS_DESC = [50, 20, 10, 5, 2, 1]; // greedy order
  const COIN_SET = new Set(COINS_DESC);

  /* ---- 1. basic type checks ---- */
  if (typeof paidCoins !== "string" || typeof coffeeType !== "string") {
    return "Exception";
  }

  /* ---- 2. parse the coin list ---- */
  const wallet = [];
  for (const token of paidCoins.split(",")) {
    const trimmed = token.trim();
    if (trimmed === "") continue; // ignore empties
    const value = Number(trimmed);
    if (!Number.isInteger(value) || !COIN_SET.has(value)) return "Exception";
    wallet.push(value);
  }
  if (wallet.length === 0) return "Exception"; // no coins inserted

  /* ---- 3. normalise coffee key & validate ---- */
  const key = coffeeType.trim().toLowerCase();
  if (!(key in PRICES)) return "Exception";
  const price = PRICES[key];

  /* ---- 4. check total inserted ---- */
  const totalPaid = wallet.reduce((s, v) => s + v, 0);
  if (totalPaid < price) return "Exception";

  let change = totalPaid - price;
  if (change === 0) return ""; // exact payment

  /* ---- 5. make change with greedy algorithm ---- */
  const changeCoins = [];
  for (const coin of COINS_DESC) {
    while (change >= coin) {
      change -= coin;
      changeCoins.push(coin);
    }
  }
  // defensive guard (should be zero with canonical coin set)
  if (change !== 0) return "Exception";

  return changeCoins.join(",");
}

/* --------------------------------------------------------------
 *  Step-by-Step Explanation
 * --------------------------------------------------------------
 * 1️⃣  **Constants**
 *     • `PRICES` maps each coffee to its cost in cents.
 *     • `COINS_DESC` is the list of valid coins, largest → smallest,
 *       letting us apply a greedy algorithm that is optimal for this
 *       canonical coin system.
 *
 * 2️⃣  **Input validation & parsing**
 *     • Both inputs must be strings.
 *     • We split `paidCoins` by commas, trim, and turn each token into
 *       a number; every coin must be one of the allowed denominations.
 *     • Empty strings (double commas or leading/trailing comma) are
 *       tolerated and ignored.
 *
 * 3️⃣  **Coffee validation**
 *     • `coffeeType` is lower-cased and matched against `PRICES`.
 *
 * 4️⃣  **Sufficiency check**
 *     • If the sum of inserted coins is less than the coffee price,
 *       we immediately return `"Exception"`.
 *
 * 5️⃣  **Making change**
 *     • Compute `change = totalPaid − price`.
 *     • If `change` is zero → exact payment → return empty string.
 *     • Otherwise iterate over `COINS_DESC`; for each coin, keep taking
 *       that coin while it fits.
 *       Because the denominations are canonical (each coin is a multiple
 *       of all smaller coins), the greedy strategy always yields the
 *       minimum number of coins.
 *
 * 6️⃣  **Return value**
 *     • Comma-joined list of coins for change, `"Exception"` on any
 *       invalid scenario, or `""` when no change is due.
 *
 * ⚙️  **Complexities**
 *     • Time: O(k) where k = coins inserted + coins returned.
 *     • Space: O(1) extra – we keep just a small array for change.
 */
