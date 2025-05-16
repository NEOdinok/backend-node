function updateProfile(person) {
  person = {
    name: "Mike",
  };
}

function process() {
  let person = { name: "Peter" };
  updateProfile(person);
  console.log(person);
}

process();

/**
 Output: { name: 'Peter' }

 Объяснение:
 Функция updateProfile присваивает новое значение переменной person, но
 это не влияет на исходный объект, переданный в process().
 Присваивание в функции создает новую ссылку, не изменяя оригинальный объект.
 */
