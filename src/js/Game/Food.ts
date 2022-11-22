import { Pos } from "./Pos";

export class Food {
  private pos: Pos;
  private foodValue: number;

  constructor(pos: Pos, foodValue: number) {
    this.pos = pos;
    this.foodValue = foodValue;
  }

  getPos() {
    return this.pos;
    }
    
  getValue() {
    return this.foodValue;
    }
    
  isEmpty() {
    return this.foodValue <= 0;
  }

  eatFrom(valueToEat: number) {
    const valueEat = Math.min(valueToEat, this.foodValue);
    this.foodValue -= valueEat;

    return valueEat;
  }

  waste(valueToWaste: number) {
    var valueWasted = Math.min(valueToWaste, this.foodValue);
    this.foodValue -= valueWasted;
    return valueWasted;
  }
}
