<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 10:47:17
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-27 16:06:14
 * @FilePath: /Auto-delivery-helper/src/components/HelloWorld.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';
import { main } from '../../script/index'

defineProps<{ msg: string }>()

const testSync = () => {
  // await main()
  window.ipcRenderer.send('testSync', 'i am a message from frontend')
}

const testAsync = async () => {
  const res = await window.ipcRenderer.invoke('testAsync', 'i am a message from frontend')
  console.log(res)
}

const runScript = async() => { 
  await window.ipcRenderer.invoke('runScript')
}

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <ElButton type="primary" @click="count++">count is {{ count }}</ElButton>

  </div>
  <el-input v-model="count"></el-input>
  <ElButton type="success" @click="testSync">Test Sync</ElButton>
  <ElButton type="warning" @click="testAsync">Test Async</ElButton>
  <ElButton type="primary" @click="runScript">Test Sync</ElButton>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
