import { Poster } from "./poster";
import { Orientation } from "./orientation";

export class Frame {
  constructor(
    public id: number,
    public height: number,
    public width: number,
    public x: number,
    public y: number,
    public orientation: Orientation = Orientation.Portrait,
    public poster: Poster | null
  ) {}
}

export class FrameHelper {
  constructor(
    private wScale: number,
    private hScale: number,
    private offsetX: number,
    private offsetY: number
  ) {}

  svgWidth = 145;
  svgHeight = 100;

  hasImage(frame: Frame): boolean {
    return frame.poster !== null;
  }

  asPercent(value: number): string {
    return `${value * 100}%`;
  }

  width(frame: Frame): string {
    return this.asPercent(frame.width * this.wScale);
  }

  widthNum(frame: Frame): number {
    return frame.width * this.wScale * this.svgWidth;
  }

  height(frame: Frame): string {
    return this.asPercent(frame.height * this.hScale);
  }

  heightNum(frame: Frame): number {
    return frame.height * this.hScale * this.svgHeight;
  }

  xNum(frame: Frame): number {
    const x = frame.x - frame.width / 2 + this.offsetX;
    return x * this.wScale + 1 / 2;
  }

  xCenter(frame: Frame): number {
    const x = frame.x + this.offsetX;
    return x * this.wScale + 1 / 2;
  }

  x(frame: Frame): string {
    return this.asPercent(this.xNum(frame));
  }

  yNum(frame: Frame): number {
    const y = frame.y + frame.height / 2 + this.offsetY;
    return -(y * this.hScale) + 1 / 2;
  }

  yCenter(frame: Frame): number {
    const y = frame.y + this.offsetY;
    return -(y * this.hScale) + 1 / 2;
  }

  y(frame: Frame): string {
    return this.asPercent(this.yNum(frame));
  }
}
