/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 16:09:30
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 16:33:13
 * @FilePath: /Auto-delivery-helper/puppeteer/entry.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BossGeekOption } from './app/boss/types';
import { main } from './script';
import { OptionType } from './script/state';

const geekOption: BossGeekOption = {
    city: [101020100],
    query: 'SAP实施顾问',
    degree: [],
    industry: [],
    experience: [104, 105],
    scale: [],
    stage: [],
    salary: [405],
    position: [],
    jobType: 1901
}

const state: OptionType = {
    geekOption,
    scriptName: 'boss',
    jobNameExclusionKeys: [],
    descriptionExclusionKeys: [],
    descriptionInclusionKeys: [],
    targetCount: 50
}

main(state);