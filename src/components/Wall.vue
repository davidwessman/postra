<template>
  <div class="flex w-full flex-wrap">
    <div class="w-full">
      <svg
        width="100%"
        heigth="100%"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        viewBox="0 0 15 10"
      >
        <image
          :xlink:href="bg_image"
          heigth="100%"
          width="100%"
          preserveAspectRatio="xMinYMid meet"
        />
        <PosterDisplay
          v-for="poster in posters"
          :key="poster.id"
          :poster="poster"
        />
      </svg>
    </div>
    <div class="w-full">
      <button @click="enableAddMode" v-if="!addingPoster && !selectedPoster">
        Add
      </button>
      <transition name="fade">
        <PosterDetail
          v-if="selectedPoster || addingPoster"
          :poster="selectedPoster"
          @unselect="unselect"
          @posterChanged="posterChanged"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PosterDetail from "./PosterDetail.vue";
import PosterDisplay from "./PosterDisplay.vue";
import { Poster } from "../poster";

@Component({
  components: {
    PosterDetail,
    PosterDisplay
  }
})
export default class Wall extends Vue {
  bg_image = require("../assets/rawpixel-760112-unsplash.jpg");
  addingPoster = false;
  selectedPoster: Poster | null = null;
  posters: Poster[] = [];

  created() {
    this.posters.push({
      id: 1,
      url: "https://posterstore.se/images/2x/normal/peonies.jpg",
      heigth: 70,
      width: 50,
      x: 50,
      y: 50
    });
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

  getPosters() {
    return this.posters;
  }

  posterChanged(poster: Poster, mode: string) {
    // eslint-disable-next-line
    console.log("poster changed", poster);
    if (mode === "add") {
      this.posters.push(poster);
    } else {
      let index = this.posters.findIndex(p => poster.id === p.id);
      this.posters.splice(index, 1, poster);
    }
  }

  onSelect(poster: Poster) {
    this.selectedPoster = poster;
  }

  unselect() {
    this.addingPoster = false;
    this.selectedPoster = null;
  }

  poster1 = "https://posterstore.se/images/2x/normal/peonies.jpg";
  poster2 = "https://posterstore.se/images/2x/normal/133.jpg";
  poster3 = "https://posterstore.se/images/2x/normal/vee-speers-birthdat.jpg";
  poster4 = "https://posterstore.se/images/2x/normal/morning-sun.jpg";
  poster5 = "https://posterstore.se/images/2x/normal/flower-bouquet.jpg";
  scale = 100 / 300;
  space = 10;
}
</script>
