/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 11:19:27
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-09-06 18:09:29
 * @FilePath: /Auto-delivery-helper/puppeteer/utils/preparePage.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { GoToOptions, Page } from "puppeteer";
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
            // console.log(request.url());

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
        // console.log('All requests have finished.',actionQueue);
        // 按顺序执行匹配的 action
        for await (const { action, responseBody } of actionQueue) {
            await action(responseBody);
        }
        actionQueue.length = 0;
    }
}

type OptionsType = { url: string } & GoToOptions

const pendingRequests = new Set();

async function gotoWaitForRequests(page: Page, options: OptionsType, callback: Function) {
    const timeout = options.timeout || 30000; // 默认超时时间为30秒
    // 监听请求发起
    page.on('request', request => {
        pendingRequests.add(request);
    });

    // 监听请求完成
    page.on('requestfinished', request => {
        pendingRequests.delete(request);
    });

    // 监听请求失败
    page.on('requestfailed', request => {
        pendingRequests.delete(request);
    });

    console.log('begin goto ');
    await page.goto(options.url, options);
    console.log('end goto ');

    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        // 定时检查请求状态
        const checkPending = setInterval(() => {
            const elapsed = Date.now() - startTime;

            console.log(pendingRequests.size);
            // 如果所有请求完成
            if (pendingRequests.size === 0) {
                clearInterval(checkPending);
                callback();
                resolve(true);
            }

            // 超时处理
            if (elapsed >= timeout) {
                clearInterval(checkPending);
                reject(new Error(`Timeout: Network requests not finished within ${timeout} ms.`));
            }
        }, 1000);
    });
}


export { preparePage, gotoWaitForRequests } 