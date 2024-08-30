/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-26 17:03:54
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 17:52:58
 * @FilePath: /Auto-delivery-helper/puppeteer/script/state.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { BossGeekOption } from '../app/boss/types'
const state = {
    isLogin: true,
    totalTime: 1000,
    queryTimes: 0,
    searchJobName: 'SAP业务顾问',
    jobNameExclusionKeys: ['英语', '英文', '日语', '日本', 'SAP FICO', 'ERP', '金蝶', '用友', 'CRM', 'EHR', 'Sass', 'SRM', '财务'].map(item => item.toUpperCase()),
    descriptionInclusionKeys: ['MM', 'SP'],
    descriptionExclusionKeys: ['日语', '英语', 'ERP', '用友', 'SASS', '财务'],
    excludeHunter: true,

    totalCount: 0,
    handelCount: 0,


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
    } as BossGeekOption


};


type OptionType = {
    scriptName: 'boss' | '51job',
    geekOption: BossGeekOption,
    descriptionExclusionKeys: string[],
    descriptionInclusionKeys: string[],
    jobNameExclusionKeys: string[],
    targetCount: number,
    [key: string]: any
}


export { state, OptionType };