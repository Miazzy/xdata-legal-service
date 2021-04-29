const mutations = {
    //切换语言 后期需要
    switchLang(state, lang) {
        state.currentLang = lang
        Vue.config.lang = lang
        document.cookie = "VR_LANG=" + lang + "; path=/;domain=.snail.com"
    },
    //设置当前页面名字
    setPageName(state, name) {
        state.currentPageName = name
    },
    //当 search 组件全屏/非全屏时 切换公共头部状态
    toggleHeaderStatus(state, status) {
        state.headerStatus = status
    },
    //切换“微信”页中右上角菜单
    toggleTipsStatus(state, status) {
        if (status == -1) {
            state.tipsStatus = false
        } else {
            state.tipsStatus = !state.tipsStatus
        }
    },
    //增加未读消息数
    addNewMsg(state) {
        state.newMsgCount > 99 ? state.newMsgCount = "99+" : state.newMsgCount++
    },
    //减少未读消息数
    minusNewMsg(state) {
        state.newMsgCount < 1 ? state.newMsgCount = 0 : state.newMsgCount--
    },
    //将消息置顶 待完成
    setMsgStick(state, mid) {

    },
    //取消置顶消息 待完成
    cancelMsgStick(state, mid) {

    },
    // 将联系人根据首字母进行分类
    contactsInitialList: async(state) => {
        var initialList = [];
        var allContacts = await state.contact.queryContacts();
        var max = allContacts.length;
        state.contact = allContacts;
        for (var i = 0; i < max; i++) {
            if (initialList.indexOf(allContacts[i].initial.toUpperCase()) == -1) {
                initialList.push(allContacts[i].initial.toUpperCase());
            }
        }
        return initialList.sort();
    },
    // 将联系人根据首字母进行分类
    contactsList: async(state, getters) => {
        var initialList = [];
        var allContacts = await state.contact.queryContacts();
        var max = allContacts.length;
        state.contact = allContacts;
        for (var i = 0; i < getters.contactsInitialList.length; i++) {
            var protoTypeName = getters.contactsInitialList[i];
            contactsList[protoTypeName] = [];
            for (var j = 0; j < max; j++) {
                if (allContacts[j].initial.toUpperCase() === protoTypeName) {
                    contactsList[protoTypeName].push(allContacts[j]);
                }
            }
        }
        return contactsList;
    },
}
export default mutations