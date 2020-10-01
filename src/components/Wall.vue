<template>
  <div class="flex justify-center w-full h-screen px-auto">
    <svg
      class="w-auto h-screen"
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
      @poster-added="posterAdded"
      @close="closeSwitcher"
      @frame-changed="frameChanged"
    />
  </div>
</template>

<script>
import FrameDisplay from "./FrameDisplay.vue";
import PosterSwitcher from "./PosterSwitcher.vue";
import { FrameHelper } from "../frame";

export default {
  name: "Wall",
  components: {
    FrameDisplay,
    PosterSwitcher,
  },
  props: {
    posters: {
      type: Array,
      default: () => [],
    },
    pattern: {
      type: Object,
      default: () => {},
    },
    hScale: {
      type: Number,
      default: 1.0,
    },
    wScale: {
      type: Number,
      default: 1.0,
    },
  },
  data() {
    return {
      helper: null,
      switchingFrame: null,
      bgImage: require("../assets/rawpixel-760112-unsplash.jpg"),
    };
  },
  computed: {
    frames() {
      if (this.pattern === null) {
        return [];
      }
      return this.pattern.frames;
    },
  },
  created() {
    this.helper = new FrameHelper(
      this.wScale,
      this.hScale,
      this.pattern.offsetX,
      this.pattern.offsetY
    );
  },
  methods: {
    posterAdded(poster) {
      this.$emit("poster-added", poster);
    },
    selectFrame(frame) {
      this.switchingFrame = frame;
    },
    frameChanged(frame, poster) {
      this.$emit("frame-changed", frame, poster);
    },
    closeSwitcher() {
      this.switchingFrame = null;
    },
  },
};
</script>
