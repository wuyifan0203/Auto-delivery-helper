/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 11:27:37
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 11:28:30
 * @FilePath: /Auto-delivery-helper/puppeteer/utils/common.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Page } from "puppeteer";
import { LOG_TYPE, logger } from "./log4js";
import { get } from 'https';

function sleep(ms: number) {
    return new Promise((resolve) => {
        logger.info(LOG_TYPE.MESSAGE, `sleep ${ms} ms`);
        setTimeout(resolve, ms);
    });
}

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function fetchData(url: string) {
    return new Promise((resolve, reject) => {
        get(url, (response) => {
            let data = '';

            // 当有数据块到达时，累加数据
            response.on('data', (chunk) => {
                data += chunk;
            });

            // 数据接收完毕
            response.on('end', () => {
                if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                    try {
                        const parsedData = JSON.parse(data); // 假设返回的是 JSON 数据
                        resolve(parsedData);
                    } catch (e) {
                        resolve(data); // 如果不是 JSON 数据，就返回原始数据
                    }
                } else {
                    reject(new Error(`Request failed with status code ${response.statusCode}`));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

function browserLog(page: Page, ...args: any) {
    page.evaluate((...args) => {
        console.log(...args);
    }, ...args);
}

function matchAction(actionMap: any, url: string) {
    for (const key in actionMap) {
        if (url.includes(key)) {
            return actionMap[key];
        }
    }
    return undefined;
}

export { sleep, random, fetchData, browserLog, matchAction };