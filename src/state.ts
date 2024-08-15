const state = {
    isLogin: true,
    totalTime: 1000,
    queryTimes: 0,
    searchJobName: 'SAP业务顾问',
    jobNameExclusionKeys: ['英语', '英文', '日语', '日本', 'SAP FICO', 'ERP', '金蝶', '用友', 'CRM', 'EHR', 'Sass', 'SRM', '财务'].map(item => item.toUpperCase()),
    jobNameAliveKeys: ['FICO', 'WMS', 'WM'],
    jobNameInclusionKeys: ['MM', 'SP'],
    excludeHunter: true,

    jobList: [] as any[]


};


export { state };