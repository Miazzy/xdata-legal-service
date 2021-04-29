/** * wxid-微信id * initial-姓名首字母 * headerUrl-头像地址 * nickname-昵称 * sex-性别 男1女0 * remark-备注 * signature-个性签名 * telphone-电话号码 * album-相册 * area-地区 * from-来源 * desc-描述 */
const contact = { contacts: null };

export default contact;
export const ALL_USER_CACHE_KEY = 'ALL_USER_CACHE_KEY_V10';
export const ALL_USER_CACHE_WORK_KEY = 'ALL_USER_CACHE_WORK_KEY_V10';
export const ALL_USER_CACHE_DEPART_KEY = 'ALL_USER_CACHE_DEPART_KEY_V10';

/**
 * 查询审批处理页面的记录
 */
export const queryDepartUserList = async() => {

    //获取当前登录用户信息
    const userinfo = await Betools.storage.getStore('system_userinfo');
    const system_type = Betools.tools.queryUrlString('system_type', 'history');

    //如果没有获取到用户数据，则无法获取部门信息
    if (Betools.tools.isNull(userinfo) || Betools.tools.isNull(userinfo.main_department)) {
        return { records: [], total: 0 };
    }

    //获取部门信息
    const departID = userinfo.main_department;

    const cache = await Betools.storage.getStoreDB(ALL_USER_CACHE_DEPART_KEY + '#depart_id#' + departID);

    if (!Betools.tools.isNull(cache)) {
        return cache;
    }

    //查询部门URL
    const queryDepartURL = `https://api.yunwisdom.club:30443/api/${system_type}/wework_depart_list/${userinfo.main_department}`;

    //获取上级部门编号
    const respDepart = await superagent.get(queryDepartURL).set('accept', 'json');

    //获取部门信息
    const department = respDepart.body.department.find(item => {
        return item.id = userinfo.main_department;
    });

    //查询URL
    const queryURL = `${window.requestAPIConfig.restapi}/api/${system_type}/wework_depart_user/${department.parentid}/1`

    var result = {};

    try {

        var res = await superagent.get(queryURL).set('accept', 'json');

        //遍历并设置属性
        window.__.each(res.body.userlist, item => {
            try {
                item['wxid'] = item['userid'];
            } catch (error) {
                console.log(error);
            }
            try {
                item["initial"] = item['name'].slice(0, 1).toLowerCase();
            } catch (error) {
                console.log(error);
            }
            try {
                if (Betools.tools.isNull(item.avatar)) {
                    item["headerUrl"] = "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/images/icon-manage-16.png";
                } else {
                    item['headerUrl'] = window._CONFIG['uploaxURL'] + '/' + item.avatar;
                }
            } catch (error) {
                console.log(error);
            }
            try {
                item["nickname"] = item['name'];
            } catch (error) {
                console.log(error);
            }
            try {
                item["remark"] = item['name'];
            } catch (error) {
                console.log(error);
            }
            item["signature"] = "";
            item["album"] = [{
                imgSrc: ""
            }];
            item["area"] = ["中国", "四川", "成都"];
            item["from"] = "通过企业联系人添加";
            item["tag"] = "";
            item["desc"] = {
                "title": "",
                "picUrl": ""
            }
            item['status'] = '1';
            item['orgCode'] = '';
            item['updateBy'] = '';
            item['createTime'] = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            item['createBy'] = 'admin';
            item['workNo'] = '';
            item['delFlag'] = '0';
            item['status_dictText'] = '';
            item['birthday'] = Betools.tools.formatDate(item['birthday'], 'yyyy-MM-dd');
            item['updateTime'] = item['createTime'];
            item['telephone'] = item['phone'];
            item['activitiSync'] = '';
            item['sex'] = '1';
            item['sex_dictText'] = '';
        });

        result.records = res.body.userlist;
        result.total = res.body.userlist.length;

        Betools.storage.setStoreDB(ALL_USER_CACHE_DEPART_KEY + '#depart_id#' + departID, result, 3600 * 24 * 3);

        return result;

    } catch (err) {
        console.log(err);
    }

}

/**
 * 查询审批处理页面的记录
 */
