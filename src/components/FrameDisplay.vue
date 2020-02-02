<template>
  <svg :width="width" :height="height" :x="xpos" :y="ypos" @click="onClick">
    <rect
      v-if="!hasPoster"
      class="z-20"
      width="100%"
      height="100%"
      stroke="black"
      stroke-width="0.5"
      fill="transparent"
    />
    <svg v-if="!hasPoster" x="37%" y="40%">
      <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
    </svg>
    <image
      v-else
      class="z-20"
      :xlink:href="frame.poster.src"
      width="100%"
      height="100%"
      @click="onClick"
    />
  </svg>
</template>

<script>
export default {
  props: {
    frame: {
      type: Object,
      default() {
        return {};
      }
    },
    helper: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    hasPoster() {
      return this.helper.hasImage(this.frame);
    },
    xpos() {
      return this.helper.xpos(this.frame);
    },
    ypos() {
      return this.helper.ypos(this.frame);
    },
    width() {
      return this.helper.width(this.frame);
    },
    height() {
      return this.helper.height(this.frame);
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    }
  },
  methods: {
    onClick() {
      this.$emit("select", this.frame);
    }
  }
};
</script>
