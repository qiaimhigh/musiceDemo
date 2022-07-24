<template>
  <div id="bottom-item">
    <div class="left">
      <img
        :src="playList[playingIndex].al.picUrl"
        alt="图片"
        @click="alertMusic"
      />
      <div class="middle">
        <span>{{ playList[playingIndex].al.name }}</span>
        <span>横滑可以切换上下首哦</span>
      </div>
    </div>
    <div class="right">
      <svg
        @click="playMusic"
        v-show="!isPlay"
        style="margin: 0 0.2rem"
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg
        @click="playMusic"
        v-show="isPlay"
        style="margin: 0 0.2rem"
        class="icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg style="margin: 0 0.2rem" class="icon" aria-hidden="true">
        <use xlink:href="#icon-unorderedlist"></use>
      </svg>
    </div>
  </div>
  <audio
    ref="audio"
    :src="`https://music.163.com/song/media/outer/url?id=${playList[playingIndex].id}.mp3`"
  ></audio>
  <van-popup
    v-model:show="MusicShow"
    position="bottom"
    duration=".3"
    :style="{ height: '100vh' }"
  >
    <music-demo :playMusic="playMusic" :isPlay="isPlay"></music-demo>
  </van-popup>
</template>
<script setup>
import MusicDemo from "./MusicDemo.vue";
import { computed, ref, onMounted, watch,onUpdated } from "vue";
import { mapState, useStore } from "vuex";
const store = useStore();
let musicData = mapState(["playList", "playingIndex", "isPlay", "MusicShow"]);
let changePlay = () => store.commit("changePlay");
let changeMusicShow = () => store.commit("changeMusicShow");
let musicList = {};
Object.keys(musicData).forEach((fnKey) => {
  const fn = musicData[fnKey].bind({ $store: store });
  musicList[fnKey] = computed(fn);
});
let { playingIndex, playList, isPlay, MusicShow } = musicList ;
let timer = null;
function Current(){
  timer = setInterval(()=>{
    store.commit('getCurrentTime',audio.value.currentTime)
  },800)
}
let audio = ref(null);
function playMusic() {
  if (audio.value.paused) {
    audio.value.play();
    Current();
    changePlay();
  } else {
    audio.value.pause();
    clearInterval(timer);
    changePlay();
  }
}
watch(
  [playingIndex, playList],
  () => {
    audio.value.autoplay = true;
  },
  { deep: true }
);
// 点击弹出歌词页
function alertMusic() {
  changeMusicShow();
}
onMounted(() => {
 store.dispatch('getMusicLyric',playList.value[0].id)
});
onUpdated(() => {
  store.dispatch('getMusicLyric',playList.value[0].id)
})


</script>
<style lang="less" scoped>
#bottom-item {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 1.2rem;
  border-top: 1px solid #cfcfcf;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .bottom-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem 0.2rem;
  }
  .left {
    display: flex;
    width: 70%;
    justify-content: center;
    align-items: center;
    .middle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      width: 70%;
    }
  }
  .middle span:nth-child(1) {
    font-weight: 600;
    font-size: 0.34rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .middle span:nth-child(2) {
    color: #8b8989;
  }
  img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin: 0 0.4rem;
  }
  .icon {
    width: 0.6rem;
    height: 0.6rem;
  }
}
</style>
