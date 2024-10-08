/*
 * @Author: wuyifan wuyifan@max-optics.com
 * @Date: 2024-08-06 17:04:58
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 13:41:09
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/url.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { BossGeekOption, JobItem } from "./types";


enum URL {
    LOGIN = `/wapi/zpuser/wap/getUserInfo.json`,
    GUIDE = `/wapi/zpuser/wap/getSecurityGuideV1`,
    JOB_DETAIL = `/wapi/zpgeek/job/detail.json?`,
    INDEX = `https://www.zhipin.com`,
    JOB_LIST = `/wapi/zpgeek/search/joblist.json?`,
    QUERY_JOB = `/web/geek/job?`
}

function generateGeekUrl(geekOption: BossGeekOption) {
    const { salary, scale, stage, position, query, jobType, city, industry, experience, degree } = geekOption;

    const salaryOption = salary.length === 0 ? `` : `&salary=${salary.join(',')}`;
    const scaleOption = scale.length === 0 ? `` : `&scale=${scale.join(',')}`;
    const stageOption = stage.length === 0 ? `` : `&stage=${stage.join(',')}`;
    const positionOption = position.length === 0 ? `` : `&position=${position.join(',')}`;
    const queryOption = `query=${encodeURIComponent(query.trim())}`;
    const jobTypeOption = jobType === -1 ? '' : `&jobType=${jobType}`;
    const cityOption = city.length === 0 ? `` : `&city=${city.join(',')}`;
    const industryOption = industry.length === 0 ? `` : `&industry=${industry.join(',')}`;
    const experienceOption = experience.length === 0 ? `` : `&experience=${experience.join(',')}`;
    const degreeOption = degree.length === 0 ? `` : `&degree=${degree.join(',')}`;

    const url = `${URL.INDEX}${URL.QUERY_JOB}${queryOption}${cityOption}${experienceOption}${degreeOption}${industryOption}${scaleOption}${stageOption}${positionOption}${jobTypeOption}${salaryOption}`;

    return url
}

function generateGetJobDetail(jobItem: JobItem) {
    const { securityId, lid } = jobItem

    const securityIdOption = `securityId=${securityId}`;
    const lidOption = `&lid=${lid}`;

    const url = `${URL.INDEX}${URL.JOB_DETAIL}${securityIdOption}${lidOption}`

    return url.trim();
}


export { URL, generateGeekUrl, generateGetJobDetail }