<template>
  <div
    class="flex items-center h-auto p-3 mb-2 w-1/3 lg:w-1/5"
    :class="{
      rotated: rotate,
      'px-4': rotate,
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

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
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

  @Prop({ default: false })
  frameRotated!: boolean;

  @Emit("select")
  select(poster: Poster, confirmed = false): void {
    undefined;
  }

  get rotate(): boolean {
    return this.frameRotated && this.poster.orientation === Orientation.Both;
  }
}
</script>
