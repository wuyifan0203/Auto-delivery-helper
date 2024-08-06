/*
 * @Author: wuyifan wuyifan@max-optics.com
 * @Date: 2024-08-06 17:04:58
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-06 23:40:32
 * @FilePath: /Auto-delivery-helper/src/url.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */


const BASE_URL = 'https://www.zhipin.com'
enum URL {
    LOGIN = `${BASE_URL}/wapi/zpuser/wap/getUserInfo.json`,
    GUIDE = `${BASE_URL}/wapi/zpuser/wap/getSecurityGuideV1`
}

export { BASE_URL, URL }