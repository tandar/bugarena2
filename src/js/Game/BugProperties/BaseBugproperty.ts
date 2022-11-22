export abstract class BaseBugProperty {
  
  private name: string;
  private min: number;
  private max: number;
  private defaultValue: number;
  private variability: number;
  private value: number;


  constructor(name: string, min?: number, max?: number, defaultValue?: number,variability? : number) {
    this.name = name;
    this.min = min ?? 0;
    this.max = max ?? 100;
    this.defaultValue = defaultValue ?? 20;
    this.variability = variability ?? 20;
    this.value = this.defaultValue;
  }


  
  getName(): string {
    return this.name;
  }

  getMinValue(): number {
    return this.min;
  }
  getMaxValue(): number {
    return this.max;
  }
  getValue() :number { 
    return this.value;
  }
  setValue(newValue: number) { 
    this.value = newValue;
  }
  

  getInheritedValue(): number {
    let value = 0;
    return value;
  }
}

