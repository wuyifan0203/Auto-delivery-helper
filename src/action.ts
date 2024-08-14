/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-08-06 00:23:30
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-15 01:29:53
 * @FilePath: /Auto-delivery-helper/src/action.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import type { Page } from "puppeteer";
import { errorLogger, logger } from "./log4js";
import { showMask } from "./ui";

const state = {
    isLogin: true,
    totalTime: 1000,
    queryTimes: 0,
    jobName: 'SAP业务顾问'
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
        if (state.isLogin) {
            console.log('searchJob ----->');

            // await this.searchJob(null, page);
      

        } else {
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


    },
    async searchJobFromIndex(_: any, page: Page) {
        console.log('搜索职位');

        await page.goto('https://www.zhipin.com/');
        // await showMask(page);
        const input = await page.$('.ipt-wrap .ipt-search');
        if (input) {
            console.log('input');

            await page.evaluate((input, jobName) => {
                const ele = input as HTMLInputElement;
                ele.value = jobName;
            }, input, state.jobName);
        }

        const searchBtn = await page.$('.btn-search');
        console.log(searchBtn, 88888888);

        if (searchBtn) {
            // await searchBtn.click();、
            console.log('btn click');

            await page.evaluate((btn) => {
                const ele = btn as HTMLButtonElement;
                ele.click()
            }, searchBtn);
        }
    }
}


export { action, state, RequestBody };