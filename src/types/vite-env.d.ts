/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 10:47:17
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-27 13:12:23
 * @FilePath: /Auto-delivery-helper/src/types/vite-env.d.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}
