<template>
  <Modal name="poster-switcher" :open="open" @close="close">
    <template v-slot:title>
      <div
        v-if="formMode"
        class="flex flex-row flex-wrap justify-between border-b border-gray-600"
      >
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
      <div
        v-else
        class="flex flex-row flex-wrap justify-between border-b border-gray-600"
      >
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
    SelectedPoster
  },
  data() {
    return {
      formMode: false,
      selectedPoster: null,
      newPoster: new Poster(0, "", "", "")
    };
  },
  props: {
    open: Boolean,
    frame: Object,
    posters: Array
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
      this.$emit("posterAdded", poster);
      this.onSelectPoster(poster);
    },
    onSelectPoster(poster, confirmed = false) {
      const frame = this.frame;
      frame.poster = poster;
      this.$emit("frameChanged", frame, poster);
      this.selectedPoster = poster;
      if (confirmed) {
        this.close();
      }
    }
  },
  computed: {
    rotated() {
      return this.frame && this.frame.orientation === orientations.LANDSCAPE;
    }
  },
  watch: {
    frame: {
      handler: function(value, oldValue) {
        if (this.frame === null) {
          this.selectedPoster = null;
        } else {
          this.selectedPoster = this.frame.poster;
        }
      }
    }
  }
};
</script>
