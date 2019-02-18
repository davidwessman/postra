<template>
  <div class="flex w-full flex-wrap">
    <div class="flex w-full h-screen px-auto justify-center">
      <Posters :posters="posters" @onSelect="onSelect" />
    </div>
    <div
      class="absolute pin-b flex bg-blue-transparent w-full justify-center py-2 z-40"
    >
      <button
        v-if="!addingPoster && !selectedPoster"
        class="p-2 border border-grey-darker bg-white rounded text-grey-darker"
        @click="enableAddMode"
      >
        Add
      </button>
      <PosterDetail
        v-if="selectedPoster || addingPoster"
        :poster="selectedPoster"
        :urls="posterUrls"
        @unselect="unselect"
        @posterChanged="posterChanged"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PosterDetail from "./PosterDetail.vue";
import Posters from "./Posters.vue";
import { Poster } from "../poster";

@Component({
  components: {
    PosterDetail,
    Posters
  }
})
export default class Wall extends Vue {
  addingPoster = false;
  selectedPoster: Poster | null = null;
  posters: Poster[] = [];
  nextId: number = 0;
  posterUrls: string[] = [
    "https://posterstore.se/images/2x/normal/peonies.jpg",
    "https://posterstore.se/images/2x/normal/133.jpg",
    "https://posterstore.se/images/2x/normal/vee-speers-birthdat.jpg",
    "https://posterstore.se/images/2x/normal/morning-sun.jpg",
    "https://posterstore.se/images/2x/normal/flower-bouquet.jpg"
  ];

  created() {
    this.posters.push({
      id: 0,
      url: "https://posterstore.se/images/2x/normal/peonies.jpg",
      heigth: 70,
      width: 50,
      x: 50,
      y: 50
    });
    this.nextId += 1;
  }

  deletePoster(poster: Poster) {
    this.posters = this.posters.filter(p => p !== poster);
    if (this.selectedPoster === poster) {
      this.selectedPoster = null;
    }
  }

  enableAddMode() {
    this.addingPoster = true;
    this.selectedPoster = null;
  }

  posterChanged(poster: Poster, mode: string) {
    // eslint-disable-next-line
    console.log("poster changed", poster);
    if (mode === "add") {
      poster.id = this.nextId;
      this.posters.push(poster);
      this.nextId += 1;
    } else {
      let index = this.posters.findIndex(p => poster.id === p.id);
      this.posters.splice(index, 1, poster);
    }
  }

  onSelect(poster: Poster) {
    this.addingPoster = false;
    this.selectedPoster = poster;
  }

  unselect() {
    this.addingPoster = false;
    this.selectedPoster = null;
  }
}
</script>
