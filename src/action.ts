/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-08-06 00:23:30
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-16 00:17:14
 * @FilePath: /Auto-delivery-helper/src/action.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import type { Page } from "puppeteer";
import { errorLogger, LOG_TYPE, logger } from "./log4js";
import { URL } from "./url";
import { state } from "./state";


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
            console.log('login ----->');
        } else {
            errorLogger.error('login: Fail');
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
        await page.goto('https://www.zhipin.com/');
        const input = await page.$('.ipt-wrap .ipt-search');
        if (input) {
            logger.info(LOG_TYPE.GET_ELEMENT, 'get job search input element');
            await page.evaluate((input, jobName) => {
                const ele = input as HTMLInputElement;
                ele.value = jobName;
            }, input, state.searchJobName);
            logger.info(LOG_TYPE.TRIGGER_EVENT, 'set search input value')
        } else {
            errorLogger.error(LOG_TYPE.GET_ELEMENT, 'get job search input element');
            return
        }

        const searchBtn = await page.$('.btn-search');
        if (searchBtn) {
            logger.info(LOG_TYPE.GET_ELEMENT, 'get job search button element');
            await page.evaluate((btn) => {
                const ele = btn as HTMLButtonElement;
                ele.click()
            }, searchBtn);
            logger.info(LOG_TYPE.TRIGGER_EVENT, 'click search button')
        } else {
            errorLogger.error(LOG_TYPE.GET_ELEMENT, 'get job search button element');
            return
        }
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
    },
    async getJobList({ zpData }: RequestBody, page: Page) {
        const { jobList } = zpData as { jobList: any[] };

        console.log('get job list --->')
        

        jobList.filter(({ goldHunter, jobName }) => {
            return state.excludeHunter === !goldHunter && state.jobNameExclusionKeys.some((key) => jobName.includes(key))
        }).forEach((job) => {
            state.jobList.push(job);
        });
    },

    async turnBackPage(_: any, page: Page) {
        if (!state.isLogin) return;
        console.log('back page');

        if (await page.url().includes(URL.QUERY_JOB)) {
            const nextPageAnchor = await page.$('a:has(i.ui-icon-arrow-right)');
            if (nextPageAnchor) {
                logger.info(LOG_TYPE.GET_ELEMENT, 'get next page anchor element');
                await page.evaluate((anchor) => {
                    anchor.click();
                }, nextPageAnchor)
                logger.info(LOG_TYPE.TRIGGER_EVENT, 'click next page anchor')
            } else {
                errorLogger.error(LOG_TYPE.GET_ELEMENT, 'get next page anchor element');
            }

        }

    }
}


export { action, state, RequestBody };