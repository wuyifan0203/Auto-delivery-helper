/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 13:52:30
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-09-02 10:31:15
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/state.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BossState } from "./types";


const state: BossState = {
    isLogin: false,
    jobList: [], // length为符合条件的职位数量
    totalCount: 0, // 总查询数量
    currentCount: 0, // 当前查询数量
    targetCount: 0, // 目标查询数量
    untreatedJobList: [],
    descriptionInclusionKeys: [],
    descriptionExclusionKeys: [],
}

export { state }