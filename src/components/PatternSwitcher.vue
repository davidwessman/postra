<template>
  <Modal name="poster-switcher" :open="open" @close="close">
    <template v-slot:title>
      <h2 class="text-l font-semibold mr-2">Change pattern</h2>
      <span>
        Select a pattern by clicking it.
      </span>
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
          :selected="selected && selected.id === pattern.id"
          :w-scale="wScale"
          :h-scale="hScale"
          @select="onSelect"
        />
      </div>
    </template>
  </Modal>
</template>

<script>
import { Pattern } from "../frame";
import PatternDisplay from "./PatternDisplay.vue";
import Modal from "./modal.vue";

export default {
  name: "PatternSwitcher",
  components: {
    Modal,
    PatternDisplay
  },
  props: {
    open: Boolean,
    patterns: {
      type: Array,
      default: () => []
    },
    selected: Object,
    hScale: {
      type: Number,
      default: 1.0
    },
    wScale: {
      type: Number,
      default: 1.0
    }
  },
  methods: {
    onSelect(pattern) {
      this.$emit("switched", pattern);
    },
    close() {
      this.$emit("close", this.selected);
    }
  }
};
</script>
