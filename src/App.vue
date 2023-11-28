<script setup lang="ts">
import { onMounted, ref } from "vue";

// Local imports
import { getVideoData } from "@/api/main";
import { IVideoDetail } from "@/types/video";

const videoData = ref<IVideoDetail | null>(null);

onMounted(async () => {
  videoData.value = await getVideoData("0n47msSQllA");
});
</script>

<template>
  <div class="body">
    <div class="loading" v-if="videoData === null">
      API is loading...
    </div>
    <div class="video-page" v-else>
      <div class="video-header">
        Title: {{ videoData.title }} <br />
        Uploader: {{ videoData.uploader.name }}
      </div>
      <div class="video-player">
        video will be show here
      </div>
      <!-- <div class="sidebar">
          chat vindow whil go here
        </div> -->
    </div>
  </div>
</template>
