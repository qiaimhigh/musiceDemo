<template>
  <div id="musicDemo">
    <img :src="playList[playingIndex].al.picUrl" alt="" class="bgcImg" />
    <div class="top">
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="changeMusicShow">
          <use xlink:href="#icon-houtui"></use>
        </svg>
        <div class="title">
          <p>
            <Vue3Marquee style="color: white">{{
              playList[playingIndex].al.name
            }}</Vue3Marquee>
          </p>
          <Vue3Marquee style="color: white">
            <span
              v-for="(item, index) in playList[playingIndex].ar"
              :key="index"
            >
              {{ item.name }}
            </span>
          </Vue3Marquee>
        </div>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
    <div class="lyric" ref="lyricBox" v-show="isMShow">
      <p
        v-for="item in musicLyric"
        :class="{
          p_active:
            parseInt(currentTime) < parseInt(item.pre) &&
            parseInt(currentTime) >= parseInt(item.time),
        }"
        :key="item"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="middle" v-show="!isMShow">
      <img src="../../../public/img/disc_default.png" alt="" class="bg" />
      <img
        @click="ChangeIsShow"
        :src="playList[playingIndex].al.picUrl"
        alt=""
        class="mimg"
        :class="{ img_active: isPlay, img_paused: !isPlay }"
      />
      <img
        @click="ChangeIsShow"
        src="../../../public/img/needle-ab.png"
        alt=""
        class="zhen"
        :class="{ zhen_active: isPlay }"
      />
    </div>
    <div class="bottom">
      <div class="bTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuijian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazia"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>

        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxunhuan"></use>
        </svg>
      </div>
      <div class="bMiddle">
        <input type="range" min="0" :max="totalTime*1000" v-model="currentTime" step="0.5">
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-houtui"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeMusic(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          v-show="!isPlay"
          class="icon"
          aria-hidden="true"
          style="width: 1rem; height: 1rem"
          @click="playMusic"
        >
          <use xlink:href="#icon-bofang2"></use>
        </svg>
        <svg
          v-show="isPlay"
          class="icon"
          aria-hidden="true"
          style="width: 1rem; height: 1rem"
          @click="playMusic"
        >
          <use xlink:href="#icon-24gl-pauseCircle"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeMusic(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import "vue3-marquee/dist/style.css";
import { useStore, mapState } from "vuex";
import { computed, defineProps, onMounted, ref, watch } from "vue";
let store = useStore();
let musicList = {};
let musicData = mapState(["playList", "playingIndex", "lyric", "currentTime","totalTime"]);
Object.keys(musicData).forEach((fnKey) => {
  const fn = musicData[fnKey].bind({ $store: store });
  musicList[fnKey] = computed(fn);
});
let isMShow = ref(false);
function ChangeIsShow() {
  console.log("sdaasda");
  isMShow.value = true;
}
let changeMusicShow = () => {
  store.commit("changeMusicShow");
  isMShow.value = false;
};
let { playList, playingIndex, lyric, currentTime,totalTime } = musicList;
function changeMusic(index) {
  store.commit("changeMusic", index);
}
// 父传子
let props = defineProps(["playMusic", "isPlay"]);
let musicLyric = computed(() => {
  let arr = lyric.value.split(/[(\r\n)\r\n]+/).map((item) => {
    let min = item.slice(1, 3);
    let sec = item.slice(4, 6);
    let ms = item.slice(7, 10);
    let lrc = item.slice(11, item.length);
    if (isNaN(ms)) {
      ms = item.slice(7, 9);
      lrc = item.slice(10, item.length);
    }
    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(ms);
    return { min, sec, ms, lrc, time };
  });
  arr.forEach((item, i) => {
    if (i === arr.length - 1 || isNaN(arr[i].time)) {
      item.pre = 100000;
    } else {
      item.pre = arr[i + 1].time;
    }
  });
  return arr;
});
let lyricBox = ref('lyricBox');
  watch(currentTime, (newValue) => {
    console.log(currentTime.value);
    // console.log([lyricBox.value]);
    let p = document.querySelector("p.p_active");
    if (p && p.offsetTop && p.offsetTop > 300) {
      // console.log(lyricBox.value.offsetTop);
      lyricBox.value.scrollTop = p.offsetTop - 300;
    }
    console.log(newValue+'==='+parseInt(totalTime.value)*1000);
    if(newValue >= Math.floor(totalTime.value)*1000){ 
      if(playingIndex.value === playList.value.length-1){
        store.commit("changeMusic",-(playList.value.length-1))
        props.playMusic()
      }else{
        store.commit("changeMusic",1)
      }
    }
  });
onMounted(() => {
});

// Object.defineProperty([lyricBox.value],'offsetTop',{
//   value: 300,
//   writable: true
// })
// console.log([lyricBox.value]);
</script>

<style lang="less">
#musicDemo {
  .top {
    height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    .icon {
      fill: white;
    }
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 40%;
      .title {
        height: 100%;
        width: 70%;
      }
    }
  }
  .bgcImg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    filter: blur(70px);
  }
  .middle {
    width: 100vw;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .bg {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
      border-radius: 50%;
    }
    .mimg {
      width: 3.2rem;
      height: 3.2rem;
      position: absolute;
      bottom: 3.14rem;
      border-radius: 50%;
      animation: rotate_z 10s linear infinite;
    }
    .img_active {
      animation-play-state: running;
    }
    .img_paused {
      animation-play-state: paused;
    }
    @keyframes rotate_z {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
    .zhen {
      width: 2.2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 0.74s;
    }
    .zhen_active {
      width: 2.2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(1deg);
      transition: all 0.74s;
    }
  }
  .bottom {
    width: 100vw;
    height: 3rem;
    position: absolute;
    bottom: 0.7rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .bTop,
    .footer {
      height: 1rem;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        height: 0.6rem;
        width: 0.6rem;
        fill: rgb(97, 94, 94);
      }
    }
    .bMiddle{
      padding: 0 .1rem;
      input{
        width: 100%;
        height: .1rem;
      }
    }
  }
  .lyric {
    margin-top: 0.2rem;
    width: 100vw;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #e2d8d8;
    overflow: scroll;
    p {
      font-size: 0.32rem;
      margin-bottom: 0.4rem;
      text-align: center;
    }
    .p_active {
      font-size: 0.42rem;
      color: white;
    }
  }
}
</style>
