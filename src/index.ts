/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-07-31 00:09:32
 * @LastEditors: wuyifan wuyifan@max-optics.com
 * @LastEditTime: 2024-08-14 17:32:54
 * @FilePath: /Auto-delivery-helper/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { launch } from 'puppeteer';
import type { Page, Browser } from 'puppeteer';
import util from 'util';
import { logger, errorLogger, requestLogger, responseLogger } from './log4js'
import { actionMap, matchAction } from './actionMap';
import { URL } from './url';

let browser: undefined | Browser;



async function main() {
    console.log('hollow world , i love you bb');

    browser = await launch({
        headless: false, // 设置为 false 以启用可视模式
        devtools: true,
        args: ['--disable-web-security', '--allow-file-access-from-files', '--hide-scrollbars', '--enable-gpu'],
        defaultViewport: { width: 1000, height: 800 }
    })

    const page = await (async () => {
        const pages = await browser.pages();
        return pages.length > 0 ? pages[0] : await browser.newPage();
    })();


    const url = 'https://www.zhipin.com/web/user/';


    const baiduUrl = 'https://www.baidu.com/';


    preparePage(page)
    await page.goto(url, { waitUntil: 'networkidle2' });



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
    await page.setRequestInterception(true);
    page.on('response', async (response) => {


        try {
            if (response.ok()) {
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


main();