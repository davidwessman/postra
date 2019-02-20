<template>
  <svg @click="onClick(pattern)" class="bg-white">
    <rect
      v-for="frame in pattern.frames"
      :key="frame.id"
      class="z-20"
      :width="helper.width(frame)"
      :height="helper.height(frame)"
      :x="helper.x(frame)"
      :y="helper.y(frame)"
      stroke="black"
      stroke-width="1"
      fill="transparent"
    />
  </svg>
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

  helper: FrameHelper | null = null;

  created() {
    this.helper = new FrameHelper(this.wScale, this.hScale);
  }
}
</script>
