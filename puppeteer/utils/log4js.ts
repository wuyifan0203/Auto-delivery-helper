/*
 * @Author: wuyifan wuyifan@max-optics.com
 * @Date: 2024-08-06 09:46:32
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 16:06:41
 * @FilePath: /Auto-delivery-helper/puppeteer/utils/log4js.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
// import log4js from 'log4js';
import * as log4js from "log4js";
import path from 'path';
import fs from 'fs';

// 获取当前日期并格式化为YYYY-MM-DD格式
const getFormattedDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

// 创建日志目录
const logDir = path.join(__dirname, '../../log', getFormattedDate());
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

log4js.configure({
    appenders: {
        console: { type: 'console' },
        file: {
            type: 'dateFile',
            filename: path.join(logDir, 'app.log'),
            pattern: '.yyyy-MM-dd',
            compress: true,
        },
        error: {
            type: 'file',
            filename: path.join(logDir, 'error.log'),
        },
        request: {
            type: 'file',
            filename: path.join(logDir, 'request.log'),
        },
        response: {
            type: 'file',
            filename: path.join(logDir, 'response.log'),
        },
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'info' },
        error: { appenders: ['error'], level: 'error' },
        request: { appenders: ['request'], level: 'info' },
        response: { appenders: ['response'], level: 'info' },
    },
});


const logger = log4js.getLogger();
const errorLogger = log4js.getLogger('error');
const requestLogger = log4js.getLogger('request');
const responseLogger = log4js.getLogger('response');

enum LOG_TYPE {
    NETWORK = '[NETWORK]',
    GET_ELEMENT = '[GET_ELEMENT]',
    TRIGGER_EVENT = '[TRIGGER_EVENT]',
    MESSAGE = '[MESSAGE]',
}


export { logger, errorLogger, requestLogger, responseLogger,LOG_TYPE };