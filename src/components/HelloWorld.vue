<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 10:47:17
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-27 17:02:26
 * @FilePath: /Auto-delivery-helper/src/components/HelloWorld.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
import { ref } from 'vue';
import { ElButton } from 'element-plus';
const testSync = () => {
  // await main()
  window.ipcRenderer.send('testSync', 'i am a message from frontend')
}

const testAsync = async () => {
  const res = await window.ipcRenderer.invoke('testAsync', 'i am a message from frontend')
  console.log(res)
}

const runScript = async () => {
  await window.ipcRenderer.invoke('runScript')
}

const count = ref(0)
</script>

<template>
  <div class="btn-group">
    <ElButton type="success" @click="testSync">Test Sync</ElButton>
    <ElButton type="warning" @click="testAsync">Test Async</ElButton>
    <ElButton type="primary" @click="runScript">Test Sync</ElButton>
  </div>
</template>

<style scoped>
.btn-group {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
