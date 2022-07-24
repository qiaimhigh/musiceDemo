<template>
  <div id="infbox">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      每日推荐
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhibo"></use>
      </svg>
      私人FM
    </div><div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      歌单
    </div><div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      排行榜
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>
<style lang="less" scoped>
    #infbox{
        width: 100%;
        height: 2.2rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        .item{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
        }
        .icon{
            width: 100%;
            height: 60%;
        }
    }
</style>
