<template>
  <Modal name="information" :open="open" @close="close">
    <template v-slot:title>
      <h2
        class="font-semibold text-gray-900 text-2xl leading-tight border-b-2 border-gray-200 ml-2 mb-4"
      >
        About this page
      </h2>
    </template>
    <template v-slot:body>
      <div
        class="flex flex-col overflow-y-auto p-3 z-40 w-full md:w-4/5 mx-2 text-lg"
      >
        <span class="mb-4">
          I tried to decide which posters to buy for our wall at home and followed
          these steps:
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
          This project gives you a way to visualize a few patterns with different
          selections for posters.
          <br />
          <br />
          All the currently included posters are borrowed from Posterstore:
          <a href="https://posterstore.se/" class="text-blue-700 underline">
            <img
              v-lazy="posterStoreImage"
              alt="Posterstore"
              class="h-auto w-64 my-4"
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
        <button
          class="p-2 border rounded border-gray-800 bg-white mr-2 hover:bg-gray-800 hover:border-gray-300 hover:text-white"
          @click="close"
        >
          Close
        </button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import Modal from "./modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class Information extends Vue {
  @Prop()
  open!: boolean;

  posterStoreImage = "https://posterstore.se/userfiles/image/logotype-ps.png";

  @Emit("close")
  close(): void {
    undefined;
  }
}
</script>
