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
    <PatternDisplay
      v-for="pattern in patterns"
      :key="pattern.id"
      :pattern="pattern"
      :w-scale="wScale"
      :h-scale="hScale"
      class="h-64 w-64 mx-auto"
      :class="{
        'border-4 border-teal': selected && selected.id === pattern.id,
        'border border-black': !(selected && selected.id === pattern.id)
      }"
      :on-click="onSelectPattern"
    />
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
