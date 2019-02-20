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

  hasImage(frame: Frame): boolean {
    return frame.poster !== null;
  }

  asPercent(value: number): string {
    return value * 100 + "%";
  }

  width(frame: Frame): string {
    if (this.shouldRotate(frame)) {
      return this.asPercent(frame.height * this.wScale);
    }
    return this.asPercent(frame.width * this.wScale);
  }

  height(frame: Frame): string {
    if (this.shouldRotate(frame)) {
      return this.asPercent(frame.width * this.hScale);
    }
    return this.asPercent(frame.height * this.hScale);
  }

  xNum(frame: Frame): number {
    let x;
    if (this.shouldRotate(frame)) {
      x = frame.x - frame.height / 2 + this.offsetX;
    } else {
      x = frame.x - frame.width / 2 + this.offsetX;
    }
    return x * this.wScale + 1 / 2;
  }

  xCenter(frame: Frame): number {
    let x = frame.x + this.offsetX;
    return x * this.wScale + 1 / 2;
  }

  x(frame: Frame): string {
    return this.asPercent(this.xNum(frame));
  }

  yNum(frame: Frame): number {
    let y;
    if (this.shouldRotate(frame)) {
      y = frame.y + frame.width / 2 + this.offsetY;
    } else {
      y = frame.y + frame.height / 2 + this.offsetY;
    }
    return -(y * this.hScale) + 1 / 2;
  }

  yCenter(frame: Frame): number {
    let y = frame.y + this.offsetY;
    return -(y * this.hScale) + 1 / 2;
  }

  y(frame: Frame): string {
    return this.asPercent(this.yNum(frame));
  }

  shouldRotate(frame: Frame) {
    return (
      frame.orientation === Orientation.Landscape &&
      frame.poster &&
      frame.poster.orientation === Orientation.Both
    );
  }

  rotateSvg(frame: Frame) {
    if (this.shouldRotate(frame)) {
      return `rotate(90, ${145 * this.xCenter(frame)}, ${100 *
        this.yCenter(frame)})`;
    }
    return "";
  }
}
