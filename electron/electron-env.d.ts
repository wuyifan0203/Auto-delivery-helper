/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 10:38:24
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-27 11:04:22
 * @FilePath: /Auto-delivery-helper/electron/electron-env.d.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
/// <reference types="vite-plugin-electron/electron-env.d.ts" />

declare namespace NodeJS {
  interface ProcessEnv {
    VSCODE_DEBUG?: 'true'
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬ dist-electron
     * │ ├─┬ main
     * │ │ └── index.js    > Electron-Main
     * │ └─┬ preload
     * │   └── index.mjs   > Preload-Scripts
     * ├─┬ dist
     * │ └── index.html    > Electron-Renderer
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}
