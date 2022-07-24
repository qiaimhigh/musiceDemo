<template>
  <div id="list">
    <div class="top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg v-show="false" class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibiaoti--"></use>
        </svg>
        <span style="font-weight: 600"
          >播放全部<span style="font-size: 0.24rem; color: #cfcfcf"
            >（共{{length}}首）</span
          ></span
        >
      </div>
      <div class="shouCang">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ziyuan"></use>
        </svg>
        收藏（{{subscribedCount}}）
      </div>
    </div>
    <div class="middle">
      <div class="music" v-for="(item,index) in itemList.songs" :key="index">
        <span style="color: black; width: 3%; text-align: center;">{{index+1}}</span>
        <div class="dess" >
          <div class="des"  @click="changMusic({musicIndex: index,list:itemList.songs})">
            <span style="color: blac; font-weight: 600;">{{item.al.name}}</span>
            <div  class="arName">
                <span style="color: #cfcfcf" v-for="(item) in item.ar" :key="item">{{item.name}}</span>
            </div>
          </div>
            <svg v-if="item.mv != 0" class="icon" aria-hidden="true" style="width: 0.36rem; height: 0.36rem;">
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
import { defineProps } from 'vue'
import { useStore } from 'vuex'
defineProps(['subscribedCount','itemList','length'])
let store = useStore();
let checkMusic = (payload)=> store.commit('checkMusic',payload)
function changMusic(value){
  checkMusic(value)
}
</script>

<style lang="less">
#list {
  background-color: rgb(255, 255, 255);
  border-radius: 0.2rem 0.2rem 0 0;
  margin-top: 0.2rem;
  .top {
    height: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 0.1rem 0.2rem;
    .left {
      display: flex;
      align-items: center;
      .icon {
        margin: 0 0.1rem;
      }
    }
    .shouCang {
      display: flex;
      align-items: center;
      background-color: rgb(255, 23, 0);
      border-radius: 0.4rem;
      color: rgb(246, 247, 248);
      .icon {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 0.1rem;
      }
    }
  }
  .middle {
    width: 100%;
    .music {
      height: 0.9rem;
      display: flex;
      padding: 0 0.1rem;
      justify-content: space-evenly;
      align-items: center;
      .dess{
        display: flex;
        justify-content: space-between;
        width: 70%;
        align-items: center;
      }
      .des {
        display: flex;
        flex-direction: column;
        padding-left: .1rem;
        font-size: .26rem;
        justify-content: left;
      }
      .des span:nth-child(1){
        display: -webkit-box;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
    }
    .right{
        display: flex;
        align-items: center;
    }
    .arName{
        display: -webkit-box;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: horizontal;
        color: rgb(141, 140, 141);
        span{
          width: auto;
          display: inline;
        }
    }
  }
}
</style>
