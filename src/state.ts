/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-16 11:22:20
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-19 01:18:11
 * @FilePath: /Auto-delivery-helper/src/state.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
const state = {
    isLogin: true,
    totalTime: 1000,
    queryTimes: 0,
    searchJobName: 'SAP业务顾问',
    jobNameExclusionKeys: ['英语', '英文', '日语', '日本', 'SAP FICO', 'ERP', '金蝶', '用友', 'CRM', 'EHR', 'Sass', 'SRM', '财务'].map(item => item.toUpperCase()),
    descriptionInclusionKeys: ['MM', 'SP'],
    descriptionExclusionKeys:['日语','英语','ERP','用友','SASS','财务'],
    excludeHunter: true,

    jobList: [] as JobItem[],
    geekOption: {
        query: '',
        city: [],
        degree: [],
        experience: [],
        industry: [],
        scale: [],
        stage: [],
        position: [],
        jobType: -1,
        salary: []
    } as GeekOption


};

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


export { state, GeekOption, JobItem };