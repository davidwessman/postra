<template>
  <div class="flex justify-center w-full p-2 sm:w-1/2 md:w-1/3">
    <svg
      class="z-20 w-64 h-64 bg-white"
      :class="{
        'border-4 border-teal-400': selected,
        'border border-black hover:border-4 hover:border-blue': !selected,
      }"
      viewBox="0 0 145 100"
      @click="onClick(pattern)"
    >
      <rect
        v-for="frame in pattern.frames"
        :key="frame.id"
        :width="helper.width(frame)"
        :height="helper.height(frame)"
        :x="helper.xpos(frame)"
        :y="helper.ypos(frame)"
        stroke="black"
        stroke-width="0.7"
        fill="transparent"
      />
    </svg>
  </div>
</template>

<script>
import { Pattern, FrameHelper } from "../frame";

export default {
  name: "PatternDisplay",
  props: {
    pattern: Pattern,
    hScale: {
      type: Number,
      default: 1.0,
    },
    wScale: {
      type: Number,
      default: 1.0,
    },
    selected: Boolean,
  },
  data() {
    return {
      helper: null,
    };
  },
  created() {
    this.helper = new FrameHelper(this.wScale, this.hScale, 0, 0);
  },
  methods: {
    onClick(pattern) {
      this.$emit("select", pattern);
    },
  },
};
</script>
