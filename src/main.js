import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getVant } from './plugins'
const app = createApp(App);
import '../public/download/font_2960517_b2zvzlo1vu/iconfont.css'
getVant(app)
app.use(store)
app.use(router).mount('#app')
