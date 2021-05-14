import contact from './contacts' //存放所有联系人的数据
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state = {
    currentLang: "zh", //当前使用的语言 zh：简体中文 en:英文 后期需要
    newMsgCount: 0, //新消息数量
    contact: contact,
    allContacts: [], //所有联系人
    OfficialAccounts: [], //所有关注的应用号
    currentPageName: "消息", //用于在wx-header组件中显示当前页标题
    headerStatus: true, //显示（true）/隐藏（false）wx-header组件
    tipsStatus: false, //控制首页右上角菜单的显示(true)/隐藏(false)
    apiUrl: {}, // 所有接口地址 后期需要
    msgList: {
        stickMsg: [], //置顶消息列表 后期需要
        baseMsg: []
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})