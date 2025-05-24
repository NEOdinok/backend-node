// Задача: изучить поведение стрелочной функции в классе

class Man {
  sayHello = () => {
    console.log(this);
  };
}

const man1 = new Man();
man1.sayHello(); // 1

console.log({ ...man1 }); // 2

const man2 = new Man();
console.log(man1.sayHello === man2.sayHello); // 3

const { sayHello } = man1;
sayHello(); // 4

// Потом коментируем верх, раскоментируем низ
// Задача: изучить поведение обычной функции в классе

// class Man {
//   sayHello() {
//     console.log(this);
//   }
// }

// const man1 = new Man();
// man1.sayHello(); // 1

// console.log({ ...man1 }); // 2

// const man2 = new Man();
// console.log(man1.sayHello === man2.sayHello); // 3

// const { sayHello } = man1;
// sayHello(); // 4 — this === undefined

// // Починим:
// sayHello.call(man1); // или
// const bound = sayHello.bind(man1);
// bound(); // 4 ✅
