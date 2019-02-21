<template>
  <div id="app" class="flex flex-col justify-center items-center">
    <Wall
      :h-scale="hScale"
      :pattern="selectedPattern"
      :posters="jsonPosters"
      :w-scale="wScale"
      :frame-changed="frameChanged"
    />
    <div class="flex w-full sm:w-3/4 fixed pin-t justify-between p-3">
      <h1>PosterWall</h1>
      <button
        class="p-2 border rounded border-grey-darker bg-white hover:bg-grey-darker hover:border-grey-light hover:text-white"
        @click="togglePatternSwitching"
      >Switch pattern</button>
    </div>
    <div
      v-if="switchPattern"
      class="fixed pin-b flex bg-blue-transparent w-full justify-center py-2 z-40"
    >
      <PatternSwitcher
        :h-scale="hScale"
        :patterns="patterns"
        :selected="selectedPattern"
        :w-scale="wScale"
        @switched="patternSwitched"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Wall from "./components/Wall.vue";
import PatternSwitcher from "./components/PatternSwitcher.vue";
import PosterSwitcher from "./components/PosterSwitcher.vue";
import { Poster } from "./poster";
import { Pattern } from "./pattern";
import { Frame } from "./frame";
const patterns_json = require("./assets/patterns.json");
const posters_json = require("./assets/posters.json");

@Component({
  components: {
    PatternSwitcher,
    PosterSwitcher,
    Wall
  }
})
export default class App extends Vue {
  addingPoster = false;
  selectedPattern: Pattern | null = null;
  selectedPosters: Poster[] = [];
  posters: Poster[] = [];
  patterns: Pattern[] = [];
  nextPostId: number = 0;
  nextPatternId: number = 0;
  switchPattern: boolean = false;
  jsonPosters: Poster[] = posters_json.posters;
  jsonPatterns: Pattern[] = patterns_json.patterns;

  wScale: number = 1 / 300;
  hScale: number = 1 / 200;

  created() {
    this.jsonPatterns.forEach(pattern => this.addPattern(pattern));
    this.jsonPosters.forEach(poster => this.addPoster(poster));
    this.patternSwitched(this.patterns[0]);
  }

  frameChanged(frame: Frame, mode: string) {
    if (this.selectedPattern !== null) {
      let index = this.selectedPattern.frames.findIndex(f => frame.id === f.id);
      this.selectedPattern.frames.splice(index, 1, frame);
      if (frame !== null) {
        this.selectedPosters.push(<Poster>frame.poster);
      }
    }
  }

  addPattern(pattern: Pattern) {
    this.patterns.push(pattern);
  }

  addPoster(poster: Poster) {
    this.posters.push(poster);
  }

  togglePatternSwitching() {
    this.switchPattern = !this.switchPattern;
  }

  patternSwitched(pattern: Pattern) {
    this.selectedPattern = pattern;
    this.switchPattern = false;
    let posterId = 0;
    this.selectedPattern.frames
      .filter(frame => {
        return frame.poster === null;
      })
      .forEach(frame => {
        if (this.selectedPosters.length >= posterId + 1) {
          frame.poster = this.selectedPosters[posterId];
          posterId += 1;
        }
      });
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