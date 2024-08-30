/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-07-31 00:09:32
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 13:33:48
 * @FilePath: /Auto-delivery-helper/puppeteer/script/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { launch } from 'puppeteer';
import { scriptMap } from '../app';
import { OptionType } from './state';

async function main(state: OptionType) {
    console.log('hollow world , i love you bb');

    const browser = await launch({
        headless: false, // 设置为 false 以启用可视模式
        devtools: true,
        args: ['--disable-web-security', '--allow-file-access-from-files', '--hide-scrollbars', '--enable-gpu'],
        defaultViewport: { width: 1000, height: 800 }
    })


    scriptMap[state.scriptName] && scriptMap[state.scriptName](browser, state);



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
}




export { main }