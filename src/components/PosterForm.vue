<template>
  <div class="flex w-full">
    <div class="flex flex-col w-2/3">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title"
          >Title</label
        >
        <input
          id="title"
          v-model="poster.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Title"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title"
          >Image link</label
        >
        <input
          id="src"
          v-model="poster.src"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Link"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title"
          >Orientation</label
        >
        <select
          id="orientation"
          v-model="poster.orientation"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          class="px-3 py-1 rounded-lg border bg-blue-700 border-blue-700 text-white hover:bg-blue-dark"
          @click="onSubmit(poster)"
        >
          Save
        </button>
      </span>
    </div>
    <div class="w-1/3">
      <img
        v-lazy="poster.src"
        :alt="poster.title"
        class="mx-auto max-h-full w-auto"
        :class="{
          'border-4 border-teal-400': selected
        }"
      />
    </div>
  </div>
</template>

<script>
import { Orientation, Poster } from "../frame";

export default {
  name: "PosterForm",
  props: {
    poster: Poster,
    selected: {
      type: Boolean,
      default: false
    },
    frameRotated: Boolean
  },
  methods: {
    handleSubmit(poster) {
      this.$emit("submit", poster);
    }
  }
};
</script>
