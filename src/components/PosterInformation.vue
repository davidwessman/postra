<template>
  <div
    class="flex items-center h-auto p-3 mb-2 w-1/3 lg:w-1/5"
    :class="{
      rotated: rotate,
      'px-4': rotate
    }"
  >
    <img
      v-lazy="poster.src"
      :alt="poster.title"
      class="mx-auto max-h-full w-auto"
      :class="{
        'border-4 border-teal-400': selected
      }"
      @click="select(poster, selected)"
    />
  </div>
</template>

<script>
import { Poster, orientations } from "../frame";

export default {
  name: "PosterInformation",
  props: {
    poster: Object,
    selected: {
      type: Boolean,
      default: false
    },
    frameRotated: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    select(poster, confirmed = false) {
      this.$emit("select", poster, confirmed);
    }
  },
  computed: {
    rotate() {
      return this.frameRotated && this.poster.orientation === orientations.BOTH;
    }
  }
};
</script>
