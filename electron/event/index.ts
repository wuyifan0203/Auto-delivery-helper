/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 13:40:01
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-28 01:14:33
 * @FilePath: /Auto-delivery-helper/electron/event/index.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserWindow, ipcMain } from 'electron';
import { main } from '../../puppeteer/script';

const syncActions = {
    'testSync': (...args: any[]) => {
        console.log('testSync', args);
    }
};

const asyncActions = {
    'runScript': (event: Electron.IpcMainEvent, window: BrowserWindow, ...args: any[]) => {
        return new Promise(async(resolve, reject) => {
            console.log('runScript', args);
            console.log(window);
            console.log(event);

            await main();
            resolve(args);
        })
    },
    'testAsync': (event: Electron.IpcMainEvent, window: BrowserWindow, ...args: any[]) => {
        new Promise((resolve, reject) => {
            console.log('testAsync', args);
            window.webContents.send('testAsync', 'Hello from main process!');
            resolve({ msg: 'Hello from main process!' });
        })
    },
    'submit-query':(evt,win,msg)=>{
        new Promise((resolve, reject) => {
            console.log('submit-query', msg);
            resolve(true);

        })
    }
}


export default () => {
    // 动态注册同步处理函数
    Object.keys(syncActions).forEach(action => {
        ipcMain.on(action, (event, ...args) => {
            const result = syncActions[action](...args);
            event.returnValue = result; // 同步返回结果
        });
    });

    // 动态注册异步处理函数
    Object.keys(asyncActions).forEach(action => {
        ipcMain.handle(action, (event, ...args) => {
            const window = BrowserWindow.fromWebContents(event.sender);
            return asyncActions[action](event, window, ...args);
        });
    });
}

