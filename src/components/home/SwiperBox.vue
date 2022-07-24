<template>
  <div id="swiper_box">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="(image, index) in dataList.images" :key="index">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { getBanners } from '@/axios/home'
import { onMounted,reactive } from "vue";
export default {
  setup() {
    const dataList = reactive({
      images: [],
    });
    onMounted(async () => {
        let res = await getBanners();
        dataList.images = res.data.banners;
    });
    return { dataList };
  },
};
</script>
<style lang="less">
#swiper_box {
  .van-swipe {
    width: 100%;
    height: 3.5rem;
    .van-swipe-item {
      width: 100%;
      height: 100%;
      padding: .2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator{
        background-color: aliceblue;
    }
  }
}
</style>
