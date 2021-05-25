import * as manage from '@/request/manage';
import * as workflow from '@/request/workflow';
import * as query from '@/request/query';

/**
 * @function 同意审批 wflowAddUsers , wflowNotifyUsers
 * @param curRow 当前被选中记录数据
 * @param fixedWFlow
 * @param data
 */
export async function handleApproveWF(curRow = '', fixedWFlow = '', data = [], tasktype = 'wait') {

    var wflowAddUsers = ''; //加签用户，暂时设置为空
    var wflowNotifyUsers = ''; //会签用户，暂时设置为空

    //查询业务编号
    var bussinessCodeID = Betools.tools.queryUrlString("id");

    //获取表单名称
    var tableName = window.decodeURIComponent(Betools.tools.queryUrlString('tname'));

    //会签、加签用户
    var wflowSpecUser = wflowAddUsers + "," + wflowNotifyUsers;

    //查询自由流程节点
    var wfreeNode = await manage.queryCurFreeWorkflow(bussinessCodeID);

    //查询当前数据
    curRow = await query.queryTableData(tableName, bussinessCodeID);

    //流程的创建人员
    const bussinessNode = JSON.parse(JSON.stringify(curRow));

    //如果加签、会签同时选择，则无法提交
    if (
        Betools.tools.deNull(wflowAddUsers) != "" &&
        Betools.tools.deNull(wflowNotifyUsers) != ""
    ) {
        vant.Dialog.alert({
            message: "无法同时进行加签及会签操作，请单独选择加签用户或会签用户！"
        });
        return false;
    }

    //如果会签、加签用户以逗号开头，则去掉开头的逗号
    wflowSpecUser = wflowSpecUser.startsWith(",") ?
        wflowSpecUser.substring(1) :
        wflowSpecUser;

    //如果会签、加签用户以逗号结尾，则去掉结尾的逗号
    wflowSpecUser = wflowSpecUser.endsWith(",") ?
        wflowSpecUser.substring(0, wflowSpecUser.length - 1) :
        wflowSpecUser;

    console.log("会签/加签用户 : " + wflowSpecUser);

    //加签会签选中的用户，不能是流程中已经存在的用户
    var readyUser = Betools.tools.contain(
        wfreeNode.audit_node + "," + wfreeNode.approve_node,
        wflowSpecUser
    );

    //如果用户流程中已经存在，则提示无法选择
    if (!Betools.tools.isNull(readyUser)) {
        //将英文名转化为中文名
        readyUser = await manage.patchEnameCname(readyUser);
        //提示错误信息
        vant.Dialog.alert({
            message: `加签/会签用户，不能选择审批流程中已经存在的用户(${readyUser})!`
        });
        return false;
    }

    await vant.Dialog.confirm({
        title: '确认操作',
        message: '是否确认提交此自由流程?',
    });

    //返回结果
    var result;

    //获取当前用户
    var userInfo = Betools.storage.getStore("system_userinfo");

    //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
    await manage.handleUserInfo(userInfo);

    //获取当前时间
    var date = Betools.tools.formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");
    //审批动作
    var operation = operation || "同意";
    //审批意见
    var message = message || curRow.idea_content || "同意";
    //流程日志编号
    var processLogID = Betools.tools.queryUrlString("pid");
    //审批节点信息
    var approveNode = null;
    //定义当前审批日志信息
    var node = [];
    //业务代码ID
    var bussinessCodeID = null;
    //获取流程审批信息
    var processAudit = null;
    //转历史日志节点
    var prLogHisNode = null;
    //流程权责
    var rights = null;
    //自由流程节点
    var freeNode = null;

    try {
        //获取当前审批节点的所有数据
        curRow = await manage.queryProcessLogByID(tableName, processLogID);
    } catch (error) {
        console.log(error);
    }

    //未获取当前审批流程
    if (Betools.tools.deNull(curRow) == "") {
        vant.Dialog.alert({
            message: "未找到下一节点的流程信息，请刷新页面，查看是否已经审批完成！"
        });
        return false;
    }

    //业务代码ID
    bussinessCodeID = curRow["business_data_id"];
    //获取流程审批信息
    processAudit = curRow["process_audit"];

    //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
    if (!(
            Betools.tools.deNull(curRow["employee"]).includes(userInfo["username"]) ||
            Betools.tools.deNull(curRow["employee"]).includes(userInfo["realname"])
        )) {
        vant.Dialog.alert({
            message: "您不在此审批流程记录的操作职员列中，无法进行审批操作！"
        });
        return false;
    }

    try {
        //获取关于此表单的所有当前审批日志信息
        node = await manage.queryProcessLog(tableName, bussinessCodeID);
    } catch (error) {
        console.log(error);
    }

    //遍历node,设置approve_user，action
    node.map((item) => {
        //记录创建时间
        let ctime = item["create_time"];
        //设置审批人员
        item["approve_user"] = userInfo["username"];
        //设置操作类型
        item["action"] = operation;
        //设置操作时间
        item["operate_time"] = date;
        //设置操作意见
        item["action_opinion"] = message;
        //设置创建时间
        item["create_time"] = Betools.tools.formatDate(ctime, "yyyy-MM-dd hh:mm:ss");
    });

    //转历史日志节点
    prLogHisNode = JSON.parse(JSON.stringify(node));
    //第一步，获取此表单，关联的流程业务模块；查询SQL , 获取流程权责中关联业务含有tableName的流程权责
    rights = await manage.queryBusinessInfo(tableName);
    //选定流程权责
    fixedWFlow = rights[0];

    //如果流程权责有多个，那么弹出选择框，让用户自己选择一个流程
    if (rights.length > 1 && curRow.business_code != "000000000") {
        vant.Dialog.alert({
            message: "获取到此业务含有多个流程权责，请联系管理员进行配置！"
        });
        return false;
    } else if (
        rights.length <= 0 &&
        curRow.business_code != "000000000"
    ) {
        vant.Dialog.alert({
            message: "未获取到此业务的流程权责，无法同意审批！"
        });
        return false;
    } else {
        //所有待审核节点
        var allAudit = "";
        //所有待知会节点
        var allNotify = "";
        //当前审核节点
        var curAuditor = processAudit;
        //知会节点数组
        var notifyArray =
            Betools.tools.deNull(allNotify) == "" ? "" : allNotify.split(",");

        //如果不是自由流程，则从权责配置中获取待审核人列表，否则，使用自由流程配置的审核人员列表
        if (curRow.business_code != "000000000") {
            try {
                //根据权责配置，获取所有待审核人员列表
                allAudit =
                    "," +
                    fixedWFlow["audit"] +
                    "," +
                    fixedWFlow["approve"] +
                    ",";
                //根据权责配置，获取所有待知会人员列表
                allNotify = fixedWFlow["notify"];
                //设置审批节点
                approveNode = fixedWFlow["approve"];
            } catch (error) {
                vant.Dialog.alert({
                    message: "固化流程设置节点失败，无法进行审批操作！"
                });
                console.log("固化流程设置节点失败 :" + error);
                return false;
            }
        } else {
            try {
                //获取自由流程配置，当前审核节点
                curAuditor = curRow["employee"];

                try {
                    //自由流程配置消息
                    freeNode = JSON.parse(curRow.business_data);
                } catch (error) {
                    console.log(error);
                }

                //检查是否存在自由流程节点audit_node & approve_node & notify_node , 如果不存在，在下级节点中寻找
                if (!("audit_node" in freeNode) &&
                    !("approve_node" in freeNode) &&
                    !("notify_node" in freeNode)
                ) {
                    try {
                        freeNode = JSON.parse(freeNode.business_data);
                    } catch (error) {
                        console.log(error);
                    }
                }

                //如果仍然未获取到自由流程节点，则从自由流程表中找
                var freeNodeBack = await manage.queryCurFreeWorkflow(
                    bussinessCodeID
                );

                //如果从数据库中查询出，自由流程数据，则替换数据
                if (Betools.tools.deNull(freeNodeBack) != "") {
                    freeNode = freeNodeBack;
                }

                console.log("free node back data : " + freeNodeBack);

                //将加签、会签数据、添加到自由流程数据中
                freeNode.audit_node = `,${freeNode.audit_node},`;
                if (
                    freeNode.audit_node.indexOf("," + curAuditor + ",") !=
                    freeNode.audit_node.lastIndexOf("," + curAuditor + ",")
                ) {
                    //判断是否存在重复人员，如果存在重复人员，则去掉一个重复人员
                    freeNode.audit_node = freeNode.audit_node.replace(
                        "," + curAuditor + ",",
                        ","
                    );
                }

                //添加加签用户数据
                if (Betools.tools.deNull(wflowAddUsers) != "") {
                    freeNode.audit_node = freeNode.audit_node.replace(
                        `,${curAuditor},`,
                        `,${curAuditor},${wflowAddUsers},`
                    );
                }

                //添加会签用户数据
                if (Betools.tools.deNull(wflowNotifyUsers) != "") {
                    freeNode.audit_node = freeNode.audit_node.replace(
                        `,${curAuditor},`,
                        `,${curAuditor},${wflowNotifyUsers},${curAuditor},`
                    );
                }

                //去掉开头、结尾的逗号
                if (freeNode.audit_node.startsWith(",")) {
                    freeNode.audit_node = freeNode.audit_node.substring(1);
                }

                //去掉开头、结尾的逗号
                if (freeNode.audit_node.endsWith(",")) {
                    freeNode.audit_node = freeNode.audit_node.substring(
                        0,
                        freeNode.audit_node.length - 1
                    );
                }

                //根据自由流程配置，获取所有待审核人员列表
                allAudit =
                    "," +
                    Betools.tools.deNull(freeNode.audit_node) +
                    "," +
                    Betools.tools.deNull(freeNode.approve_node) +
                    ",";

                //根据自由流程配置，获取所有待知会人员列表
                notifyArray =
                    Betools.tools.deNull(freeNode.notify_node) == "" ? [] : [freeNode.notify_node];

                //设置审批节点
                approveNode = freeNode.approve_node;
            } catch (error) {
                vant.Dialog.alert({
                    message: "自由流程设置节点失败，无法进行审批操作！"
                });
                console.log("自由流程设置节点失败 :" + error);
                return false;
            }
        }

        //当不存在加签、会签操作时，则进行重复用户消除操作
        if (!(
                Betools.tools.deNull(wflowAddUsers) != "" ||
                Betools.tools.deNull(wflowNotifyUsers) != ""
            )) {
            //判断是否存在重复人员，如果存在重复人员，则去掉一个重复人员
            if (
                allAudit.indexOf("," + curAuditor + ",") !=
                allAudit.lastIndexOf("," + curAuditor + ",")
            ) {
                allAudit = allAudit.replace("," + curAuditor + ",", ",");
            }
        }

        //当前审核分割组，第一组是已经审核通过的，第二组是待审核的
        var auditArray = allAudit.split("," + curAuditor + ",");
        //如果存在审核人
        var firstAuditor = auditArray[1];
        //流程状态
        var bpmStatus = {};

        //如果待审核节点为空，则表示已经审批通过 //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废
        if (firstAuditor == "") {
            //设置流程状态 审批节点已经走完，流程状态为4：已完成
            bpmStatus = { bpm_status: "4" };

            //执行知会流程，添加多条知会记录。将知会节点的所有待知会节点，拆分成为数组，遍历数组，数组中每个元素，推送一条知会记录，注意forEach不能使用await
            for (let item of notifyArray) {
                //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
                var employee = null;
                //流程岗位
                var process_station = null;
                //审批相关流程节点
                var pnode = {};

                if (curRow.business_code != "000000000") {

                    try {
                        employee = await manage.queryProcessNodeEmployee(item);
                        process_station = await manage.queryProcessNodeProcName(item);
                    } catch (error) {
                        console.error(error);
                    }

                    //提交审批相关处理信息
                    pnode = {
                        id: manage.queryRandomStr(32), //获取随机数
                        table_name: tableName, //业务表名
                        main_value: curRow["main_value"], //表主键值
                        business_data_id: curRow["business_data_id"], //业务具体数据主键值
                        business_code: fixedWFlow["id"], //业务编号
                        process_name: fixedWFlow["items"], //流程名称
                        employee: employee[0]["employee"],
                        process_station: process_station[0]["item_text"],
                        process_audit: item,
                        operate_time: date,
                        create_time: date,
                        proponents: curRow["proponents"],
                        content: curRow["content"],
                        business_data: JSON.stringify(curRow)
                    };
                } else {

                    //提交审批相关处理信息
                    pnode = {
                        id: manage.queryRandomStr(32), //获取随机数
                        table_name: tableName, //业务表名
                        main_value: curRow["business_data_id"], //表主键值
                        business_data_id: curRow["business_data_id"], //业务具体数据主键值
                        business_code: "000000001", //业务编号
                        process_name: "自由流程知会", //流程名称
                        employee: item,
                        process_station: "自由流程知会",
                        process_audit: "000000001",
                        proponents: curRow["proponents"],
                        content: curRow["content"],
                        operate_time: date,
                        create_time: date,
                        business_data: curRow.business_data
                    };
                }

                //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
                result = await manage.postProcessLogInformed(pnode);
            }

            //执行事务处理
            var operationData = {
                id: manage.queryRandomStr(32),
                type: "approve",
                create_by: userInfo["username"],
                create_time: date,
                table_name: tableName,
                table_id: curRow["business_data_id"],
                table_data: JSON.stringify(curRow),
                status: "wait",
                current_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "PR_LOG",
                    data: ""
                }),
                history_data: JSON.stringify({
                    operation: "add",
                    tableName: "PR_LOG_HISTORY",
                    data: prLogHisNode
                }),
                inform_data: JSON.stringify({
                    operation: "add",
                    tableName: "PR_LOG_INFORMED",
                    data: pnode
                }),
                delete_data: JSON.stringify({
                    operation: "delete",
                    tableName: "PR_LOG",
                    data: prLogHisNode
                }),
                origin_data: JSON.stringify({
                    operation: "patch",
                    tableName: tableName,
                    id: curRow["business_data_id"],
                    data: bpmStatus
                }),
                trends_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "",
                    data: ""
                }),
                task_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "",
                    data: ""
                }),
                other_data: JSON.stringify({})
            };

            //执行审批业务
            await workflow.postWorkflowApprove(
                tableName,
                curRow,
                operationData,
                null,
                prLogHisNode,
                bpmStatus,
                freeNode,
                wflowAddUsers,
                wflowNotifyUsers,
                curAuditor
            );

            //如果是计划任务，则需要生成分配任务数据，并写入数据库中
            await handleTaskItem(data, curRow);

            //当前已经是最后一个审批节点，流程已经处理完毕
            vant.Dialog.alert({
                message: "同意审批成功，审批流程处理完毕！"
            });

            let receiveURL = null;
            //发送企业微信通知，知会人力/财务人员，进行知会确认操作！
            try {
                receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${bussinessNode.id}&pid=&tname=bs_reward_apply&panename=myrewardlist&typename=hr_admin_ids&bpm_status=4&proponents=${bussinessNode.hr_admin_ids}&role=hr`);
                await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${bussinessNode.hr_admin_ids}/亲爱的同事，${bussinessNode.create_by}提交的案件发起申请已处理完毕：${bussinessNode["title"]}，内容：${bussinessNode['content']}，请及时进行知会确认操作！?type=reward&rurl=${receiveURL}`)
                    .set('accept', 'json');
            } catch (error) {
                console.log(error);
            }
            //发送企业微信通知，知会流程发起人，此案件发起申请已经完成！
            try {
                receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${bussinessCodeID}&pid=&tname=bs_reward_apply&panename=mytodolist&typename=wflow_done&bpm_status=4&proponents=${bussinessNode.create_by}`);
                await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${bussinessNode.create_by}/亲爱的同事，您提交的案件发起申请已处理完毕：${bussinessNode["title"]}，内容：${bussinessNode['content']}！?type=reward&rurl=${receiveURL}`)
                    .set('accept', 'json');
            } catch (error) {
                console.log(error);
            }

            //再次检查此奖惩申请的流程状态，是否为已完成，如果不是已完成，则设置为已完成
            try {
                //修改审批状态为审批中
                result = await manage.patchTableData(tableName, bussinessCodeID, { id: bussinessCodeID, status: '已完成', bpm_status: bpmStatus.bpm_status });
            } catch (error) {
                console.log(error);
            }

            //将此审批流程中所涉及的所有奖惩明细数据的状态设置为已完成
            try {
                //查询奖惩明细数据
                const list = await query.queryTableDataByPid('bs_reward_items', bussinessCodeID); //查询诉讼案件明细数据

                //遍历奖惩明细数据，并设置状态为已完成
                for (const elem of list) {
                    manage.patchTableData(tableName.replace('apply', 'items'), elem.id, { pid: bussinessCodeID, status: '已完成', bpm_status: bpmStatus.bpm_status });
                }

            } catch (error) {
                console.log(error);
            }

        } else {
            //如果firstAuditor是逗号开头，则去掉开头的逗号
            firstAuditor =
                firstAuditor.indexOf(",") == 0 ?
                firstAuditor.substring(1) :
                firstAuditor;

            //获取下一审核节点
            firstAuditor = firstAuditor.split(",")[0];

            //设置流程 检查当前审核节点是否为审批节点，如果是，则bpm_status_code设置为3：审批中，否则，状态为 状态为2：审核中
            approveNode == firstAuditor ?
                (bpmStatus = { bpm_status: "3" }) :
                (bpmStatus = { bpm_status: "2" });

            //审批相关处理信息
            pnode = {};

            if (curRow.business_code != "000000000") {
                //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
                employee = await manage.queryProcessNodeEmployee(
                    firstAuditor
                );
                //流程岗位
                process_station = await manage.queryProcessNodeProcName(
                    firstAuditor
                );
                //提交审批相关处理信息
                pnode = {
                    id: manage.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: curRow["main_value"], //表主键值
                    business_data_id: curRow["business_data_id"], //业务具体数据主键值
                    business_code: fixedWFlow["id"], //业务编号
                    process_name: fixedWFlow["items"], //流程名称
                    employee: employee[0]["employee"],
                    process_station: process_station[0]["item_text"],
                    process_audit: firstAuditor,
                    proponents: curRow["proponents"],
                    content: curRow["content"],
                    create_time: date,
                    business_data: curRow.business_data
                };
            } else {
                //提交审批相关处理信息
                pnode = {
                    id: manage.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: curRow["business_data_id"], //表主键值
                    business_data_id: curRow["business_data_id"], //业务具体数据主键值
                    business_code: "000000000", //业务编号
                    process_name: "自由流程审批", //流程名称
                    employee: firstAuditor,
                    process_station: "自由流程审批",
                    process_audit: "000000000",
                    proponents: curRow["proponents"],
                    content: curRow["content"],
                    operate_time: date,
                    create_time: date,
                    business_data: curRow.business_data
                };
            }

            //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
            var vflag = await manage.queryApprovalLength(
                tableName,
                curRow["business_data_id"]
            );

            if (vflag == 0) {
                //数据库中已经存在此记录，提示用户无法提交审批
                vant.Dialog.alert({
                    message: `处理异常，请稍后重试；如果多次处理异常，可能需要撤销当前审批，重新发起审批流程！异常流程数据[status:${vflag}]`,
                });
            } else {
                //执行事务处理
                let operationData = {
                    id: manage.queryRandomStr(32),
                    type: "next",
                    create_by: userInfo["username"],
                    create_time: date,
                    table_name: tableName,
                    table_id: curRow["business_data_id"],
                    table_data: JSON.stringify(curRow),
                    status: "wait",
                    current_data: JSON.stringify({
                        opeartion: "add",
                        tableName: "PR_LOG",
                        data: pnode
                    }),
                    history_data: JSON.stringify({
                        operation: "add",
                        tableName: "PR_LOG_HISTORY",
                        data: prLogHisNode
                    }),
                    inform_data: JSON.stringify({
                        operation: "add",
                        tableName: "PR_LOG_INFORMED",
                        data: ""
                    }),
                    delete_data: JSON.stringify({
                        operation: "delete",
                        tableName: "PR_LOG",
                        data: prLogHisNode
                    }),
                    origin_data: JSON.stringify({
                        operation: "patch",
                        tableName: tableName,
                        id: curRow["business_data_id"],
                        data: bpmStatus
                    }),
                    trends_data: JSON.stringify({
                        opeartion: "add",
                        tableName: "",
                        data: ""
                    }),
                    task_data: JSON.stringify({
                        opeartion: "add",
                        tableName: "",
                        data: ""
                    }),
                    other_data: ""
                };

                //执行审批业务
                await workflow.postWorkflowApprove(
                    tableName,
                    curRow,
                    operationData,
                    pnode,
                    prLogHisNode,
                    bpmStatus,
                    freeNode,
                    wflowAddUsers,
                    wflowNotifyUsers,
                    curAuditor
                );

                //此处获取到待审核人员firstAuditor,可以向此用户推送审批消息，打开消息即可审批。
                await handleNotifyHR(firstAuditor, curRow["proponents"], '', encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${curRow.business_data_id}&pid=${pnode.id}&tname=bs_reward_apply&panename=mytodolist&typename=wflow_todo&bpm_status=${bpmStatus.bpm_status}&proponents=${curRow["proponents"]}`));

                //提示信息 //console.log(" 修改当前记录审批状态为处理中返回结果:" + JSON.stringify(result) );
                vant.Dialog.alert({
                    message: "同意审批成功，审批流程已推向后续处理人！",
                })

                console.log("operationData : " + operationData);

                //发送审批流程通知，通知流程下一位审批人，点击审批详情，处理用户提交的诉讼案件流程审批通知。
                try {
                    const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${bussinessCodeID}&pid=&tname=bs_reward_apply&panename=mytodolist&typename=wflow_todo&bpm_status=2&proponents=${firstAuditor}`);
                    await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${firstAuditor}/亲爱的同事，您收到案件发起申请审批处理请求：${curRow["title"]}，内容：${curRow['content']}，请您及时进行审批处理！?type=reward&rurl=${receiveURL}`)
                        .set('accept', 'json');
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    //同意审批成功
    return 'success';

}

// 通知HR（人力薪资相关专职人员查看数据）
async function handleNotifyHR(user_group_ids, userinfo, value, receiveURL) {
    try {
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${user_group_ids}/亲爱的同事，员工‘${userinfo}’提交了的案件发起申请，请到奖惩申请服务进行流程审批操作！?type=reward&rurl=${receiveURL}`)
            .set('accept', 'json');
    } catch (error) {
        console.log(error);
    }
};

