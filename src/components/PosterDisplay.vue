<template>
  <image
    class="z-20"
    :xlink:href="poster.url"
    :width="posterWidth"
    :height="posterHeight"
    :x="topLeftX"
    :y="topLeftY"
    @click="onClick(poster)"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Poster } from "../poster";

@Component({
  components: {}
})
export default class PosterDisplay extends Vue {
  @Prop()
  poster!: Poster;
  @Prop({ default: 1 })
  hScale!: number;
  @Prop({ default: 1 })
  wScale!: number;
  @Prop({ default: 500 })
  x!: number;
  @Prop({ default: 500 })
  y!: number;
  @Prop()
  onClick!: Function;

  created() {
    this.poster.x = this.x;
    this.poster.y = this.y;
  }

  get posterWidth() {
    return this.poster.width * this.wScale + "%";
  }

  get posterHeight() {
    return this.poster.heigth * this.hScale + "%";
  }

  get topLeftX() {
    let x = this.poster.x - (this.poster.width * this.wScale) / 2;
    return x + "%";
  }

  get topLeftY() {
    let y = this.poster.y - (this.poster.heigth * this.hScale) / 2;
    return y + "%";
  }
}
</script>
