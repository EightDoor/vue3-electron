import { createApp } from 'vue';
import App from './App.vue';

// element-plus
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//router
import router from '@/router/router';

const app = createApp(App);

app.use(ElementPlus,  { size: 'small', zIndex: 3000, locale: zhCn}).use(router);
app.mount('#app');
