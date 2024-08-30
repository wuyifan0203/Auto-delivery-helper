import { Page } from "puppeteer";
import { matchAction } from ".";
import { errorLogger, requestLogger, responseLogger } from "./log4js";

/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 11:19:27
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 11:31:20
 * @FilePath: /Auto-delivery-helper/puppeteer/core/preparePage.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
async function preparePage(page: Page, keyword: string, actionMap: any) {
    await page.setRequestInterception(true);
    page.on('response', async (response) => {
        try {
            if (response.status() === 200) {
                const body = await response.json();
                const url = response.url();
                responseLogger.info(`[${keyword}]Response url: ${url}`);
                responseLogger.info(`[${keyword}]Response: ${body}`);

                const func = matchAction(actionMap, url);
                if (func) {
                    await func(body, page);
                }

            } else {
                errorLogger.error('Response response error: ', response.url());
            }
        } catch {
            errorLogger.error('Response others error: ', response.url());
        }
    })

    page.on('request', request => {
        // 只处理GET请求
        if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
            requestLogger.info(`[${keyword}]Request: [${request.method()}]`, 'url:', request.url());
        }
        if (request.resourceType() === 'document') {
            requestLogger.info(`[${keyword}]Request document: [${request.method()}]`, 'url:', request.url());
        }
        // 继续所有请求
        request.continue();
    });
}

export { preparePage } 