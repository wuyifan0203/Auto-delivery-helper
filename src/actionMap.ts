import { action } from "./action";
import { URL } from "./url";

const actionMap = {
    [URL.LOGIN]: action.login,
    [URL.GUIDE]: action.guide,
}

export { actionMap } 