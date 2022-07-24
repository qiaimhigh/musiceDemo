<template>
  <div id="musicTop">
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-houtui"></use>
      </svg>
      <div class="middle">
        <span>歌单</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
      <img :src="playList.coverImgUrl" alt="" class="bgc" />
    </div>
    <div class="middle">
      <div class="top-box">
        <img :src="playList.coverImgUrl" alt="图片" class="bgc-pic"/>
        <div class="content">
          <span class="text" style="color: aliceblue; font-size: .3rem;">{{playList.description}}</span>
          <div class="author">
            <img :src="playList.creator.avatarUrl" alt="图片" class="creatorIcon"/>
            <span>{{playList.creator.nickname}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou"></use>
            </svg>
          </div>
          <span class="text" >{{playList.creator.signature}}</span>
        </div>
      </div>
      
    </div>
    <div class="bottom">
        <div class="item-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiaoxi"></use>
            </svg>
            <span>{{playList.commentCount}}</span>
        </div>
        <div class="item-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{playList.shareCount}}</span>
        </div>
        <div class="item-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="item-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps(["playList"]);
</script>
<style lang="less">
#musicTop {
  .top {
    height: 1rem;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .middle {
      width: 70%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 0.4rem;
        font-weight: 500;
        color: rgb(0, 0, 0);
      }
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
    .bgc {
      width: 100%;
      height: 10rem;
      position: fixed;
      top: 0;
      right: 0;
      z-index: -1;
      background-repeat: no-repeat;
      filter: blur(20px);
    }
  }
  .middle {
    .top-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bgc-pic{
            margin: .2rem;
            width: 2.8rem;
            height: 2.8rem;
            border-radius: .2rem;
        }
        .content{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: .24rem;
            margin: .1rem;
            width: 60%;
            .author{
               
                display: flex;
                align-items: center;
                font-size: .3rem;
                 .creatorIcon{
                    width: 0.8rem;
                    height: 0.8rem;
                    border-radius: 50%;
                    margin: .1rem;
                }
                .icon{
                    width: .3rem;
                    height: .3rem;
                    margin: 0 .1rem;
                    color: aliceblue;
                }
            }
           
        }
    }
    .text{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        color: rgb(141, 140, 141);
    }
  }
  .bottom{
    color: aliceblue;
    display: flex;
    height: 1.2rem;
    justify-content: space-around;
    align-items: center;
    .item-box{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .icon{
        width: .6rem;
        height: .6rem;
        color: aliceblue;
    }
  }
}
</style>
