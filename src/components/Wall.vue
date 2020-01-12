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
      @posterAdded="posterAdded"
      @close="closeSwitcher"
      @frameChanged="frameChanged"
    />
  </div>
</template>

<script>
import FrameDisplay from "./FrameDisplay.vue";
import PosterSwitcher from "./PosterSwitcher.vue";
import { Pattern, Poster, FrameHelper } from "../frame";

export default {
  name: "Wall",
  components: {
    FrameDisplay,
    PosterSwitcher
  },
  data() {
    return {
      helper: null,
      switchingFrame: null,
      bgImage: require("../assets/rawpixel-760112-unsplash.jpg")
    };
  },
  props: {
    posters: Array,
    pattern: Object,
    hScale: {
      type: Number,
      default: 1.0
    },
    wScale: {
      type: Number,
      default: 1.0
    }
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
      this.$emit("posterAdded", poster);
    },
    selectFrame(frame) {
      this.switchingFrame = frame;
    },
    frameChanged(frame, poster) {
      this.$emit("frameChanged", frame, poster);
    },
    closeSwitcher() {
      this.switchingFrame = null;
    }
  },
  computed: {
    frames() {
      if (this.pattern === null) {
        return [];
      }
      return this.pattern.frames;
    }
  }
};
</script>
