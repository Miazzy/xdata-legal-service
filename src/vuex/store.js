//import Vue from 'vue'
//import Vuex from 'vuex'
import OfficialAccounts from "./official-account" //存放所有关注的应用号
import contact from './contacts' //存放所有联系人的数据
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

// 统一管理接口域名
let apiPublicDomain = '//vrapi.snail.com/';

const state = {
    currentLang: "zh", //当前使用的语言 zh：简体中文 en:英文 后期需要
    newMsgCount: 0, //新消息数量
    contact: contact,
    allContacts: [], //所有联系人
    OfficialAccounts: OfficialAccounts, //所有关注的应用号
    currentPageName: "消息", //用于在wx-header组件中显示当前页标题
    //backPageName: "", //用于在返回按钮出 显示前一页名字 已遗弃
    headerStatus: true, //显示（true）/隐藏（false）wx-header组件
    tipsStatus: false, //控制首页右上角菜单的显示(true)/隐藏(false)
    // 所有接口地址 后期需要
    apiUrl: {
        demo: apiPublicDomain + ""
    },
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