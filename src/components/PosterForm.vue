<template>
  <div class="flex w-full">
    <div class="flex flex-col w-2/3 p-2">
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="title"
          >Title</label
        >
        <input
          id="title"
          v-model="localPoster.title"
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Title"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="title"
          >Image link</label
        >
        <input
          id="src"
          v-model="localPoster.src"
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Link"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="title"
          >Orientation</label
        >
        <select
          id="orientation"
          v-model="localPoster.orientation"
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Orientation"
        >
          <option selected :value="orientations.PORTRAIT">Portrait</option>
          <option :value="orientations.LANDSCAPE">Landscape</option>
          <option :value="orientations.BOTH">Both</option>
        </select>
      </div>
      <span class="my-3">
        <button
          type="button"
          class="px-3 py-1 text-white bg-blue-700 border border-blue-700 rounded-lg hover:bg-blue-dark"
          @click="handleSubmit()"
        >
          Save
        </button>
      </span>
    </div>
    <div class="w-1/3 p-2">
      <img
        v-lazy="poster.src"
        :alt="poster.title"
        class="w-auto max-h-full mx-auto"
        :class="{
          'border-4 border-teal-400': selected,
        }"
      />
    </div>
  </div>
</template>

<script>
import { Poster, orientations } from "../frame";

export default {
  name: "PosterForm",
  props: {
    poster: Poster,
    selected: {
      type: Boolean,
      default: false,
    },
    frameRotated: Boolean,
  },
  data() {
    return {
      orientations: orientations,
      localPoster: JSON.parse(JSON.stringify(this.poster)),
    };
  },

  watch: {
    poster(newValue) {
      this.localPoster = JSON.parse(JSON.stringify(this.poster));
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.localPoster);
    },
  },
};
</script>
