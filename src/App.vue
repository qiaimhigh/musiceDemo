<template>
  <nav>
    <!-- <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-VIP"></use>
    </svg> -->
  </nav>
  <router-view></router-view>
  <play-item></play-item>
</template>
<script setup>
import PlayItem from './components/music/PlayItem.vue';
</script>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
}
.icon{
  width: .5rem;
  height: .5rem;
}
</style>
