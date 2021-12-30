<template>
  <Modal :open="open" @close="close">
    <template v-slot:title>
      <h2
        class="mb-4 ml-2 text-2xl font-semibold leading-tight text-gray-900 border-b-2 border-gray-200"
      >
        About this page
      </h2>
    </template>
    <template v-slot:body>
      <div
        class="z-40 flex flex-col w-full p-3 mx-2 overflow-y-auto text-lg md:w-4/5"
      >
        <span class="mb-4">
          I tried to decide which posters to buy for our wall at home and
          followed these steps:
          <ol class="my-4">
            <li>Pick out posters we liked.</li>
            <li>Tried to imagine in what pattern we would want them.</li>
            <li>
              Started taping together printer paper to simluate a poster size on
              our wall.
            </li>
          </ol>
          In the end, we were unable to decide which posters to buy...
          <hr class="w-full border border-gray-700" />
        </span>

        <span class="mb-4">
          This project gives you a way to visualize a few patterns with
          different selections for posters.
          <br />
          <br />
          All the currently included posters are borrowed from Posterstore:
          <a href="https://posterstore.se/" class="text-blue-700 underline">
            <img
              v-lazy="posterStoreImage"
              alt="Posterstore"
              class="w-64 h-auto my-4"
            />
          </a>
        </span>

        <span class="mb-4">
          If you have any questions about this, please reach out to
          <br />
          <code>&lt;my-first-name&gt;@wessman.co</code>.
          <br />
          <br />
          / David
        </span>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "./modal.vue";
export default {
  name: "Information",
  components: { Modal },
  props: {
    open: Boolean,
  },
  data() {
    return {
      posterStoreImage:
        "https://posterstore.se/userfiles/image/logotype-ps.png",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
