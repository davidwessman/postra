<template>
  <image
    class="z-20"
    :xlink:href="image"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
    :transform="transform"
    @click="onClick"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Frame, FrameHelper } from "../frame";
import FrameDisplay from "./FrameDisplay.vue";

@Component({
  components: {}
})
export default class PosterDisplay extends FrameDisplay {
  @Prop()
  image!: string;
  @Prop()
  transform!: string;
}
</script>
