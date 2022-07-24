<template>
  <div class="topNav">
    <div class="topIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="topMiddle">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo1"></use>
      </svg>
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
  .topNav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .8rem;
    padding: .2rem;
    .topMiddle{
      display: flex;
      width: 70%;
      height: 100%;
      justify-content: space-evenly;
      font-size: .36rem;
    }
    .active{
      font-weight: 800;
    }
  }
</style>
