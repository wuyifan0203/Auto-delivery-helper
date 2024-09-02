/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-30 13:38:15
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-09-02 10:32:20
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/types.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
interface GeekOption {
    query: string;
    city: number[];
    degree: number[];
    experience: number[];
    industry: number[];
    scale: number[];
    stage: number[];
    position: number[];
    jobType: number,
    salary: number[]
}

interface JobItem {
    securityId: string;
    jobName: string;
    goldHunter: number;
    lid: string;
    itemId: string;
    [key: string]: any
}

interface BossState {
    isLogin: boolean;
    jobList: JobItem[];
    totalCount:number;
    targetCount:number;
    untreatedJobList: JobItem[];
    currentCount: number;
    [key: string]: any
}

export { GeekOption as BossGeekOption, JobItem, BossState };