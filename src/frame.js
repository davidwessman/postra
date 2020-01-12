const orientations = {
  PORTRAIT: "portrait",
  LANDSCAPE: "landscape",
  BOTH: "both"
};

export class Poster {
  constructor(id, src, alt, link, orientation = orientations.PORTRAIT) {
    this.id = id;
    this.src = src;
    this.alt = alt;
    this.link = link;
    this.orientation = orientation;
  }
}

export class Pattern {
  constructor(id, nbrFrames, description, offsetX, offsetY, frames) {
    this.id = id;
    this.nbrFrames = nbrFrames;
    this.description = description;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.frames = frames;
  }
}

export class Frame {
  constructor(
    id,
    height,
    width,
    x,
    y,
    orientation = orientations.PORTRAIT,
    poster
  ) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.xpos = xpos;
    this.ypos = ypos;
    this.orientation = orientation;
    this.poster = poster;
  }
}

export class FrameHelper {
  constructor(
    wScale,
    hScale,
    offsetX,
    offsetY,
    svgWidth = 145,
    svgHeight = 100
  ) {
    this.wScale = wScale;
    this.hScale = hScale;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.svgWidth = svgWidth;
    this.svgHeight = svgHeight;
  }

  hasImage(frame) {
    return frame.poster !== null;
  }

  asPercent(value) {
    return `${value * 100}%`;
  }

  width(frame) {
    return this.asPercent(frame.width * this.wScale);
  }

  widthNum(frame) {
    return frame.width * this.wScale * this.svgWidth;
  }

  height(frame) {
    return this.asPercent(frame.height * this.hScale);
  }

  heightNum(frame) {
    return frame.height * this.hScale * this.svgHeight;
  }

  xNum(frame) {
    const x = frame.x - frame.width / 2 + this.offsetX;
    return x * this.wScale + 1 / 2;
  }

  xCenter(frame) {
    const x = frame.x + this.offsetX;
    return x * this.wScale + 1 / 2;
  }

  xpos(frame) {
    return this.asPercent(this.xNum(frame));
  }

  yNum(frame) {
    const y = frame.y + frame.height / 2 + this.offsetY;
    return -(y * this.hScale) + 1 / 2;
  }

  yCenter(frame) {
    const y = frame.y + this.offsetY;
    return -(y * this.hScale) + 1 / 2;
  }

  ypos(frame) {
    return this.asPercent(this.yNum(frame));
  }
}

export { orientations };
