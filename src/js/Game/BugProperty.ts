import { SpeedPoperty } from "./BugProperties/AgressivenessProperty";
import { BaseBugProperty } from "./BugProperties/BaseBugproperty";
import { ChildsPerBearProperty } from "./BugProperties/ChildsPerBearProperty";
import { FirstReproductionTimeProperty } from "./BugProperties/FirstReproductionTimeProperty";
import { IntelligenceProperty } from "./BugProperties/IntelligenceProperty";
import { ReproductionTimeCycleProperty } from "./BugProperties/ReproductionTimeCycleProperty";
import { AgressivenessProperty } from "./BugProperties/SpeedPoperty";
import { StartBodyProperty } from "./BugProperties/StartBodyProperty";
import { TurnSpeedProperty } from "./BugProperties/TurnSpeedProperty";
import { ViewRadiusProperty } from "./BugProperties/ViewRadiusProperty";
import { BugSettings } from "./BugSettings";

export class BugPropertySet {
  properties: BaseBugProperty[] = [];

  public readonly intelligence: IntelligenceProperty;
  public readonly turnSpeed: TurnSpeedProperty;
  public readonly speed: SpeedPoperty;
  public readonly agressiveness: AgressivenessProperty;
  public readonly firstReproductionTime: FirstReproductionTimeProperty;
  public readonly reproductionTimeCycle: ReproductionTimeCycleProperty;
  public readonly viewRadius: ViewRadiusProperty;
  public readonly startBody: StartBodyProperty;
  public readonly childsPerBear: ChildsPerBearProperty;

  private propertyMap : Map<string,BaseBugProperty>;


  constructor() {

    this.properties = [
      (this.startBody = new StartBodyProperty("startBody", 0, 100, 20)),
      (this.speed = new SpeedPoperty("speed", 0, 100, 20)),
      (this.turnSpeed = new TurnSpeedProperty("turnSpeed", 0, 100, 40)),
      (this.viewRadius = new ViewRadiusProperty("viewRadius")),
      (this.intelligence = new IntelligenceProperty("intelligence", 0, 100, 20)),
      (this.agressiveness = new AgressivenessProperty("agressiveness", 0, 100, 20)),
      (this.firstReproductionTime = new FirstReproductionTimeProperty("firstReproductionTime", 0, 100, 80)),
      (this.reproductionTimeCycle = new ReproductionTimeCycleProperty("reproductionTimeCycle", 0, 100, 80)),
      (this.childsPerBear = new ChildsPerBearProperty("childsPerBear")),
    ];


    this.propertyMap = new Map();
    this.properties.forEach((property: BaseBugProperty) => {     
      this.propertyMap.set(property.getName(), property);
    });

    // for (let propertyName in values) { 
      
    //   const value = values[propertyName];

    //   if (this.propertyMap.has(propertyName))
    //   { 
    //       (this.propertyMap.get(propertyName) as BaseBugProperty).setValue(value);
    //   }
    // }


  }

  getProperties():BaseBugProperty[] {
    return this.properties;
  }

  getPropertyValue(name: string):number { 
    if (this.propertyMap.has(name)) { 
      const property: BaseBugProperty = this.propertyMap.get(name) as BaseBugProperty;
      return property.getValue();
    } else { 
      return 0;
    }
  }
  
}
