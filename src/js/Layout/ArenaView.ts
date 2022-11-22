import { Arena } from "../Game/Arena";
import { Bug, BugSexOptions } from "../Game/Bug";
import { Food } from "../Game/Food";
import { GameScreen } from "./GameScreen";

export class ArenaView extends GameScreen {
  private arena: Arena;
  constructor(arena: Arena) {
    super();
    this.arena = arena;
  }

  showArena() {
    this.displayFoods();
    this.displayBugs();
  }

  drawFood(food: Food) {
    const pos = food.getPos();
    const value = food.getValue();
    this.drawCircle(pos.x, pos.y, value * 0.03, "gray", value);
  }

  displayBugs() {
    this.arena.getBugList().forEach((bug: Bug) => this.drawBug(bug));
  }

  drawBug(bug: Bug) {
    const pos = bug.getPos();
    const body = bug.getBody();
    const color = bug.getSex() === BugSexOptions.male ? "blue" : "red";
    this.drawCircle(pos.x, pos.y, body * 0.3, color, 1);
  }

  displayFoods() {
    this.arena.getFoodList().forEach((food: Food) => this.drawFood(food));
  }
}
