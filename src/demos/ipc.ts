/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 10:47:17
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-27 11:08:48
 * @FilePath: /Auto-delivery-helper/src/demos/ipc.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

window.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})
