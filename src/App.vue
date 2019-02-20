<template>
  <div id="app" class="flex flex-col h-screen">
    <div class="flex w-full flex-wrap">
      <div class="flex w-full absolute pin-t justify-center p-3">
        <button
          class="p-2 border rounded border-grey-darker bg-white
                hover:bg-grey-darker hover:border-grey-light hover:text-white"
          @click="togglePatternSwitching"
        >
          Switch pattern
        </button>
      </div>
      <Wall
        :h-scale="hScale"
        :pattern="selectedPattern"
        :posters="posters"
        :poster-urls="posterUrls"
        :w-scale="wScale"
        :frame-changed="frameChanged"
      />
    </div>
    <div
      v-if="switchPattern"
      class="absolute pin-b flex bg-blue-transparent w-full justify-center py-2 z-40"
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
  posters: Poster[] = [];
  patterns: Pattern[] = [];
  nextPostId: number = 0;
  nextPatternId: number = 0;
  switchPattern: boolean = false;
  posterUrls: string[] = [
    "https://posterstore.se/images/2x/normal/peonies.jpg",
    "https://posterstore.se/images/2x/normal/133.jpg",
    "https://posterstore.se/images/2x/normal/vee-speers-birthdat.jpg",
    "https://posterstore.se/images/2x/normal/morning-sun.jpg",
    "https://posterstore.se/images/2x/normal/flower-bouquet.jpg"
  ];

  wScale: number = 1 / 300;
  hScale: number = 1 / 200;

  created() {
    this.addPattern(this.basePatterns[0]);
    this.addPattern(this.basePatterns[1]);
    this.patternSwitched(this.patterns[0]);
  }

  frameChanged(frame: Frame, mode: string) {
    if (this.selectedPattern !== null) {
      let index = this.selectedPattern.frames.findIndex(f => frame.id === f.id);
      this.selectedPattern.frames.splice(index, 1, frame);
      if (frame !== null) {
        this.posters.push(<Poster>frame.poster);
      }
    }
  }

  addPoster(url: string) {
    this.posters.push({
      id: this.nextPostId,
      src: url,
      alt: "The alternative"
    });
    this.nextPostId += 1;
  }

  addPattern(frames: Frame[]) {
    this.patterns.push({
      id: this.nextPatternId,
      frames: frames
    });
    this.nextPatternId += 1;
  }

  togglePatternSwitching() {
    this.switchPattern = !this.switchPattern;
  }

  patternSwitched(pattern: Pattern) {
    this.selectedPattern = pattern;
    this.switchPattern = false;
    let posterId = 0;
    this.selectedPattern.frames.filter(frame=> {
      return frame.poster === null;
    }).forEach(frame => {
      if (this.posters.length >= posterId + 1) {
        frame.poster = this.posters[posterId];
        posterId += 1;
      }
    });
  }

  get basePatterns() {
    return [
      [
        {
          id: 0,
          x: -(35 + 25 + 7),
          y: 10,
          width: 50,
          height: 70,
          poster: null
        },
        {
          id: 1,
          x: 0,
          y: 10,
          width: 70,
          height: 100,
          poster: null
        },
        {
          id: 2,
          x: 35 + 25 + 7,
          y: 10,
          width: 50,
          height: 70,
          poster: null
        }
      ],
      [
        {
          id: 0,
          x: -(35 + 35 + 7),
          y: 10,
          width: 70,
          height: 100,
          poster: null
        },
        {
          id: 1,
          x: 0,
          y: 10,
          width: 70,
          height: 100,
          poster: null
        },
        {
          id: 2,
          x: 35 + 35 + 7,
          y: 10,
          width: 70,
          height: 100,
          poster: null
        }
      ]
    ];
  }
}
</script>
