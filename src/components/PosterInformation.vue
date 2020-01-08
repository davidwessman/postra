<template>
  <div
    class="flex items-center h-auto p-3 mb-2"
    :class="{
      'w-full p-3 border rounded-md': selected,
      'w-1/3 lg:w-1/5': !selected,
      rotated: rotate && !selected,
      'px-4': rotate && !selected
    }"
  >
    <div v-if="selected" class="flex flex-row flex-wrap p-3">
      <div class="w-full">
        <h3 class="font-bold">{{ poster.title }}</h3>
      </div>
      <div class="flex flex-col w-3/4 mt-2">
        <span class="my-3">
          Source:
          <a class="text-blue-700 underline" :href="poster.link">
            {{ poster.link }}
          </a>
        </span>
        <span class="my-3">
          <button
            type="button"
            class="px-3 py-1 rounded-lg border bg-blue-700 border-blue-700 text-white hover:bg-blue-900"
            @click="close"
          >
            Close
          </button>
        </span>
      </div>
      <div class="w-1/4">
      <img
        v-lazy="poster.src"
        :alt="poster.title"
        class="mx-auto h-auto w-full"
      />
      </div>
    </div>
    <img
      v-if="!selected"
      v-lazy="poster.src"
      :alt="poster.title"
      class="mx-auto max-h-full w-auto"
      :class="{
        'border-4 border-teal-400': selected
      }"
      @click="onSelect(poster)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Poster } from "../poster";
import { Orientation } from "../orientation";

@Component({
  components: {}
})
export default class PosterInformation extends Vue {
  @Prop()
  poster!: Poster;
  @Prop({ default: false })
  selected!: boolean;
  @Prop()
  frameRotated!: boolean;
  @Prop()
  onSelect!: Function;
  @Prop()
  close!: Function;

  get rotate(): boolean {
    return this.frameRotated && this.poster.orientation === Orientation.Both;
  }
}
</script>
