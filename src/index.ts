/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-07-31 00:09:32
 * @LastEditors: wuyifan wuyifan@max-optics.com
 * @LastEditTime: 2024-08-01 17:09:25
 * @FilePath: /Auto-delivery-helper/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { launch, type Browser } from 'puppeteer';

let browser: undefined | Browser;




async function main() {
    console.log('hollow world , i love you bb');

    browser = await launch({
        headless: false, // 设置为 false 以启用可视模式
        devtools: true,
        args: ['--disable-web-security', '--allow-file-access-from-files', '--hide-scrollbars', '--enable-gpu'],
        defaultViewport: { width: 1280, height: 800 }
    })

    const page = await (async () => {
        const pages = await browser.pages();
        return pages.length > 0 ? pages[0] : await browser.newPage();
    })();


    const url = 'https://www.zhipin.com/';


    const baiduUrl = 'https://www.baidu.com/';
    await page.goto(baiduUrl, { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
        const mask = document.createElement('div');
        mask.style.position = 'fixed';
        mask.style.top = '0';
        mask.style.left = '0';
        mask.style.width = '100%';
        mask.style.height = '100%';
        mask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        mask.style.zIndex = '9999';
        mask.id = 'full-screen-mask';
        document.body.appendChild(mask);
    })

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



main();