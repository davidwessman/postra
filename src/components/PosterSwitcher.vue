<template>
  <Modal name="poster-switcher" @close="close">
    <template v-slot:header>
      <div>
        <h2 class="mr-2">Change poster</h2>
        <span>Select a poster by clicking it.</span>
      </div>
    </template>
    <template v-slot:body>
      <div class="flex flex-wrap">
        <PosterForm :poster="newPoster" :on-submit="onSubmitPoster" />
        <PosterInformation
          v-for="poster in availablePosters"
          :key="poster.id"
          :poster="poster"
          :selected="selected(poster)"
          :frame-rotated="rotated"
          :on-select="onSelectPoster"
          :close="close"
        />
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Modal from "./modal.vue";
import PosterForm from "./PosterForm.vue";
import PosterInformation from "./PosterInformation.vue";
import { Frame } from "../frame";
import { Orientation } from "../orientation";
import { Poster } from "../poster";

@Component({
  components: {
    Modal,
    PosterForm,
    PosterInformation
  }
})
export default class PosterSwitcher extends Vue {
  @Prop()
  frame!: Frame;
  @Prop()
  posters!: Poster[];
  @Prop()
  addPoster!: Function;

  selectedPoster: Poster | null = null;
  newPoster: Poster | null = new Poster(0, "", "");

  get rotated(): boolean {
    return this.frame && this.frame.orientation === Orientation.Landscape;
  }

  get availablePosters(): Poster[] {
    return this.posters.filter(poster => {
      return (
        poster.orientation === Orientation.Both ||
        (this.frame && poster.orientation === this.frame.orientation)
      );
    });
  }

  created(): void {
    this.selectedPoster = this.frame.poster;
  }

  selected(poster: Poster): boolean {
    return this.selectedPoster !== null && poster.id === this.selectedPoster.id;
  }

  @Emit("close")
  close(): void {
    undefined;
  }

  @Emit("frameChanged")
  emitRefresh(frame: Frame, poster: Poster): void {
    undefined;
  }

  onSelectPoster(poster: Poster): void {
    const frame: Frame = this.frame;
    frame.poster = poster;
    this.emitRefresh(frame, poster);
    this.selectedPoster = poster;
  }

  onSubmitPoster(poster: Poster): void {
    this.addPoster(poster);
    this.onSelectPoster(poster);
    this.close();
  }
}
</script>
