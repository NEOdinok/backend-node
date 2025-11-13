/**
 * 
✅ Условие задачи (переписано текстом)

Даны два класса: Horse и Human.
Каждый класс имеет свои уникальные свойства и методы.

Тебе необходимо, используя наследование и/или композицию, создать два новых класса:

1. Mage

Класс должен:
- наследоваться от Human;
- иметь возможность использовать магию (доп. свойство/метод);
- сохранять методы человека (run, speak).

2. MageCentaur

Класс, который должен:
обладать свойствами и методами Human (бегать, говорить);
обладать свойствами и методами Horse (прыгать);
иметь дополнительные магические способности (новые методы);
То есть MageCentaur — существо, которое сочетает:

- магию,
- функциональность человека,
- функциональность лошади.

Можно использовать наследование и/или композицию.
*/

// Базовый класс Human
class Human {
    constructor(age, name, height) {
        this.age = age;
        this.name = name;
        this.height = height;
    }

    run() {
        console.log(`${this.name} is running`);
    }

    speak() {
        console.log(`${this.name} says: bla bla bla`);
    }
}

// Базовый класс Horse
class Horse {
    constructor(age, nickname, color) {
        this.age = age;
        this.nickname = nickname;
        this.color = color;
    }

    jump() {
        console.log(`${this.nickname} jumps: jump jump jump`);
    }
}

// Решение ниже:

// Класс Mage — наследуется от Human
class Mage extends Human {
    constructor(age, name, height, magicPower) {
        super(age, name, height);
        this.magicPower = magicPower;
    }

    castSpell() {
        console.log(`${this.name} casts a spell: ${this.magicPower}`);
    }
}

// MageCentaur — человек+лошадь+магия (композиция)
class MageCentaur {
    constructor(age, name, height, nickname, color, magicPower) {
        // Вместо Human используем Mage → магия "приходит" автоматически
        this.human = new Mage(age, name, height, magicPower);
        this.horse = new Horse(age, nickname, color);
    }

    // Методы человека
    run() {
        this.human.run();
    }

    speak() {
        this.human.speak();
    }

    // Методы лошади
    jump() {
        this.horse.jump();
    }

    // Магический метод мага
    castSpell() {
        this.human.castSpell();
    }
}

// ---------- ПРИМЕРЫ РАБОТЫ ----------

const mage = new Mage(10, "Ilya", 150, "Fireball");
mage.run();
mage.castSpell();

const centaur = new MageCentaur(25, "Arion", 190, "Stormhoof", "black", "Lightning Strike");
centaur.run();
centaur.jump();
centaur.castSpell();