<template>
  <div class="flex w-full flex-wrap">
    <div class="flex w-full h-screen px-auto justify-center">
      <svg
        class="h-screen w-auto"
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
          v-bind:onClick="onSelect"
          :key="poster.id"
          :poster="poster"
          :x="posterXs[poster.id]"
          :y="posterYs[poster.id]"
        />
      </svg>
    </div>
    <div class="flex w-full justify-center py-2">
      <button
        class="p-2 border border-black rounded"
        @click="enableAddMode"
        v-if="!addingPoster && !selectedPoster"
      >
        Add
      </button>
      <transition name="fade">
        <PosterDetail
          v-if="selectedPoster || addingPoster"
          :poster="selectedPoster"
          :urls="posterUrls"
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
  space = 10;
  nextId: number = 0;
  posterUrls: string[] = [
    "https://posterstore.se/images/2x/normal/peonies.jpg",
    "https://posterstore.se/images/2x/normal/133.jpg",
    "https://posterstore.se/images/2x/normal/vee-speers-birthdat.jpg",
    "https://posterstore.se/images/2x/normal/morning-sun.jpg",
    "https://posterstore.se/images/2x/normal/flower-bouquet.jpg"
  ];

  get posterWidth() {
    let width = this.posters.reduce((acc, p) => {
      return acc + p.width;
    }, 0);
    width += (this.posters.length - 1) * this.space;
    return width;
  }

  get posterXs() {
    let count = this.posters.length;
    switch (this.posters.length) {
      case 1:
        return [50];
      case 2:
        return [35, 65];
      case 3:
        return [25, 50, 75];
      case 4:
        return [35, 65, 35, 65];
      case 5:
        return [25, 50, 75, 35, 65];
      default:
        return [];
    }
  }

  get posterYs() {
    let count = this.posters.length;
    switch (this.posters.length) {
      case 1:
        return [40];
      case 2:
        return [40, 40];
      case 3:
        return [40, 40, 40];
      case 4:
        return [30, 30, 60, 60];
      case 5:
        return [30, 30, 30, 60, 60];
      default:
        return [];
    }
  }

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

  getPosters() {
    return this.posters;
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
    this.selectedPoster = poster;
  }

  unselect() {
    this.addingPoster = false;
    this.selectedPoster = null;
  }

  scale = 100 / 300;
}
</script>
