<template>
  <div
    class="flex items-center h-auto p-3 mb-2"
    :class="{
      'w-2/5 p-3 border': selected,
      'w-1/3 md:w-1/5': !selected,
      rotated: rotate && !selected,
      'px-8': rotate && !selected
    }"
  >
    <div v-if="selected" class="flex flex-col w-3/4 p-3">
      <h3>{{ poster.title }}</h3>
      <span class="my-3">
        Source: <a :href="poster.link">{{ poster.link }}</a>
      </span>
      <span class="my-3">
        <button
          type="button"
          class="px-3 py-1 rounded-lg border bg-blue border-blue text-white hover:bg-blue-dark"
          @click="close"
        >
          Close
        </button>
      </span>
      </ul>
    </div>
    <div v-if="selected" class="w-1/4">
      <img :src="poster.src" :alt="poster.title" class="mx-auto h-auto w-full" />
    </div>
    <img
      v-if="!selected"
      :src="poster.src"
      :alt="poster.title"
      class="mx-auto max-h-full w-auto"
      :class="{
        'border-4 border-teal': selected
      }"
      @click="onSelect(poster)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Poster } from "../poster";
import { Frame } from "../frame";
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

  get rotate() {
    return this.frameRotated && this.poster.orientation === Orientation.Both;
  }
}
</script>
