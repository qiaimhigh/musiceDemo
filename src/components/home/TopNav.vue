<template>
  <div class="topNav">
    <div class="topIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <div class="topMiddle">
      <span :class="{active: mine}" @click="$router.push({path: '/user'})">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <router-link to="/search" class="topRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo1"></use>
      </svg>
    </router-link>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps(['mine'])
</script>

<style lang="less" scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
  padding: 0.2rem;
  .topMiddle {
    display: flex;
    width: 70%;
    height: 100%;
    justify-content: space-evenly;
    font-size: 0.36rem;
  }
  .active {
    font-weight: 800;
  }
}
</style>
