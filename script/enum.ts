/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-13 17:41:39
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-08-15 10:57:00
 * @FilePath: /Auto-delivery-helper/src/enum.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

enum JOB_EXPERIENCE {
     '经验不限' = 'EXPERIENCE_UNLIMITED',
     '在校/应届' = 'EXPERIENCE_STUDENT',
     '1-3年' = 'EXPERIENCE_1_3_YEARS',
     '3-5年' = 'EXPERIENCE_3_5_YEARS',
     '5-10年' = 'EXPERIENCE_5_10_YEARS',
}

enum BOSS_ACTIVE_STATE {
     '刚刚活跃' = 'JUST_ACTIVE',
     '今日活跃' = 'ACTIVE_TODAY',
     '3日内活跃' = 'ACTIVE_WITHIN_3_DAYS',
     '7日内活跃' = 'ACTIVE_WITHIN_7_DAYS',
     '本月内活跃' = 'ACTIVE_WITHIN_THIS_MONTH',
     '3月内活跃' = 'ACTIVE_IN_3_MONTHS'
}

enum JOB_DEGREE {
     '学历不限' = 'EDUCATION_UNLIMITED',
     '大专' = 'EDUCATION_JUNIOR_COLLEGE',
     '本科' = 'EDUCATION_BACHELOR_DEGREE',
     '硕士' = 'EDUCATION_MASTER_DEGREE',
     '博士' = 'EDUCATION_DOCTORATE'
}

enum STAFF_SIZE {
     '0-20人' = 'STAFF_SIZE_0_20',
     '20-99人' = 'STAFF_SIZE_20_99',
     '100-499人' = 'STAFF_SIZE_100_499',
     '500-999人' = 'STAFF_SIZE_500_999',
     '1000-9999人' = 'STAFF_SIZE_1000_9999',
     '10000人以上' = 'STAFF_SIZE_10000_PLUS'
}

enum CITY {

}

enum SALARY {

}

export { BOSS_ACTIVE_STATE }