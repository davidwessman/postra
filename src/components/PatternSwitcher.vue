<template>
  <div>
    <div class="flex flex-row w-full p-3 mb-2">
      <PatternDisplay
        v-for="pattern in patterns"
        :key="pattern.id"
        :pattern="pattern"
        :w-scale="wScale"
        :h-scale="hScale"
        class="h-64 w-64 mx-auto hover:border-4 hover:border-teal"
        :class="{
          'border-8 border-teal': selected && selected.id === pattern.id
        }"
        :on-click="onSelectPattern"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Pattern } from "../pattern";
import PatternDisplay from "./PatternDisplay.vue";

@Component({
  components: {
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
  emitRefresh(pattern: Pattern, mode: string) {}

  onSelectPattern(pattern: Pattern) {
    this.emitRefresh(pattern, "update");
  }
}
</script>
