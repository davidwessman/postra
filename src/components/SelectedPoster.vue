<template>
  <div
    v-if="poster != null"
    class="flex items-center w-full h-auto p-3 mb-2 border border-gray-400 rounded-md"
    :class="{
      rotated: rotate,
      'px-4': rotate,
    }"
  >
    <div class="flex flex-row flex-wrap p-3">
      <div class="flex flex-row flex-wrap justify-between w-full">
        <h3 class="mb-2 font-bold">{{ poster.title }}</h3>
        <a
          class="p-2 ml-1 bg-white border border-gray-800 rounded hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          :href="poster.link"
          target="_blank"
        >
          Source
        </a>
      </div>
      <div class="flex flex-row justify-between w-full">
        <img v-lazy="poster.src" :alt="poster.title" class="w-1/4 h-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import { orientations } from "../frame";

export default {
  name: "SelectedPoster",
  props: {
    poster: {
      type: Object,
      default: () => {},
    },
    frameRotated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rotate() {
      if (this.poster == null) {
        return false;
      }

      return this.frameRotated && this.poster.orientation === orientations.BOTH;
    },
  },
  methods: {},
};
</script>
