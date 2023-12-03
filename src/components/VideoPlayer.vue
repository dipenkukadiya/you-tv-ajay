<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from "vue";
import Artplayer from "artplayer";
import { IVideoPlayerProps } from "@/types/VideoPlayer";

// Declare props
const props = defineProps<IVideoPlayerProps>();

// Use computed properties to generate proper objects from prosp
const thumbnailOptionObject = computed(() => {
  return {
    url: props.thumbnail,
    number: 60,
    column: 10,
  }
});

const videoURLsOptionObject = computed(() => {
  const qualities = props.videoURLs.map(value => {
    return {
      default: false,
      html: value.qualityString,
      url: value.url
    }
  });
  if (qualities.length > 1) {
    qualities[0].default = true;
    return qualities;
  }
  return [];
});

// Constants/Variables
const player = ref(null);
const options = reactive({
  url: props.videoURLs[0].url,
  volume: 0.5,
  isLive: true,
  muted: true,
  autoplay: true,
  pip: true,
  autoSize: false,
  autoMini: true,
  screenshot: true,
  setting: true,
  loop: true,
  flip: false,
  playbackRate: false,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  subtitleOffset: false,
  miniProgressBar: true,
  mutex: true,
  backdrop: true,
  playsInline: true,
  autoPlayback: true,
  airplay: true,
  theme: '#23ade5',
  lang: navigator.language.toLowerCase(),
  moreVideoAttr: {
    crossOrigin: 'anonymous',
  },
  settings: [
    // {
    //   width: 200,
    //   html: 'Subtitle',
    //   tooltip: 'Bilingual',
    //   icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/subtitle.svg">',
    //   selector: [
    //     {
    //       html: 'Display',
    //       tooltip: 'Show',
    //       switch: true,
    //       onSwitch: function (item) {
    //         item.tooltip = item.switch ? 'Hide' : 'Show';
    //         art.subtitle.show = !item.switch;
    //         return !item.switch;
    //       },
    //     },
    //     {
    //       default: true,
    //       html: 'Bilingual',
    //       url: 'https://artplayer.org/assets/sample/subtitle.srt',
    //     },
    //     {
    //       html: 'Chinese',
    //       url: 'https://artplayer.org/assets/sample/subtitle.cn.srt',
    //     },
    //     {
    //       html: 'Japanese',
    //       url: 'https://artplayer.org/assets/sample/subtitle.jp.srt',
    //     },
    //   ],
    //   onSelect: function (item) {
    //     art.subtitle.switch(item.url, {
    //       name: item.html,
    //     });
    //     return item.html;
    //   },
    // },
  ],
  quality: videoURLsOptionObject.value,
  thumbnails: thumbnailOptionObject.value,
  // subtitle: {
  //   url: 'https://artplayer.org/assets/sample/subtitle.srt',
  //   type: 'srt',
  //   style: {
  //     color: '#fe9200',
  //     fontSize: '20px',
  //   },
  //   encoding: 'utf-8',
  // },
  icons: {
    loading: '<img src="https://artplayer.org/assets/img/ploading.gif">',
    state: '<img width="150" heigth="150" src="https://artplayer.org/assets/img/state.svg">',
    indicator: '<img width="16" heigth="16" src="https://artplayer.org/assets/img/indicator.svg">',
  },
});

onMounted(() => {
  nextTick(() => {
    new Artplayer({ ...options, container: player.value });
  })
});

defineExpose({
  player, options
})
</script>

<template>
  <div ref="player" style="width: 600px; height: 400px;" v-if="props.videoURLs.length > 0"></div>
  <div v-else>Error</div>
</template>
