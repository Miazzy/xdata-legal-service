/**
 * @function 查询当前自由流程业务
 * @param {*} id
 * @param {*} tools
 */
export async function queryCurFreeWorkflow(id) {

    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/bs_free_process?_where=(main_key,eq,${id})&_sort=-create_time`;

    //根据业务编号，查询业务数据
    var wflow = [];

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);

        //如果只有一条数据，则返回[]；如果有多条数据，则返回多个数据
        if (
            typeof res.body == 'undefined' ||
            res.body == null ||
            res.body == '' ||
            res.body.length == 0
        ) {
            wflow = null;
        } else if (res.body.length >= 1) {
            wflow = res.body[0];
        }
    } catch (err) {
        console.log(err);
    }

    return wflow;
}

/**
 * @function 查询用户名称信息
 */
export async function queryUserName() {

    //查询URL
    var index = 0;
    var queryURL;
    var result = [];

    try {
        //从缓存中获取用户数据
        var userlist = Betools.storage.getStore('cache_all_user_name');

        if (
            typeof userlist == 'undefined' ||
            userlist == null ||
            userlist.length == 0
        ) {
            while (index < 10000) {
                queryURL = `${window.requestAPIConfig.restapi}/api/v_uname?_p=${index++}&_size=1000`;
                var res = await superagent.get(queryURL).set('accept', 'json');
                result = result.concat(res.body);
                //如果返回结果数据小于size，则表示查询到末页，不在查询
                if (res.body.length < 50) {
                    break;
                } else {
                    continue;
                }
            }

            //将用户数据设置到缓存中
            Betools.storage.setStore('cache_all_user_name', result, 3600 * 2);
        } else {
            result = userlist;
        }

        return result;
    } catch (err) {
        console.log(err);
    }
}

/**
 * @function 将英文名转化为中文名
 */
export async function patchEnameCname(origin) {

    //中文名称
    var chinese = '';

    //原始英文名称列表
    var originlist = Betools.tools.deNull(origin).split(',');

    //查询用户信息
    var userlist = await queryUserName();

    //遍历用户获取中文名称列表
    for (var ename of originlist) {
        //获取流程发起人的中文信息
        var user = userlist.find(item => {
            return ename == item.username;
        });

        //如果找到用户信息，则设置用户信息
        if (!Betools.tools.isNull(user)) {
            chinese = `${chinese},${user.realname}`;
        } else {
            chinese = `${chinese},${ename}`;
        }
    }

    //去掉字符串开头的逗号
    if (chinese.startsWith(',')) {
        chinese = chinese.substring(1);
    }

    //去掉字符串结尾的逗号
    if (chinese.endsWith(',')) {
        chinese = chinese.substring(0, chinese.length - 1);
    }

    //返回中文名称列表
    return chinese;
}

/**
 * @function 处理用户信息
 */
export async function handleUserInfo(userInfo) {
    //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
    if (typeof userInfo == "undefined" && userInfo == null) {
        //确认用户信息
        // that.$confirm_({
        //     title: "提示信息",
        //     content: "用户登录信息过期，请重新登录！",
        //     onOk: async() => {
        //         //清空缓存信息
        //         Betools.Betools.storage.clearAll();
        //         //跳转到登录页面
        //         that.$router.push(`/user/login`);
        //     }
        // });
        return false;
    } else {
        return true;
    }
}

/**
 * @function 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessLogByID(tableName, id) {

    //大写转小写
    tableName = tableName.toLowerCase();

    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(table_name,eq,${tableName})~and(id,eq,${id})`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body[0];
    } catch (err) {
        console.log(err);
    }
}

/**
 * @function callback连续执行函数
 */
export function setTimeouts(callback, ...times) {
    for (let time of times) {
        setTimeout(() => {
            callback();
        }, time);
    }
}

// /**
//  * @function 查询表单对应的历史自由流程
//  */
// export async function queryCurFreeWorkflow(id) {

//     //提交URL
//     var queryURL = `${window.requestAPIConfig.restapi}/api/bs_free_process?_where=(main_key,eq,${id})&_sort=-create_time`;

//     //根据业务编号，查询业务数据
//     var wflow = [];

//     try {
//         var res = await superagent.get(queryURL).set('accept', 'json');
//         console.log(res);

