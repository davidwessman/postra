<template>
  <transition name="modal-fade">
    <div
      class="fixed top-0 flex justify-center min-w-full items-center bg-transparent py-16 px-6"
      @click="close"
    >
      <div
        class="p-4 bg-white shadow-md rounded-lg border border-gray-100 overflow-auto flex flex-col max-h-3/4 mx-4"
        style="min-width: 80%"
        @click.stop
      >
        <header
          class="flex flex-grow border-b border-gray-700 items-center justify-between text-blue-dark px-3 py-4"
        >
          <slot name="header">
            Default title
          </slot>
          <button
            type="button"
            class="px-3 py-1 rounded-lg border bg-blue-400 border-blue-700 text-white hover:bg-blue-900"
            @click="close"
          >
            Close
          </button>
        </header>

        <section class="flex min-height-full h-screen overflow-y-auto justify-center py-4 px-3">
          <slot name="body"></slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({})
export default class Modal extends Vue {
  @Emit("close")
  close(): void {
    undefined;
  }
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
