/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-08-06 00:23:30
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-29 18:05:57
 * @FilePath: /Auto-delivery-helper/script/action.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import type { Page } from "puppeteer";
import { errorLogger, LOG_TYPE, logger } from "./log4js";
import { generateGetJobDetail, URL } from "./url";
import { JobItem, state } from "./state";
import { fetchData, sleep } from "./util";
import { BOSS_ACTIVE_STATE } from './enum'


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
    async getJobDetail({ zpData, code }: RequestBody) {
        // if (code !== 0) return
        const { jobInfo, bossInfo, brandComInfo, securityId } = zpData;

        const currentIndex = state.jobList.findIndex((item) => item.securityId === securityId);
        if (currentIndex !== -1) {
            const { activeTimeDesc } = bossInfo;
            const postDescription = String(jobInfo.postDescription).toUpperCase();
            const delFlag = state.descriptionExclusionKeys.every((key) => postDescription.includes(key)); // 判断是否包含排除关键词
            const recordFlag = state.descriptionInclusionKeys.every(key => postDescription.includes(key)); // 判断是否包含包含关键词

            logger.info(LOG_TYPE.MESSAGE, 'is include exclusion keys:', delFlag);
            logger.info(LOG_TYPE.MESSAGE, 'is include inclusion keys:', recordFlag);
            if (delFlag || !recordFlag) {
                state.jobList.splice(currentIndex, 1);
                logger.info(LOG_TYPE.MESSAGE, 'delete job', securityId);
            } else {
                state.jobList[currentIndex].postDescription = jobInfo.postDescription;
                state.jobList[currentIndex].bossActiveState = BOSS_ACTIVE_STATE[activeTimeDesc as keyof typeof BOSS_ACTIVE_STATE];
                logger.info('update job', securityId);
            }
        } else {
            console.error('job not found in the list');
            errorLogger.error('job not found in the list', securityId);
        }
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
    async getJobList({ zpData }: RequestBody) {
        const { jobList,totalCount } = zpData as { jobList: any[],totalCount:number };
        state.totalCount = totalCount;

        state.handelCount = state.handelCount + jobList.length;

        jobList.filter(({ goldHunter, jobName }) => {
            return state.excludeHunter === !goldHunter && !state.jobNameExclusionKeys.some((key) => jobName.includes(key))
        }).forEach((job) => {
            state.untreatedJobList.push(job);
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

    },

    async analyzeJobDetail(jobItem: JobItem) {
        // await sleep(5000);
        const url = generateGetJobDetail(jobItem);

        const result = await fetchData(url);

        await this.getJobDetail(result as RequestBody);
    }
}


export { action, state, RequestBody };