<template>
  <div id="app" class="flex flex-col justify-center items-center">
    <Wall
      :h-scale="hScale"
      :pattern="selectedPattern"
      :posters="posters"
      :w-scale="wScale"
      :frame-switched-poster="frameSwitchedPoster"
      :add-poster="addPersonalPoster"
    />
    <div
      class="flex w-full bg-blue-800-transparent fixed top-0 justify-center md:justify-between p-3 px-6"
    >
      <div class="flex flex-row items-center">
        <img :src="logoUrl" class="h-16" />
        <h1 class="text-xl font-semibold ml-3">Postra</h1>
      </div>
      <div class="hidden md:flex">
        <button
          class="p-2 border rounded border-gray-800 bg-white mr-2 hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="togglePatternSwitching"
        >
          Switch pattern
        </button>
        <button
          class="p-2 border rounded border-gray-800 bg-white hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="toggleInformation"
        >
          About this page
        </button>
      </div>
    </div>
    <div
      class="flex md:hidden w-full bg-blue-800-transparent fixed bottom-0 justify-between p-3 px-6"
    >
      <div class="flex w-1/2 justify-center">
        <button
          class="p-2 border rounded border-gray-800 bg-white mr-2 hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="togglePatternSwitching"
        >
          Switch pattern
        </button>
      </div>
      <div class="flex w-1/2 justify-center">
        <button
          class="p-2 border rounded border-gray-800 bg-white hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="toggleInformation"
        >
          About this page
        </button>
      </div>
    </div>

    <PatternSwitcher
      :open="switchPattern"
      :h-scale="hScale"
      :patterns="patterns"
      :selected="selectedPattern"
      :w-scale="wScale"
      @switched="patternSwitched"
    />
    <Information :open="information" @close="toggleInformation" />
    <portal-target name="modals"></portal-target>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Wall from "./components/Wall.vue";
import Information from "./components/Information.vue";
import PatternSwitcher from "./components/PatternSwitcher.vue";
import PosterSwitcher from "./components/PosterSwitcher.vue";
import { Poster } from "./poster";
import { Pattern } from "./pattern";
import { Frame } from "./frame";
import { checkStorage, saveToStorage } from "./localStorage";
import patternsJson from "./assets/patterns.json";
import postersJson from "./assets/posters.json";

@Component({
  components: {
    Information,
    PatternSwitcher,
    PosterSwitcher,
    Wall
  }
})
export default class App extends Vue {
  addingPoster = false;
  posters: Poster[] = [];
  personalPosters: Poster[] = [];
  patterns: Pattern[] = [];
  nextPosterId = 0;
  nextPatternId = 0;
  switchPattern = false;
  information = false;
  jsonPosters: Poster[] = postersJson.posters;
  jsonPatterns: Pattern[] = patternsJson.patterns;
  selectedPattern: Pattern = this.jsonPatterns[0];

  logoUrl = require("./assets/logo.svg");

  wScale: number = 1 / 300;
  hScale: number = 1 / 200;

  created(): void {
    this.jsonPatterns.forEach(pattern => this.addPattern(pattern));
    this.jsonPosters.forEach(poster => this.addPoster(poster));
    const selectedPattern = checkStorage('selectedPattern');
    if (selectedPattern === null) {
      this.patternSwitched(this.patterns[0]);
    } else {
      this.selectedPattern = selectedPattern;
    }
    this.loadPersonalPosters();
  }

  frameSwitchedPoster(frame: Frame, poster: Poster): void {
    const index = this.selectedPattern.frames.findIndex(
      f => frame.id === f.id
    );
    frame.poster = poster;
    this.selectedPattern.frames.splice(index, 1, frame);
  }

  addPattern(pattern: Pattern): void {
    pattern.id = this.nextPatternId++;
    this.patterns.push(pattern);
  }

  addPoster(poster: Poster): void {
    poster.id = this.nextPosterId++;
    this.posters.push(poster);
  }

  addPersonalPoster(poster: Poster): void {
    poster.id = this.nextPosterId++;
    poster.link = poster.src;
    this.posters.push(poster);
    this.personalPosters.push(poster);
    saveToStorage('personalPosters', this.personalPosters);
  }

  loadPersonalPosters(): void {
    const personalPosters: Poster[] | null = checkStorage('personalPosters')
    if (personalPosters === null) {
      return;
    }
    personalPosters.forEach(poster => {
      this.addPoster(poster);
      this.personalPosters.push(poster);
    });
  }

  togglePatternSwitching(): void {
    this.switchPattern = !this.switchPattern;
  }

  toggleInformation(): void {
    this.information = !this.information;
  }

  patternSwitched(pattern: Pattern): void {
    const oldPattern: Pattern = this.selectedPattern;
    this.selectedPattern = pattern;
    this.switchPattern = false;
    let frameId = 0;
    this.selectedPattern.frames
      .forEach(frame => {
        if (oldPattern.nbrFrames >= frameId + 1) {
          frame.poster = oldPattern.frames[frameId].poster;
          frameId += 1;
        } else {
          frame.poster = null;
        }
      });

    saveToStorage('selectedPattern', this.selectedPattern);
  }
}
</script>

<style lang="scss">
img {
  max-width: unset;
  height: unset;
  max-height: 100%;
  width: auto;
}
.rotated {
  img {
    transform: rotate(90deg);
  }
}
</style>