/**
 * @function 生成任务记录数据
 */
async function handleTaskItem(data, curRow, result = "") {

    //打印表单名称
    var tableName = Betools.tools.queryUrlString("table_name");

    //获取当前时间戳
    var timestamp = new Date().getTime();

    //如果是计划任务表，则生成任务数据
    if (tableName == "bs_plan_task") {
        //遍历数据，执行持久化操作
        for (var item of data) {
            //删除字段
            delete item.no;
            delete item.real_start_time;
            delete item.real_end_time;
            delete item.date;
            delete item.work_date;
            //设置创建日期
            item.create_time = Betools.tools.formatDate(timestamp, "yyyy-MM-dd");
            //设置所属部门
            item.depart_name = curRow.depart_name;
            //设置任务状态
            item.status = "待提交";
            //生成数据，并持久化
            result = await manage.postTableData("bs_plan_task_mission", item);
        }
    }

    //返回执行结果
    return result;
}


/**
 * @function 驳回审批
 */
export async function handleRejectWF() {

    var result = '';

    await vant.Dialog.confirm({
            title: '确认操作',
            message: '是否进行驳回审批操作?',
        })
        .then(async() => {

            //查询业务编号
            var bussinessCodeID = Betools.tools.queryUrlString("id");

            //获取表单名称
            var tableName = window.decodeURIComponent(Betools.tools.queryUrlString('tname'));

            //查询当前数据
            var curRow = await query.queryTableData(tableName, bussinessCodeID);

            //克隆当前业务数据
            const bussinessNode = JSON.parse(JSON.stringify(curRow));

            //获取当前用户
            var userInfo = Betools.storage.getStore("system_userinfo");

            //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
            await manage.handleUserInfo(userInfo);

            //获取当前时间
            var date = Betools.tools.formatDate(
                new Date().getTime(),
                "yyyy-MM-dd hh:mm:ss"
            );

            //审批动作
            var operation = operation || "驳回";

            //审批意见
            var message = message || curRow.idea_content || "驳回";

            //流程日志编号
            var processLogID = Betools.tools.queryUrlString("pid");

            //流程状态
            var bpmStatus = { bpm_status: "1" };

            //获取当前审批节点的所有数据
            curRow = await manage.queryProcessLogByID(tableName, processLogID);

            //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
            if (!(
                    Betools.tools.deNull(curRow["employee"]).includes(userInfo["username"]) ||
                    Betools.tools.deNull(curRow["employee"]).includes(userInfo["realname"])
                )) {
                vant.Dialog.alert({
                    message: "您不在此审批流程记录的操作职员列中，无法进行驳回操作！"
                });
                return false;
            }

            //获取当前审批节点的所有数据
            curRow = await manage.queryProcessLogByID(tableName, curRow["id"]);

            //获取关于此表单的所有当前审批日志信息
            let node = await manage.queryProcessLog(
                tableName,
                curRow["business_data_id"]
            );

            //遍历node,设置approve_user，action
            node.map((item) => {
                //获取创建时间
                let ctime = item["create_time"];
                //设置审批人员
                item["approve_user"] = userInfo["username"];
                //设置操作动作
                item["action"] = operation;
                //设置操作时间
                item["operate_time"] = date;
                //设置操作意见
                item["action_opinion"] = message;
                //设置创建时间
                item["create_time"] = Betools.tools.formatDate(
                    ctime,
                    "yyyy-MM-dd hh:mm:ss"
                );
            });

            //执行审批驳回业务
            await workflow.postWorkflowApprove(
                tableName,
                curRow,
                null,
                null,
                node,
                bpmStatus
            );

            //提示用户撤销审批操作成功
            vant.Dialog.alert({
                message: "驳回审批成功！"
            });

            //发送企业微信通知，知会流程发起人，此案件发起申请已经完成！
            try {
                receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${bussinessCodeID}&pid=&tname=bs_reward_apply&panename=mytodolist&typename=wflow_done&bpm_status=4&proponents=${bussinessNode.create_by}`);
                await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${bussinessNode.create_by}/亲爱的同事，您提交的案件发起申请已被驳回：${bussinessNode["title"]}，内容：${bussinessNode['content']}，驳回意见：${message}，请修改申请内容后重新提交流程?type=reward&rurl=${receiveURL}`)
                    .set('accept', 'json');
            } catch (error) {
                console.log(error);
            }

            result = 'success';

            return result;
        });

    //返回操作结果
    return result;
}

