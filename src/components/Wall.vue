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
        v-for="frame in emptyFrames"
        :key="frame.id"
        :x="helper.x(frame)"
        :y="helper.y(frame)"
        :xc="helper.xc(frame)"
        :yc="helper.yc(frame)"
        :height="helper.height(frame)"
        :width="helper.width(frame)"
        :on-click="() => selectFrame(frame)"
      ></FrameDisplay>
      <PosterDisplay
        v-for="frame in posterFrames"
        :key="frame.id"
        :image="frame.poster.src"
        :x="helper.x(frame)"
        :y="helper.y(frame)"
        :height="helper.height(frame)"
        :width="helper.width(frame)"
        :transform="helper.rotateSvg(frame)"
        :on-click="() => selectFrame(frame)"
      ></PosterDisplay>
    </svg>
    <PosterSwitcher
      v-if="switchingFrame"
      :frame="switchingFrame"
      :posters="posters"
      @close="closeSwitcher"
      @frameChanged="frameSwitchedPoster"
      @addPoster="addPoster"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FrameDisplay from "./FrameDisplay.vue";
import PosterDisplay from "./PosterDisplay.vue";
import PosterSwitcher from "./PosterSwitcher.vue";
import { Pattern } from "../pattern";
import { Poster } from "../poster";
import { Frame, FrameHelper } from "../frame";

@Component({
  components: {
    FrameDisplay,
    PosterDisplay,
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

  switchingFrame: Frame | null = null;
  bgImage = require("../assets/rawpixel-760112-unsplash.jpg");

  get frames() {
    if (this.pattern === null) {
      return [];
    }
    return this.pattern.frames;
  }

  get emptyFrames() {
    return this.frames.filter(frame => frame.poster === null);
  }

  get posterFrames() {
    return this.frames.filter(frame => frame.poster !== null);
  }

  selectFrame(frame: Frame) {
    this.switchingFrame = frame;
  }

  closeSwitcher() {
    this.switchingFrame = null;
  }

  get helper() {
    return new FrameHelper(
      this.wScale,
      this.hScale,
      this.pattern.offsetX,
      this.pattern.offsetY
    );
  }
}
</script>
