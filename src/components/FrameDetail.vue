<template>
  <div>
    <label class="value">Frame: {{ editingFrame.id }}</label>
    <div class="flex flex-row w-full p-3 mb-2">
      <img v-for="poster in getPosters"
          :key="poster.id"
          :src="poster.src"
          class="h-64 w-auto mx-auto"
          :class="{ 'border-8 border-teal': selectedPoster && selectedPoster.id === poster.id }"
          @click="onSelectPoster(poster)"
      />
    </div>
    <div class="flex justify-between">
      <button
        class="p-2 border rounded border-grey-darker bg-white
               hover:bg-grey-darker hover:border-grey-light hover:text-white"
        @click="save"
      >
        Save
      </button>
      <button
        class="p-2 border rounded border-grey-darker bg-white
               hover:bg-grey-darker hover:border-grey-light hover:text-white"
        @click="clear"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import VueSelectImage from 'vue-select-image';
import { Frame } from "../frame";
import { Poster } from "../poster";

// require('vue-select-image/dist/vue-select-image.css')

@Component({
  components: {
    VueSelectImage
  }
})
export default class FrameDetail extends Vue {
  @Prop()
  frame!: Frame;
  @Prop({ default: [] })
  urls!: string[];
  selectedPoster: Poster | null = null;
  editingFrame: Frame | null = null;
  $refs!: {
    url: HTMLElement;
  };

  get getPosters(): Poster[] {
    let data: Poster[] = []
    let id = 0;
    this.urls.forEach(url => {
      data.push({
        id: id,
        src: url,
        alt: 'Alternative',
      })
      id += 1;
    })
    return data;
  }

  @Watch("frame")
  onFrameChanged(value: Frame, oldValue: Frame) {
    this.editingFrame = Object.assign({}, value);
  }

  @Emit("unselect")
  clear() {
    this.editingFrame = null;
  }

  cloneIt() {
    return Object.assign({}, this.frame);
  }

  created() {
    this.editingFrame = this.cloneIt();
  }

  @Emit("frameChanged")
  emitRefresh(frame: Frame, mode: string) {
    this.clear();
  }

  save() {
    this.updateFrame();
  }

  updateFrame() {
    const frame = <Frame>this.editingFrame;
    frame.poster = this.selectedPoster;
    this.emitRefresh(frame, "update");
  }

  onSelectPoster(poster: Poster) {
    console.log(poster)
    this.selectedPoster = poster;
  }
}
</script>
