<template>
  <div>
    <div class="editfields">
      <div>
        <label>id: </label>
        <input
          v-if="addingPoster"
          type="number"
          v-model="editingPoster.id"
          ref="id"
          placeholder="id"
        />
        <label v-if="!addingPoster" class="value">{{ editingPoster.id }}</label>
      </div>
      <div>
        <label>url: </label>
        <input v-model="editingPoster.url" ref="url" placeholder="url" />
      </div>
      <div>
        <label>width x heigth: </label>
        <input v-model="editingPoster.width" placeholder="width" />
        <input
          v-model="editingPoster.heigth"
          placeholder="heigth"
          @keyup.enter="save"
        />
      </div>
    </div>
    <button @click="clear">Cancel</button>
    <button @click="save">Save</button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { Poster } from "../poster";

@Component
export default class PosterDetail extends Vue {
  @Prop()
  poster!: Poster;
  addingPoster = !this.poster;
  editingPoster!: Poster | null;

  @Watch("poster")
  onPosterChanged(value: string, oldValue: string) {
    this.editingPoster = this.cloneIt();
  }

  $refs!: {
    id: HTMLElement;
    name: HTMLElement;
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
    if (this.addingPoster && this.editingPoster) {
      this.$refs.id.focus();
    } else {
      this.$refs.name.focus();
    }
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
