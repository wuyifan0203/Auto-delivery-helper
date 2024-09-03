/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 13:05:12
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-09-04 01:42:23
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/main.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Browser } from "puppeteer";
import { preparePage } from "../../utils/preparePage";
import { actionMap } from "./actionMap";
import { generateGeekUrl, generateGetJobDetail } from "./url";
import { BossState } from "./types";
// import { cloneDeep } from "lodash-es";
import { state } from "./state";
import { OptionType } from "../../script/state";
import { random, sleep } from "../../utils";


type optionState = BossState & OptionType

async function main(browser: Browser, option: any) {

    const bossState = Object.assign(JSON.parse(JSON.stringify(state)), option) as optionState;
    const geekUrl = generateGeekUrl(bossState.geekOption);

    const mainPage = await (async () => {
        const pages = await browser.pages();
        return pages.length > 0 ? pages[0] : await browser.newPage();
    })();

    await preparePage(mainPage, 'mainPage', actionMap);
    const queryPage = await browser.newPage();
    await preparePage(queryPage, 'queryPage', actionMap);

    await mainPage.bringToFront();
    await mainPage.goto(geekUrl, { waitUntil: 'networkidle2' });

    // while (bossState.currentCount <= bossState.totalCount) {

    //     for (let j = 0,k = bossState.untreatedJobList.length; j < k; j++) {
    //         const job = bossState.untreatedJobList[j];
    //         const jobUrl = generateGetJobDetail(job);
    //         await queryPage.bringToFront();
    //         await queryPage.goto(jobUrl, { waitUntil: 'networkidle2' });
    //         await sleep(random(2000, 4000));
    //     }

    //     if(state.jobList.length === state.targetCount){
    //         break;
    //     }

    // }


    console.log(`geekUrl: ${geekUrl}`);
}

export { main as bossMain } 