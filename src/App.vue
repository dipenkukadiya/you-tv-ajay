<script setup lang="ts">
import { onMounted, ref } from "vue";

// Local imports
import { getVideoData } from "@/api/main";
import { IVideoDetail } from "@/types/video";
import { ISubtitleURL, IVideoURL } from "./types/VideoPlayer";
import VideoPlayer from "@/components/VideoPlayer.vue";
const videoData = ref<IVideoDetail | null>(null);
const videoURLs = ref<IVideoURL[]>([]);
const subtitlsURLs = ref<ISubtitleURL[]>([]);
const videoThumbnail = ref<string>("");

// Custom functions
const loadAllVideoStreams = () => {
  if (!videoData.value) return [];

  for (const stream of videoData.value.videoStreams) {
    if (stream.videoOnly || stream.mimeType !== "video/mp4") continue;
    videoURLs.value.push({
      url: stream.url,
      qualityString: stream.quality,
      quality: parseInt(stream.quality.replace("p", ""))
    });
  }
}

const loadAllSubtitles = () => {
  if (!videoData.value) return [];

  for (const subtitle of videoData.value.subtitles) {
    subtitlsURLs.value.push({
      url: subtitle.url,
      title: subtitle.name
    });
  }
}

// Page hooks
onMounted(async () => {
  videoData.value = await getVideoData("a2GujJZfXpg");
  // Load values in state
  loadAllVideoStreams();
  loadAllSubtitles();
  if (!!videoData.value?.thumbnailUrl)
    videoThumbnail.value = videoData.value.thumbnailUrl;
  console.log("Video data fetched: ", videoData.value);
});
</script>
<template>
  <div class="body">
    <div class="loading" v-if="videoData === null">
      API is loading...
    </div>
    <div class="video-page" v-else>
      
      <div class="title-overlay">
        <div class="video-title">
          {{ videoData.title }}
        </div>
      </div>
      <div class="video-player">
        <video :src="videoURLs[0]?.url" controls muted :poster="videoThumbnail" class="video-element"></video>
      </div>
      <div class="uploader-name">
        Uploader: {{ videoData.uploader.name }}
      </div>
      <div class="sidebar">
        Chat Window will go here
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-page {
  position: relative;
}

.uploader-name,
.title-overlay {
  position: absolute;
  top: 10px; /* Adjust the top position as needed */
  left: 50%;
  transform: translateX(-50%);
  color: white; /* Adjust the text color */
  font-size: 16px; /* Adjust the font size */
  z-index: 2; /* Ensure the uploader's name and title are above the video */
}

.uploader-name {
  margin-top: 10px; /* Adjust the top margin as needed to separate from title */
}

.video-player {
  position: relative;
}

.video-title {
  margin: 0;
}

.video-element {
  width: 100%; /* Make the video fill its container */
}
</style>
