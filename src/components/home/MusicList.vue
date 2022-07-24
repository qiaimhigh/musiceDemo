<template>
  <div id="fList">
    <div class="topBar">
      <h2>发现好歌单</h2>
      <div class="button">查看更多</div>
    </div>
    <div class="swiper-box">
      <van-swipe :loop="false" :width="120" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in music.list" :key="index">
          <router-link :to="{ path: '/music', query: { id: item.id } }" class="a-router">
            <div class="img-box">
              <div class="play-icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-24gl-play"></use></svg
                >{{ changeCount(item.playCount) }}
              </div>
              <img :src="item.picUrl" alt="图片" />
            </div>
            <span class="text-box">
              {{ item.name }}
            </span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import { getMusicList } from "@/axios/home";
import { onMounted, reactive } from "vue";
const music = reactive({
  list: [],
});
onMounted(async () => {
  let res = await getMusicList();
  console.log(res.data.result);
  music.list = res.data.result;
});
function changeCount(num) {
  if (num >= 100000000) {
    return (num / 10000000).toFixed(1) + "亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(2) + "万";
  } else {
    return num;
  }
}
</script>
<style lang="less">
#fList {
  a {
    color: black;
  }
  padding: 0.2rem;
  .topBar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.12rem;
    .button {
      border-radius: 0.4rem;
      border: 1px solid black;
      width: 1.6rem;
      text-align: center;
      line-height: 0.6rem;
    }
  }
  .swiper-box {
    width: 100%;
    position: relative;
    .van-swipe-item {
      width: 100%;
      height: 100%;
      margin: 0.1rem;
      .a-router{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .img-box {
        position: relative;
        width: 100%;
        height: 100%;
        color: rgb(226, 229, 232);
        display: flex;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.4rem;
        }
        .play-icon {
          position: absolute;
          top: 0.2rem;
          right: 0.1rem;
          display: flex;
          align-items: center;
          .icon {
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }
    }
    .text-box {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
