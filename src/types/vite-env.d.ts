/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 10:47:17
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-28 01:05:28
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


declare global {
  interface Window {
    ipcRenderer: import('electron').IpcRenderer
  }
}