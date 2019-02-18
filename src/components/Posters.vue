<template>
  <svg
    class="h-screen w-auto"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    viewBox="0 0 15 10"
  >
    <image
      class="z-0"
      :xlink:href="bgImage"
      heigth="100%"
      width="100%"
      preserveAspectRatio="xMinYMid meet"
    />
    <PosterDisplay
      v-for="poster in posters"
      :key="poster.id"
      :onClick="onSelect"
      :poster="poster"
      :x="posterXs[poster.id]"
      :y="posterYs[poster.id]"
      :hScale="hScale"
      :wScale="wScale"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PosterDisplay from "./PosterDisplay.vue";
import { Poster } from "../poster";

@Component({
  components: {
    PosterDisplay
  }
})
export default class Posters extends Vue {
  bgImage = require("../assets/rawpixel-760112-unsplash.jpg");
  @Prop({ default: [] })
  posters!: Poster[];
  @Prop()
  onSelect!: Function;

  wScale: number = 100 / 300;
  hScale: number = 100 / 200;

  space: number = 10;
  width: number = 0;

  created() {
    this.width = this.calculateWidth;
  }

  get hSpace() {
    return this.space * this.hScale;
  }

  get wSpace() {
    return this.space * this.wScale;
  }

  get calculateWidth() {
    let width: number = this.posters.reduce((acc, poster) => +acc + +poster.width, 0);

    if (this.posters.length > 0) {
      width += this.space * (this.posters.length - 1);
    }
    return width * this.wScale;
  }

  get posterXs() {
    let pos = 50 - this.calculateWidth / 2;
    let positions: number[] = [];
    this.posters.forEach(poster => {
      let half = (poster.width * this.wScale) / 2;
      pos += half;
      positions.push(pos);
      pos += half + this.wSpace;
    });
    return positions;
  }

  get staticXs() {
    let count = this.posters.length;
    switch (this.posters.length) {
      case 1:
        return [50];
      case 2:
        return [35, 65];
      case 3:
        return [25, 50, 75];
      case 4:
        return [35, 65, 35, 65];
      case 5:
        return [25, 50, 75, 35, 65];
      default:
        return [];
    }
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
