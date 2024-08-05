/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-07-31 00:09:32
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-03 15:47:28
 * @FilePath: /Auto-delivery-helper/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { launch } from 'puppeteer';
import type { Page, Browser } from 'puppeteer';
import url from 'url';
import { logger } from './utils/log4js'

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
    // await page.evaluate(() => {
    //     const mask = document.createElement('div');
    //     mask.style.position = 'fixed';
    //     mask.style.top = '0';
    //     mask.style.left = '0';
    //     mask.style.width = '100%';
    //     mask.style.height = '100%';
    //     mask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    //     mask.style.zIndex = '9999';
    //     mask.id = 'full-screen-mask';
    //     mask.innerText = '脚本执行时,请勿关闭浏览器窗口！';
    //     mask.style.color = 'white';
    //     mask.style.fontSize = '20px';
    //     document.body.appendChild(mask);
    // })


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
            if (response.status() === 200 || response.status() === 304) {
                console.log(`[response] ${response.url()}`);
                const body = await response.json();
                console.log(`[response body] ${JSON.stringify(body)}`);
                logger.debug('Response url: ', response.url());
                logger.debug('Response: ', body);
            }
        } catch { }
    })

    page.on('request', request => {
        // 只处理GET请求
        if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
            logger.debug(`Request: [${request.method()}]`, 'url:', request.url());

        }
        // 继续所有请求
        request.continue();
    });
}


main();