/**
 * @function 知会确认
 */
export async function handleConfirmWF() {

    var result = '';

    await vant.Dialog.confirm({
            title: '确认操作',
            message: '是否进行确认知会操作?',
        })
        .then(async() => {

            //查询业务编号
            var bussinessCodeID = Betools.tools.queryUrlString("id");

            //获取表单名称
            var tableName = window.decodeURIComponent(Betools.tools.queryUrlString('tname'));

            //查询当前数据
            var curRow = await query.queryTableData(tableName, bussinessCodeID);

            //获取当前用户
            var userInfo = Betools.storage.getStore("system_userinfo");

            //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
            await manage.handleUserInfo(userInfo);

            //获取当前时间
            var date = Betools.tools.formatDate(
                new Date().getTime(),
                "yyyy-MM-dd hh:mm:ss"
            );

            //审批动作
            var operation = operation || "知会";

            //审批意见
            var message = message || curRow.idea_content || "知会确认";

            //流程日志编号
            var processLogID = Betools.tools.queryUrlString("pid");

            //定义流程状态
            var bpmStatus = { bpm_status: "5" };

            //获取当前审批节点的所有数据
            curRow = await manage.queryProcessLogInfByID(
                tableName,
                processLogID
            );

            //设置本次知会确认创建时间
            curRow["create_time"] = date;

            //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
            if (
                Betools.tools.deNull(curRow["approve_user"]).length >=
                Betools.tools.deNull(curRow["employee"]).length
            ) {
                //（1：待提交	2：审核中	3：审批中 4：已完成 5：已完成	10：已作废）
                try {
                    //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
                    result = await manage.postProcessLogHistory(curRow);
                    //删除当前审批节点中的所有记录
                    result = await manage.deleteProcessLogInf(tableName, [curRow]);
                    //如果当前已经进入流程，则需要将流程状态设置为5：已完成
                    result = await manage.patchTableData(
                        tableName,
                        curRow["business_data_id"],
                        bpmStatus
                    );
                } catch (error) {
                    console.log(error);
                }

                //提示用户撤销审批操作成功
                vant.Dialog.alert({
                    message: "知会确认成功！"
                });

                result = 'success';
                return result;
            }

            var employeeList = "," + Betools.tools.deNull(curRow["employee"]) + ",";
            var appoveUserList = "," + Betools.tools.deNull(curRow["approve_user"]) + ",";

            //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
            if (!(
                    tools
                    .deNull(employeeList)
                    .includes("," + userInfo["username"] + ",") ||
                    tools
                    .deNull(employeeList)
                    .includes("," + userInfo["realname"] + ",")
                )) {
                vant.Dialog.alert({
                    message: "您不在此知会记录的操作职员列中，无法进行确认操作！"
                });
                result = 'success';
                return result;
            }

            //已经知会确认过的用户，无法再次知会
            if (
                tools
                .deNull(appoveUserList)
                .includes("," + userInfo["username"] + ",") ||
                tools
                .deNull(appoveUserList)
                .includes("," + userInfo["realname"] + ",")
            ) {
                vant.Dialog.alert({
                    message: "您已经在此知会记录中，执行过确认操作了！"
                });

                result = 'success';

                return result;
            }

            //设置知会确认人员
            curRow["approve_user"] =
                Betools.tools.deNull(curRow["approve_user"]) +
                (Betools.tools.deNull(curRow["approve_user"]) == "" ? "" : ",") +
                userInfo["username"];

            //设置操作内容
            curRow["action"] = operation;

            //设置操作时间
            curRow["operate_time"] = date;

            //设置操作意见
            curRow["action_opinion"] =
                Betools.tools.deNull(curRow["action_opinion"]) +
                (Betools.tools.deNull(curRow["action_opinion"]) == "" ? "" : "\n\r") +
                `${userInfo["username"]}:${message}`;

            //保存当前数据到数据库中
            await manage.patchTableData(
                "PR_LOG_INFORMED",
                curRow["id"],
                curRow
            );

            //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
            if (curRow["approve_user"].length >= curRow["employee"].length) {
                try {
                    //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
                    result = await manage.postProcessLogHistory(curRow);
                    //删除当前审批节点中的所有记录
                    result = await manage.deleteProcessLogInf(tableName, [curRow]);
                    //如果当前已经进入流程，则需要将流程状态设置为5：已完成  （1：待提交	2：审核中	3：审批中 4：已完成 5：已完成	10：已作废）
                    result = await manage.patchTableData(
                        tableName,
                        curRow["business_data_id"],
                        bpmStatus
                    );
                } catch (error) {
                    console.log(error);
                }
            }

            //提示用户撤销审批操作成功
            vant.Dialog.alert({
                message: "知会确认成功！"
            });

            result = 'success';

            return result;
        });

    return result;

}