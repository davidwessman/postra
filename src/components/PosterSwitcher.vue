<template>
  <div
    class="fixed pin-b flex overflow-x-auto bg-blue-transparent justify-center p-3 z-40 w-full"
  >
    <div
      v-for="poster in availablePosters"
      :key="poster.id"
      class="items-center h-auto mx-1"
      style="width: 200px;"
      :class="{
        rotated: rotate(poster),
      }"
    >
      <img
        :src="poster.src"
        :alt="poster.description"
        class="mx-auto max-h-100 w-auto"
        :class="{
          'border-4 border-teal': editingFrame.poster && poster.id === editingFrame.poster.id,
        }"
        @click="onSelectPoster(poster)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { Frame } from "../frame";
import { Orientation } from "../orientation";
import { Poster } from "../poster";

@Component({
  components: {}
})
export default class PosterSwitcher extends Vue {
  @Prop()
  frame!: Frame;
  @Prop()
  posters!: Poster[];
  editingFrame: Frame | null = null;

  get rotated() {
    return this.editingFrame &&
      this.editingFrame.orientation === Orientation.Landscape;
  }

  @Watch("frame")
  onFrameChanged(value: Frame, oldValue: Frame) {
    this.editingFrame = Object.assign({}, value);
  }

  @Emit("unselect")
  clear() {
    this.editingFrame = null;
  }

  created() {
    this.editingFrame = Object.assign({}, this.frame);
  }

  get availablePosters() {
    return this.posters.filter(poster => {
      return poster.orientation === Orientation.Both ||
        (this.editingFrame && poster.orientation === this.editingFrame.orientation);
    });
  }

  rotate(poster: Poster) {
    if (this.editingFrame === null) {
      return false;
    }
    return poster.orientation === Orientation.Both &&
      this.editingFrame.orientation === Orientation.Landscape;
  }

  @Emit("frameChanged")
  emitRefresh(frame: Frame, mode: string) {
    this.clear();
  }

  onSelectPoster(poster: Poster) {
    const frame = <Frame>this.editingFrame;
    frame.poster = poster;
    this.emitRefresh(frame, "update");
  }
}
</script>

