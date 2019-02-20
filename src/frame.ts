import { Poster } from "./poster";

export class Frame {
  constructor(
    public id: number,
    public height: number,
    public width: number,
    public x: number,
    public y: number,
    public poster: Poster | null
  ) {}
}

export class FrameHelper {
  constructor(private wScale: number, private hScale: number) {}

  hasImage(frame: Frame): boolean {
    return frame.poster !== null;
  }

  asPercent(value: number): string {
    return value * 100 + "%";
  }

  width(frame: Frame): string {
    return this.asPercent(frame.width * this.wScale);
  }

  height(frame: Frame): string {
    return this.asPercent(frame.height * this.hScale);
  }

  x(frame: Frame): string {
    let x = frame.x - frame.width / 2;
    x = x * this.wScale + 1 / 2;
    return this.asPercent(x);
  }

  y(frame: Frame): string {
    let y = frame.y + frame.height / 2;
    y = -(y * this.hScale) + 1 / 2;
    return this.asPercent(y);
  }
}
