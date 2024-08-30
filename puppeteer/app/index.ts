/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 13:23:23
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 13:45:09
 * @FilePath: /Auto-delivery-helper/puppeteer/app/index.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { bossMain } from './boss/main';

const scriptMap = {
    boss: bossMain,
    '51job': () => { }
}

export { scriptMap }