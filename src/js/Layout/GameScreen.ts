export class GameScreen {
  private canvasElement: HTMLCanvasElement;

  private xSize: number;
  private ySize: number;
  private ctx: CanvasRenderingContext2D;

  private defaultColor: string = "blue";
  private defaultShadow: number = 10;
  private xRatio: number = 1;
  private yRatio: number = 1;
  private globalAlpha: number = 0.7;
  private defaultBackgroundColor = "white";

  constructor() {
    this.canvasElement = this.getCanvasElement();
    this.xSize = this.canvasElement.clientWidth;
    this.ySize = this.canvasElement.clientHeight;
    this.ctx = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;
  }

  setColor(backGroundColor?: string) {
    this.ctx.fillStyle = backGroundColor ?? this.defaultBackgroundColor;
    this.ctx.globalAlpha = this.globalAlpha;
  }

  setShadow(shadowBlur: number, color?: string) {
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowColor = color ?? "white";
    this.ctx.shadowBlur = shadowBlur ?? this.defaultShadow;
  }

  getCanvasElement(): HTMLCanvasElement {
    const canvasElement = document.querySelector(
      "#arenaView"
    ) as HTMLCanvasElement;
    return canvasElement;
  }

  clearView() {
    this.ctx.globalAlpha = 1;
    this.setColor("white");
    this.ctx.fillRect(0, 0, this.xSize, this.ySize);
    this.ctx.globalAlpha = this.globalAlpha;
  }

  drawCircle(
    x: number,
    y: number,
    size: number,
    color: string,
    shadow: number
  ) {
    this.setColor(color);
    this.setShadow(shadow);
    this.ctx.beginPath();
    this.ctx.arc(
      x * this.xRatio,
      y * this.yRatio,
      size * this.xRatio,
      0,
      Math.PI * 2,
      true
    );

    this.ctx.fill();
  }

  drawLine(x: number, y: number, xTo: number, yTo: number) {
    this.ctx.moveTo(x * this.xRatio, y * this.yRatio);
    this.ctx.lineTo(xTo * this.xRatio, yTo * this.yRatio);
  }
}
