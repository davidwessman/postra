import { Poster } from './poster';

export class Frame {
  constructor(
    public id: number,
    public height: number,
    public width: number,
    public x: number,
    public y: number,
    public poster: Poster | null,
  ) {}
}
