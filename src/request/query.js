import * as contact from '@/vuex/contacts';
import * as constant from '@/request/constant';

export async function queryUserInfoByView(username) {
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key http://api.shengtai.club/api/v_admin?_where=(username,eq,zhaoziyun)
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_user?_where=(username,eq,${username})`;

    //定义查询结果
    var result = null;

    try {
        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        result = Betools.storage.getStore(`system_v_user_info@username$${username}`);

        if (!(typeof result != 'undefined' && result != null && result != '')) {
            //发送HTTP请求，获取返回值后，设置数据
            var res = await superagent.get(queryURL).set('accept', 'json');
            //设置返回结果
            result = res.body;

            //设置缓存数据，缓存时间，暂定为5秒钟
            Betools.storage.setStore(
                `system_v_user_info@username$${username}`,
                result,
                3600 * 24
            );
        }
    } catch (err) {
        console.log(err);
    }

    //返回查询后的动态数据
    return result;
}

/**
 * @function 查询表字段信息
 * @param {*} tableName
 */
export async function queryTableFieldInfoJSON(tableName) {
    //初始化
    window.tools = window.tools == null ? tools : window.tools;

    try {
        //查询表单信息
        var tableInfo = await queryTableDataByField(
            'v_table_info',
            'id',
            tableName
        );
        //如果信息不为空，则解析表单信息
        if (window.Betools.tools.deNull(tableInfo) != '' && tableInfo.length > 0) {
            try {
                tableInfo = window.Betools.tools.deNull(tableInfo[0]['value']);
            } catch (error) {
                console.log('tabale info :' + tableInfo);
            }
        }
        //如果信息不为空，则进行解析数据
        if (window.Betools.tools.deNull(tableInfo) != '') {
            try {
                tableInfo = JSON.parse(tableInfo);
            } catch (error) {
                console.log('tabale info :' + tableInfo);
            }
        }
    } catch (error) {
        console.log('query table field info json error :' + error);
    }
    return tableInfo;
}

/**
 * @function 查询表字段信息
 * @param {*} tableName
 */
export async function queryTableFieldOrderJSON(tableName) {
    //初始化
    window.tools = window.tools == null ? tools : window.tools;

    try {
        //查询表单信息
        var tableInfo = await queryTableDataByField(
            'v_table_info',
            'id',
            tableName
        );
        //如果信息不为空，则解析表单信息
        if (window.Betools.tools.deNull(tableInfo) != '' && tableInfo.length > 0) {
            try {
                tableInfo = window.Betools.tools.deNull(tableInfo[0]['num']);
            } catch (error) {
                console.log('tabale info :' + tableInfo);
            }
        }
        //如果信息不为空，则进行解析数据
        if (window.Betools.tools.deNull(tableInfo) != '') {
            try {
                tableInfo = JSON.parse(tableInfo);
            } catch (error) {
                console.log('tabale info :' + tableInfo);
            }
        }
    } catch (error) {
        console.log('query table field info json error :' + error);
    }
    return tableInfo;
}


/**
 * 查询数据
 * @param {*} tableName
 * @param {*} foreignKey
 * @param {*} id
 */
export async function queryTableDataByField(tableName, field, value) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(${field},eq,${value})`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryTableData(tableName, id) {

    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}/${id}`;

    try {
        //获取缓存中的数据
        var cache = Betools.storage.getStore(`sys_user_cache@${tableName}&id${id}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            Betools.storage.setStore(`sys_user_cache@${tableName}&id${id}`, res.body[0], 2);
        }

        return res.body[0];
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryTableDataByPid(tableName, id) {

    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(pid,eq,${id})&_sort=create_time`;

    try {
        //获取缓存中的数据
        var cache = Betools.storage.getStore(`sys_user_cache@${tableName}&pid${id}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            Betools.storage.setStore(`sys_user_cache@${tableName}&pid${id}`, res.body, 2);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryRoleGroupList(name, username = '') {

    //大写转小写
    const tableName = 'bs_admin_group';
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(groupname,eq,${name})~and(userlist,like,~${username}~)&_sort=create_time`;

    try {
        //获取缓存中的数据
        var cache = Betools.storage.getStore(`sys_user_cache@${tableName}&groupname${name}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            Betools.storage.setStore(`sys_user_cache@${tableName}&groupname${name}`, res.body, 2);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} mobile
 */
export async function queryUserInfoByMobile(mobile) {

    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/v2/wework_mobile/${mobile}`;

    try {
        //获取缓存中的数据
        var cache = Betools.storage.getStore(`sys_user_cache_mobile_userinfo${mobile}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            console.log(`mobile: ${JSON.stringify(cache)}`);
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            console.log(`mobile: ${JSON.stringify(res.body)}`);
            Betools.storage.setStore(`sys_user_cache_mobile_userinfo${mobile}`, res.body, 3600 * 24 * 7);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryMessages(wxid, wxid_, maxId = 0) {

    //大写转小写
    const tableName = 'bs_message';
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=((team,like,~${wxid},${wxid_}~)~or(team,like,~${wxid_},${wxid}~))&_sort=-id`;

    try {
        //获取缓存中的数据
        var cache = Betools.storage.getStore(`sys_message_cache##v1@${tableName}&wxid${wxid}_wxid_${wxid_}_maxid${maxId}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            Betools.storage.setStore(`sys_message_cache##v1@${tableName}&wxid${wxid}_wxid_${wxid_}_maxid${maxId}`, res.body, 1);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryVMessages(wxid, username, maxId = 0) {

    try {
        //大写转小写
        const tableName = 'v_messages';
        //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
        var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(team,like,~${wxid}~)&_sort=-id&_p=0&_size=100`;
        //获取缓存中的数据
        var cache = Betools.storage.getStore(`sys_message_cache##v2@${tableName}&wxid${wxid}}&maxid${maxId}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {

            for (let item of res.body) {

                item.mid = item.id;
                item.newMsgCount = 1;
                item.quiet = item.quiet == 'true' ? true : false;
                item.read = item.read_ == 'true' ? true : false;
                item.type = 'friend';
                item.heuserid = item.groupid.replace(wxid, '').replace(username, '').replace(/,/g, '');

                const temp = await contact.getUserInfo(item.heuserid);

                //获取聊天对象信息
                item.user = [temp];
                item.msg = [{ text: item.content, date: item.create_time }];

            };

            Betools.storage.setStore(`sys_message_cache##v2@${tableName}&wxid${wxid}}&maxid${maxId}`, res.body, 1);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} whereSQL
 */
export async function queryTableDataByWhereSQL(tableName, whereSQL) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?${whereSQL}`;

    try {

        var res = await superagent.get(queryURL).set('accept', 'json');
        return res.body;

    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} whereSQL
 */
export async function queryMailBySealData(username) {

    const tableName = 'bs_seal_regist';
    const whereSQL = `_where=(create_by,eq,${username})~and(deal_mail,like,~@~)&_p=0&_size=1`;

    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?${whereSQL}`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        return res.body[0];
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} whereSQL
 */
export async function queryFrontBySealData(username) {

    const tableName = 'bs_seal_regist';
    const whereSQL = `_where=(create_by,eq,${username})~and(seal_type,eq,合同类)&_p=0&_size=1`;

    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?${whereSQL}`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        return res.body[0];
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} whereSQL
 */
export async function queryUserInfoByAccount(userid) {

    if (Betools.tools.isNull(userid)) {
        return {};
    }

    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/v2/queryemployee/${userid}`;

    //获取缓存中的数据
    var cache = Betools.storage.getStore(`sys_user_cache_account#queryemployee#@${userid}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {

        var res = await queryTableDataByField('bs_hrmresource', 'loginid', userid); // await superagent.get(queryURL).set('accept', 'json');

        if (res != null && res.length > 0) {
            Betools.storage.setStore(`sys_user_cache_account#queryemployee#@${userid}`, res[0], 3600 * 24 * 31);
            return res[0];
        } else if (!Betools.tools.isNull(res.text)) {
            Betools.storage.setStore(`sys_user_cache_account#queryemployee#@${userid}`, res.text, 3600 * 24 * 31);
            return JSON.parse(res.text);
        }

    } catch (err) {
        console.log(err);
    }
}

/**
 * @function 企业微信查询登录用户函数
 */
export async function queryWeworkUser() {

    let userinfo = null;
    let response = null;

    try {
        //获取用户CODE
        let code = Betools.tools.queryUrlString('code', 'search');
        let system_type = Betools.tools.queryUrlString('system_type', 'history');

        //获取用户信息
        if (code) {

            //获取缓存中的数据
            var cache = Betools.storage.getStore(`sys_wework_user_code#wework_user_code#@${code}`);

            //返回缓存值
            if (typeof cache != 'undefined' && cache != null && cache != '') {
                return cache;
            }

            try {
                response = await superagent.get(`https://api.yunwisdom.club:30443/api/${system_type}/wework_user_code/${code}`);
                userinfo = response && response.body && response.body.userinfo && response.body.userinfo.errcode == 0 ? response.body.userinfo : null;
            } catch (error) {
                console.log(error);
            }

            //设置system_userinfo
            Betools.storage.setStore('system_linfo', JSON.stringify({ username: response.body.userinfo.userid, password: '************' }), 3600 * 24 * 30);
            Betools.storage.setStore('system_userinfo', JSON.stringify(response.body.userinfo), 3600 * 24 * 30);
            Betools.storage.setStore('system_token', JSON.stringify(code), 3600 * 24 * 30);
            Betools.storage.setStore('system_department', JSON.stringify(response.body.userinfo.department), 3600 * 24 * 30);
            Betools.storage.setStore('system_login_time', dayjs().format('YYYY-MM-DD HH:mm:ss'), 3600 * 24 * 30);
            Betools.storage.setStore(`sys_wework_user_code#wework_user_code#@${code}`, JSON.stringify(userinfo), 3600 * 24 * 30);

        } else {
            userinfo = Betools.storage.getStore('system_userinfo');
        }

        return userinfo;
    } catch (error) {
        console.log(error);
    }
}


/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessLogByUserName(tableName, username) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(table_name,eq,${tableName})~and(business_code,eq,000000000)~and(employee,eq,${username})&_sort=-operate_time`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessLogHistoryByUserName(tableName, username) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_history?_where=(table_name,eq,${tableName})~and(business_code,eq,000000000)~and(employee,eq,${username})&_sort=-operate_time`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 添加数据
 * @param {*} tableName
 * @param {*} id
 */
export async function deleteTableData(tableName, id) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //Post数据的URL地址
    var deleteURL = `${window.requestAPIConfig.restapi}/api/${tableName}/${id}`;

    try {
        var res = await superagent.delete(deleteURL).set('accept', 'json');
        return res.body;
    } catch (err) {
        console.log(err);
    }

}

/**
 * 获取诉讼案件月度/季度报表
 */
export async function queryRewardDataByID(period) {

    //提交URL
    var queryURL = `${constant.REQUEST_API_CONFIG.restapi}/api/v_reward_data?_where=(period,like,${period})&_sort=amount&_p=0&_size=1000`;

    //获取缓存中的数据
    var cache = Betools.storage.getStore(`sys_v_reward_data&id${period}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {
            Betools.storage.setStore(`sys_v_reward_data&id${period}`, res.body, 60);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }

}