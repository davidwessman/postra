<template>
  <Modal name="poster-switcher" :open="open" @close="close">
    <template v-slot:title>
      <div v-if="formMode" class="flex flex-row flex-wrap justify-between border-b border-gray-600">
        <div class="mr-6 mb-4">
          <h2 class="text-l font-semibold mr-2">Change poster - add one</h2>
        </div>
        <div class="flex flex-row justify-between mb-4">
          <button
            class="p-2 ml-1 border rounded border-gray-800 bg-white mr-2 hover:bg-gray-800 hover:border-gray-300 hover:text-white"
            @click="formMode = false"
          >
            Choose poster instead
          </button>
          <button
            type="button"
            class="p-2 ml-1 rounded border bg-blue-700 border-blue-700 text-white hover:bg-blue-900"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>
      <div v-else class="flex flex-row flex-wrap justify-between border-b border-gray-600">
        <div class="mr-6 mb-4">
          <h2 class="text-l font-semibold mr-2">Change poster - pick one</h2>
        </div>
        <div class="flex flex-row justify-between mb-4">
          <button
            class="p-2 ml-1 border rounded border-gray-800 bg-white mr-2 hover:bg-gray-800 hover:border-gray-300 hover:text-white"
            @click="formMode = true"
          >
            + Add a poster
          </button>
          <button
            type="button"
            class="p-2 ml-1 rounded border bg-blue-700 border-blue-700 text-white hover:bg-blue-900"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div v-if="formMode" class="flex flex-wrap pt-2">
        <PosterForm :poster="newPoster" :on-submit="onSubmitPoster" />
      </div>
      <div v-if="!formMode" class="flex flex-wrap">
        <PosterInformation
          v-if="selectedPoster != null"
          :poster="selectedPoster"
          :selected="true"
          :frame-rotated="rotated"
        />

        <PosterInformation
          v-for="poster in posters"
          :key="poster.id"
          :poster="poster"
          :frame-rotated="rotated"
          @select="onSelectPoster"
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

  formMode = false;

  get rotated(): boolean {
    return this.frame && this.frame.orientation === Orientation.Landscape;
  }

  @Emit("close")
  close(): void {
    undefined;
  }

  @Emit("frameChanged")
  emitRefresh(frame: Frame, poster: Poster): void {
    undefined;
  }

  @Watch("frame")
  onPropertyChanged(value: Frame | null, oldValue: Frame | null): void {
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
