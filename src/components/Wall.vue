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
        :helper="helper"
        @select="selectFrame"
      ></FrameDisplay>
    </svg>
    <PosterSwitcher
      :open="switchingFrame != null"
      :frame="switchingFrame"
      :posters="posters"
      :add-poster="addPoster"
      @close="closeSwitcher"
      @frameChanged="frameSwitchedPoster"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FrameDisplay from "./FrameDisplay.vue";
import PosterSwitcher from "./PosterSwitcher.vue";
import { Pattern } from "../pattern";
import { Poster } from "../poster";
import { Frame, FrameHelper } from "../frame";

@Component({
  components: {
    FrameDisplay,
    PosterSwitcher
  }
})
export default class Wall extends Vue {
  @Prop()
  posters!: Poster[];

  @Prop()
  pattern!: Pattern;

  @Prop({ default: 1 })
  hScale!: number;

  @Prop({ default: 1 })
  wScale!: number;

  @Prop()
  frameSwitchedPoster!: Function;

  @Prop()
  addPoster!: Function;

  helper: FrameHelper | null = null;
  switchingFrame: Frame | null = null;
  bgImage = require("../assets/rawpixel-760112-unsplash.jpg");

  created() {
    this.helper = new FrameHelper(
      this.wScale,
      this.hScale,
      this.pattern.offsetX,
      this.pattern.offsetY
    );
  }

  get frames(): Frame[] {
    if (this.pattern === null) {
      return [];
    }
    return this.pattern.frames;
  }

  get emptyFrames(): Frame[] {
    return this.frames.filter(frame => frame.poster === null);
  }

  get posterFrames(): Frame[] {
    return this.frames.filter(frame => frame.poster !== null);
  }

  selectFrame(frame: Frame): void {
    this.switchingFrame = frame;
  }

  closeSwitcher(): void {
    this.switchingFrame = null;
  }
}
</script>
