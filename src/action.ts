/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-08-06 00:23:30
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-14 00:51:54
 * @FilePath: /Auto-delivery-helper/src/action.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import type { Page } from "puppeteer";
import { errorLogger, logger } from "./log4js";

const state = {
    isLogin: true,
    totalTime: 1000,
    queryTimes: 0,
};

interface RequestBody {
    code: number;
    message?: string;
    zpData?: any;
}

const action = {
    async login(request: RequestBody, page: Page) {
        console.log(request, 66666);

        const { code } = request;
        // state.isLogin = code === 0;

        logger.info(`login: ${state.isLogin ? 'Success' : 'Fail'}`);
        if(state.isLogin){
            const mask = await page.$('#full-screen-mask');
            if (mask) {
                await page.evaluate((element) => {
                    const ele = element as HTMLElement;
                    console.log('ele', ele);
    
                    
                    ele.style.display = 'fixed';
                }, mask);
            }
            await page.goto('https://www.zhipin.com/');

        }else{
            errorLogger.info('login: Fail');
        }
    },
    async guide({ zpData }: RequestBody, page: Page) {
        if (!state.isLogin) return
        const { whetherPopUp } = zpData;
        if (whetherPopUp) {
            const targetElement = await page.$('body > div.dialog-wrap.dialog-account-safe > div.dialog-container > div.dialog-title > a:nth-child(2)');
            targetElement && await targetElement.click();
            logger.info('close guide');
        } else {
            logger.info('don`t need close guide');
        }

    },
    async getJobDetail({ zpData }: RequestBody, page: Page) {
        if (!state.isLogin) return
        const { jobInfo, bossInfo, brandComInfo } = zpData;

        const { location, postDescription, showSkills } = jobInfo;
        const { activeTimeDesc } = bossInfo;


    }
}


export { action, state, RequestBody };