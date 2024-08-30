/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-13 17:41:39
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-30 13:31:04
 * @FilePath: /Auto-delivery-helper/puppeteer/app/boss/enum.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

enum BOSS_ACTIVE_STATE {
     '刚刚活跃' = 'JUST_ACTIVE',
     '今日活跃' = 'ACTIVE_TODAY',
     '3日内活跃' = 'ACTIVE_WITHIN_3_DAYS',
     '7日内活跃' = 'ACTIVE_WITHIN_7_DAYS',
     '本月内活跃' = 'ACTIVE_WITHIN_THIS_MONTH',
     '3月内活跃' = 'ACTIVE_IN_3_MONTHS'
}

export { BOSS_ACTIVE_STATE }