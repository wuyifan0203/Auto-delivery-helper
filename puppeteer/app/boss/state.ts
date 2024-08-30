import { OptionType } from "../../script/state";
import { BossState } from "./types";


const state: BossState = {
    isLogin: false,
    jobList: [],
    totalCount: 0,
    currentCount: 0,
    untreatedJobList: [],
    descriptionInclusionKeys: [],
    descriptionExclusionKeys: [],
}

export { state }