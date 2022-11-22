import { ArenaView } from "../Layout/ArenaView";
import { GameControls } from "../Layout/GameControls";
import { GameScreen } from "../Layout/GameScreen";
import { Arena } from "./Arena";
import { Bug } from "./Bug";
import { BaseBugProperty } from "./BugProperties/BaseBugproperty";
import { BugPropertySet } from "./BugProperty";
import { BugSettings } from "./BugSettings";
import { Pos } from "./Pos";

export class GameMaster {
  private arena: Arena;
  private gameScreen: ArenaView;

  private status: boolean = false;
  private runSpeed = 10; // cycle in milisec = 1000 / runspeed
  private timer?: ReturnType<typeof setInterval>;

  private click: number = 0; // click of life - a counter actually
  private controls: GameControls;

  private bugPropertySet: BugPropertySet;

  // private bugBluePrints :

  constructor() {
    this.bugPropertySet = new BugPropertySet();
    this.arena = new Arena(500, 500);
    this.gameScreen = new ArenaView(this.arena);
    this.controls = new GameControls(this);

    this.displayGame();
  }

  start() {
    if (false === this.status) {
      this.status = true;
      this.timer = setInterval(this.live, 1000 / this.runSpeed);
      this.message("arena is running..");
    } else {
      this.message("arena is allready runnung..");
    }
  }

  stop() {
    if (this.status) {
      this.status = false;
      clearTimeout(this.timer);
      this.message("arena stopped");
    } else {
      this.message("arena is not running.. nothing to stop..");
    }
    this.displayGame();
  }
  setSpeed() {
    const speed = this.controls.getGameSpeed();
    this.stop();
    this.runSpeed = speed;
    this.start();
  }

  live() {
    // TODO
    this.click++;
    this.arena.live();
    this.displayGame();
  }

  displayGame() {
    this.gameScreen.clearView();
    this.gameScreen.showArena();
    this.showStats();
  }
  showStats() {
    const bugcount = this.arena.getBugCount();
    const lifetime = this.arena.getCounter();
    this.controls.displaytBugCount(bugcount);
    this.controls.displayLifeTime(lifetime);

    // TODO:
    // $("#bugcount").html( bugcount );
    // $("#lifetime").html( lifetime );
  }

  addBugsToArena() {
    console.log("addBugsToArena - under construction");

    const bugsToAdd = this.controls.getBugNumberToAdd();
    for (let c = 0; c < bugsToAdd; c++) {
      this.addBugToArena();
    }
  }
  addBugToArena() {
    const initialBodyValue = this.controls.getInitialBodyValue();
    // this.message("addbug should be implemented");

    const numberOfNewBugs = this.controls.getBugNumberToAdd(); //   $("#addbug input#" + "bugnumber").val();
    const bodyValue = this.controls.getInitialBodyValue();  // $("#addbug input#" + "bodyvalue").val();

    const type = this.controls.getBugTypeValue();
    // var variability, variabilityMulyplier, value;

    const settings = new BugSettings();

    const settingsFromControlPanel = new Map<string, number>();

    for (let propertyName in BugSettings.propertyNames) { 

      const value = this.controls.getInputPropertyValue(propertyName);
      settingsFromControlPanel.(propertyName, value);
      // settings.setProperty(propertyName, value);
    }
    
    

    // for (let /*BugProperty*/ bugPropertyId in bugPropertySet.bugProperties) {
    
    //     var variability =
    //       bugPropertySet.bugProperties[bugPropertyId].variability;
    //     variabilityMulyplier =
    //       (100 - variability + variability * 2 * Math.random()) / 100;
    //     value = value * variabilityMulyplier;
    
    for (var bugCount = 0; bugCount < numberOfNewBugs; bugCount++) {
       const newBug = new Bug(type , this.arena.getRandomPos(), settings, bodyValue, this.arena);
      this.arena.addBug(newBug);
    }
    this.displayGame();
  }

  addFood(pos: Pos) {
    const foodValue = this.controls.getFoodValue();
    this.arena.addFood(pos, foodValue);
    this.displayGame();
  }

  addFoodToRandomLocation() {
    for (let i = 0; i < 10; i++) {
      this.addFood(this.arena.getRandomPos());
    }
  }

  getRandomPos() {
    return this.arena.getRandomPos();
  }

  message(message: string) {
    this.controls.displayMessage(message);
  }

  loadBugTypeProperties() {
    alert("loadBugTypeProperties:" + this.controls.getBugTypeValue());
  }
  getBugPropertyList() :BaseBugProperty[] {
    return this.bugPropertySet.getProperties();
  }


  getStatisctic() {
    const statByType = new Map<string,typeStat>();
    this.arena.getBugList().forEach((bug: Bug) => { 
      if (false === statByType.has(bug.getType())) { 
        // const emptySettings: BugSettings = {intelligence:0,turnSpeed:0,}
        // statByType.set(bug.getType(),emptySettings);
      }

    });
  }
}

  interface typeStat { 
    bugCount: number;
    bugProperties: BugSettings;   

  };
