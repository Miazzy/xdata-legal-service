import * as constant from '@/request/constant';
import * as manage from '@/request/manage';
import * as query from '@/request/query';

/**
 * 获取某业务记录对应的审批日志信息(历史)
 */
export async function queryPRLogHistoryByDataID(business_data_id) {

    //提交URL
    var queryURL = `${constant.REQUEST_API_CONFIG.restapi}/api/pr_log_history?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time&_p=0&_size=1000`;

    //获取缓存中的数据
    var cache = Betools.storage.getStore(`sys_workflow_cache@$history&id${business_data_id}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {

            Betools.storage.setStore(`sys_workflow_cache@$history&id${business_data_id}`, res.body, 2);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }

}

/**
 * 获取某业务记录对应的审批日志信息(当前)
 */
export async function queryPRLogByDataID(business_data_id) {
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time&_p=0&_size=1000`;

    //获取缓存中的数据
    // var cache = Betools.storage.getStore(`sys_workflow_cache@$now&id${business_data_id}`);

    // //返回缓存值
    // if (typeof cache != 'undefined' && cache != null && cache != '') {
    //     return cache;
    // }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {
            Betools.storage.setStore(`sys_workflow_cache@$now&id${business_data_id}`, res.body, 0); //此处不能使用缓存，因为如果还存在审批日志，会将流程状态修改为审批中
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取某业务记录对应的审批日志信息(知会)
 */
export async function queryPRLogInformedByDataID(business_data_id) {
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time&_p=0&_size=1000`;

    //获取缓存中的数据
    var cache = Betools.storage.getStore(`sys_workflow_cache@$informed&id${business_data_id}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {
            Betools.storage.setStore(`sys_workflow_cache@$informed&id${business_data_id}`, res.body, 60);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取某业务记录对应的审批日志信息(知会)
 */
export async function queryPRLogUserByPage(page, size) {
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_uname?_p=${page}&_size=${size}&_sort=username`;

    //获取缓存中的数据
    var cache = Betools.storage.getStore(`sys_workflow_username@$all&p=${page}&size=${size}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {
            Betools.storage.setStore(`sys_workflow_username@$all&p=${page}&size=${size}`, res.body, 3600);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

export async function queryUserAll() {

    let all = [];

    //获取缓存中的数据
    var cache = Betools.storage.getStore(`sys_workflow_user_all@$all`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    for (let i = 0; i <= 100; i++) {
        let segment = await queryPRLogUserByPage(i, 99);

        if (segment != null && segment.length > 0) {
            all.push(...segment);
        } else {
            break;
        }
    }

    if (all != null && all.length > 0) {
        Betools.storage.setStore(`sys_workflow_user_all@$all`, all, 3600 * 24);
    }

    return all;

}


export async function queryUserByName(username) {

    let all = await queryUserAll();

    let user = all.find((info) => {
        let flag = info.username == username;
        return flag;
    })

    if (user != null && user.realname != null) {
        return user.realname;
    } else {
        return username;
    }

}


/**
 * @function 审批同意处理
 * @param tableName 审批处理关联的业务表
 * @param curRow    审批处理关联的业务数据
 * @param pnode     审批处理下一节点的审批信息
 * @param prLogHisNode     审批处理当前节点的审批信息
 * @param bpmStatus 审批处理关联的业务数据应变更的状态
 * @param freeNode  审批流程中自由流程节点
 * @param wflowAddUser 审批流程中加签用户
 * @param wflowNotifyUser 审批流程中会签用户
 * @define bpmStatus（1：待提交	2：审核中	3：审批中	4：已完成	5：已完成 10：已作废）
 */
export async function postWorkflowApprove(tableName, curRow, operationData, pnode, prLogHisNode, bpmStatus, freeNode, wflowAddUser, wflowNotifyUser, curAuditor) {

    //执行处理的结果
    var result = null;

    //流程事务处理框架，保证流程处理操作的事务最终一致性
    try {
        //执行事务处理框架
        result = await manage.postTableData(
            "BS_TRANSACTION",
            operationData
        );
    } catch (error) {
        console.log("流程事务处理框架处理异常", error);
    }

    try {
        //如果“审批处理下一节点的审批信息”不为空，则执行当前处理
        if (pnode != null) {
            //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
            result = await manage.postProcessLog(pnode);
        }
    } catch (error) {
        console.log("审批处理下一节点的审批信息", error);
    }

    try {
        //如果“审批处理当前节点的审批信息”不为空，则执行当前处理
        if (tableName != null && curRow != null && prLogHisNode != null && bpmStatus != null) {

            //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
            result = await manage.postProcessLogHistory(prLogHisNode);

            //删除当前审批节点中的所有记录
            result = await manage.deleteProcessLog(
                tableName,
                prLogHisNode
            );

            //修改审批状态为审批中，并记录审批日志；将当前审批状态修改为处理中
            result = await manage.patchTableData(
                tableName,
                curRow["business_data_id"],
                bpmStatus
            );

            //如果本次流程结束，即状态变为已完成，或者，状态变成，待处理，则将当前的自由流程记录转为历史，以前此表单的自由流程进入历史，并删除以前此表单对应的自由流程
            result = await manage.transFreeWflowHis(curRow["business_data_id"]);

            //二次提交审批状态
            setTimeout(async() => {
                //修改审批状态为审批中
                result = await manage.patchTableData(
                    tableName,
                    curRow["business_data_id"],
                    bpmStatus
                );
            }, 300);

            //二次提交审批状态
            setTimeout(async() => {
                //修改审批状态为审批中
                result = await manage.patchTableData(
                    tableName,
                    curRow["business_data_id"],
                    bpmStatus
                );
            }, 1000);

        }
    } catch (error) {
        console.log("审批处理当前节点的审批信息", error);
    }

    //如果加签、会签用户不为空，则需要将加签、会签用户，追加至自由流程审批表中
    try {

        freeNode.audit_node = `,${freeNode.audit_node},`;

        //如果加签用户数据不为空，则向自由流程数据表中，添加加签数据
        if (Betools.tools.deNull(wflowAddUser) && !freeNode.audit_node.includes(wflowAddUser)) {

            freeNode.audit_node = freeNode.audit_node.replace(
                `,${curAuditor},`,
                `,${curAuditor},${wflowAddUser},`
            );
        }

        //如果会签用户数据不为空，则向自由流程数据表中，添加会签数据
        if (Betools.tools.deNull(wflowNotifyUser) && !freeNode.audit_node.includes(wflowNotifyUser)) {

            freeNode.audit_node = freeNode.audit_node.replace(
                `,${curAuditor},`,
                `,${wflowNotifyUser},${curAuditor},`
            );
        }

        //如果当前用户，进行了会签操作，则不应在audit_node记录多次，删除第一次记录
        if (Betools.tools.deNull(wflowNotifyUser) && freeNode.audit_node.indexOf(curAuditor) != freeNode.audit_node.lastIndexOf(curAuditor)) {
            freeNode.audit_node = freeNode.audit_node.replace(
                `,${curAuditor},`,
                `,`
            );
        }

        //去掉开头、结尾的逗号
        if (freeNode.audit_node.startsWith(",")) {
            freeNode.audit_node = freeNode.audit_node.substring(1);
        }

        //去掉开头、结尾的逗号
        if (freeNode.audit_node.endsWith(",")) {
            freeNode.audit_node = freeNode.audit_node.substring(0, freeNode.audit_node.length - 1);
        }

        result = await manage.patchTableData(
            'bs_free_process',
            freeNode["id"], {
                audit_node: freeNode.audit_node
            }
        );

    } catch (error) {
        console.log(error);
    }

    //审批处理过程中，添加相关的动态信息
    try {

        //如果流程状态为1，则提交驳回动态到数据库，如果流程状态为4或者5，则提交审批通过动态到数据库
        if (bpmStatus.bpm_status == "1") {
            await postDynamicReject(tableName, curRow);
        } else if (bpmStatus.bpm_status == "4") {
            await postDynamicAgree(tableName, curRow);
        } else if (bpmStatus.bpm_status == "5") {
            await postDynamicNotify(tableName, curRow);
        }

    } catch (error) {
        console.log(error);
    }

    //打印会签用户、加签用户数据
    console.log("加签用户：" + wflowAddUser);
    console.log("会签用户：" + wflowNotifyUser);

    //返回执行结果
    return result;

}

/**
 * @function 记录企业申请的审批记录
 * @description 记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
 */
export async function approveViewProcessLog(prLogHisNode) {
    //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
    const result = await manage.postProcessLogHistory(prLogHisNode);
    //返回数据
    return result;
}

/**
 * @function 添加待办记录审批记录
 * @description 记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
 */
export async function taskViewProcessLog(prLogNode) {
    //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
    const result = await manage.postProcessLog(prLogNode);
    //返回数据
    return result;
}

/**
 * @function 添加待办记录审批记录
 * @description 记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
 */
export async function deleteViewProcessLog(node) {
    //替换ID编号
    node.map(item => {
        item.oid = item.id;
        item.id = item.pid;
    });
    //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
    const result = await manage.deleteProcessLog(
        '',
        node
    );
    //返回数据
    return result;
}


/**
 * @function 校验自由流程提交信息是否准确
 * @param wfUsers 审核人员
 * @param nfUsers 知会人员
 * @param approver 审批人员
 * @param pageType page类型
 * @param $confirm 提示函数
 */
export function checkSubmitInfo(wfUsers, nfUsers, approver, pageType = 'workflowing') {

    try {
        //审批用户不能为空
        if (Betools.tools.deNull(approver) == "" && pageType == "workflowing") {
            vant.Toast.fail("请选择审批用户!");
            return false;
        }
        //如果审批用户含有多个，则不能提交
        if (Betools.tools.deNull(approver).includes(",") && pageType == "workflowing") {
            vant.Toast.fail("审批用户只能选择一个!");
            return false;
        }
        //知会用户不能为空
        if (Betools.tools.deNull(nfUsers) == "" && pageType == "notifying") {
            vant.Toast.fail("请选择知会用户!");
            return false;
        }
        //如果审批人员，出现在审核流程中，则提示错误
        if (("," + wfUsers + ",").includes("," + approver + ",") && pageType == "workflowing") {
            vant.Toast.fail("审批流程中，审批人员[${approver}]不能出现在审核人员中!");
            return false;
        }
    } catch (error) {
        console.log("check submit info error : " + error);
    }

    return true;
}


/**
 * @function 处理自由流程发起提交审批操作
 * @param tableName     表单名称
 * @param curRow        当前记录数
 * @param freeWFNode    自由流程节点
 * @param startFreeNode 流程发起节点
 * @param nextWflowNode 下一流程处理节点
 * @param bpmStatus   审批处理关联的业务数据应变更的状态
 * @define bpmStatus （1：待提交	2：审核中	3：审批中	4：已完成	5：已完成 10：已作废）
 */
export async function postWorkflowFree(userInfo, tableName, curRow, freeWFNode, startFreeNode, nextWflowNode, bpmStatus) {

    //执行处理的结果
    var result = null;

    //状态节点
    var statusNode = {
        bpm_status: bpmStatus
    };

    //动态内容
    var dynamicNode = {};

    try {
        //去掉undefined字符串
        freeWFNode.notify_node = freeWFNode.notify_node.replace(/undefined/g, '')

        //如果字符串以逗号开头，则去掉开头的逗号
        if (freeWFNode.notify_node.startsWith(',')) {
            freeWFNode.notify_node = freeWFNode.notify_node.substring(1);
        }

        //如果字符串以逗号结束，则去掉结尾的逗号
        if (freeWFNode.notify_node.endsWith(',')) {
            freeWFNode.notify_node = freeWFNode.notify_node.substring(0, freeWFNode.notify_node.length - 1);
        }
    } catch (error) {
        console.log(error);
    }

    //构造用户动态内容
    try {

        //日期格式化
        var timestamp = new Date().getTime();

        //定义动态编码
        var id = Betools.tools.queryUniqueID();

        //表单数据库数据
        var mainData = await query.queryTableData(tableName, curRow.id);

        //获取表单的中文名称
        var tname = await manage.queryTableDataByField('v_table_name', 'id', tableName);

        try {
            tname = tname[0]['name'];
        } catch (error) {
            console.log(error);
        }

        //表单内容
        var title = '<div><span>' + userInfo['realname'] + `</span> 发起了 <a href="/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify">` + tname + `</a> 的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify">流程申请</a> ` + '</div>';

        //待发布动态节点内容
        dynamicNode = {
            id: id,
            create_by: userInfo['username'],
            create_time: Betools.tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss"),
            update_by: userInfo.username,
            title: title,
            content: title,
            main_key: curRow.id,
            main_table: tableName,
            main_data: JSON.stringify(mainData),
            relate_users: `${freeWFNode.audit_node},${freeWFNode.approve_node},${freeWFNode.notify_node},${userInfo.username},admin,`,
        };

        //设置自由流程的表单业务数据
        freeWFNode['main_data'] = JSON.stringify(mainData);

    } catch (error) {
        console.log(error);
    }

    //执行提交审批流程的业务操作
    try {

        try {
            //将审批用户记录，知会用户记录，写入相应的自由流程表单中
            result = await manage.postProcessFreeNode(freeWFNode);
        } catch (error) {
            console.log(error);
        }

        try {
            //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
            result = await manage.postProcessLogHistory(startFreeNode);
        } catch (error) {
            console.log(error);
        }

        try {
            //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
            result = await manage.postProcessLog(nextWflowNode);
        } catch (error) {
            console.log(error);
        }

        try {
            //第四步，修改审批状态为审批中，并记录审批日志；将当前审批状态修改为处理中 （1:待提交 2:处理中 3:审批中 4:已完成 5:已完成） //修改审批状态为处理中，并记录审批日志；将当前审批状态修改为处理中
            result = await manage.patchTableData(tableName, curRow["id"], statusNode);
        } catch (error) {
            console.log(error);
        }

        //第五步，新增动态数据，内容：XXX 发起了 XX 业务的流程申请。
        try {
            //第五步，新增动态数据，内容：XXX 发起了 XX 业务的流程申请。
            result = await manage.postTableData('bs_dynamic', dynamicNode);
        } catch (error) {
            console.log(error);
        }

        try {
            //修改审批状态为审批中,第二次修改
            result = await manage.patchTableData(tableName, curRow["id"], statusNode);
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log("处理自由流程发起提交审批操作异常：" + error)
    }

    //返回执行结果
    return result;

}