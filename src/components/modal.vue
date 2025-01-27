<template>
  <Teleport to="#teleport-modals">
    <div
      v-if="showModal"
      class="fixed inset-x-0 bottom-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
    >
      <transition
        enter-active-class="duration-300 ease-out"
        leave-active-class="duration-200 ease-in"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        appear
        @before-leave="backdropLeaving = true"
        @after-leave="backdropLeaving = false"
      >
        <div v-if="showBackdrop" class="fixed inset-0 transition-opacity">
          <div
            class="absolute inset-0 bg-gray-500 opacity-75"
            @click="close"
          ></div>
        </div>
      </transition>

      <transition
        enter-active-class="duration-300 ease-out"
        leave-active-class="transition-all transition-medium ease-in-quad"
        enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        enter-to-class="translate-y-0 opacity-100 sm:scale-100"
        leave-class="translate-y-0 opacity-100 sm:scale-100"
        leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        appear
        @before-leave="cardLeaving = true"
        @after-leave="cardLeaving = false"
      >
        <div
          class="px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-sm md:max-w-md lg:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <slot name="body"> </slot>
          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-md shadow-xs">
              <button
                type="button"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md shadow-xs hover:bg-indigo-500 focus:outline-hidden focus:border-indigo-700 focus:shadow-outline-indigo sm:text-sm sm:leading-5"
                @click="close"
              >
                Go back to dashboard
              </button>
            </span>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "Modal",
  props: {
    open: Boolean,
  },
  emits: ["close"],
  data() {
    return {
      showModal: false,
      showBackdrop: false,
      showContent: false,
      backdropLeaving: false,
      cardLeaving: false,
    };
  },
  computed: {
    leaving() {
      return this.backdropLeaving || this.cardLeaving;
    },
  },
  watch: {
    open: {
      handler: function (newValue) {
        if (newValue) {
          this.show();
        } else {
          this.close();
        }
      },
      immediate: true,
    },
    leaving(newValue) {
      if (newValue === false) {
        this.showModal = false;
        this.$emit("close");
      }
    },
  },
  created() {
    const onEscape = (e) => {
      if (this.open && e.keyCode === 27) {
        this.close();
      }
    };

    document.addEventListener("keydown", onEscape);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", onEscape);
  },
  methods: {
    show() {
      this.showModal = true;
      this.showBackdrop = true;
      this.showContent = true;
    },
    close() {
      this.showBackdrop = false;
      this.showContent = false;
    },
  },
};
</script>
