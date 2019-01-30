<template>
  <image
    :xlink:href="poster.url"
    :width="posterWidth"
    :heigth="posterHeight"
    :x="topLeftX"
    :y="topLeftY"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Poster } from "../poster";

@Component
export default class PosterDisplay extends Vue {
  @Prop()
  poster!: Poster;
  @Prop({ default: 100 / 300 })
  scale!: number;
  @Prop({ default: 50 })
  x!: number;
  @Prop({ default: 50 })
  y!: number;

  get posterWidth() {
    return this.poster.width * this.scale + "%";
  }

  get posterHeight() {
    return this.poster.heigth * this.scale + "%";
  }

  get topLeftX() {
    let x = this.x - (this.poster.width * this.scale) / 2;
    return x + "%";
  }

  get topLeftY() {
    let y = this.y - (this.poster.heigth * this.scale) / 2;
    return y + "%";
  }
}
</script>
