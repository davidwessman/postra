<template>
  <Modal name="poster-switcher" @close="close">
    <template v-slot:header>
      <div>
        <h2 class="mr-2">Change pattern</h2>
        <span>
          Select a pattern by clicking it.
        </span>
      </div>
    </template>
    <template v-slot:body>
      <div
        class="flex flex-wrap justify-center overflow-y-auto p-3 z-40 w-full"
        style="max-height: 60%"
      >
        <PatternDisplay
          v-for="pattern in patterns"
          :key="pattern.id"
          :pattern="pattern"
          :is-selected="selected && selected.id === pattern.id"
          :w-scale="wScale"
          :h-scale="hScale"
          :on-click="onSelectPattern"
        />
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Pattern } from "../pattern";
import PatternDisplay from "./PatternDisplay.vue";
import Modal from "./modal.vue";

@Component({
  components: {
    Modal,
    PatternDisplay
  }
})
export default class PatternSwitcher extends Vue {
  @Prop({ default: [] })
  patterns!: Pattern[];

  @Prop({ default: null })
  selected!: Pattern | null;

  @Prop({ default: 1 })
  hScale!: number;

  @Prop({ default: 1 })
  wScale!: number;

  @Emit("switched")
  emitRefresh(pattern: Pattern | null, mode: string) {}

  onSelectPattern(pattern: Pattern) {
    this.emitRefresh(pattern, "update");
  }

  close() {
    this.emitRefresh(this.selected, "update");
  }
}
</script>
