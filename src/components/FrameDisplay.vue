<template>
  <svg :width="width" :height="height" :x="x" :y="y" @click="onClick">
    <rect
      class="z-20"
      width="100%"
      height="100%"
      stroke="black"
      stroke-width="0.5"
      fill="transparent"
    />
    <svg x="41%" y="40%">
      <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
    </svg>
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
  x!: string;
  @Prop()
  y!: string;
  @Prop()
  xc!: string;
  @Prop()
  yc!: string;
  @Prop()
  width!: string;
  @Prop()
  height!: string;
  @Prop()
  onClick!: Function;

  get viewBox() {
    return "0 0 " + this.width + " " + this.height;
  }
}
</script>
