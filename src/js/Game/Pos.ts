export class Pos {

  public x: number;
  public y: number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculating distance between two positions
   * @param {*} pos
   * @returns
   */
  distance(pos: Pos) {
    const distance = Math.sqrt(
      Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2)
    );
    return distance;
  }

  turnInPosition(aimPos: Pos, currentDirection: number) {
    const aimDirection =
      (Math.atan2(aimPos.x - this.x, -aimPos.y + this.y) /*  180*/ ) / (Math.PI * 2 );

    const directionModify = Math.sign(currentDirection - aimDirection) * -1;

    return directionModify;
  }
}
