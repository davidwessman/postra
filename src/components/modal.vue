<template>
  <transition name="modal-fade">
    <div
      class="fixed pin flex justify-center items-center bg-blue-transparent"
      @click="close"
    >
      <div
        class="bg-white shadow-md rounded-lg overflow-x-auto flex flex-col max-h-3/4 mx-4"
        style="min-width: 80%"
        @click.stop
      >
        <header
          class="flex flex-grow border-b border-grey-dark items-center justify-between text-blue-dark px-3 py-4"
        >
          <slot name="header">
            Default title
          </slot>
          <button
            type="button"
            class="px-3 py-1 rounded-lg border bg-blue border-blue text-white hover:bg-blue-dark"
            @click="close"
          >
            Close
          </button>
        </header>

        <section class="flex justify-center py-4 px-3">
          <slot name="body"></slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component({})
export default class Modal extends Vue {
  @Emit("close")
  close() {}
}
</script>

<style lang="scss">
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
