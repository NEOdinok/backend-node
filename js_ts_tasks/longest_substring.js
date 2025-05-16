/**
 * Task: Longest Ascending Subsequence
 *
 * You are given an array where the first element is the size of the array,
 * followed by the actual elements.
 *
 * Example input: [6, 1, 2, 1, 3, 4, 1]
 * - 6 is the array size (number of following elements)
 * - [1, 2, 1, 3, 4, 1] are the elements
 *
 * Your task is to find the **first longest strictly increasing subsequence**
 * and return the following string:
 *
 * subsequence: <comma-separated elements>
 * first: <1-based starting index in the original array>
 * last: <1-based ending index in the original array>
 *
 * If input is invalid or any error occurs, return "Exception".
 */

function longestAscendingSubsequence(arr) {
  try {
    const arrLength = arr[0];
    const values = arr.slice(1);

    if (values.length !== arrLength) throw new Error();

    let maxStart = 0,
      maxEnd = 0;
    let start = 0;

    for (let i = 1; i < values.length; i++) {
      if (values[i] > values[i - 1]) {
        const longestFound = maxEnd - maxStart;
        const current = i - start;
        if (current > longestFound) {
          maxStart = start;
          maxEnd = i;
        }
      } else {
        start = i;
      }
    }

    const subsequence = values.slice(maxStart, maxEnd + 1).join(",");
    return `subsequence: ${subsequence}\nfirst: ${maxStart + 1}\nlast: ${
      maxEnd + 1
    }`;
  } catch {
    return "Exception";
  }
}

// Example usage:
console.log(longestAscendingSubsequence([6, 1, 2, 1, 3, 4, 1]));
// Output:
// subsequence: 1,3,4
// first: 3
// last: 5
