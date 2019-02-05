<template>
  <div class="w-full max-w-xs">
    <div class="editfields">
      <div>
        <label v-if="!addingPoster" class="value">{{ editingPoster.id }}</label>
      </div>
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="url">
          URL:
        </label>
        <select
          ref="url"
          v-model="editingPoster.url"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-dark"
        >
          <option v-for="url in urls" :key="url" :value="url">
            {{ url }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="resolution"
        >
          Width x height:
        </label>
        <input
          v-model="editingPoster.width"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-dark"
          placeholder="width"
        />
        <input
          v-model="editingPoster.heigth"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-dark"
          placeholder="heigth"
          @keyup.enter="save"
        />
      </div>
    </div>
    <div class="flex justify-between">
      <button class="p-2 border border-black rounded" @click="save">
        Save
      </button>
      <button class="p-2 border border-black rounded" @click="clear">
        Cancel
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { Poster } from "../poster";

@Component
export default class PosterDetail extends Vue {
  @Prop()
  poster!: Poster;
  @Prop({ default: [] })
  urls!: string[];
  addingPoster = !this.poster;
  editingPoster!: Poster | null;

  @Watch("poster")
  onPosterChanged(value: string, oldValue: string) {
    this.editingPoster = this.cloneIt();
  }

  $refs!: {
    url: HTMLElement;
  };

  addPoster() {
    const poster = <Poster>this.editingPoster;
    this.emitRefresh(poster, "add");
  }
  @Emit("unselect")
  clear() {
    this.editingPoster = null;
  }

  cloneIt() {
    return Object.assign({}, this.poster);
  }

  created() {
    this.editingPoster = this.cloneIt();
  }

  @Emit("posterChanged")
  emitRefresh(poster: Poster, mode: string) {
    this.clear();
  }

  mounted() {
    this.$refs.url.focus();
  }

  save() {
    if (this.addingPoster) {
      this.addPoster();
    } else {
      this.updatePoster();
    }
  }

  updatePoster() {
    const poster = <Poster>this.editingPoster;
    this.emitRefresh(poster, "update");
  }
}
</script>
