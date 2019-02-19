<template>
  <div id="app" class="flex flex-col h-screen">
    <div class="flex w-full flex-wrap">
      <div class="flex w-full h-screen px-auto justify-center">
        <Wall
          :posters="posters"
          :pattern="selectedPattern"
          :on-select="selectFrame"
        />
      </div>
      <div
        class="absolute pin-b flex bg-blue-transparent w-full justify-center py-2 z-40"
      >
        <FrameDetail
          v-if="selectedFrame"
          :frame="selectedFrame"
          :urls="posterUrls"
          @unselect="unselectFrame"
          @frameChanged="frameChanged"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Wall from "./components/Wall.vue";
import FrameDetail from "./components/FrameDetail.vue";
import { Poster } from "./poster";
import { Pattern } from "./pattern";
import { Frame } from "./frame";

@Component({
  components: {
    Wall,
    FrameDetail
  }
})
export default class App extends Vue {
  addingPoster = false;
  selectedFrame: Frame | null = null;
  selectedPattern: Pattern | null = null;
  posters: Poster[] = [];
  patterns: Pattern[] = [];
  nextPostId: number = 0;
  nextPatternId: number = 0;
  posterUrls: string[] = [
    "https://posterstore.se/images/2x/normal/peonies.jpg",
    "https://posterstore.se/images/2x/normal/133.jpg",
    "https://posterstore.se/images/2x/normal/vee-speers-birthdat.jpg",
    "https://posterstore.se/images/2x/normal/morning-sun.jpg",
    "https://posterstore.se/images/2x/normal/flower-bouquet.jpg"
  ];

  created() {
    this.addPoster(this.posterUrls[0]);
    this.addPattern([
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
    ]);
    this.selectPattern(this.patterns[0]);
  }

  enableAddMode() {
    this.addingPoster = true;
    this.selectedFrame = null;
  }

  frameChanged(frame: Frame, mode: string) {
    if (this.selectedPattern !== null) {
      let index = this.selectedPattern.frames.findIndex(f => frame.id === f.id);
      this.selectedPattern.frames.splice(index, 1, frame);
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

  selectFrame(frame: Frame) {
    this.selectedFrame = frame;
  }

  unselectFrame() {
    this.selectedFrame = null;
  }

  selectPattern(pattern: Pattern) {
    this.selectedPattern = pattern;
  }
}
</script>
