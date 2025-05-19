/* 
    Напиши класс стека MaxStack и оптимизируйте его, первый пришёл - последний вышел, где есть методы:
    push - добавляет элемент в конец стека
    pop - выбирает элемент из конца стека и удаляет его
    max - возвращает максимальное значение элемента
*/

console.clear();

class MaxStack {}

const maxStack = new MaxStack([1, 3, 5]);

maxStack.push(4);

maxStack.stack[0] = 10;

maxStack.push(2);

console.log(maxStack.stack);

const count = maxStack.count + 1;
for (let i = 0; i < count; i++) {
  console.log(`Max: ${maxStack.max}, Pop: ${maxStack.pop()}`);
}

/*
[ 1, 3, 5, 4, 2 ]
Max: 5, Pop: 2
Max: 5, Pop: 4
Max: 5, Pop: 5
Max: 3, Pop: 3
Max: 1, Pop: 1
*/
