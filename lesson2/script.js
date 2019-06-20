function Machine(power) {
  this._enabled = false;
  this._power = power;

  this.enable = function() { this._enabled = true; };
  this.disable = function() { this._enabled = false; };

  this.isEnabled = function() { return this._enabled };
}

function CoffeeMachine(power, capacity) {
  Machine.apply(this, arguments); //унаследовали

  this._waterAmount = 0;

  this.setWaterAmount = function(amount) {
    this._waterAmount = amount;
  };

  this.getPower = function() {  
    return this._power;
  }
}

const coffeeMachine = new CoffeeMachine(10000, 1200);
console.log(`Включена: ${coffeeMachine.isEnabled()}`);
console.log(`Мощность: ${coffeeMachine.getPower()}`);


coffeeMachine.enable();
console.log(`Включена: ${coffeeMachine.isEnabled()}`);

coffeeMachine.setWaterAmount(100);
coffeeMachine.disable();
console.log(`Включена: ${coffeeMachine.isEnabled()}`);
