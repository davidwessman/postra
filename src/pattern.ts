import { Frame } from "./frame";

export class Pattern {
  constructor(
    public id: number,
    public nbrFrames: number,
    public description: string,
    public offsetX: number,
    public offsetY: number,
    public frames: Frame[]
  ) {}
}
