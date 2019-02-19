import { Frame } from './frame';

export class Pattern {
  constructor(
    public id: number,
    public frames: Frame[],
  ) {}
}
