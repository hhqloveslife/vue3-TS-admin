import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css' //重置预设，npm安装的第三方库
import './assets/css/index.scss' //初始化预设
import { setupStore } from './store'
setupStore()
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
