<script setup lang="ts">
import { onMounted, ref } from "vue";

// Local imports
import { getVideoData } from "@/api/main";
import { IVideoDetail } from "@/types/video";
import VideoPlayer from "@/components/VideoPlayer.vue";
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
        <video-player
          :videoURLs="[{ url: 'https://artplayer.org/assets/sample/video.mp4', quality: 420, qualityString: '420p' }]"
          :muted="false" thumbnail="'https://artplayer.org/assets/sample/thumbnails.png'" />
      </div>
      <!-- <div class="sidebar">
                                    chat vindow whil go here
                                  </div> -->
    </div>
  </div>
</template>
