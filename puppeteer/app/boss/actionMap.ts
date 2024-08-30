/*
 * @Author: wuyifan wuyifan@max-optics.com
 * @Date: 2024-08-12 17:01:10
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 11:24:49
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/actionMap.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Page } from "puppeteer";
import { action, RequestBody } from "./action";
import { URL } from "./url";

const actionMap: { [key: string]: (request: RequestBody, page: Page) => Promise<void> } = {
    [URL.LOGIN]: action.login,
    [URL.GUIDE]: action.guide,
    [URL.JOB_DETAIL]: action.getJobDetail,
    [URL.JOB_LIST]: action.getJobList,
}


export { actionMap } 