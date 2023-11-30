import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from '@/stores/index';

//样式重置
import 'normalize.css';

// 引入自定义样式
import '@/styles/mixins.scss';
import '@/styles/variables.scss';

//引入echarts
import echarts from '@/utils/echarts';

const app = createApp(App)

//通过provide传递给子组件
app.provide('$echarts', echarts);

app.use(pinia)
app.use(router)

app.mount('#app')