//         //如果只有一条数据，则返回[]；如果有多条数据，则返回多个数据
//         if (
//             typeof res.body == 'undefined' ||
//             res.body == null ||
//             res.body == '' ||
//             res.body.length == 0
//         ) {
//             wflow = null;
//         } else if (res.body.length >= 1) {
//             wflow = res.body[0];
//         }
//     } catch (err) {
//         console.log(err);
//     }
//     return wflow;
// }

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的员工信息
 */
export async function queryProcessNodeEmployee(node, callback) {
    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/bs_approve_node?_where=(name,eq,${node})`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res.body);

        if (
            typeof res != 'undefined' &&
            res.body instanceof Array &&
            res.body.length > 0 &&
            typeof callback != 'undefined'
        ) {
            callback(res.body[0]['item_text']);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessNodeProcName(node, callback) {
    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/sys_dict_item?_where=(dict_id,eq,${window.requestAPIConfig.PROCESS_NODE_DICT_ID})~and(item_value,eq,${node})`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);

        if (
            typeof res != 'undefined' &&
            res.body instanceof Array &&
            res.body.length > 0 &&
            typeof callback != 'undefined'
        ) {
            callback(res.body[0]['item_text']);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取n位随机数,随机来源chars
 */
export function queryRandomStr(length = 32) {

    var res = '';

    try {
        //使用新算法，获取唯一字符串
        res = Betools.tools.queryUniqueID(length);
    } catch (error) {
        console.log('获取n位随机数异常：' + error);
    }

    //返回随机数
    return res;
}

/**
 * 想知会记录列表提交数据
 */
export async function postProcessLogInformed(node) {
    //提交URL
    var postURL = null;
    //是否批处理
    var bflag = node instanceof Array && node.length > 1 ? '/bulk' : '';

    //如果只有一条数据,则URL中不需要/bulk路径
    try {
        if (node instanceof Array && node.length == 1) {
            bflag = '';
            node = node[0];
        }
    } catch (error) {
        console.log(error);
    }

    //构建知会表提交数据的URL
    try {
        postURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed${bflag}`;
    } catch (error) {
        console.log(error);
    }

    //发送post请求，保存数据
    try {
        var res = await superagent
            .post(postURL)
            .send(node)
            .set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.log(err);
    }
}


/**
 * @function 提交并持久化数据到服务器
 */
export async function postTableData(tableName, node) {

    //大写转小写
    tableName = tableName.toLowerCase();
    //Post数据的URL地址
    var insertURL = `${window.requestAPIConfig.restapi}/api/${tableName}`;
    //设置node为value
    const value = node;

    //设置时间格式
    Object.keys(value).map(key => {
        value[key] = key.includes('_time') && value[key] ? dayjs(value[key]).format('YYYY-MM-DD HH:mm:ss') : value[key];
    })

    //如果传入数据为数组，则URL添加bulk路径
    if (typeof node != 'undefined' && node != null && node instanceof Array) {
        insertURL = insertURL + '/bulk';
    }

    try {
        var res = await superagent
            .post(insertURL)
            .send(node)
            .set('accept', 'json');

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

export async function queryUsernameByID(id) {

    if (!id) {
        return '';
    }

    try {
        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(`${window.requestAPIConfig.restapi}/api/bs_hrmresource?_where=(loginid,eq,~${id}~)~and(status,ne,5)&_fields=id,lastname,loginid`).set('accept', 'json');

        //返回用户信息
        return maxinfo.body[0]['lastname'];
    } catch (error) {
        console.log(error);
    }

}

export async function queryUsernameByIDs(ids) {

    try {
        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(`${window.requestAPIConfig.restapi}/api/bs_hrmresource?_where=(loginid,in,${ids})~and(status,ne,5)`).set('accept', 'json');

        //返回用户信息
        return maxinfo.body;
    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前名字的用户信息
 */
export async function queryUserByNameHRM(name, seclevel = 50) {

    let result = [];

    if (Betools.tools.isNull(name)) {
        return [];
    }

    try {

        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var temp_ = await superagent.get(`${window.requestAPIConfig.restapi}/api/bs_hrmresource?_where=((lastname,like,~${name}~)~or(loginid,like,~${name}~))~and(status,ne,5)~and(seclevel,lt,${seclevel})`).set('accept', 'json');

        result = [...temp_.body];

        //剔除掉，没有loginid的用户信息
        result = result.filter(item => {
            return !Betools.tools.isNull(item.loginid);
        })

        //返回用户信息
        return result;

    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前名字的用户信息
 */
export async function queryUserByNameReward(name, seclevel = 101) {

    let result = [];

    if (Betools.tools.isNull(name)) {
        return [];
    }

    try {

        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var temp_ = await superagent.get(`${window.requestAPIConfig.restapi}/api/bs_hrmresource?_where=((lastname,like,~${name}~)~or(loginid,like,~${name}~))~and(seclevel,lt,${seclevel})`).set('accept', 'json');

        result = [...temp_.body];

        //剔除掉，没有loginid的用户信息
        result = result.filter(item => {
            return !Betools.tools.isNull(item.loginid);
        })

        //返回用户信息
        return result;

    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前名字的用户信息
 */
export async function queryUserByLoginID(name, seclevel = 101) {

    let result = [];

    if (Betools.tools.isNull(name)) {
        return [];
    }

    try {

        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var temp_ = await superagent.get(`${window.requestAPIConfig.restapi}/api/bs_hrmresource?_where=((loginid,in,${name}))~and(seclevel,lt,${seclevel})&_fields=loginid`).set('accept', 'json');

        result = [...temp_.body];

        //剔除掉，没有loginid的用户信息
        result = result.filter(item => {
            return !Betools.tools.isNull(item.loginid);
        })

        //返回用户信息
        return result;

    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前名字的用户信息
 */
export async function queryUserByID(name, cname = '融量', seclevel = 101) {

    let result = [];

    if (Betools.tools.isNull(name)) {
        return [];
    }

    try {

        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var temp_ = await superagent.get(`${window.requestAPIConfig.restapi}/api/v_hrmresource?_where=((loginid,in,${name}))~and(seclevel,lt,${seclevel})~and(cname,eq,${cname})&_sort=id`).set('accept', 'json');

        result = [...temp_.body];

        //剔除掉，没有loginid的用户信息
        result = result.filter(item => {
            return !Betools.tools.isNull(item.loginid);
        })

        //返回用户信息
        return result;

    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前输入地址信息对应的所有物品管理员所在办公位置
 */
export async function queryAddressByName(name) {

    let result = [];
    if (Betools.tools.isNull(name)) {
        return [];
    }
    try {
        var temp_ = await superagent.get(`${window.requestAPIConfig.restapi}/api/bs_admin_group?_where=(groupname,eq,COMMON_RECEIVE_BORROW)~and(address,like,~${name}~)`).set('accept', 'json');
        result = [...temp_.body];
        return result;
    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前名字的用户信息
 */
export async function queryUserByNameFindOne(realname, username) {

    if (Betools.tools.isNull(realname) || Betools.tools.isNull(username)) {
        return [];
    }

    const queryURL = realname.includes('(') || realname.includes('（') || !/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(realname) ? `${window.requestAPIConfig.restapi}/api/bs_hrmresource?_where=((loginid,like,~${username}~))~and(status,ne,5)` : `${window.requestAPIConfig.restapi}/api/bs_hrmresource?_where=((lastname,like,~${realname}~)~and(loginid,like,~${username}~))~and(status,ne,5)`;

    try {
        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(queryURL).set('accept', 'json');

        //剔除掉，没有loginid的用户信息
        maxinfo.body = maxinfo.body.filter(item => {
            return !Betools.tools.isNull(item.loginid);
        });

        //返回用户信息
        if (maxinfo && maxinfo.body && maxinfo.body.length >= 1) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
    }

}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} whereSQL
 */
export async function queryTableData(tableName, whereSQL) {
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
export async function queryTableDataCount(tableName, whereSQL) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}/count?${whereSQL}`;

    try {

        var res = await superagent.get(queryURL).set('accept', 'json');
        return res.body[0]['no_of_rows'];

    } catch (err) {
        console.log(err);
    }
}

/**
 * @function 获取当前编号前缀的合同的列表信息
 * @param {*} prefix
 */
export async function queryContractInfoByPrefix(prefix) {

    try {
        //构建查询SQL
        const sql = `${window.requestAPIConfig.restapi}/api/bs_seal_regist?_where=(contract_id,like,${prefix}~)~and(seal_type,eq,合同类)~and(status,in,已用印,已领取,移交前台,已完成,财务归档,档案归档,已归档)&_p=0&_size=8&_sort=-contract_id`;
        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(sql).set('accept', 'json');

        //返回用户信息
        if (maxinfo && maxinfo.body && maxinfo.body.length >= 1) {
            return maxinfo.body;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前编号前缀的合同的列表信息
 * @param {*} prefix
 */
export async function queryContractInfoByPrefixAll(prefix) {

    try {
        //构建查询SQL
        const sql = `${window.requestAPIConfig.restapi}/api/bs_seal_regist?_where=(contract_id,like,${prefix}~)~and(seal_type,eq,合同类)~and(status,in,待用印,已退回,已废弃,已用印,已领取,移交前台,已完成,财务归档,档案归档,已归档)&_p=0&_size=3&_sort=-contract_id`;
        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(sql).set('accept', 'json');

        //返回用户信息
        if (maxinfo && maxinfo.body && maxinfo.body.length >= 1) {
            return maxinfo.body;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前名字的用户信息
 */
export async function queryUserBySealData(name) {

    try {
        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(`${window.requestAPIConfig.restapi}/api/bs_seal_regist?_where=(deal_manager,like,~${name}~)~and(deal_mail,like,~@~)&_size=1&_p=0`).set('accept', 'json');
        //返回用户信息
        return maxinfo.body[0];
    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 获取当前节点是否有知会或者审批节点信息
 */
export async function queryCurNodePageType(pageType) {
    //获取页面类型
    var type = Betools.tools.queryUrlString('type');

    try {
        //如果审批详情或者知会详情页面，则设置pageType
        if (type == 'workflow' || type == 'notify') {
            //获取当前节点审批流程数据）
            var flag = await queryProcessLogByID(
                Betools.tools.queryUrlString('table_name'),
                Betools.tools.queryUrlString('processLogID')
            );

            //获取当前节点知会流程数据
            if (Betools.tools.deNull(flag) == '') {
                flag = await queryProcessLogInfByID(
                    Betools.tools.queryUrlString('table_name'),
                    Betools.tools.queryUrlString('processLogID')
                );
            }

            //获取页面类型
            pageType = Betools.tools.deNull(flag) == '' ? 'view' : pageType;
        } else if (type == 'workflowing') {
            //
            console.log('TODO 暂时不做');
        }
    } catch (error) {
        console.log('获取当前节点是否有知会或者审批节点信息异常:' + error);
    }

    //返回pageType
    return pageType;
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessLogInfByID(tableName, id) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed?_where=(table_name,eq,${tableName})~and(id,eq,${id})`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body[0];
    } catch (err) {
        console.log(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessLog(tableName, businessID) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(table_name,eq,${tableName})~and(business_data_id,eq,${businessID})&_sort=operate_time`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询流程权责业务信息
 */
export async function queryBusinessInfo(tableName, callback) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_rights?_where=(business,like,~${tableName}~)`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res.body);

        if (
            typeof res != 'undefined' &&
            res.body instanceof Array &&
            res.body.length > 0 &&
            typeof callback != 'undefined'
        ) {
            callback(res.body);
        }

        return JSON.parse(JSON.stringify(res.body));
    } catch (err) {
        console.log(err);
    }
}

/**
 * 检测审批是否存在 存在 false  不存在 true
 * @param {*} tableName
 * @param {*} businessID
 */
export async function queryApprovalLength(tableName, businessID) {

    //大写转小写
    tableName = tableName.toLowerCase();
    //查询URL GET	/api/tableName/:id/exists	True or false whether a row exists or not  /api/tableName/findOne
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(table_name,eq,${tableName})~and(business_data_id,eq,${businessID})`;

    //查询标识
    var vflag = false;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        vflag = res.body.length;

        return vflag;
    } catch (err) {
        console.log(err);
    }
}

/**
 * @function 将当前自由流程的数据转移到历史数据中
 * @param {*} id
 */
export async function transFreeWflowHis(id) {

    //定义返回结果
    var result;

    try {

        //获取本表单业务的所有的自由流程数据
        let wflist = await manageAPI.queryHisFreeWorkflow(id);

        //将历史数据插入到历史自由流程表中
        let wcode = await manageAPI.insertTableData("bs_free_process_h", wflist);

        //删除当前自由流程表中历史数据
        result = await manageAPI.deleteTableItem("bs_free_process", wflist);

        //打印返回结果
        console.log("result :" + result + " wcode :" + wcode);


    } catch (error) {
        console.log("transfer free workflow node into history " + error);
    }

    return result;

}

/**
 * 更新数据
 * @param {*} tableName
 * @param {*} id
 * @param {*} node
 */
export async function patchTableData(tableName, id, node) {

    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var patchURL = `${window.requestAPIConfig.restapi}/api/${tableName}/${id}`;

    //如果传入数据为空，则直接返回错误
    if (typeof node == 'undefined' || node == null || node == '') {
        return false;
    }

    try {
        var res = await superagent
            .patch(patchURL)
            .send(node)
            .set('accept', 'json');

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function postProcessLog(node) {
    //提交URL
    var postURL = `${window.requestAPIConfig.restapi}/api/pr_log`;

    try {
        var res = await superagent
            .post(postURL)
            .send(node)
            .set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function postProcessLogHistory(node) {
    //提交URL
    var postURL = null;
    //是否批处理
    var bflag = node instanceof Array && node.length > 1 ? '/bulk' : '';

    //如果只有一条数据,则URL中不���要/bulk路径
    try {
        if (node instanceof Array && node.length == 1) {
            bflag = '';
            node = node[0];
        }
    } catch (error) {
        console.log(error);
    }

    //构建流程历史表提交数据的URL
    try {
        postURL = `${window.requestAPIConfig.restapi}/api/pr_log_history${bflag}`;
    } catch (error) {
        console.log(error);
    }

    //发送post请求，保存数据
    try {
        var res = await superagent
            .post(postURL)
            .send(node)
            .set('accept', 'json');
        console.log(res);
        return res.body;
    } catch (err) {
        console.log(err);
    }
}


/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function deleteProcessLog(tableName, node) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //提交URL
    var deleteURL = '';
    //遍历node,取出里面的ids
    var ids = '';

    //如果node不是数组，则转化为数组
    if (!(node instanceof Array)) {
        node = [node];
    }

    try {
        node.map((item) => {
            ids = ids + ',' + item['id'];
        });

        //去掉开头的逗号
        ids = ids.indexOf(',') == 0 ? ids.substring(1) : ids;
    } catch (error) {
        console.log(error);
    }

    try {
        deleteURL = `${window.requestAPIConfig.restapi}/api/pr_log/bulk?_ids=${ids}`;
    } catch (error) {
        console.log(error);
    }

    try {
        var res = await superagent.delete(deleteURL).set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.log(err);
    }
}


/**
 * 根据数据字典中的节点编号，删除到这个节点对应的流程信息
 */
export async function deleteProcessLogInf(tableName, node) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //遍历node,取出里面的ids
    var ids = '';
    //提交URL
    var deleteURL = '';

    //如果node不是数组，则转化为数组
    if (!(node instanceof Array)) {
        node = [node];
    }

    try {
        node.map((item) => {
            ids = ids + ',' + item['id'];
        });

        //去掉开头的逗号
        ids = ids.indexOf(',') == 0 ? ids.substring(1) : ids;
    } catch (error) {
        console.log(error);
    }

    try {
        deleteURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed/bulk?_ids=${ids}`;
    } catch (error) {
        console.log(error);
    }

    try {
        var res = await superagent.delete(deleteURL).set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

export async function queryApprovalExist(tableName, businessID) {

    //大写转小写
    tableName = tableName.toLowerCase();
    //查询URL GET
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(table_name,eq,${tableName})~and(business_data_id,eq,${businessID})`;
    //查询标识
    var vflag = false;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        vflag = res.body.length > 0 ? true : false;
    } catch (err) {
        console.log(err);
    }

    return vflag;
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function postProcessFreeNode(node) {
    //提交URL
    var postURL = `${window.requestAPIConfig.restapi}/api/bs_free_process`;
    try {
        var res = await superagent
            .post(postURL)
            .send(node)
            .set('accept', 'json');

        console.log(res);

        return res.body;

    } catch (err) {
        console.log(err);
    }

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