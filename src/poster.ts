import { Orientation } from "./orientation";

export class Poster {
  constructor(
    public id: number,
    public src: string,
    public alt: string,
    public link: string,
    public orientation: Orientation = Orientation.Portrait
  ) {}
}
