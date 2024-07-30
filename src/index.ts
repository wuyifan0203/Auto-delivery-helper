/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-07-31 00:09:32
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-07-31 00:29:54
 * @FilePath: /Auto-delivery-helper/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { launch } from 'puppeteer';

async function main() {
    console.log('hollow world , i love you');

    const browser = await launch({
        headless: false, // 设置为 false 以启用可视模式
        args: ['--disable-web-security', '--allow-file-access-from-files', '--hide-scrollbars', '--enable-gpu'],
    })
    console.log(browser);

    const pages = await browser.pages();

}

main();