<template>
    <div>
        <TopNav :mine="true"></TopNav>
        <user-inf></user-inf>
        <PlayItem></PlayItem>
    </div>
</template>
<script setup>
import UserInf  from '@/components/user/UserInf.vue';
import TopNav from '@/components/home/TopNav.vue';
import PlayItem from '@/components/music/PlayItem.vue';
</script>