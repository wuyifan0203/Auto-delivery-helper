/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-07-31 00:09:32
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-27 17:46:13
 * @FilePath: /Auto-delivery-helper/script/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { launch } from 'puppeteer';
import type { Page, Browser } from 'puppeteer';
import { logger, errorLogger, requestLogger, responseLogger } from './log4js'
import { matchAction } from './actionMap';
import { action, state } from './action';
import { random, sleep } from './util';
import { jobList } from './responseData';
import { GeekOption, JobItem } from './state';
import { generateGeekUrl } from './url';

let browser: undefined | Browser;

async function main() {
    console.log('hollow world , i love you bb');

    browser = await launch({
        headless: false, // 设置为 false 以启用可视模式
        devtools: true,
        args: ['--disable-web-security', '--allow-file-access-from-files', '--hide-scrollbars', '--enable-gpu'],
        defaultViewport: { width: 1000, height: 800 }
    })

    browser.on('targetcreated', async (target) => {
        const page = await target.page();
        if (page) {
            preparePage(page);
            console.log('new page created', page.url());

        }
    })

    const page = await (async () => {
        const pages = await browser.pages();
        return pages.length > 0 ? pages[0] : await browser.newPage();
    })();


    const url = 'https://www.zhipin.com/web/user/';


    const baiduUrl = 'https://www.baidu.com/';

    const geekOptions: GeekOption = {
        city: [101020100],
        query: 'SAP MM',
        degree: [],
        industry: [],
        experience: [104, 105],
        scale: [],
        stage: [],
        salary: [405],
        position: [],
        jobType: 1901
    }

    const geekUrl = generateGeekUrl(geekOptions);

    console.log(geekUrl);

    // preparePage(page)
    // await page.goto(url, { waitUntil: 'networkidle2' });

    // await action.searchJobFromIndex(null, page);
    // await sleep(random(3000, 5000));
    // await action.turnBackPage(null, page);
    // await sleep(random(3000, 5000));
    // console.log('done', state.jobList);

    // await action.analyzeJobDetail(jobList[5] as unknown as JobItem);




}

// 捕获退出信号并关闭 Puppeteer 实例
process.on('exit', async () => {
    if (browser) {
        console.log('Close current browser instance');
        await browser.close();
    }
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('SIGTERM', () => {
    process.exit();
});


async function preparePage(page: Page) {
    console.log('in preparePage', page.url());

    await page.setRequestInterception(true);
    page.on('response', async (response) => {
        try {
            if (response.status() === 200) {
                const body = await response.json();
                const url = response.url();
                responseLogger.info('Response url: ', url);
                responseLogger.info('Response: ', body);
                console.log(`Response url: ${url}`);

                const func = matchAction(url);
                if (func) {
                    await func(body, page);
                }

            } else {
                errorLogger.error('Response response error: ', response.url());
            }
        } catch {
            errorLogger.error('Response others error: ', response.url());
        }
    })

    page.on('request', request => {
        // 只处理GET请求
        if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
            requestLogger.info(`Request: [${request.method()}]`, 'url:', request.url());
        }
        if (request.resourceType() === 'document') {
            requestLogger.info(`Request document: [${request.method()}]`, 'url:', request.url());
        }
        // 继续所有请求
        request.continue();
    });
}


// main();

export { main }