export const queryWorkUserList = async() => {

    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v3/employee`;
    var result = {};

    const cache = await Betools.storage.getStoreDB(ALL_USER_CACHE_WORK_KEY);

    if (!Betools.tools.isNull(cache)) {
        return cache;
    }

    try {

        var res = await superagent.get(queryURL).set('accept', 'json');

        //遍历并设置属性
        window.__.each(res.body, item => {
            try {
                item['wxid'] = item['username'];
            } catch (error) {
                console.log(error);
            }
            try {
                item["initial"] = item['username'].slice(0, 1).toLowerCase();
            } catch (error) {
                console.log(error);
            }
            try {
                if (Betools.tools.isNull(item.avatar)) {
                    item["headerUrl"] = "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/images/icon-manage-16.png";
                } else {
                    item['headerUrl'] = window._CONFIG['uploaxURL'] + '/' + item.avatar;
                }
            } catch (error) {
                console.log(error);
            }
            try {
                item["nickname"] = item['realname'];
            } catch (error) {
                console.log(error);
            }
            try {
                item["remark"] = item['realname'];
            } catch (error) {
                console.log(error);
            }
            item["signature"] = "";
            item["album"] = [{
                imgSrc: ""
            }];
            item["area"] = ["中国", "四川", "成都"];
            item["from"] = "通过企业联系人添加";
            item["tag"] = "";
            item["desc"] = {
                "title": "",
                "picUrl": ""
            }
            item['status'] = '1';
            item['orgCode'] = '';
            item['updateBy'] = '';
            item['createTime'] = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            item['createBy'] = 'admin';
            item['workNo'] = '';
            item['delFlag'] = '0';
            item['status_dictText'] = '';
            item['birthday'] = Betools.tools.formatDate(item['birthday'], 'yyyy-MM-dd');
            item['updateTime'] = item['createTime'];
            item['telephone'] = item['phone'];
            item['activitiSync'] = '';
            item['sex'] = '1';
            item['sex_dictText'] = '';
        });

        result.records = res.body;
        result.total = res.body.length;

        Betools.storage.setStoreDB(ALL_USER_CACHE_WORK_KEY, result, 3600 * 24 * 3);

        return result;

    } catch (err) {
        console.log(err);
    }

}

/**
 * 查询审批处理页面的记录
 */
export const queryUserList = async(params) => {

    //pageNo从0开始计算
    params.pageNo = params.pageNo - 1;

    //用户名称
    var whereFlag =
        Betools.tools.deNull(params.username) == '' ?
        '' :
        `_where=(username,like,~${params.username}~)~or(realname,like,~${params.username}~)&`;

    //获取排序标识，升序 ‘’ ， 降序 ‘-’
    var ascFlag = params.order == 'asc' ? '' : '-';

    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_user?${whereFlag}_p=${params.pageNo}&_size=${params.pageSize}&_sort=${ascFlag}${params.column}`;
    var queryCountURL = `${window.requestAPIConfig.restapi}/api/v_user/count?${whereFlag}`;
    var result = {};

    try {

        var res = await superagent.get(queryURL).set('accept', 'json');
        var count = await superagent.get(queryCountURL).set('accept', 'json');
        console.log(res);

        //遍历并设置属性
        window.__.each(res.body, item => {
            try {
                item['wxid'] = item['username'];
            } catch (error) {
                console.log(error);
            }
            try {
                item["initial"] = item['username'].slice(0, 1).toLowerCase();
            } catch (error) {
                console.log(error);
            }
            try {
                if (Betools.tools.isNull(item.avatar)) {
                    item["headerUrl"] = "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/images/icon-manage-16.png";
                } else {
                    item['headerUrl'] = window._CONFIG['uploaxURL'] + '/' + item.avatar;
                }
            } catch (error) {
                console.log(error);
            }
            try {
                item["nickname"] = item['realname'];
            } catch (error) {
                console.log(error);
            }
            try {
                item["remark"] = item['realname'];
            } catch (error) {
                console.log(error);
            }
            item["signature"] = "";
            item["album"] = [{
                imgSrc: ""
            }];
            item["area"] = ["中国", "四川", "成都"];
            item["from"] = "通过企业联系人添加";
            item["tag"] = "";
            item["desc"] = {
                "title": "",
                "picUrl": ""
            }
            item['status'] = '1';
            item['orgCode'] = '';
            item['updateBy'] = '';
            item['createTime'] = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            item['createBy'] = 'admin';
            item['workNo'] = '';
            item['delFlag'] = '0';
            item['status_dictText'] = '';
            item['birthday'] = Betools.tools.formatDate(item['birthday'], 'yyyy-MM-dd');
            item['updateTime'] = item['createTime'];
            item['telephone'] = item['phone'];
            item['activitiSync'] = '';
            item['sex'] = '1';
            item['sex_dictText'] = '';
        });

        result.records = res.body;
        result.total =
            count.body[0].no_of_rows <= params.pageSize ?
            res.body.length :
            count.body[0].no_of_rows;

        return result;

    } catch (err) {
        console.log(err);
    }

}

export const queryContacts = async() => {
    //获取当前登录用户信息
    const userinfo = await Betools.storage.getStore('system_userinfo');

    var all = [];
    var count = 0;
    var cache = await Betools.storage.getStoreDB(ALL_USER_CACHE_KEY + '#depart#' + userinfo.main_department);

    if (Betools.tools.isNull(cache) || cache.length <= 0) {
        let userlist = await queryDepartUserList();
        userlist = userlist.records;
        count = userlist.total;
        if (!(Betools.tools.isNull(userlist) || userlist.length <= 0)) {
            all = [...all, ...userlist];
        }
        Betools.storage.setStoreDB(ALL_USER_CACHE_KEY + '#depart#' + userinfo.main_department, all, 3600 * 24);
    } else {
        all = cache;
    }

    return all;
}

export const getUserInfo = async(wxid) => {

    //获取当前登录用户信息
    const userinfo = await Betools.storage.getStore('system_userinfo');

    if (!wxid || !userinfo) {
        return;
    } else {

        //从缓存中查询数据
        var contacts = await Betools.storage.getStoreDB(ALL_USER_CACHE_KEY + '#depart#' + userinfo.main_department);
        for (var index in contacts) {
            if (contacts[index].wxid == wxid) {
                return contacts[index]
            }
        }

        //如果没有从缓存数据库中查询处理，则查询服务器
        return await getUserInfoByWxid(wxid);

    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function getUserInfoByWxid(wxid) {

    window.userMap = new Map();

    const key = `contacts_cache_wxid${wxid}`;

    if (Betools.tools.isNull(wxid) || wxid.startsWith('wxid')) {
        return {};
    }

    //如果没有查询到，则直接查询远程服务器
    var queryURL = `${window.requestAPIConfig.restapi}/api/v2/wework_user/${wxid}`;

    try {
        //获取缓存中的数据
        var cache = (await Betools.storage.getStoreDB(`contacts_cache_wxid${wxid}`)) || window.userMap.get(key);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null) {
            window.userMap.set(key, res.body);
            await Betools.storage.setStoreDB(key, res.body, 3600 * 24);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

contact.getUserInfo = getUserInfo;