<template>
  <Modal name="information" @close="close">
    <template v-slot:header>
      <div>
        <h2 class="mr-2">About this page</h2>
      </div>
    </template>
    <div
      class="flex flex-col overflow-y-auto p-3 z-40 w-full md:w-4/5 mx-2 text-lg"
      style="max-height: 60%"
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
        <hr class="w-full border border-grey-dark" />
      </span>

      <span class="mb-4">
        This project gives you a way to visualize a few patterns with different
        selections for posters.
        <br />
        <br />
        All the currently included posters are borrowed from:
        <a href="https://posterstore.se/">
          <img
            src="https://posterstore.se/userfiles/image/logotype-ps.png"
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
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import Modal from "./modal.vue";

@Component({
  components: {
    Modal
  }
})
export default class Information extends Vue {
  @Emit("close")
  close(): void {
    undefined;
  }
}
</script>
