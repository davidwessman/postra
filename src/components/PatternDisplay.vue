<template>
  <div class="flex p-2 w-full sm:w-1/2 md:w-1/4 justify-center">
    <svg
      class="bg-white h-64 w-64 z-20"
      :class="{
        'border-4 border-teal': isSelected,
        'border border-black hover:border-4 hover:border-blue': !isSelected
      }"
      viewBox="0 0 145 100"
      @click="onClick(pattern)">
      <rect
        v-for="frame in pattern.frames"
        :key="frame.id"
        :width="helper.width(frame)"
        :height="helper.height(frame)"
        :x="helper.x(frame)"
        :y="helper.y(frame)"
        stroke="black"
        stroke-width="0.7"
        fill="transparent"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Frame, FrameHelper } from "../frame";
import { Pattern } from "../pattern";

@Component({
  components: {}
})
export default class PatternDisplay extends Vue {
  @Prop()
  pattern!: Pattern;
  @Prop({ default: 1 })
  hScale!: number;
  @Prop({ default: 1 })
  wScale!: number;
  @Prop()
  onClick!: Function;
  @Prop({ default: false })
  isSelected!: boolean;

  helper: FrameHelper | null = null;

  created() {
    this.helper = new FrameHelper(this.wScale, this.hScale, 0, 0);
  }
}
</script>
