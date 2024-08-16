/*
 * @Author: wuyifan wuyifan@max-optics.com
 * @Date: 2024-08-06 17:04:58
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-16 14:47:07
 * @FilePath: /Auto-delivery-helper/src/url.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { GeekOption, JobItem } from "./state";


enum URL {
    LOGIN = `/wapi/zpuser/wap/getUserInfo.json`,
    GUIDE = `/wapi/zpuser/wap/getSecurityGuideV1`,
    JOB_DETAIL = `/wapi/zpgeek/job/detail.json?`,
    INDEX = `https://www.zhipin.com`,
    JOB_LIST = `/wapi/zpgeek/search/joblist.json?`,
    QUERY_JOB = `/web/geek/job?`
}

function generateGeekUrl(geekOption: GeekOption) {
    const { salary, scale, stage, position, query, jobType, city, industry, experience, degree } = geekOption;

    const salaryOption = salary.length === 0 ? `` : `&salary=${salary.join(',')}`;
    const scaleOption = scale.length === 0 ? `` : `&scale=${scale.join(',')}`;
    const stageOption = stage.length === 0 ? `` : `&stage=${stage.join(',')}`;
    const positionOption = position.length === 0 ? `` : `&position=${position.join(',')}`;
    const queryOption = `query=${query}`;
    const jobTypeOption = jobType === -1 ? '' : `&jobType=${jobType}`;
    const cityOption = city.length === 0 ? `` : `&city=${city.join(',')}`;
    const industryOption = industry.length === 0 ? `` : `&industry=${industry.join(',')}`;
    const experienceOption = experience.length === 0 ? `` : `&experience=${experience.join(',')}`;
    const degreeOption = degree.length === 0 ? `` : `&degree=${degree.join(',')}`;

    const url = `${URL.INDEX}${URL.QUERY_JOB}${queryOption}${cityOption}${experienceOption}${degreeOption}${industryOption}${scaleOption}${stageOption}${positionOption}${jobTypeOption}${salaryOption}`;

    return encodeURIComponent(url.trim())
}

function generateGetJobDetail(jobItem: JobItem) {
    const { securityId, lid } = jobItem

    const securityIdOption = `securityId=${securityId}`;
    const lidOption = `&lid=${lid}`;

    const url = `${URL.INDEX}${URL.JOB_DETAIL}${securityIdOption}${lidOption}`

    return encodeURIComponent(url.trim());
}

export { URL, generateGeekUrl, generateGetJobDetail }