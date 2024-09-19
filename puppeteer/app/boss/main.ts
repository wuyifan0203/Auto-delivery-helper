/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 13:05:12
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-09-20 01:20:11
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/main.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Browser } from "puppeteer";
import { gotoWaitForRequests, preparePage } from "../../utils/preparePage";
import { actionMap } from "./actionMap";
import { generateGeekUrl, generateGetJobDetail } from "./url";
import { BossState } from "./types";
import { cloneDeep } from "lodash";
import { state } from "./state";
import { OptionType } from "../../script/state";
import { random, sleep } from "../../utils";


type optionState = BossState & OptionType

async function main(browser: Browser, option: any) {

    const bossState = Object.assign(cloneDeep(state), option) as optionState;
    const geekUrl = generateGeekUrl(bossState.geekOption);

    const mainPage = await (async () => {
        const pages = await browser.pages();
        return pages.length > 0 ? pages[0] : await browser.newPage();
    })();

    await preparePage(mainPage, 'mainPage', actionMap);
    const queryPage = await browser.newPage();
    await preparePage(queryPage, 'queryPage', actionMap);
    console.log('finish prepare page');

    // await mainPage.goto('http://www.csdn.com/', { waitUntil: 'domcontentloaded',timeout: 30000 });
    // await gotoWaitForRequests(mainPage, { url: 'http://www.csdn.com/', waitUntil: 'domcontentloaded', timeout: 30000 }, () => { 
    //     console.log('finish goto csdn');
    // });
    await sleep(5000)

    await mainPage.bringToFront();

    console.log('finish bring to front');
  

    // while (bossState.currentCount <= bossState.totalCount) {

    //     for (let j = 0,k = bossState.untreatedJobList.length; j < k; j++) {
    //         const job = bossState.untreatedJobList[j];
    //         const url = generateGetJobDetail(job);
    //         await gotoWaitForRequests(queryPage,{url})
    //         await queryPage.bringToFront();
    //         await sleep(random(2000, 4000));
    //     }

    //     if(state.jobList.length === state.targetCount){
    //         break;
    //     }

    // }


    console.log(`geekUrl: ${geekUrl}`);
}

export { main as bossMain } 