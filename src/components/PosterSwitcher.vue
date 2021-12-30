<template>
  <Modal :open="open" @close="close">
    <template #title>
      <div
        v-if="formMode"
        class="flex flex-row flex-wrap justify-between border-b border-gray-600"
      >
        <div class="mb-4 mr-6">
          <h2 class="mr-2 font-semibold text-l">Change poster - add one</h2>
        </div>
        <div class="flex flex-row justify-between mb-4">
          <button
            class="p-2 ml-1 mr-2 bg-white border border-gray-800 rounded hover:bg-gray-800 hover:border-gray-300 hover:text-white"
            @click="formMode = false"
          >
            Choose poster instead
          </button>
          <button
            type="button"
            class="p-2 ml-1 text-white bg-blue-700 border border-blue-700 rounded hover:bg-blue-900"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>
      <div
        v-else
        class="flex flex-row flex-wrap justify-between border-b border-gray-600"
      >
        <div class="mb-4 mr-6">
          <h2 class="mr-2 font-semibold text-l">Change poster - pick one</h2>
        </div>
        <div class="flex flex-row justify-between mb-4">
          <button
            class="p-2 ml-1 mr-2 bg-white border border-gray-800 rounded hover:bg-gray-800 hover:border-gray-300 hover:text-white"
            @click="formMode = true"
          >
            + Add a poster
          </button>
          <button
            type="button"
            class="p-2 ml-1 text-white bg-blue-700 border border-blue-700 rounded hover:bg-blue-900"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>
    </template>
    <template #body>
      <div v-if="formMode" class="flex flex-wrap pt-2">
        <PosterForm :poster="newPoster" @submit="onSubmitPoster" />
      </div>
      <div v-if="!formMode" class="flex flex-wrap">
        <SelectedPoster :poster="selectedPoster" :frame-rotated="rotated" />

        <PosterInformation
          v-for="poster in posters"
          :key="poster.id"
          :poster="poster"
          :frame-rotated="rotated"
          :selected="selected(poster)"
          @select="onSelectPoster"
        />
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "./modal.vue";
import PosterForm from "./PosterForm.vue";
import PosterInformation from "./PosterInformation.vue";
import SelectedPoster from "./SelectedPoster.vue";
import { Poster, orientations } from "../frame";
export default {
  name: "PosterSwitcher",
  components: {
    Modal,
    PosterForm,
    PosterInformation,
    SelectedPoster,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    frame: {
      type: Object,
      default: () => {},
    },
    posters: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["close", "frame-changed", "poster-added"],
  data() {
    return {
      formMode: false,
      selectedPoster: null,
      newPoster: new Poster(0, "", "", ""),
    };
  },
  computed: {
    rotated() {
      return this.frame && this.frame.orientation === orientations.LANDSCAPE;
    },
  },
  watch: {
    frame: {
      handler: function () {
        if (this.frame === null) {
          this.selectedPoster = null;
        } else {
          this.selectedPoster = this.frame.poster;
        }
      },
    },
  },
  methods: {
    selected(poster) {
      if (this.selectedPoster == null) {
        return false;
      }
      return (
        this.selectedPoster != null && this.selectedPoster.id === poster.id
      );
    },
    close() {
      this.$emit("close");
    },
    onSubmitPoster(poster) {
      this.$emit("poster-added", poster);
      this.onSelectPoster(poster);
      this.formMode = false;
      this.close();
    },
    onSelectPoster(poster, confirmed = false) {
      const frame = this.frame;
      frame.poster = poster;
      this.$emit("frame-changed", frame, poster);
      this.selectedPoster = poster;
      if (confirmed) {
        this.close();
      }
    },
  },
};
</script>
