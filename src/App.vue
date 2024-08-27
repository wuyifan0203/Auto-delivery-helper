<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 10:47:17
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-27 16:20:08
 * @FilePath: /Auto-delivery-helper/src/App.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import Query from './components/Query.vue';


</script>

<template>
  <HelloWorld/>
  <Query />
</template>

<style>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
