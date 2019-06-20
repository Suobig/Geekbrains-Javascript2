class MenuItem {
  constructor(color, name) {
    this.color = color;
    this.name = name;
  }

  makeRed() {
    this.color = "red";
  }
}

class MainMenuItem extends MenuItem {
  makeBlue() {
    this.color = "blue";
  }
}
