<template>
    <div>
        <top-nav :playList="data.playlist"></top-nav>
        <list-item :length="length" :itemList="itemList" :subscribedCount="data.playlist.subscribedCount"></list-item>
    </div>
</template>
<script setup>
import TopNav from '@/components/music/TopNav.vue';
import ListItem from '@/components/music/ListItem.vue';
import { useRoute } from 'vue-router';
import {onMounted,reactive,ref} from 'vue'
import { getMusicList,getMusicLists } from '@/axios/music'
let route = useRoute();
let data = reactive({
    playlist:{
        creator:{}
    }
});
let itemList = reactive({
    privileges:{

    },
    songs:{}
})
let length = ref(0);
onMounted(async () => {
    let  res = await getMusicList(route.query.id);
    data.playlist = res.data.playlist
    length.value = data.playlist.trackIds.length;
    let result = await getMusicLists(route.query.id);
    itemList.privileges = result.data.privileges
    itemList.songs = result.data.songs
})
</script>

<style lang="less" scoped>

</style>