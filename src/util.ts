/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-08-15 21:44:43
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-16 00:46:05
 * @FilePath: /Auto-delivery-helper/src/util.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

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

export { sleep, random, fetchData };