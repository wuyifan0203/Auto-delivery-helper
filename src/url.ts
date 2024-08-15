/*
 * @Author: wuyifan wuyifan@max-optics.com
 * @Date: 2024-08-06 17:04:58
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-15 01:40:28
 * @FilePath: /Auto-delivery-helper/src/url.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */


enum URL {
    LOGIN = `/wapi/zpuser/wap/getUserInfo.json`,
    GUIDE = `/wapi/zpuser/wap/getSecurityGuideV1`,
    JOB_DETAIL = `/wapi/zpgeek/job/detail.json?`,
    INDEX = `https://www.zhipin.com/`,
    JOB_LIST = `/wapi/zpgeek/search/joblist.json?`,
    QUERY_JOB = `/web/geek/job?`
}

export { URL }