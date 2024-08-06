/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2024-08-06 00:23:30
 * @LastEditors: wuyifan wuyifan@max-optics.com
 * @LastEditTime: 2024-08-06 17:25:01
 * @FilePath: /Auto-delivery-helper/src/action.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

const state = {
    isLogin: false,
};

interface RequestBody {
    code: number;
    message?: string;
    zpData: any;
}

const action = {
    login(request:RequestBody) {
        const { code } = request;
        state.isLogin = code === 0;
    }

}