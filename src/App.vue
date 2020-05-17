<template>
  <div id="app" class="flex flex-col items-center justify-center">
    <Wall
      :h-scale="hScale"
      :pattern="selectedPattern"
      :posters="posters"
      :w-scale="wScale"
      @frameSwitched="frameSwitchedPoster"
      @posterAdded="addPersonalPoster"
    />
    <div
      class="fixed top-0 flex justify-center w-full p-3 px-6 bg-blue-800-transparent md:justify-between"
    >
      <div class="flex flex-row items-center">
        <img :src="logoUrl" class="h-16" />
        <h1 class="ml-3 text-xl font-semibold">Postra</h1>
      </div>
      <div class="hidden md:flex">
        <button
          class="p-2 mr-2 bg-white border border-gray-800 rounded hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="togglePatternSwitching"
        >
          Switch pattern
        </button>
        <button
          class="p-2 bg-white border border-gray-800 rounded hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="openInformation"
        >
          About this page
        </button>
      </div>
    </div>
    <div
      class="fixed bottom-0 flex justify-between w-full p-3 px-6 md:hidden bg-blue-800-transparent"
    >
      <div class="flex justify-center w-1/2">
        <button
          class="p-2 mr-2 bg-white border border-gray-800 rounded hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="togglePatternSwitching"
        >
          Switch pattern
        </button>
      </div>
      <div class="flex justify-center w-1/2">
        <button
          class="p-2 bg-white border border-gray-800 rounded hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="openInformation"
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
      @close="patternSwitcherClosed"
    />
    <Information :open="information" @close="closeInformation" />
    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
import Wall from "./components/Wall.vue";
import Information from "./components/Information.vue";
import PatternSwitcher from "./components/PatternSwitcher.vue";
import { checkStorage, saveToStorage } from "./localStorage";
import patternsJson from "./assets/patterns.json";
import postersJson from "./assets/posters.json";
import { Pattern } from "./frame";

export default {
  name: "App",
  components: {
    Information,
    PatternSwitcher,
    Wall,
  },
  data: function () {
    return {
      addingPoster: false,
      posters: [],
      personalPosters: [],
      patterns: [],
      nextPosterId: 0,
      nextPatternId: 0,
      switchPattern: false,
      information: false,
      jsonPosters: postersJson.posters,
      jsonPatterns: patternsJson.patterns,
      selectedPattern: null,
      logoUrl: require("./assets/logo.svg"),
      wScale: 1 / 300,
      hScale: 1 / 200,
    };
  },
  created() {
    this.jsonPatterns.forEach((pattern) => this.addPattern(pattern));
    this.jsonPosters.forEach((poster) => this.posterAdded(poster));
    const selectedPattern = checkStorage("selectedPattern");
    if (selectedPattern === null || selectedPattern === undefined) {
      this.patternSwitched(this.patterns[0]);
    } else {
      this.selectedPattern = selectedPattern;
    }
    this.loadPersonalPosters();
  },
  methods: {
    frameSwitchedPoster(frame, poster) {
      const index = this.selectedPattern.frames.findIndex(
        (f) => frame.id === f.id
      );
      frame.poster = poster;
      this.selectedPattern.frames.splice(index, 1, frame);
    },

    addPattern(data) {
      let pattern = new Pattern(
        this.nextPatternId++,
        data.nbrFrames,
        data.description,
        data.offsetX,
        data.offsetY,
        data.frames
      );
      this.patterns.push(pattern);
    },

    posterAdded(poster) {
      poster.id = this.nextPosterId++;
      this.posters.push(poster);
    },

    addPersonalPoster(poster) {
      poster.id = this.nextPosterId++;
      poster.link = poster.src;
      this.posters.push(poster);
      this.personalPosters.push(poster);
      saveToStorage("personalPosters", this.personalPosters);
    },

    loadPersonalPosters() {
      const personalPosters = checkStorage("personalPosters");
      if (personalPosters === null || personalPosters === undefined) {
        return;
      }
      personalPosters.forEach((poster) => {
        this.posterAdded(poster);
        this.personalPosters.push(poster);
      });
    },

    togglePatternSwitching() {
      this.switchPattern = !this.switchPattern;
    },

    openInformation() {
      this.information = true;
    },

    closeInformation() {
      this.information = false;
    },
    patternSwitched(pattern) {
      const oldPattern = this.selectedPattern;
      this.selectedPattern = pattern;
      this.switchPattern = false;
      let frameId = 0;
      if (oldPattern !== null) {
        this.selectedPattern.frames.forEach((frame) => {
          if (oldPattern.nbrFrames >= frameId + 1) {
            frame.poster = oldPattern.frames[frameId].poster;
            frameId += 1;
          } else {
            frame.poster = null;
          }
        });
      }

      saveToStorage("selectedPattern", this.selectedPattern);
    },
    patternSwitcherClosed() {
      this.switchPattern = false;
    },
  },
};
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
