import { Swiper,SwiperItem,Button,Popup,Progress  } from 'vant'
import Vue3Marquee from 'vue3-marquee'
let arr = [
    Swiper,SwiperItem,Button,Popup,Vue3Marquee,Progress 
]

export function getVant(app){
    arr.forEach((x)=>{
        return app.use(x)
    })
}