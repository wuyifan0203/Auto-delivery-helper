/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 13:05:12
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 18:16:34
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/main.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Browser } from "puppeteer";
import { preparePage } from "../../utils/preparePage";
import { actionMap } from "./actionMap";
import { generateGeekUrl, generateGetJobDetail } from "./url";
import { BossState } from "./types";
import { cloneDeep } from "lodash-es";
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

    preparePage(mainPage, 'mainPage', actionMap);
    const queryPage = await browser.newPage();
    preparePage(queryPage, 'queryPage', actionMap);

    await mainPage.goto(geekUrl, { waitUntil: 'networkidle2' });

    while (bossState.currentCount <= bossState.totalCount) {

        bossState.untreatedJobList.forEach(async (job) => {
            const jobUrl = generateGetJobDetail(job);
            await queryPage.bringToFront();
            await queryPage.goto(jobUrl, { waitUntil: 'networkidle2' });
            sleep(random(2000, 4000));
        })

    }


    console.log(`geekUrl: ${geekUrl}`);
}

export { main as bossMain } 