<template>
  <Modal :open="open" @close="close">
    <template v-slot:title>
      <h2 class="mr-2 font-semibold text-l">Change pattern</h2>
      <span> Select a pattern by clicking it. </span>
    </template>
    <template v-slot:body>
      <div
        class="z-40 flex flex-wrap justify-center w-full p-3 overflow-y-auto"
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
import PatternDisplay from "./PatternDisplay.vue";
import Modal from "./modal.vue";

export default {
  name: "PatternSwitcher",
  components: {
    Modal,
    PatternDisplay,
  },
  emits: ["close", "switched"],
  props: {
    open: Boolean,
    patterns: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Object,
      default: () => {},
    },
    hScale: {
      type: Number,
      default: 1.0,
    },
    wScale: {
      type: Number,
      default: 1.0,
    },
  },
  methods: {
    onSelect(pattern) {
      this.$emit("switched", pattern);
    },
    close() {
      this.$emit("close", this.selected);
    },
  },
};
</script>
