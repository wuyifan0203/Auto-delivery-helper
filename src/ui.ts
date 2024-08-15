/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-14 17:23:21
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-15 09:39:55
 * @FilePath: /Auto-delivery-helper/src/ui.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Page } from "puppeteer";
import { load } from 'cheerio';


function addMesh() {
    const mask = document.createElement('div');
    mask.style.position = 'none';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    mask.style.zIndex = '9999';
    mask.id = 'full-screen-mask';
    mask.innerText = '脚本执行时,请勿关闭浏览器窗口！';
    mask.style.color = 'white';
    mask.style.fontSize = '20px';
    document.body.appendChild(mask);
}

async function showMask(page: Page) {
    let mask = await page.$('#full-screen-mask');
    if (mask) {
        await page.evaluate((element) => {
            const ele = element as HTMLElement;
            ele.style.display = 'fixed';
        }, mask);
    } else {
        await page.evaluate(addMesh);
        mask = await page.$('#full-screen-mask');
        await page.evaluate((element) => {
            const ele = element as HTMLElement;
            ele.style.display = 'fixed';
        }, mask);
    }
}

async function hideMask(page: Page) {
    let mask = await page.$('#full-screen-mask');
    if (mask) {
        await page.evaluate((element) => {
            const ele = element as HTMLElement;
            ele.style.display = 'none';
        }, mask);
    }
}

function parseHTML(html: string) {
    const $ = load(html);

    return {
        queryText(selector: string) {
            return $(selector).text();
        },
        querySrc(selector: string) {
            return $(selector).attr('src');
        },
        queryHref(selector: string) {
            return $(selector).attr('href');
        }
    }
}

export { parseHTML, hideMask, showMask }