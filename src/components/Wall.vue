<template>
  <div class="flex w-full h-screen px-auto justify-center">
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
        :selected="selectedFrame === frame"
        :hScale="hScale"
        :wScale="wScale"
        :on-click="selectFrame"
      />
    </svg>
    <div
      v-if="selectedFrame !== null"
      class="absolute pin-b flex bg-blue-transparent w-full justify-center py-2 z-40"
    >
      <PosterSwitcher
        v-if="selectedFrame"
        :frame="selectedFrame"
        :urls="posterUrls"
        @unselect="unselectFrame"
        @frameChanged="frameChanged"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FrameDisplay from "./FrameDisplay.vue";
import PosterSwitcher from "./PosterSwitcher.vue";
import { Pattern } from "../pattern";
import { Poster } from "../poster";
import { Frame } from "../frame";

@Component({
  components: {
    FrameDisplay,
    PosterSwitcher
  }
})
export default class Wall extends Vue {
  @Prop({ default: [] })
  posters!: Poster[];

  @Prop()
  pattern!: Pattern;

  @Prop({ default: 1 })
  hScale!: number;

  @Prop({ default: 1 })
  wScale!: number;

  @Prop({ default: [] })
  posterUrls!: string[];

  @Prop()
  frameChanged!: Function;

  selectedFrame: Frame | null = null;
  bgImage = require("../assets/rawpixel-760112-unsplash.jpg");

  get frames() {
    if (this.pattern === null) {
      return [];
    }
    return this.pattern.frames;
  }

  selectFrame(frame: Frame) {
    this.selectedFrame = frame;
  }

  unselectFrame() {
    this.selectedFrame = null;
  }
}
</script>
