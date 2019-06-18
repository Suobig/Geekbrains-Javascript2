class Food {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }
}

const Size = {
  big: new Food(name="Big burger", price=50, calories=20),
  small: new Food(name="Small burger", price=100, calories=40),
}

const Stuffing = {
  cheese: new Food(name="Cheese", price=10, calories=20),
  salad: new Food(name="Salad", price=20, calories=5),
  potatoes: new Food(name="Potatoes", price=15, calories=10),
  bacon: new Food(name="Bacon", price=20, calories=30),
}

const Topping = {
  hotPeper: new Food(name="Hot Pepper", price=15, calories=0),
  mayo: new Food(name="Mayo", price=20, calories=5),
}

specialCases =  {
  cases: new Map(),

  setCase(size, stuffing, food) {
    if (this.cases.has(size)) {
      this.cases.get(size).set(stuffing, food)
    } else {
      this.cases.set(size, new Map());
      this.cases.get(size).set(stuffing, food);
    }

    return food;
  },

  removeCase(size, stuffing) {
    if (this.cases.has(size)) {
      return this.cases.get(size).delete(stuffing);
    }
    return false;
  },

  hasCase(size, stuffing) { 
    return this.cases.has(size) && this.cases.get(size).has(stuffing);
  },

  getCase(size, stuffing) {
    if (this.hasCase(size, stuffing)) {
      return this.cases.get(size).get(stuffing);
    }
    return null;
  }
}

//В большом бургере с беконом больше калорий, чем в маленьком
specialCases.setCase(Size.big, Stuffing.bacon, new Food(20, 35));


class Hamburger {
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

  addTopping(topping) {
    if (this.toppings.has(topping)) {
      this.toppings.set(topping, this.toppings.get(topping) + 1);
    } else {
      this.toppings.set(topping, 1);
    }
  }

  removeTopping(topping) {
    if (this.toppings.has(topping) && this.toppings.get(topping) > 0) {
      this.toppings.set(topping, this.toppings.get(topping) - 1);
    }
  }

  getToppings() {
    return Array.from(this.toppings.entries());
  }

  getSize() {
    return this.size;
  }

  getStuffing() {
    return this.stuffing;
  }

  calculatePrice() {
    let toppingsPrice = 0;
    this.toppings.forEach((v, k) => toppingsPrice += k.price * v);
    return toppingsPrice + this.basePrice;
  }

  calculateCalories() {
    let toppingsCalories = 0;
    this.toppings.forEach((v, k) => toppingsCalories += k.calories * v);
    return toppingsCalories + this.baseCalories;
  }
} 

test = function() {
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
}

test();