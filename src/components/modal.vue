<template>
  <portal to="modals">
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center max-h-screen max-w-full p-2"
    >
      <transition
        enter-active-class="transition-all transition-fast ease-out-quad"
        leave-active-class="transition-all transition-medium ease-in-quad"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        appear
        @before-leave="backdropLeaving = true"
        @after-leave="backdropLeaving = false"
      >
        <div v-if="showBackdrop">
          <div
            class="absolute inset-0 bg-black opacity-25"
            @click="close"
          ></div>
        </div>
      </transition>

      <transition
        enter-active-class="transition-all transition-fast ease-out-quad"
        leave-active-class="transition-all transition-medium ease-in-quad"
        enter-class="opacity-0 scale-70"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-70"
        appear
        @before-leave="cardLeaving = true"
        @after-leave="cardLeaving = false"
      >
        <div v-if="showContent" class="relative max-w-full">
          <div
            class="max-w-6xl w-full bg-white rounded-lg shadow-2xl p-2 lg:p-6 max-h-screen overflow-y-auto"
          >
            <slot name="title">
              <h2
                class="font-semibold text-gray-900 text-2xl leading-tight border-b-2 border-gray-200 pb-4"
              >
                Title
              </h2>
            </slot>
            <slot name="body"></slot>
          </div>
        </div>
      </transition>
    </div>
  </portal>
</template>

<script>
export default {
  name: "Modal",
  props: {
    open: Boolean
  },
  data() {
    return {
      showModal: false,
      showBackdrop: false,
      showContent: false,
      backdropLeaving: false,
      cardLeaving: false
    };
  },
  computed: {
    leaving() {
      return this.backdropLeaving || this.cardLeaving;
    }
  },
  watch: {
    open: {
      handler: function(newValue) {
        if (newValue) {
          this.show();
        } else {
          this.close();
        }
      },
      immediate: true
    },
    leaving(newValue) {
      if (newValue === false) {
        this.showModal = false;
        this.$emit("close");
      }
    }
  },
  created() {
    const onEscape = e => {
      if (this.open && e.keyCode === 27) {
        this.close();
      }
    };

    document.addEventListener("keydown", onEscape);

    this.$once("hook:destroyed", () => {
      document.removeEventListener("keydown", onEscape);
    });
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
    }
  }
};
</script>
