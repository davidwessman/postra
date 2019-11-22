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
          <option selected :value="orientations.Portrait">Portrait</option>
          <option :value="orientations.Landscape">Landscape</option>
          <option :value="orientations.Both">Both</option>
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
        :src="poster.src"
        :alt="poster.title"
        class="mx-auto max-h-full w-auto"
        :class="{
          'border-4 border-teal-400': selected
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Poster } from "../poster";
import { Orientation } from "../orientation";

@Component({
  components: {}
})
export default class PosterForm extends Vue {
  @Prop()
  poster!: Poster;
  @Prop({ default: false })
  selected!: boolean;
  @Prop()
  frameRotated!: boolean;
  @Prop()
  onSubmit!: Function;

  orientations = Orientation;
}
</script>
