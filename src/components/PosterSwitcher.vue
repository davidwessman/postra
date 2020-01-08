<template>
  <Modal name="poster-switcher" :open="open" @close="close">
    <template v-slot:title>
      <h2 class="text-l font-semibold mr-2">Change poster</h2>
      <span>Select a poster by clicking it.</span>
    </template>
    <template v-slot:body>
      <div class="flex flex-wrap">
        <PosterForm :poster="newPoster" :on-submit="onSubmitPoster" />
        <PosterInformation
          v-for="poster in posters"
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
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
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
  open!: boolean;

  @Prop()
  frame!: Frame;

  @Prop()
  posters!: Poster[];

  @Prop()
  addPoster!: Function;

  selectedPoster: Poster | null = null;
  newPoster: Poster | null = new Poster(0, "", "", "");

  get rotated(): boolean {
    return this.frame && this.frame.orientation === Orientation.Landscape;
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

  @Watch('frame')
  onPropertyChanged(value: Frame | null, oldValue: Frame | null) {
    if (this.frame === null) {
      this.selectedPoster = null;
    } else {
      this.selectedPoster = this.frame.poster;
    }
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
