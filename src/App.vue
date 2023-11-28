<script setup lang="ts">
import { onMounted } from "vue";
// @ts-ignore
import { getVideoData } from "@/api/main";

onMounted(async () => {
  const videoData = await getVideoData("0n47msSQllA");
  console.log("Response: ", videoData);
});
</script>

<template>
  <div class="body">
    this is omse div
  </div>
</template>
