import { createApp } from 'vue'
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './style.css'
// import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App);
app.use(ElementPlus, { size: 'small' });
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})



