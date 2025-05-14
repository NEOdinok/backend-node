/**
 * Найди закрывающую скобку.
 * Плохой способ решения - в тупую идти по массиву
 * Хороший: делаем стек и смотрим открывающие / закрывающие
 *
 * Задачу спрашивали у меня в разных местах раза 3
 */
const brackets = {
  ")": "(",
  "}": "{",
  "]": "[",
};

const openingBrackets = [")", "}", "]"];
const closingBrackets = ["(", "{", "["];

const stack = [];

function isBalanced(str) {
  for (character of str) {
    if (openingBrackets.includes(character)) {
      stack.push(character);
    } else if (closingBrackets.includes(character)) {
      if (stack.pop() !== brackets[character]) {
        return false;
      }
    }

    return stack.length === 0;
  }
}

isBalanced("({[as]})"); // true
isBalanced("()[]"); // true
isBalanced("(()"); // false
isBalanced("({)}"); // false
