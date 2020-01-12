<template>
  <div
    v-if="poster != null"
    class="flex items-center h-auto p-3 mb-2 w-full p-3 border border-gray-400 rounded-md"
    :class="{
      rotated: rotate,
      'px-4': rotate
    }"
  >
    <div class="flex flex-row flex-wrap p-3">
      <div class="flex flex-row w-full justify-between flex-wrap">
        <h3 class="font-bold mb-2 ">{{ poster.title }}</h3>
        <a
          class="p-2 ml-1 border rounded border-gray-800 bg-white hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          :href="poster.link"
          target="_blank"
        >
          Source
        </a>
      </div>
      <div class="flex flex-row w-full justify-between">
        <img v-lazy="poster.src" :alt="poster.title" class="h-auto w-1/4" />
      </div>
    </div>
  </div>
</template>

<script>
import { Poster, orientations } from "../frame";

export default {
  name: "SelectedPoster",
  props: {
    poster: Object,
    frameRotated: {
      type: Boolean,
      default: false
    }
  },
  methods: {},
  computed: {
    rotate() {
      if (this.poster == null) {
        return false;
      }

      return this.frameRotated && this.poster.orientation === orientations.BOTH;
    }
  }
};
</script>
