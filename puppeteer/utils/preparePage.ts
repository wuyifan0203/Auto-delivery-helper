/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 11:19:27
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-09-04 01:39:37
 * @FilePath: /Auto-delivery-helper/puppeteer/utils/preparePage.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Page } from "puppeteer";
import { matchAction } from "./common";
import { errorLogger, requestLogger, responseLogger } from "./log4js";


async function preparePage(page: Page, keyword: string, actionMap: any) {

    const pendingRequests = new Set();
    const actionQueue: Array<{ action: Function, responseBody: any }> = [];

    await page.setRequestInterception(true);
    page.on('response', async (response) => {
        const request = response.request();
        pendingRequests.has(request) && pendingRequests.delete(request);
        try {
            if (response.status() === 200) {
                const responseBody = await response.json();
                const url = response.url();
                responseLogger.info(`[${keyword}]Response url: ${url}`);
                responseLogger.info(`[${keyword}]Response: ${responseBody}`);

                const action = matchAction(actionMap, url);
                if (action) {
                    actionQueue.push({ action, responseBody });
                }
            } else {
                errorLogger.error('Response response error: ', response.url());
            }
        } catch {
            errorLogger.error('Response others error: ', response.url());
        }
        if (pendingRequests.size === 0) {
            await onAllRequestsFinished();
        }
    })

    page.on('request', request => {
        // 只处理GET请求
        if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
            pendingRequests.add(request);
            console.log(request.url());
            
            requestLogger.info(`[${keyword}]Request: [${request.method()}]`, 'url:', request.url());
        }
        if (request.resourceType() === 'document') {
            pendingRequests.add(request);
            requestLogger.info(`[${keyword}]Request document: [${request.method()}]`, 'url:', request.url());
        }
        // 继续所有请求
        request.continue();
    });

    async function onAllRequestsFinished() {
        console.log('All requests have finished.',actionQueue);
        // 按顺序执行匹配的 action
        for await (const { action, responseBody } of actionQueue) {
            await action(responseBody);
        }
        actionQueue.length = 0;
    }
}



export { preparePage } 