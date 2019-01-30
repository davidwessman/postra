<template>
  <div id="app" class="flex flex-col h-screen">
    <!-- <div 
      class="flex justify-center w-full bg-blue-lightest py-4 border-b border-solid border-grey text-center h-20"
    >
      <h1>Poster wall!</h1>
    </div> -->
    <div class="flex flex-grow max-h-full justify-center py-1">
      <Wall />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Wall from "./components/Wall.vue";

@Component({
  components: {
    Wall
  }
})
export default class App extends Vue {}
</script>
