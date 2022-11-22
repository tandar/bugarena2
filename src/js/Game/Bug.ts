import { Arena } from "./Arena";
import { BugSettings } from "./BugSettings";
import { Pos } from "./Pos";
export enum BugSexOptions {
  male,
  female,
}
export class Bug {
  static lastId = 0;

  private pos: Pos;
  public readonly id: number;
  private body: number;
  private direction: number;
  private iWantToWalk = 1; // value from 0-1 -2 run

  private sex: BugSexOptions;
  private alive: boolean = true;
  private age: number = 0;
  private childsPerBear: number = 10;
  private settings: BugSettings;
  private reproductionTimeCounter: number;
  private type: string;
  private arena: Arena;

  constructor(type: string, pos: Pos, settings: BugSettings, body: number , arena: Arena ) {
    Bug.lastId++;
    this.id = Bug.lastId;

    this.type = type;
    this.pos = pos;
    this.body = body;
    this.sex = this.getRandomSex();
    this.direction = this.getRandomDirection();
    this.settings = settings;
    this.reproductionTimeCounter = 0;
    this.arena = arena;
  }

  /**
   * one lifecycle of the bug: move, eat, attac, bread, get old etc
   */
  live(): boolean {
    // if previously killed in this click by another bug..
    if (false === this.alive) {
      return false;
    }

    this.reproductionTimeCounter++;
    this.age++;
    this.body = this.body * 0.999 - 0.001;
    if (this.body < 0.1) {
      this.alive = false;
      return false;
    }

    return true;
  }

  move() {
    let newDirection = this.direction + (this.settings.turnSpeed * 2 * Math.random() - this.settings.turnSpeed / 10);

    this.pos.x + Math.sin(this.direction * Math.PI * 2) * this.getEffectiveSpeed();
    this.pos.y - Math.cos(this.direction * Math.PI * 2) * this.getEffectiveSpeed();

    if (false === this.arena.isIn(this.pos)) {
      newDirection = Math.PI * 2 * Math.random();
      this.arena.forceIn(this.pos);
    }
    this.setDirection(newDirection);
  }

  setDirection(newDirection: number) {
    const pi2 = Math.PI * 2;
    if (newDirection > pi2) newDirection -= pi2;
    if (newDirection < 0) newDirection += pi2;
    this.direction = newDirection;
  }

  getBody(): number {
    return this.body;
  }

  getDirection(): number {
    return this.direction;
  }

  getAge(): number {
    return this.age;
  }

  getSex(): BugSexOptions {
    return this.sex;
  }

  distance(pos: Pos) {
    return this.pos.distance(pos);
  }

  getRandomSex(): BugSexOptions {
    if (Math.random() > 0.5) {
      return BugSexOptions.female;
    }
    return BugSexOptions.male;
  }

  getRandomDirection(): number {
    return Math.random() * Math.PI * 2;
  }

  makeChildren(otherBug: Bug) {
    // not ready to bread..
    if (this.reproductionTimeCounter < this.settings.reproductionTimeCycle) return;
    if (otherBug.reproductionTimeCounter < otherBug.settings.reproductionTimeCycle) return;

    // if not old enough..
    if (this.age < this.settings.firstReproductionTime) return;
    if (otherBug.age < otherBug.settings.firstReproductionTime) return;

    // if not the same type..
    if (this.type !== otherBug.getType()) return;

    if (this.sex === otherBug.getSex()) return;
    if (this.sex !== BugSexOptions.female) return;

    this.reproductionTimeCounter = 0;

    for (let c = 0; c < this.settings.childsPerBear; c++) {
      const body = this.settings.startBody;

      const newSettings: BugSettings = this.getInheritedSettings(this, otherBug);
      const newBug = new Bug(this.type, this.pos, newSettings, body, this.arena);
      this.arena.addBug(newBug);
      this.body -= body * 0.1; // mother loses weight
    }
  }

  getInheritedSettings(bug1: Bug, bug2: Bug): BugSettings {
    const s1 = bug1.settings;
    const s2 = bug2.settings;
    const newSettings = new BugSettings()
    // TODO 
    // {
    //   intelligence: (s1.intelligence + s2.intelligence) / 2,
    //   turnSpeed: (s1.turnSpeed + s2.turnSpeed) / 2,
    //   speed: (s1.speed + s2.speed) / 2,
    //   agressiveness: (s1.agressiveness + s2.agressiveness) / 2,
    //   firstReproductionTime: (s1.firstReproductionTime + s2.firstReproductionTime) / 2,
    //   reproductionTimeCycle: (s1.reproductionTimeCycle + s2.reproductionTimeCycle) / 2,
    //   viewRadius: (s1.viewRadius + s2.viewRadius) / 2,
    //   startBody: (s1.startBody + s2.startBody) / 2,
    //   childsPerBear: (s1.childsPerBear + s2.childsPerBear) / 2,
    // };

    return newSettings;
  }

  getType() {
    return this.type;
  }

  tryToKill(otherBug: Bug) {}

  die() {
    this.alive = false;
  }
  isAlive(): boolean {
    return this.alive;
  }

  getPos(): Pos {
    return this.pos;
  }

  getEffectiveSpeed(): number {
    return this.settings.speed * 0.03 * this.iWantToWalk;
  }

  meet(otherBug: Bug) {
    var thisRace = this.type;
    var otherRace = otherBug.getType();

    if (!otherBug.isAlive()) return;

    if (!this.isAlive()) return;

    var agressiveness = (this.settings.agressiveness / 100) * Math.random();
    // aggressiveness *= Math.sqrt( body / otherBug.getBody() );
    if (this.type === otherBug.getType()) {
      if (this.sex !== otherBug.getSex() && agressiveness < 0.95) {
        // very aggressive bugs rather kill, then make love.. hm..
        if (this.sex === BugSexOptions.female && this.reproductionTimeCounter > this.settings.reproductionTimeCycle) {
          this.makeChildren(otherBug);
        }
      } else if (agressiveness > 0.8) {
        // if it is aggressive, maybe he is attacking the bug of same race.
        this.tryToKill(otherBug);
      }
    } else {
      // not the same race..   bug will try to fight
      if (agressiveness > 0.5) {
        this.tryToKill(otherBug);
      }
    }
  }
  getSettings():BugSettings { 
    return this.settings;
  }
}
