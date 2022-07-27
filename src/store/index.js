import {
  createStore
} from 'vuex'
import { getLyric } from '@/axios/music/index'
import { loginAPI,verifyCaptcha } from '@/axios/user';

export default createStore({
  state: {
    playList: [{
      al: {
        id: 83079277,
        name: "Love Is Gone (Acoustic)",
        pic: 109951164473460770,
        picUrl: "https://p1.music.126.net/E5JYsO4DR4_Y-CdidpUVCw==/109951164473460772.jpg",
        pic_str: "109951164473460772"
      },
      id: 1401671455,
      ar: [{
          id: 1137239,
          name: "SLANDER"
        },
        {
          id: 28684353,
          name: "Dylan Matthew"
        }
      ]
    }],
    playingIndex: 0,
    isPlay: false,
    MusicShow: false,
    lyric: {},
    currentTime: 0, // 当前歌词的时间
    totalTime: 0, // 歌曲总时长
    isLogin: false, // 判断是否处于登陆状态
    personInf:{},
    token: ''
  },
  getters: {
  },
  mutations: {
    changePlay(state) {
      state.isPlay = !state.isPlay;
    },
    checkMusic(state, payload) {
      state.playList = payload.list
      state.playingIndex = payload.musicIndex
      state.isPlay = true
    },
    changeMusicShow(state) {
      state.MusicShow = !state.MusicShow;
    },
    changeMusic(state,value){
      if((state.playingIndex + value >= 0 && value < 0) ||( (state.playingIndex + value) < state.playList.length && value > 0)){
        state.playingIndex +=  value; 
      }     
    },
    MusicLyric(state,value){
      state.lyric = value
    },
    getCurrentTime(state,value){
      state.currentTime = parseInt(value)*1000
    },
    getTotalTime(state,value){
      console.log(value);
      state.totalTime = parseInt(value) ;
    },
    changeIsLogin(state,value){
      state.isLogin = value;
    },
    updatePersonInf(state,value){
      state.personInf = value
    },
    updateToken(state,value){
      state.token = value;
    }
  },
  actions: {
    async getMusicLyric(context,value){
      let res = await getLyric(value);
      context.commit('MusicLyric',res.data.lrc.lyric)
    },
    async getLogin(context,data){
      let res = await loginAPI(data);
      console.log(res);
      if(res.data.code === 200){
        context.commit('updatePersonInf',res.data.proFile);
        context.commit('changeIsLogin',true)
      }
      return res;
    },
    async verifyCaptchaS(context,data){
      let res = await verifyCaptcha(data);
      console.log(res);
      context.commit('updatePersonInf',res.data.proFile)
      return res;
    }
  },
  modules: {}
})