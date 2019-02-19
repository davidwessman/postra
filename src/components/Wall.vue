<template>
  <svg
    class="h-screen w-auto"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    viewBox="0 0 145 100"
  >
    <image
      class="z-0"
      :xlink:href="bgImage"
      height="100%"
      width="100%"
      preserveAspectRatio="xMinYMid meet"
    />
    <FrameDisplay
      v-for="frame in frames"
      :key="frame.id"
      :frame="frame"
      :hScale="hScale"
      :wScale="wScale"
      :on-click="onSelect"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FrameDisplay from "./FrameDisplay.vue";
import { Pattern } from "../pattern";
import { Poster } from "../poster";

@Component({
  components: {
    FrameDisplay
  }
})
export default class Wall extends Vue {
  @Prop({ default: [] })
  posters!: Poster[];

  @Prop()
  pattern!: Pattern;

  @Prop()
  onSelect!: Function;

  wScale: number = 1 / 300;
  hScale: number = 1 / 200;

  space: number = 10;
  width: number = 0;
  height: number = 0;

  bgImage = require("../assets/rawpixel-760112-unsplash.jpg");

  // created() {
  //   this.width = this.calculateWidth;
  //   this.height = this.calculateHeight;
  // }

  get frames() {
    if (this.pattern === null) {
      return [];
    }
    return this.pattern.frames;
  }

  get hSpace() {
    return this.space * this.hScale;
  }

  get wSpace() {
    return this.space * this.wScale;
  }

  get calculateWidth() {
    let width: number = this.pattern.frames.reduce(
      (acc, frame) => +acc + +frame.width,
      0
    );

    if (this.pattern.frames.length > 0) {
      width += this.space * (this.pattern.frames.length - 1);
    }
    return width * this.wScale;
  }

  get calculateHeight() {
    let height: number = this.pattern.frames.reduce(
      (acc, frame) => +acc + +frame.height,
      0
    );

    if (this.pattern.frames.length > 0) {
      height += this.space * (this.pattern.frames.length - 1);
    }
    return height * this.hScale;
  }

  get posterXs() {
    let pos = 50 - this.calculateWidth / 2;
    let positions: number[] = [];
    this.pattern.frames.forEach(frame => {
      let half = (frame.width * this.wScale) / 2;
      pos += half;
      positions.push(pos);
      pos += half + this.wSpace;
    });
    return positions;
  }

  get posterYs() {
    let count = this.posters.length;
    switch (this.posters.length) {
      case 1:
        return [40];
      case 2:
        return [40, 40];
      case 3:
        return [40, 40, 40];
      case 4:
        return [30, 30, 60, 60];
      case 5:
        return [30, 30, 30, 60, 60];
      default:
        return [];
    }
  }
}
</script>
