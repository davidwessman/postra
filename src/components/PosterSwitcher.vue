<template>
  <Modal name="poster-switcher" @close="close">
    <template v-slot:header>
      <div>
        <h2 class="mr-2">Change poster</h2>
        <span>Select a poster by clicking it.</span>
      </div>
    </template>
    <div
      class="flex flex-wrap justify-center overflow-y-auto p-3 z-40 w-full -mx-4"
      style="max-height: 60%"
    >
      <div
        v-for="poster in availablePosters"
        :key="poster.id"
        class="flex items-center h-auto w-1/3 md:w-1/5 px-2 mx-2"
        :class="{
          rotated: rotate(poster),
          'px-8': rotate(poster),
        }"
      >
        <img
          :src="poster.src"
          :alt="poster.description"
          class="mx-auto max-h-full w-auto"
          :class="{
            'border-4 border-teal': editingFrame.poster && poster.id === editingFrame.poster.id,
          }"
          @click="onSelectPoster(poster)"
        >
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import Modal from "./modal.vue";
import { Frame } from "../frame";
import { Orientation } from "../orientation";
import { Poster } from "../poster";

@Component({
  components: {
    Modal
  }
})
export default class PosterSwitcher extends Vue {
  @Prop()
  frame!: Frame;
  @Prop()
  posters!: Poster[];
  editingFrame: Frame | null = null;

  get rotated() {
    return (
      this.editingFrame &&
      this.editingFrame.orientation === Orientation.Landscape
    );
  }

  @Watch("frame")
  onFrameChanged(value: Frame, oldValue: Frame) {
    this.editingFrame = Object.assign({}, value);
  }

  @Emit("close")
  close() {
    this.editingFrame = null;
  }

  created() {
    this.editingFrame = Object.assign({}, this.frame);
  }

  get availablePosters() {
    return this.posters.filter(poster => {
      return (
        poster.orientation === Orientation.Both ||
        (this.editingFrame &&
          poster.orientation === this.editingFrame.orientation)
      );
    });
  }

  rotate(poster: Poster) {
    if (this.editingFrame === null) {
      return false;
    }
    return (
      poster.orientation === Orientation.Both &&
      this.editingFrame.orientation === Orientation.Landscape
    );
  }

  @Emit("frameChanged")
  emitRefresh(frame: Frame, mode: string) {
    this.close();
  }

  onSelectPoster(poster: Poster) {
    const frame = <Frame>this.editingFrame;
    frame.poster = poster;
    this.emitRefresh(frame, "update");
  }
}
</script>

