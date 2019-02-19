<template>
  <svg>
    <image
      v-if="hasImage(frame)"
      class="z-20"
      :xlink:href="frame.poster.src"
      :width="width"
      :height="height"
      :x="topLeftX"
      :y="topLeftY"
      @click="onClick(frame)"
    />
    <rect
      v-if="!hasImage(frame)"
      class="z-20"
      :width="width"
      :height="height"
      :x="topLeftX"
      :y="topLeftY"
      stroke="black"
      stroke-width="1"
      fill="transparent"
      @click="onClick(frame)"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Frame } from "../frame";

@Component({
  components: {}
})
export default class FrameDisplay extends Vue {
  @Prop()
  frame!: Frame;
  @Prop({ default: 1 })
  hScale!: number;
  @Prop({ default: 1 })
  wScale!: number;
  @Prop()
  onClick!: Function;

  hasImage(frame: Frame) {
    return frame.poster !== null;
  }

  asPercent(value: number) {
    return value * 100 + "%";
  }

  get width() {
    return this.asPercent(this.frame.width * this.wScale);
  }

  get height() {
    return this.asPercent(this.frame.height * this.hScale);
  }

  get topLeftX() {
    let x = this.frame.x - this.frame.width / 2;
    x = x * this.wScale + 1 / 2;
    return this.asPercent(x);
  }

  get topLeftY() {
    let y = this.frame.y + this.frame.height / 2;
    y = -(y * this.hScale) + 1 / 2;
    return this.asPercent(y);
  }
}
</script>
