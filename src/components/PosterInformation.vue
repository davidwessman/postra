<template>
  <div
    class="flex items-center w-1/3 h-auto p-3 mb-2 lg:w-1/5"
    :class="{
      rotated: rotate,
      'px-4': rotate,
    }"
  >
    <img
      :src="poster.src"
      :alt="poster.title"
      class="w-auto max-h-full mx-auto"
      :class="{
        'border-4 border-teal-400': selected,
      }"
      @click="select(poster, selected)"
    />
  </div>
</template>

<script>
import { orientations } from "../frame";

export default {
  name: "PosterInformation",
  props: {
    poster: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Boolean,
      default: false,
    },
    frameRotated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rotate() {
      return this.frameRotated && this.poster.orientation === orientations.BOTH;
    },
  },
  methods: {
    select(poster, confirmed = false) {
      this.$emit("select", poster, confirmed);
    },
  },
};
</script>
