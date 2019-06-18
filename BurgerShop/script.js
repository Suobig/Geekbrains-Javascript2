/**
 * Класс относится ко всем пищевым продуктам и добавкам
 */
class Food {
  
  /**
   * @param  {String} name Название продукта
   * @param  {Number} price Цена единицы продукта
   * @param  {Number} calories количество калорий
   */
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }
}

/**
 * Доступные размеры бургеров
 */
const Size = {
  big: new Food(name="Big burger", price=50, calories=20),
  small: new Food(name="Small burger", price=100, calories=40),
}

/**
 * Доступные начинки
 */
const Stuffing = {
  cheese: new Food(name="Cheese", price=10, calories=20),
  salad: new Food(name="Salad", price=20, calories=5),
  potatoes: new Food(name="Potatoes", price=15, calories=10),
  bacon: new Food(name="Bacon", price=20, calories=30),
}

/**
 * Доступные топпинги
 */
const Topping = {
  hotPeper: new Food(name="Hot Pepper", price=15, calories=0),
  mayo: new Food(name="Mayo", price=20, calories=5),
}

/**
 * Особые случаи, когда начинкам имеет разную цену или количество калорий
 * в зависимости от размера бургера
 */
specialCases =  {
  cases: new Map(),

  /** Добавить новый особый случай
   * @param  {Food} size размер бургера
   * @param  {Food} stuffing начинка бургера
   * @param  {Food} newCase новое значение
   * @returns {Food} добавленное значение
   */
  setCase(size, stuffing, newCase) {
    if (this.cases.has(size)) {
      this.cases.get(size).set(stuffing, newCase)
    } else {
      this.cases.set(size, new Map());
      this.cases.get(size).set(stuffing, newCase);
    }

    return newCase;
  },

  /** 
   * Удалить особый случай
   * @param  {Food} size размер бургера
   * @param  {Food} stuffing начинка бургера
   * @returns {Boolean} true - если успешно удалено, иначе - false
   */
  removeCase(size, stuffing) {
    if (this.cases.has(size)) {
      return this.cases.get(size).delete(stuffing);
    }
    return false;
  },
  
  /**
   * Проверяет, есть ли особый случай с заданными параметрами
   * @param  {Food} size размер бургера
   * @param  {Food} stuffing начинка бургера
   * @returns {Boolean}
   */
  hasCase(size, stuffing) { 
    return this.cases.has(size) && this.cases.get(size).has(stuffing);
  },

  /**
   * Получить особый случай с заданными параметрами
   * @param  {Food} size размер бургера
   * @param  {Food} stuffing начинка бургера
   * @returns {Food} найденный случай, null - если не нашел
   */
  getCase(size, stuffing) {
    if (this.hasCase(size, stuffing)) {
      return this.cases.get(size).get(stuffing);
    }
    return null;
  }
}

//В большом бургере с беконом больше калорий, чем в маленьком
specialCases.setCase(Size.big, Stuffing.bacon, new Food(name="Big Bacon", price=20, calories=35));

/**
 * Гамбургер заданного размера с заданной начинкой и топпингом
 */
class Hamburger {
  /**
   * @param  {Food} size размер бургера
   * @param  {Food} stuffing начинка бургера
   */
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;

    if (specialCases.hasCase(size, stuffing)) {
      const specialCase = specialCases.getCase(size, stuffing);
      this.basePrice = specialCase.price;
      this.baseCalories = specialCase.calories;
    } else {
      this.basePrice = size.price + stuffing.price;
      this.baseCalories = size.calories + stuffing.calories;
    }
    this.toppings = new Map();
  }

  /**
   * Добавить новый топпинг. Если топпинг уже существует - увеличить количество.
   * @param  {Food} topping добавляемый топпинг
   */
  addTopping(topping) {
    if (this.toppings.has(topping)) {
      this.toppings.set(topping, this.toppings.get(topping) + 1);
    } else {
      this.toppings.set(topping, 1);
    }
  }

  /**
   * Удалить топпинг. Если топпинг уже существует - уменьшить количество (но не
   * меньше 0)
   * @param  {Food} topping удаляемый топпинг
   */
  removeTopping(topping) {
    if (this.toppings.has(topping) && this.toppings.get(topping) > 0) {
      this.toppings.set(topping, this.toppings.get(topping) - 1);
    }
  }

  /**
   * Получить текущие топпинги
   * @returns { Array{ Arrray{ { Food }, { Integer } } } }
   */
  getToppings() {
    return Array.from(this.toppings.entries());
  }

  /**
   * Получить размер бургера
   * @returns {Food}
   */
  getSize() {
    return this.size;
  }

  /**
   * Получить начинку
   * @returns {Food}
   */
  getStuffing() {
    return this.stuffing;
  }

  /**
   * Вычислить полную цену бургера с учетом всех топпингов
   * @returns {Number}
   */
  calculatePrice() {
    let toppingsPrice = 0;
    this.toppings.forEach((v, k) => toppingsPrice += k.price * v);
    return toppingsPrice + this.basePrice;
  }

  /**
   * Вычислить общее число калорий в бургере с учетом всех топпингов
   * @returns {Number}
   */
  calculateCalories() {
    let toppingsCalories = 0;
    this.toppings.forEach((v, k) => toppingsCalories += k.calories * v);
    return toppingsCalories + this.baseCalories;
  }
} 

function test() {
  logBurger = function(burgerName, burger) {
    console.log(`${burgerName}:`);
    console.log(`--- calories = ${burger.calculateCalories()}`);
    console.log(`--- price = ${burger.calculatePrice()}`);
  }

  const smallCheeseburger = new Hamburger(Size.small, Stuffing.cheese);
  logBurger("Small Cheeseburger", smallCheeseburger);
  console.log("Stuffing:");
  console.log(smallCheeseburger.getStuffing());
  
  console.log("Size:");
  console.log(smallCheeseburger.getSize());

  smallCheeseburger.addTopping(Topping.mayo);
  logBurger("Added mayo", smallCheeseburger);
  smallCheeseburger.addTopping(Topping.hotPeper);
  logBurger("Added hot pepper", smallCheeseburger);
  smallCheeseburger.addTopping(Topping.mayo);
  logBurger("Added 1 more mayo", smallCheeseburger);
  console.log(`Current toppings:`);
  console.log(smallCheeseburger.getToppings());
  smallCheeseburger.removeTopping(Topping.mayo);
  smallCheeseburger.removeTopping(Topping.hotPeper);
  logBurger("Removed hot pepper and 1 mayo", smallCheeseburger);
  smallCheeseburger.removeTopping(Topping.hotPeper);
  logBurger("Removing hot pepper again should do nothing", smallCheeseburger);
  smallCheeseburger.removeTopping(Topping.mayo);
  logBurger("Removed last mayo", smallCheeseburger);
  smallCheeseburger.removeTopping(Topping.mayo);
  logBurger("Removing mayo again should do nothing", smallCheeseburger);
  console.log(`Current toppings:`);
  console.log(smallCheeseburger.getToppings());  

  const bigBaconBurger = new Hamburger(Size.big, Stuffing.bacon);
  logBurger("Big Bacon", bigBaconBurger);
}

test();