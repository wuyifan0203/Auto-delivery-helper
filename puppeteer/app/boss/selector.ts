/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 10:50:23
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 13:25:42
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/selector.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
enum SELECTOR {
    GUIDE_CLOSE = 'body > div.dialog-wrap.dialog-account-safe > div.dialog-container > div.dialog-title > a:nth-child(2)',
    NEXT_PAGE = 'a:has(i.ui-icon-arrow-right)'
}

export { SELECTOR as BOSS_SELECTOR } 