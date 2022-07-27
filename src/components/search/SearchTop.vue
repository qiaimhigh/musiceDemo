<template>
  <div id="searchTop">
    <div class="header">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-jiantou_xiangzuo_o"></use>
      </svg>
      <input
        type="text"
        :placeholder="placeholderWord"
        v-model="searchWord"
        @keydown.enter="onKeyUp"
      />
    </div>
    <div class="searchHistory">
      <span class="p">历史：</span>
      <span
        class="hisItem"
        @click="clickPerson(item)"
        v-for="(item, index) in historyArr.arr"
        :key="index"
        >{{ item }}</span
      >

      <svg class="icon" aria-hidden="true" @click="deleteHis">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="searchMiddle">
      <div class="music" v-for="(item, index) in personMusic.list" :key="index">
        <span style="color: black; width: 3%; text-align: center">{{
          index + 1
        }}</span>
        <div class="dess">
          <div
            class="des"
            @click="changMusic({ musicIndex: index, list: personMusic.list })"
          >
            <span style="color: blac; font-weight: 600">{{ item.al.name }}</span>
            <div class="arName">
              <span
                style="color: #cfcfcf"
                v-for="item in item.ar"
                :key="item"
                >{{ item.name }}</span
              >
            </div>
          </div>
          <svg
            v-if="item.mv != 0"
            class="icon"
            aria-hidden="true"
            style="width: 0.36rem; height: 0.36rem"
          >
            <use xlink:href="#icon-shipin"></use>
          </svg>
        </div>
        <div class="right">
          <svg style="margin: 0 0.2rem" class="icon" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { searchMusic, searchDefault } from "@/axios/music";
import { ref, reactive, onBeforeMount } from "vue";
import { useStore } from "vuex";
let historyArr = reactive({
  arr: [],
});
let placeholderWord = ref("李荣浩");
let searchWord = ref("");
let josnHis = JSON.parse(localStorage.getItem("historyArr"));
historyArr.arr = josnHis ? josnHis : [];
let personMusic = ref({
  list: [],
});
async function onKeyUp() {
  if (searchWord.value !== "") {
    historyArr.arr.unshift(searchWord.value);
    historyArr.arr = reactive([...new Set(historyArr.arr)]);
    localStorage.setItem("historyArr", JSON.stringify(historyArr.arr));
    searchWord.value = "";
    let res = await searchMusic(searchWord.value);
    personMusic.value.list = res.data.result.songs;
    console.log(res);
  } else {
    let res2 = await searchMusic(placeholderWord.value);
    personMusic.value.list = res2.data.result.songs;
    console.log(res2);
  }
}
async function clickPerson(person) {
  let res = await searchMusic(person);
  personMusic.value.list = res.data.result.songs;
  console.log(res);
}
function deleteHis() {
  historyArr.arr.shift();
  localStorage.setItem("historyArr", JSON.stringify(historyArr.arr));
}
let store = useStore();
console.log(store);
let checkMusic = (payload) => store.commit("checkMusic", payload);
function changMusic(value) {
  checkMusic(value);
}

onBeforeMount(async () => {
  let res = await searchDefault();
  placeholderWord.value = res.data.data.realkeyword;

});
</script>
<style lang="less" scoped>
#searchTop {
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem;
    align-items: center;
    height: 1.2rem;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
    input {
      height: 0.6rem;
      border: none;
      border-bottom: 0.04rem solid #cfcfcf;
      width: 90%;
      padding: 0.1rem;
    }
  }
  .searchHistory {
    width: 100%;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .p {
      font-weight: 700;
      font-size: 0.4rem;
    }
    .hisItem {
      padding: 0.1rem 0.2rem;
      background-color: #cfcfcf;
      border-radius: 0.4rem;
      margin: 0.1rem 0.2rem;
      display: inline-block;
    }
    .icon {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .searchMiddle {
    width: 100%;
    .music {
      height: 0.9rem;
      display: flex;
      padding: 0 0.1rem;
      justify-content: space-evenly;
      align-items: center;
      .dess {
        display: flex;
        justify-content: space-between;
        width: 70%;
        align-items: center;
      }
      .des {
        display: flex;
        flex-direction: column;
        padding-left: 0.1rem;
        font-size: 0.26rem;
        justify-content: left;
      }
      .des span:nth-child(1) {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
    .arName {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: horizontal;
      color: rgb(141, 140, 141);
      span {
        width: auto;
        display: inline;
      }
    }
  }
}
</style>
