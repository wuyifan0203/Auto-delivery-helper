/*
 * @Author: wuyifan wuyifan@max-optics.com
 * @Date: 2024-08-12 17:01:10
 * @LastEditors: wuyifan wuyifan@max-optics.com
 * @LastEditTime: 2024-08-12 17:56:20
 * @FilePath: /Auto-delivery-helper/src/actionMap.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Page } from "puppeteer";
import { action, RequestBody } from "./action";
import { URL } from "./url";

const actionMap: { [key: string]: (request: RequestBody, page: Page) => Promise<void> } = {
    [URL.LOGIN]: action.login,
    [URL.GUIDE]: action.guide,
    [URL.JOB_DETAIL]: action.getJobDetail
}

function matchAction(url: string) {
    for (const key in actionMap) {
        if (url.includes(key)) {
            return actionMap[key];
        }
    }
    return undefined;
}
export { actionMap, matchAction } 