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
      <div class="video-header">
        Title: {{ videoData.title }} <br />
        Uploader: {{ videoData.uploader.name }}
      </div>
      <div class="video-player">
        <video-player :videoURLs="videoURLs" :subtitles="subtitlsURLs" :muted="false" :thumbnail="videoThumbnail" />
      </div>
      <div class="sidebar">
        chat vindow whil go here
      </div>
    </div>
  </div>
</template>
