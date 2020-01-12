<template>
  <svg :width="width" :height="height" :x="xpos" :y="ypos" @click="onClick">
    <rect
      class="z-20"
      width="100%"
      height="100%"
      stroke="black"
      stroke-width="0.5"
      fill="transparent"
    />
    <svg v-if="!hasPoster" x="41%" y="40%">
      <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
    </svg>
    <image
      v-else
      class="z-20"
      :xlink:href="frame.poster.src"
      width="100%"
      height="100%"
      @click="onClick"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Frame, FrameHelper } from "../frame";

@Component({
  components: {}
})
export default class FrameDisplay extends Vue {
  @Prop()
  frame!: Frame;
  @Prop()
  helper!: FrameHelper;

  onClick() {
    this.$emit("select", this.frame);
  }

  get hasPoster(): boolean {
    return this.helper.hasImage(this.frame);
  }

  get xpos(): string {
    return this.helper.x(this.frame);
  }

  get ypos(): string {
    return this.helper.y(this.frame);
  }

  get width(): string {
    return this.helper.width(this.frame);
  }

  get height(): string {
    return this.helper.height(this.frame);
  }

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }
}
</script>
