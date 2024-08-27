<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-08-27 16:17:29
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-08-28 01:11:55
 * @FilePath: /Auto-delivery-helper/src/components/Query.vue
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <el-form class="form">
        <el-form-item label="Search Job Name">
            <el-input v-model="geekOption.query" clearable />
        </el-form-item>
        <el-form-item label="City">
            <el-cascader :props="cascaderProps" :options="site" v-model="geekOption.city" :show-all-levels="false"
                clearable />
        </el-form-item>
        <el-form-item label="Salary">
            <el-select v-model="geekOption.salary" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
                style="width: 240px">
                <el-option v-for="item in condition.salaryList" :key="item.code" :label="item.name"
                    :value="item.code" />
            </el-select>
        </el-form-item>
        <el-form-item label="Experience">
            <el-select v-model="geekOption.experience" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
                style="width: 240px">
                <el-option v-for="item in condition.experienceList" :key="item.code" :label="item.name"
                    :value="item.code" />
            </el-select>
        </el-form-item>
        <el-form-item label="Degrees">
            <el-select v-model="geekOption.degree" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
                clearable style="width: 240px">
                <el-option v-for="item in condition.degreeList" :key="item.code" :label="item.name"
                    :value="item.code" />
            </el-select>
        </el-form-item>
        <el-form-item label="Industry">
            <el-cascader :props="cascaderProps" :options="industryOptions" v-model="geekOption.industry"
                :show-all-levels="false" clearable />
        </el-form-item>
        <el-form-item label="Company Scale">
            <el-select v-model="geekOption.scale" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
                style="width: 240px">
                <el-option v-for="item in condition.scaleList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
        </el-form-item>
        <el-form-item label="Company Stage">
            <el-select v-model="geekOption.stage" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
                style="width: 240px">
                <el-option v-for="item in condition.stageList" :key="item.code" :label="item.name" :value="item.code" />
            </el-select>
        </el-form-item>
        <el-form-item label="Job Type">
            <el-select v-model="geekOption.jobType" placeholder="Select" style="width: 240px">
                <el-option v-for="item in condition.jobTypeList" :key="item.code" :label="item.name"
                    :value="item.code" />
            </el-select>
        </el-form-item>
        <el-button @click="submit">Submit</el-button>
    </el-form>
</template>

<script lang="ts" setup>
import { Reactive, reactive } from 'vue'
import { ElCascader, ElForm, ElFormItem, CascaderProps, ElInput, ElButton, ElSelect, ElOption, CascaderOption } from 'element-plus';
import { site, condition, industry } from '../../script/responseData';
import { GeekOption } from '../../script/state';
import { cloneDeep } from 'lodash-es'

const industryOptions = industry as unknown as CascaderOption[];

const geekOption: Reactive<GeekOption> = reactive({
    city: [101020100],
    salary: [405],
    experience: [104, 105],
    industry: [],
    query: 'SAP MM',
    degree: [],
    jobType: 0,
    scale: [],
    stage: [],
    position: [],
})

const cascaderProps: CascaderProps = {
    multiple: true,
    label: 'name',
    value: 'code',
    children: 'subLevelModelList',
    emitPath: false
}

const submit = async () => {
    console.log(geekOption);
    await window.ipcRenderer.invoke('submit-query', cloneDeep(geekOption))
}
</script>
<style scoped>
.form {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
    margin: 0 auto;
    margin-top: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>