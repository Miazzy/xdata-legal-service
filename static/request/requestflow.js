/**
 * @function 初始化页面参数
 * @param {*} that 
 * @param {*} tools 
 * @param {*} storage 
 * @param {*} manageAPI 
 */
async function initWflowPage(that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //查询用户数据，将数据缓存到浏览器缓存
    await manageAPI.queryUserNameByDB();

    //获取用户信息
    that.userInfo = storage.getStore("cur_user");

    //设置员工岗位信息/部门信息
    try {
        that.v_user = await manageAPI.queryUserInfoByView(that.userInfo.username);

        that.postName = that.v_user[0]["post"];
        that.departName = that.v_user[0]["name"];

        that.address = that.v_user[0]["address"];
        that.bio = that.v_user[0]["bio"];

        //设置头像信息
        that.avatar =
            window._CONFIG["uploadURL"] + "/" + that.v_user[0]["avatar"];
    } catch (error) {
        console.log("工作台设置员工岗位信息/部门信息异常：" + error);
    }
}

window.initWflowPage = initWflowPage;

/**
 * @function 处理mount事件函数
 */
async function handleMount(that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //业务编码
    var bussinessCodeID = Betools.tools.queryUrlString("id");
    //查询当前节点信息
    var wthat = await manageAPI.watchFormLeave(that);
    //获取返回结果
    var result = await manageAPI.colorProcessDetail(wthat, that);
    //加载流程节点信息
    var wfnode = await that.loadWorkflowNode();
    //检查是否含有多个自由流程信息，将历史自由流程信息，转入自由流程历史表中
    var wftransfer = await that.transferFreeWorkflow();
    //自由流程节点
    var wfreeNode = await manageAPI.queryCurFreeWorkflow(bussinessCodeID);
    //打印标识
    that.printflag = Betools.tools.queryUrlString("printflag") || "false";
    //查询评论信息
    that.replaylist = await manageAPI.queryCurReplayList(bussinessCodeID);
    //获取文件编号
    that.curRow.no = await manageAPI.queryFileNumb(
        window._CONFIG['company'],
        "",
        that.curRow.create_time,
        that.curRow,
        that.tableName
    );
    //打印加载的流程节点信息、自由流程处理信息、page类型
    console.log(
        `wfnode : ${wfnode}  wftransfer : ${wftransfer} wfreeNode : ${wfreeNode} pageType : ${that.pageType} curRow.bpm_status : ${that.curRow.bpm_status} `
    );

    //如果有打印标识，则等待一段时间后进行打印
    setTimeout(() => {
        if (that.printflag == "true") {
            window.print();
        }
    }, 1000);

    //返回结果
    return result;
}

window.handleMount = handleMount;

/**
 * @function 加载数据函数
 */
async function loadData(that, tools, manageAPI) {
    //业务编码
    var bussinessCodeID = Betools.tools.queryUrlString("id");
    //查询当前节点信息
    var wthat = await manageAPI.watchFormLeave(that);
    //获取返回结果
    var result = await manageAPI.colorProcessDetail(wthat, that);
    //加载流程节点信息
    var wfnode = await that.loadWorkflowNode();
    //检查是否含有多个自由流程信息，将历史自由流程信息，转入自由流程历史表中
    var wftransfer = await that.transferFreeWorkflow();
    //自由流程节点
    var wfreeNode = await manageAPI.queryCurFreeWorkflow(bussinessCodeID);
    //查询评论信息
    that.replaylist = await manageAPI.queryCurReplayList(bussinessCodeID);
    //打印加载的流程节点信息、自由流程处理信息、page类型
    console.log(
        `wfnode : ${wfnode}  wftransfer : ${wftransfer} wfreeNode : ${wfreeNode} pageType : ${that.pageType} curRow.bpm_status : ${that.curRow.bpm_status} `
    );
    //返回结果
    return result;
}

window.loadData = loadData;

/**
 * @function 加载流程信息
 */
async function loadWorkflowNode(that, tools, storage, manageAPI) {
    //查询用户信息
    var userlist = await manageAPI.queryUserNameByDB();
    //获取当前流程的节点信息
    var node = await manageAPI.queryWorkflowNode(that.curRow.id);

    //如果本表单没有获取当历史自由流程记录，则从本业务类别中获取曾经的历史自由流程
    try {
        if (
            typeof node == "undefined" ||
            node == null ||
            node == "" ||
            Object.keys(node).length == 0
        ) {
            //获取表单名称
            var tableName = Betools.tools.queryUrlString("table_name");
            //获取当前用户
            var userInfo = storage.getStore("cur_user");

            //获取历史自由流程节点
            node = await manageAPI.queryWorkflowNodeByUser(
                tableName,
                userInfo["username"]
            );
        }
    } catch (error) {
        console.log(error);
    }

    //如果任然没有流程信息，则直接退出
    if (
        typeof node == "undefined" ||
        node == null ||
        node == "" ||
        Object.keys(node).length == 0
    ) {
        return false;
    }

    var startInfo = window.__.find(userlist, user => {
        return user.username == node.start;
    });

    //设置start节点信息
    try {
        startInfo = JSON.parse(JSON.stringify(startInfo));
    } catch (error) {
        console.log(error);
    }

    var approveInfo = window.__.find(userlist, user => {
        return user.username == node.approve;
    });

    //设置approve节点信息
    try {
        approveInfo = JSON.parse(JSON.stringify(approveInfo));
    } catch (error) {
        console.log(error);
    }

    try {
        //如果当前处理节点为审批节点，则审批节点添加处理中标识
        if (approveInfo.username == node.operate) {
            approveInfo.realname = "🏁" + approveInfo.realname + "(处理中)";
        }
    } catch (error) {
        console.error(error);
    }

    try {
        var ulist = node.audit.split(",");
        var auditInfo = { realname: "" };

        //去除‘undefined’数组对象
        ulist = ulist.filter(item => {
            return item != "undefined";
        });

        //去除‘undefined’字符串
        node.audit = ulist.toString();

        window.__.each(ulist, item => {
            try {
                //查询用户信息
                var user = window.__.find(userlist, user => {
                    return user.username == item;
                });
                if (item == node.operate) {
                    auditInfo.realname =
                        auditInfo.realname + "->🏁" + user.realname + "(处理中)";
                } else {
                    auditInfo.realname = auditInfo.realname + "->" + user.realname;
                }
            } catch (error) {
                console.log(error);
            }
        });

        try {
            //如果是逗号开头，则去掉第一个字符
            if (auditInfo.realname.startsWith("->")) {
                auditInfo.realname = auditInfo.realname.substring(2);
            }
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.log(error);
    }

    try {
        var nlist = node.notify.split(",");
        var notifyInfo = { realname: "" };

        //去除‘undefined’数组对象
        nlist = nlist.filter(item => {
            return item != "undefined";
        });

        //去除‘undefined’字符串
        node.notify = nlist.toString();

        window.__.each(nlist, item => {
            try {
                //查询用户信息
                var user = window.__.find(userlist, user => {
                    return user.username == item;
                });
                notifyInfo.realname = notifyInfo.realname + "," + user.realname;
            } catch (error) {
                console.log(error);
            }
        });

        //如果是逗号开头，则去掉第一个字符
        if (notifyInfo.realname.trim().startsWith(",")) {
            notifyInfo.realname = notifyInfo.realname.trim().substring(1);
        }

    } catch (error) {
        console.log(error);
    }

    //设置流程节点信息
    if (node.start != null && node.start != "") {
        that.startusers = `发起: ${startInfo.realname}`;
    }
    if (node.audit != null && node.audit != "") {
        that.auditusers = `审核: ${auditInfo.realname}`;
        that.wflowUsers = node.audit;
    }
    if (node.approve != null && node.approve != "") {
        that.approveusers = `审批: ${approveInfo.realname}`;
        that.approveUser = node.approve;
    }
    if (node.notify != null && node.notify != "") {
        that.messageusers = `知会：${notifyInfo.realname}`;
        that.notifyUsers = node.notify;
    }
    //设置发起、审核、审批、知会节点的width
    setTimeout(() => {
        var width = $(".ant-steps-item").width() - 10;
        $(".ant-steps-item-description").css("max-width", width + "px");
        $(".ant-steps-item-description").css("margin-left", "-30px");
        $(".ant-steps-item-description").css("font-size", "12px");
    }, 255);
}

window.loadWorkflowNode = loadWorkflowNode;

/**
 * @function 处理打印操作
 */
async function handlePrint(that) {
    //获取当前URL
    var url = window.location.href;

    //检查是否在单独页面，如果不是在单独的页面显示，则跳转到单独页面，并弹出打印弹框
    if (url.includes("workflow/view?table_name")) {
        window.open(url.replace("workflow", "basewflow") + "&printflag=true");
    } else {
        that.curRow.fileStatus = 1;
        that.printflag = "true";
        setTimeout(() => {
            that.printflag = "false";
            that.curRow.fileStatus = 0;
        }, 10000);
    }
}

window.handlePrint = handlePrint;

/**
 * @function 弹出框确认函数
 */
async function tipHandleOk(that) {
    that.tipConfirmLoading = true;
    setTimeout(() => {
        that.loadData();
        that.tipVisible = false;
        that.tipConfirmLoading = false;
    }, 300);
}

window.tipHandleOk = tipHandleOk;

/**
 * @function 弹出框取消操作
 */
async function tipHandleCancel(that) {
    that.loadData();
    that.tipVisible = false;
}

window.tipHandleCancel = tipHandleCancel;

/**
 * @function 生成二维码操作
 */
async function handleQRcode(that) {
    //生成分享链接
    var url = window.location.href.replace("workflow", "basewflow");

    //根据分享链接生成二维码显示URL
    that.qrcodeUrl = url;

    //弹出弹框显示二维码
    that.qrcodeVisible = true;
}

window.handleQRcode = handleQRcode;

/**
 * @function 生成短链接操作
 */
async function handleShort(that, storage, tools, manageAPI) {
    //生成分享链接
    var url = window.location.href.replace("workflow", "basewflow");
    //加密后的URL
    var encode = window.btoa(url);

    var originNode = storage.getStore(encode);

    //如果获取的短链随机码有误，则清空缓存
    if (!Betools.tools.isNull(originNode) && originNode.code.includes("undefined")) {
        originNode = "";
        Betools.storage.clearStore(encode);
    }

    if (Betools.tools.deNull(originNode) != "") {
        //获取短随机码
        let random = originNode.code;
        //获取失效时间
        let expire_ = originNode.expire_;

        //获取当前时间
        var expire = new Date();
        expire = Betools.tools.formatDate(date, "yyyyMMdd");

        //缓存未失效，则直接展示二维码
        if (expire <= expire_) {
            //弹出弹框显示端链接
            that.shortUrl =
                "本文分享地址：" + window._CONFIG["domain"] + "/s/" + random;

            //弹出弹框显示二维码
            that.shortUrlVisible = true;

            //设置返回值
            return true;
        }
    }

    //计算一个短随机码值
    let random = manageAPI.queryRandom(4);

    //获取时间戳
    var timestamp = new Date().getTime();

    //统计次数
    var count = 0;

    //失效时间
    var date = new Date();
    date.setMonth(date.getMonth() + 1);
    var datetime = Betools.tools.formatDate(date, "yyyy-MM-dd hh:mm:ss");
    var datestr = Betools.tools.formatDate(date, "yyyyMMdd");

    //设置应该保存数据
    var node = {
        id: random,
        code: random,
        url: url,
        count: count,
        expire: datetime,
        expire_: datestr,
        time: timestamp
    };

    //保存到缓存中
    storage.setStore(encode, JSON.stringify(node));

    //将短随机码和真实链接对应关系写入数据库中，有效时间30+-2天
    manageAPI.postTableData("bs_short_link", node);

    //弹出弹框显示端链接
    that.shortUrl =
        "本文分享地址：" + window._CONFIG["domain"] + "/s/" + random;

    //弹出弹框显示二维码
    that.shortUrlVisible = true;
}

window.handleShort = handleShort;

async function handlePreview(item, manageAPI) {
    let type = ['doc', 'docx', 'xlsx', 'xls', 'ppt', 'pptx'];
    //检测转化后的FileURL是否可用，如果可用则使用本地地址预览，否则使用kkfileview预览
    let existFlag = await manageAPI.queryUrlValid(item.file);
    let suffix = item.name.split('.');
    suffix = suffix[suffix.length - 1];
    //如果文件地址不存在，则使用kkfileview预览模式，否则使用自带预览服务
    if (!existFlag && type.includes(suffix)) {
        window.open(window._CONFIG["previewURL"] + item.msrc);
    } else {
        //window打开链接
        window.open(item.src);
    }
}

window.handlePreview = handlePreview;

/**
 * @function 处理下载功能
 */
async function handleDownLoad(item, that) {
    //执行下载操作
    try {
        that.$message.warning('开始下载中，请稍等...');
        window.saveAs(item.msrc, item.name);
    } catch (error) {
        window.open(item.msrc);
    }
}

window.handleDownLoad = handleDownLoad;

/**
 * @function 处理用户信息
 */
async function handleUserInfo(userInfo, that, storage) {
    //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
    if (typeof userInfo == "undefined" && userInfo == null) {
        //确认用户信息
        that.$confirm_({
            title: "提示信息",
            content: "用户登录信息过期，请重新登录！",
            onOk: async() => {
                //清空缓存信息
                Betools.storage.clearAll();
                //跳转到登录页面
                that.$router.push(`/user/login`);
            }
        });
        return false;
    } else {
        return true;
    }
}

window.handleUserInfo = handleUserInfo;

/**
 * @function 同意审批
 */
async function handleApproveWF(that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI, workflowAPI = window.workflowAPI) {
    //查询业务编号
    var bussinessCodeID = Betools.tools.queryUrlString("id");

    //会签、加签用户
    var wflowSpecUser = that.wflowAddUsers + "," + that.wflowNotifyUsers;

    //查询自由流程节点
    var wfreeNode = await manageAPI.queryCurFreeWorkflow(bussinessCodeID);

    //如果加签、会签同时选择，则无法提交
    if (
        Betools.tools.deNull(that.wflowAddUsers) != "" &&
        Betools.tools.deNull(that.wflowNotifyUsers) != ""
    ) {
        that.$message.warning(
            "无法同时进行加签及会签操作，请单独选择加签用户或会签用户！"
        );
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
        readyUser = await manageAPI.patchEnameCname(readyUser);

        //提示错误信息
        that.$message.warning(
            `加签/会签用户，不能选择审批流程中已经存在的用户(${readyUser})!`
        );
        return false;
    }

    //确认提交此自由流程
    that.$confirm_({
        title: "确认操作",
        content: "是否确认提交此自由流程?",
        onOk: async() => {
            //返回结果
            var result;

            //获取当前用户
            var userInfo = storage.getStore("cur_user");

            //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
            await that.handleUserInfo(userInfo);

            //获取当前时间
            var date = Betools.tools.formatDate(
                new Date().getTime(),
                "yyyy-MM-dd hh:mm:ss"
            );
            //审批动作
            var operation = operation || "同意";
            //审批意见
            var message = message || that.curRow.idea_content || "同意";
            //当前被选中记录数据
            var curRow = that.curRow;
            //流程日志编号
            var processLogID = Betools.tools.queryUrlString("processLogID");
            //打印表单名称
            var tableName = Betools.tools.queryUrlString("table_name");
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
                curRow = await manageAPI.queryProcessLogByID(
                    tableName,
                    processLogID
                );
            } catch (error) {
                console.log(error);
            }

            //未获取当前审批流程
            if (Betools.tools.deNull(curRow) == "") {
                that.$message.warning(
                    "未找到下一节点的流程信息，请刷新页面，查看是否已经审批完成！"
                );
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
                that.$message.warning(
                    "您不在此审批流程记录的操作职员列中，无法进行审批操作！"
                );
                return false;
            }

            try {
                //获取关于此表单的所有当前审批日志信息
                node = await manageAPI.queryProcessLog(tableName, bussinessCodeID);
            } catch (error) {
                console.log(error);
            }

            //遍历node,设置approve_user，action
            window.__.each(node, function(item) {
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
                item["create_time"] = Betools.tools.formatDate(
                    ctime,
                    "yyyy-MM-dd hh:mm:ss"
                );
            });

            //转历史日志节点
            prLogHisNode = JSON.parse(JSON.stringify(node));
            //第一步，获取此表单，关联的流程业务模块；查询SQL , 获取流程权责中关联业务含有tableName的流程权责
            rights = await manageAPI.queryBusinessInfo(tableName);
            //选定流程权责
            that.fixedWFlow = rights[0];
            //设置当前流程审批权责
            that.rights = rights;

            //如果流程权责有多个，那么弹出选择框，让用户自己选择一个流程
            if (rights.length > 1 && curRow.business_code != "000000000") {
                //that.modelModal = true;
                that.tipVisible = true;
                that.tipContent =
                    "获取到此业务含有多个流程权责，请联系管理员进行配置！";
                return false;
            } else if (
                rights.length <= 0 &&
                curRow.business_code != "000000000"
            ) {
                that.tipVisible = true;
                that.tipContent = "未获取到此业务的流程权责，无法同意审批！";
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
                            that.fixedWFlow["audit"] +
                            "," +
                            that.fixedWFlow["approve"] +
                            ",";
                        //根据权责配置，获取所有待知会人员列表
                        allNotify = that.fixedWFlow["notify"];
                        //设置审批节点
                        approveNode = that.fixedWFlow["approve"];
                    } catch (error) {
                        that.tipVisible = true;
                        that.tipContent = "固化流程设置节点失败，无法进行审批操作！";
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
                        var freeNodeBack = await manageAPI.queryCurFreeWorkflow(
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
                        if (Betools.tools.deNull(that.wflowAddUsers) != "") {
                            freeNode.audit_node = freeNode.audit_node.replace(
                                `,${curAuditor},`,
                                `,${curAuditor},${that.wflowAddUsers},`
                            );
                        }

                        //添加会签用户数据
                        if (Betools.tools.deNull(that.wflowNotifyUsers) != "") {
                            freeNode.audit_node = freeNode.audit_node.replace(
                                `,${curAuditor},`,
                                `,${curAuditor},${that.wflowNotifyUsers},${curAuditor},`
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
                        that.tipVisible = true;
                        that.tipContent = "自由流程设置节点失败，无法进行审批操作！";
                        console.log("自由流程设置节点失败 :" + error);
                        return false;
                    }
                }

                //当不存在加签、会签操作时，则进行重复用户消除操作
                if (!(
                        Betools.tools.deNull(that.wflowAddUsers) != "" ||
                        Betools.tools.deNull(that.wflowNotifyUsers) != ""
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
                                employee = await manageAPI.queryProcessNodeEmployee(item);
                                process_station = await manageAPI.queryProcessNodeProcName(item);
                            } catch (error) {
                                console.error(error);
                            }

                            //提交审批相关处理信息
                            pnode = {
                                id: manageAPI.queryRandomStr(32), //获取随机数
                                table_name: tableName, //业务表名
                                main_value: curRow["main_value"], //表主键值
                                business_data_id: curRow["business_data_id"], //业务具体数据主键值
                                business_code: that.fixedWFlow["id"], //业务编号
                                process_name: that.fixedWFlow["items"], //流程名称
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
                                id: manageAPI.queryRandomStr(32), //获取随机数
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
                        result = await manageAPI.postProcessLogInformed(pnode);
                    }

                    //执行事务处理
                    var operationData = {
                        id: manageAPI.queryRandomStr(32),
                        type: "approve",
                        create_by: userInfo["username"],
                        create_time: date,
                        table_name: tableName,
                        table_id: curRow["business_data_id"],
                        table_data: JSON.stringify(that.curRow),
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
                    await workflowAPI.postWorkflowApprove(
                        tableName,
                        curRow,
                        operationData,
                        null,
                        prLogHisNode,
                        bpmStatus,
                        freeNode,
                        that.wflowAddUsers,
                        that.wflowNotifyUsers,
                        curAuditor
                    );

                    //如果是计划任务，则需要生成分配任务数据，并写入数据库中
                    await that.handleTaskItem();

                    //当前已经是最后一个审批节点，流程已经处理完毕
                    that.tipContent = "同意审批成功，审批流程处理完毕！";

                    //TODO 以前此表单的自由流程进入历史 //TODO 删除以前此表单对应的自由流程
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
                        employee = await manageAPI.queryProcessNodeEmployee(
                            firstAuditor
                        );
                        //流程岗位
                        process_station = await manageAPI.queryProcessNodeProcName(
                            firstAuditor
                        );
                        //提交审批相关处理信息
                        pnode = {
                            id: manageAPI.queryRandomStr(32), //获取随机数
                            table_name: tableName, //业务表名
                            main_value: curRow["main_value"], //表主键值
                            business_data_id: curRow["business_data_id"], //业务具体数据主键值
                            business_code: that.fixedWFlow["id"], //业务编号
                            process_name: that.fixedWFlow["items"], //流程名称
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
                            id: manageAPI.queryRandomStr(32), //获取随机数
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
                    var vflag = await manageAPI.queryApprovalLength(
                        tableName,
                        curRow["business_data_id"]
                    );

                    if (vflag == 0) {
                        //数据库中已经存在此记录，提示用户无法提交审批
                        that.tipContent = `处理异常，请稍后重试；如果多次处理异常，可能需要撤销当前审批，重新发起审批流程！异常流程数据[status:${vflag}]`;
                    } else {
                        //执行事务处理
                        let operationData = {
                            id: manageAPI.queryRandomStr(32),
                            type: "next",
                            create_by: userInfo["username"],
                            create_time: date,
                            table_name: tableName,
                            table_id: curRow["business_data_id"],
                            table_data: JSON.stringify(that.curRow),
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
                        await workflowAPI.postWorkflowApprove(
                            tableName,
                            curRow,
                            operationData,
                            pnode,
                            prLogHisNode,
                            bpmStatus,
                            freeNode,
                            that.wflowAddUsers,
                            that.wflowNotifyUsers,
                            curAuditor
                        );

                        //提示信息 //console.log(" 修改当前记录审批状态为处理中返回结果:" + JSON.stringify(result) );
                        that.tipContent = "同意审批成功，审批流程已推向后续处理人！";

                        console.log("operationData : " + operationData);
                    }
                }
            }
            //提示用户撤销审批操作成功
            that.tipVisible = true;

            //刷新页面数据
            manageAPI.setTimeouts(() => {
                that.loadData();
            }, ...that.refreshInterval);

            //设置为view预览模式
            that.pageType = "view";

            //同意审批成功
            return result;
        }
    });
}

window.handleApproveWF = handleApproveWF;

/**
 * @function 生成任务记录数据
 */
async function handleTaskItem(result = "", that, tools = window.tools, manageAPI = window.manageAPI) {

    //打印表单名称
    var tableName = Betools.tools.queryUrlString("table_name");

    //获取当前时间戳
    var timestamp = new Date().getTime();

    //如果是计划任务表，则生成任务数据
    if (tableName == "bs_plan_task") {
        //遍历数据，执行持久化操作
        for (var item of that.data) {
            //删除字段
            delete item.no;
            delete item.real_start_time;
            delete item.real_end_time;
            delete item.date;
            delete item.work_date;
            //设置创建日期
            item.create_time = Betools.tools.formatDate(timestamp, "yyyy-MM-dd");
            //设置所属部门
            item.depart_name = that.curRow.depart_name;
            //设置任务状态
            item.status = "待提交";
            //生成数据，并持久化
            result = await manageAPI.postTableData("bs_plan_task_mission", item);
        }
    }

    //返回执行结果
    return result;
}

window.handleTaskItem = handleTaskItem;

/**
 * @function 驳回审批
 */
async function handleRejectWF(that, storage = window.storage, tools = window.tools, manageAPI = window.manageAPI, workflowAPI = window.workflowAPI) {
    //是否进行驳回审批操作?
    that.$confirm_({
        title: "确认操作",
        content: "是否进行驳回审批操作?",
        onOk: async() => {

            //返回结果
            var result;

            //获取当前用户
            var userInfo = storage.getStore("cur_user");

            //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
            await that.handleUserInfo(userInfo);

            //获取当前时间
            var date = Betools.tools.formatDate(
                new Date().getTime(),
                "yyyy-MM-dd hh:mm:ss"
            );

            //审批动作
            var operation = operation || "驳回";

            //审批意见
            var message = message || that.curRow.idea_content || "驳回";

            //当前被选中记录数据
            var curRow = that.curRow;

            //流程日志编号
            var processLogID = Betools.tools.queryUrlString("processLogID");

            //打印表单名称
            var tableName =
                curRow["table_name"] || Betools.tools.queryUrlString("table_name");

            //流程状态
            var bpmStatus = { bpm_status: "1" };

            //获取当前审批节点的所有数据
            curRow = await manageAPI.queryProcessLogByID(tableName, processLogID);

            //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
            if (!(
                    Betools.tools.deNull(curRow["employee"]).includes(userInfo["username"]) ||
                    Betools.tools.deNull(curRow["employee"]).includes(userInfo["realname"])
                )) {
                that.$message.warning(
                    "您不在此审批流程记录的操作职员列中，无法进行驳回操作！"
                );
                return false;
            }

            //获取当前审批节点的所有数据
            curRow = await manageAPI.queryProcessLogByID(tableName, curRow["id"]);

            //获取关于此表单的所有当前审批日志信息
            let node = await manageAPI.queryProcessLog(
                tableName,
                curRow["business_data_id"]
            );

            //遍历node,设置approve_user，action
            window.__.each(node, function(item) {
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
            await workflowAPI.postWorkflowApprove(
                tableName,
                curRow,
                null,
                null,
                node,
                bpmStatus
            );

            //提示用户撤销审批操作成功
            that.tipVisible = true;
            that.tipContent = "驳回审批成功！";

            //设置为view预览模式
            that.pageType = "view";

            //刷新页面数据
            manageAPI.setTimeouts(() => {
                that.loadData();
            }, ...that.refreshInterval);

            //返回操作结果
            return result;
        }
    });
}

window.handleRejectWF = handleRejectWF;

/**
 * @function 知会确认
 */
async function handleConfirmWF(that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI, workflowAPI = window.workflowAPI) {
    //是否进行确认知会操作?
    that.$confirm_({
        title: "确认操作",
        content: "是否进行确认知会操作?",
        onOk: async() => {

            //返回结果
            var result;

            //获取当前用户
            var userInfo = storage.getStore("cur_user");

            //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
            await that.handleUserInfo(userInfo);

            //获取当前时间
            var date = Betools.tools.formatDate(
                new Date().getTime(),
                "yyyy-MM-dd hh:mm:ss"
            );

            //审批动作
            var operation = operation || "知会";

            //审批意见
            var message = message || that.curRow.idea_content || "知会确认";

            //当前被选中记录数据
            var curRow = that.curRow;

            //流程日志编号
            var processLogID = Betools.tools.queryUrlString("processLogID");

            //打印表单名称
            var tableName = Betools.tools.queryUrlString("table_name");

            //定义流程状态
            var bpmStatus = { bpm_status: "5" };

            //获取当前审批节点的所有数据
            curRow = await manageAPI.queryProcessLogInfByID(
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
                    result = await manageAPI.postProcessLogHistory(curRow);
                    //删除当前审批节点中的所有记录
                    result = await manageAPI.deleteProcessLogInf(tableName, [curRow]);
                    //如果当前已经进入流程，则需要将流程状态设置为5：已完成
                    result = await manageAPI.patchTableData(
                        tableName,
                        curRow["business_data_id"],
                        bpmStatus
                    );
                } catch (error) {
                    console.log(error);
                }

                //显示弹框，提示知会成功
                that.tipVisible = true;
                that.tipContent = "知会确认成功！";
                return true;
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
                that.$message.warning(
                    "您不在此知会记录的操作职员列中，无法进行确认操作！"
                );
                return false;
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
                that.$message.warning("您已经在此知会记录中，执行过确认操作了！");
                return false;
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
            await manageAPI.patchTableData(
                "PR_LOG_INFORMED",
                curRow["id"],
                curRow
            );

            //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
            if (curRow["approve_user"].length >= curRow["employee"].length) {
                try {
                    //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
                    result = await manageAPI.postProcessLogHistory(curRow);
                    //删除当前审批节点中的所有记录
                    result = await manageAPI.deleteProcessLogInf(tableName, [curRow]);
                    //如果当前已经进入流程，则需要将流程状态设置为5：已完成  （1：待提交	2：审核中	3：审批中 4：已完成 5：已完成	10：已作废）
                    result = await manageAPI.patchTableData(
                        tableName,
                        curRow["business_data_id"],
                        bpmStatus
                    );
                } catch (error) {
                    console.log(error);
                }
            }

            that.tipVisible = true;
            that.tipContent = "知会确认成功！";

            //设置为view预览模式
            that.pageType = "view";

            //刷新页面数据
            manageAPI.setTimeouts(() => {
                that.loadData();
            }, ...that.refreshInterval);

            //返回结果
            return result;
        }
    });
}

window.handleConfirmWF = handleConfirmWF;

/**
 * @function 提交自由流程
 */
async function handleSubmitWF(that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI, workflowAPI = window.workflowAPI) {

    //获取审核用户记录
    var wfUsers = that.wflowUsers;

    //获取知会用户记录
    var nfUsers = that.notifyUsers;

    //获取审批用户，审批用户为终审节点
    var approver = that.approveUser;

    //校验提交信息是否准确
    var checkFlag = workflowAPI.checkSubmitInfo(
        wfUsers,
        nfUsers,
        approver,
        that.pageType,
        that.$confirm_
    );

    //获取当前表单表名
    var curTableName = Betools.tools.queryUrlString("table_name");

    //获取当前表单编号
    var curItemID = Betools.tools.queryUrlString("id");

    //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
    let vflag = await manageAPI.queryApprovalExist(curTableName, curItemID);

    if (vflag) {
        //数据库中已经存在此记录，提示用户无法提交审批
        that.$confirm_({
            title: "温馨提示",
            content: "待审记录中，已经存在此记录，无法再次提交审批！"
        });

        //刷新页面数据
        manageAPI.setTimeouts(() => {
            that.loadData();
        }, ...that.refreshInterval);

        //操作完毕，返回结果
        return true;
    }

    vflag = storage.getStore(
        `start_free_process_@table_name#${curTableName}@id#${curItemID}`
    );

    if (vflag == "true") {
        //数据库中已经存在此记录，提示用户无法提交审批
        that.$confirm_({
            title: "温馨提示",
            content: "此表单才提交过申请，请稍后再提交申请！"
        });

        //刷新页面数据
        manageAPI.setTimeouts(() => {
            that.loadData();
        }, ...that.refreshInterval);

        //操作完毕，返回结果
        return true;
    }

    //如果是计划任务表，则检查任务分配人员是否存在，如果不存在，则提示错误
    if (curTableName == "bs_plan_task") {
        var realname = "";

        //遍历任务数组，找出分配对象是否存在
        for (let item of that.data) {
            let username = await manageAPI.patchCnameEname(item.create_by);

            if (Betools.tools.isNull(username)) {
                realname = item.create_by;
                break;
            }
        }

        if (!Betools.tools.isNull(realname)) {
            //数据库中已经存在此记录，提示用户无法提交审批
            that.$confirm_({
                title: "温馨提示",
                content: `计划任务中，分配责任人: ${realname} 不存在系统中，请修改后在提交审批！`
            });
            return false;
        }

        realname = "";

        //遍历任务数组，找出执行人员是否存在
        for (let item of that.data) {
            if (Betools.tools.isNull(item.task_exector)) {
                continue;
            }

            let username = await manageAPI.patchCnameEname(item.task_exector);

            if (Betools.tools.isNull(username)) {
                realname = item.task_exector;
                break;
            }
        }

        if (!Betools.tools.isNull(realname)) {
            //数据库中已经存在此记录，提示用户无法提交审批
            that.$confirm_({
                title: "温馨提示",
                content: `计划任务中，执行人员: ${realname} 不存在系统中，请修改后在提交审批！`
            });
            return false;
        }
    }

    //如果是计划任务完成表，则必须坚持完成状态的填写，完成情况的填写，完成日期的填写
    if (curTableName == "bs_plan_task_mission") {
        //未填写完成状态，提示用户无法提交审批
        if (that.curRow.status != "已完成") {
            that.$confirm_({
                title: "温馨提示",
                content: `计划任务完成情况表，必须在完成状态为’已完成‘时，才可以提交审批！`
            });
            return false;
        }

        //未填写完成情况说明，提示用户无法提交审批
        if (Betools.tools.isNull(that.curRow.remark)) {
            that.$confirm_({
                title: "温馨提示",
                content: `计划任务完成情况表，未填写’完成情况‘说明，无法提交审批！`
            });
            return false;
        }
    }

    //如果校验标识有误，则直接返回
    if (!checkFlag) {
        return checkFlag;
    }

    //是否确认提交此自由流程?
    that.$confirm_({
        title: "确认操作",
        content: "是否确认提交此自由流程?",
        onOk: async() => {
            //获取当前用户
            var userInfo = storage.getStore("cur_user");

            //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
            await that.handleUserInfo(userInfo);

            //获取审核用户记录
            var wfUsers = that.wflowUsers;

            //获取知会用户记录
            var nfUsers = that.notifyUsers;

            //获取审批用户，审批用户为终审节点
            var approver = that.approveUser;

            //当前时间
            var ctime = Betools.tools.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");

            //获取此表单，关联的流程业务模块
            var tableName = Betools.tools.queryUrlString("table_name");

            //自由流程节点
            var node = {
                id: manageAPI.queryRandomStr(32),
                create_by: userInfo["username"],
                create_time: ctime,
                table_name: tableName,
                main_key: Betools.tools.queryUrlString("id"),
                audit_node: Betools.tools.deNull(wfUsers),
                approve_node: Betools.tools.deNull(approver),
                notify_node: Betools.tools.deNull(nfUsers)
            };

            //提交自由流程审批
            if (Betools.tools.deNull(approver) != "" && that.pageType == "workflowing") {
                //将审批用户记录，知会用户记录，写入相应的自由流程表单中
                var result = null; //await manageAPI.postProcessFreeNode(node);

                const freeWFNode = JSON.parse(JSON.stringify(node));

                //提交发起人审批相关处理信息
                node = {
                    id: manageAPI.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: Betools.tools.queryUrlString("id"), //表主键值
                    business_data_id: Betools.tools.queryUrlString("id"), //业务具体数据主键值
                    business_code: "000000000", //业务编号
                    process_name: "自由流程审批", //流程名称
                    employee: userInfo["username"],
                    process_station: "自由流程审批",
                    process_audit: "000000000",
                    proponents: userInfo["username"],
                    approve_user: userInfo["username"],
                    action: "发起",
                    action_opinion: "发起自由流程",
                    content: that.curRow["content"] ||
                        that.curRow["title"] ||
                        that.curRow["plan_title"] ||
                        that.curRow["task_title"] ||
                        that.curRow['post_require'] ||
                        that.curRow['resign_content'] ||
                        that.curRow['interview_conclusion'] ||
                        that.curRow['repair_content'],
                    operate_time: ctime,
                    create_time: ctime,
                    business_data: JSON.stringify(freeWFNode)
                };

                //发起节点，审批信息，写入审批历史表中
                const startFreeNode = JSON.parse(JSON.stringify(node));

                //获取审核节点中，第一个待审批用户，如果没有选择审核用户，则直接选择审批用户
                var firstWflowUser =
                    Betools.tools.deNull(wfUsers) == "" ?
                    Betools.tools.deNull(approver) :
                    Betools.tools.deNull(wfUsers).split(",")[0];

                //提交审批相关处理信息
                node = {
                    id: manageAPI.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: Betools.tools.queryUrlString("id"), //表主键值
                    business_data_id: Betools.tools.queryUrlString("id"), //业务具体数据主键值
                    business_code: "000000000", //业务编号
                    process_name: "自由流程审批", //流程名称
                    employee: firstWflowUser,
                    process_station: "自由流程审批",
                    process_audit: "000000000",
                    proponents: userInfo["username"],
                    content: that.curRow["content"] ||
                        that.curRow["title"] ||
                        that.curRow["plan_title"] ||
                        that.curRow["task_title"] ||
                        that.curRow['post_require'] ||
                        that.curRow['resign_content'] ||
                        that.curRow['interview_conclusion'] ||
                        that.curRow['repair_content'],
                    operate_time: ctime,
                    create_time: ctime,
                    business_data: JSON.stringify(node)
                };

                //保存审批相关处理信息
                const nextWflowNode = JSON.parse(JSON.stringify(node));

                //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
                let vflag = await manageAPI.queryApprovalExist(
                    tableName,
                    that.curRow["id"]
                );

                if (vflag) {
                    //数据库中已经存在此记录，提示用户无法提交审批
                    that.$confirm_({
                        title: "温馨提示",
                        content: "待审记录中，已经存在此记录，无法再次提交审批！"
                    });

                    //刷新页面数据
                    manageAPI.setTimeouts(() => {
                        that.loadData();
                    }, ...that.refreshInterval);

                    //操作完毕，返回结果
                    return true;
                } else {
                    //处理自由流程发起提交审批操作
                    await workflowAPI.postWorkflowFree(
                        tableName,
                        that.curRow,
                        freeWFNode,
                        startFreeNode,
                        nextWflowNode,
                        "2"
                    );

                    console.log(" 提交审批返回结果: " + JSON.stringify(result));

                    //弹出审批完成提示框 //that.$confirm("提交自由流程审批成功！", "操作成功", {type: "success"});
                    that.$confirm_({
                        title: "操作成功",
                        content: "提交自由流程审批成功！",
                        onOk: () => {
                            console.log("提交自由流程审批成功！");
                        }
                    });

                    //记录当前流程已经提交，短时间内无法再次提交
                    storage.setStore(
                        `start_free_process_@table_name#${curTableName}@id#${curItemID}`,
                        "true",
                        60
                    );

                    //设置为view预览模式
                    that.pageType = "view";

                    //刷新页面数据
                    manageAPI.setTimeouts(() => {
                        that.loadData();
                    }, ...that.refreshInterval);

                    //操作完毕，返回结果
                    return true;
                }
            }

            //提交知会信息确认
            if (Betools.tools.deNull(nfUsers) != "" && that.pageType == "notifying") {
                //获取当前表单信息
                let curRow = await manageAPI.queryTableData(
                    tableName,
                    Betools.tools.queryUrlString("id")
                );

                //检查此业务ID对应最近一个小时的知会信息，一个业务ID最多知会3次
                let loginfo = await manageAPI.queryPRLogInfTotal(
                    Betools.tools.queryUrlString("id")
                );

                let countinfo = await manageAPI.queryTableDataByField(
                    "v_handling_events",
                    "id",
                    Betools.tools.queryUrlString("id")
                );

                //如果当前流程状态没有审批通过，则无法发送知会信息
                if (curRow["bpm_status"] != 4 && curRow["bpm_status"] != 5) {
                    that.$confirm_({
                        title: "温馨提示",
                        content: "此表单业务尚未审批通过，无法进行知会操作！"
                    });
                    return true;
                }

                //同一业务数据，每天最多知会3次
                if (Betools.tools.deNull(loginfo) != "" && loginfo.today >= 3) {
                    that.$confirm_({
                        title: "温馨提示",
                        content: "同一业务数据，每天最多知会3次！"
                    });
                    return true;
                }

                //同一业务数据，总计最多知会10次
                if (Betools.tools.deNull(loginfo) != "" && loginfo.total >= 10) {
                    that.$confirm_({
                        title: "温馨提示",
                        content: "同一业务数据，总计最多知会10次！"
                    });
                    return true;
                }

                //同一业务数据，同时只能知会一次，本次知会确认完毕后，可以再次知会
                if (Betools.tools.deNull(countinfo) != "" && countinfo.length >= 1) {
                    that.$confirm_({
                        title: "温馨提示",
                        content: "此表单业务已进行了知会操作，请不要重复提交!"
                    });
                    return true;
                }

                //提交审批相关处理信息
                var pnode = {
                    id: manageAPI.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: Betools.tools.queryUrlString("id"), //表主键值
                    business_data_id: Betools.tools.queryUrlString("id"), //业务具体数据主键值
                    business_code: "000000001", //业务编号
                    process_name: "自由流程知会", //流程名称
                    employee: Betools.tools.deNull(nfUsers),
                    process_station: "自由流程知会",
                    process_audit: "000000001",
                    operate_time: ctime,
                    create_time: ctime,
                    proponents: userInfo["username"],
                    content: that.curRow["content"] ||
                        that.curRow["title"] ||
                        that.curRow["plan_title"] ||
                        that.curRow["task_title"] ||
                        that.curRow['post_require'] ||
                        that.curRow['resign_content'] ||
                        that.curRow['interview_conclusion'] ||
                        that.curRow['repair_content'],
                    business_data: JSON.stringify(that.curRow)
                };

                //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
                result = await manageAPI.postProcessLogInformed(pnode);

                //显示提示信息 //that.$confirm("知会操作成功！", "操作成功", { type: "success" });
                that.$confirm_({
                    title: "操作成功",
                    content: "知会操作成功！",
                    onOk: () => {
                        console.log("知会操作成功！");
                    }
                });

                //设置为view预览模式
                that.pageType = "view";

                //刷新页面数据
                manageAPI.setTimeouts(() => {
                    that.loadData();
                }, ...that.refreshInterval);

                //返回操作结果
                return true;
            }

            console.log("确认提交此自由流程！");
        }
    });
}

window.handleSubmitWF = handleSubmitWF;

/**
 * @function 发布评论
 */
async function handleWriteComment(that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //获取数据编号
    var id = Betools.tools.isNull(that.curRow.id) ?
        Betools.tools.queryUrlString("id") :
        that.curRow.id;

    if (Betools.tools.isNull(that.replayid)) {
        //定义评论对象
        let node = {
            id: Betools.tools.queryUniqueID(),
            create_by: that.userInfo.username,
            create_time: Betools.tools.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
            content: `${that.replayvalue} `,
            table_name: that.tableName,
            main_key: id,
            avatar: that.avatar
        };

        //清除评论内容
        that.replayvalue = "";

        //提示评论成功
        that.$message.warning("评论成功！");

        //提交评论信息
        await manageAPI.postTableData(
            "bs_comments",
            JSON.parse(JSON.stringify(node))
        );

        //刷新页面数据
        that.loadData();
    } else {
        //先查询出相应评论数据
        let node = await manageAPI.queryTableData("bs_comments", that.replayid);

        //定义回复评论
        var replay = Betools.tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

        //将回复评论加入数组
        replay.push({
            id: Betools.tools.queryUniqueID(),
            create_by: that.userInfo.username,
            create_time: Betools.tools.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
            content: `${that.replayvalue} `,
            table_name: that.tableName,
            avatar: that.avatar
        });

        //新增回复评论
        var replaynode = {
            id: that.replayid,
            replay: JSON.stringify(replay)
        };

        //清除评论内容
        that.replayvalue = "";

        //提交评论信息
        await manageAPI.patchTableData(
            "bs_comments",
            that.replayid,
            JSON.parse(JSON.stringify(replaynode))
        );

        //刷新页面数据
        manageAPI.setTimeouts(() => {
            that.loadData();
        }, ...that.refreshInterval);

        //提示点赞成功
        that.$message.warning("回复成功！");

        //回复评论后，删除回复ID
        that.replayid = "";
    }
}

window.handleWriteComment = handleWriteComment;

async function handleReplayComments(id, username, that, tools = window.tools, manageAPI = window.manageAPI) {
    //清除评论内容
    that.replayvalue = `@${username} `;
    //设置回复id
    that.replayid = id;
    //设置文本框获取焦点
    that.$nextTick(function() {
        try {
            that.$refs.input.focus();
            that.$refs.textarea.focus();
        } catch (error) {
            console.log(error);
        }
    });
}

window.handleReplayComments = handleReplayComments;

/**
 * @function 给评论点赞
 */
async function handleLikeComment(id, that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //先查询出相应评论数据
    var node = await manageAPI.queryTableData("bs_comments", id);

    //点赞数加1
    var likesNode = {
        id: id,
        likes: node.likes + 1
    };

    //提交评论信息
    await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(likesNode))
    );

    //刷新页面数据
    that.loadData();

    //提示点赞成功
    that.$message.warning("点赞成功！");
}

window.handleLikeComment = handleLikeComment;

/**
 * @function 给评论取消点赞
 */
async function handleDislikeComment(id, that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //先查询出相应评论数据
    var node = await manageAPI.queryTableData("bs_comments", id);

    //点赞数加1
    var dislikesNode = {
        id: id,
        dislikes: node.dislikes + 1
    };

    //提交评论信息
    await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(dislikesNode))
    );

    //刷新页面数据
    that.loadData();

    //提示点赞成功
    that.$message.warning("鄙视成功！");
}

window.handleDislikeComment = handleDislikeComment;

/**
 * @function 删除上级评论
 */
async function handleDeleteComments(id, username, that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //先查询出相应评论数据
    let node = await manageAPI.queryTableData("bs_comments", id);

    if (
        that.userInfo.username != username ||
        that.userInfo.username != node.create_by
    ) {
        //提示点赞成功
        that.$message.warning("无法删除他人评论！");
    } else {
        //清除评论内容
        that.replayvalue = "";

        //提交评论信息
        await manageAPI.deleteTableData("bs_comments", id);

        //刷新页面数据
        that.loadData();

        //提示点赞成功
        that.$message.warning("删除回复成功！");
    }
}

window.handleDeleteComments = handleDeleteComments;

/**
 * @function 删除二级评论
 */
async function handleDeleteSubComment(id, subId, that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //先查询出相应评论数据
    let node = await manageAPI.queryTableData("bs_comments", id);

    //定义回复评论
    var replay = Betools.tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

    //将回复评论加入数组
    replay = window.__.reject(replay, item => {
        return item.id == subId;
    });

    //新增回复评论
    var replaynode = {
        id: id,
        replay: JSON.stringify(replay)
    };

    //清除评论内容
    that.replayvalue = "";

    //提交评论信息
    await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(replaynode))
    );

    //刷新页面数据
    that.loadData();

    //提示点赞成功
    that.$message.warning("删除评论成功！");

    //回复评论后，删除回复ID
    that.replayid = "";
}

window.handleDeleteSubComment = handleDeleteSubComment;

/**
 * @function 二级评论点赞
 */
async function handleLikeSubComment(id, subId, that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //先查询出相应评论数据
    let node = await manageAPI.queryTableData("bs_comments", id);

    //定义回复评论
    var replay = Betools.tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

    //将回复评论加入数组
    window.__.each(replay, item => {
        //设置点赞数
        if (item.id == subId) {
            //定义回复评论
            item.likes = Betools.tools.isNull(item.likes) ? 1 : item.likes + 1;
        }
    });

    //重新设置回复谢谢
    var likenode = {
        id: id,
        replay: JSON.stringify(replay)
    };

    //清除评论内容
    that.replayvalue = "";

    //提交评论信息
    await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(likenode))
    );

    //刷新页面数据
    that.loadData();

    //提示点赞成功
    that.$message.warning("点赞成功！");
}

window.handleLikeSubComment = handleLikeSubComment;

/**
 * @function 二级评论点鄙视
 */
async function handleDislikeSubComment(id, subId, that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //先查询出相应评论数据
    let node = await manageAPI.queryTableData("bs_comments", id);

    //定义回复评论
    var replay = Betools.tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

    //将回复评论加入数组
    window.__.each(replay, item => {
        //设置点赞数
        if (item.id == subId) {
            //定义回复评论
            item.dislikes = Betools.tools.isNull(item.dislikes) ? 1 : item.dislikes + 1;
        }
    });

    //重新设置回复信息
    var dislikenode = {
        id: id,
        replay: JSON.stringify(replay)
    };

    //清除评论内容
    that.replayvalue = "";

    //提交评论信息
    await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(dislikenode))
    );

    //刷新页面数据
    that.loadData();

    //提示点赞成功
    that.$message.warning("鄙视成功！");
}

window.handleDislikeSubComment = handleDislikeSubComment;

/**
 * @function 取消发布评论信息
 */
async function handleCancelComment(that) {
    //清除评论内容
    that.replayvalue = "";

    //隐藏评论输入框
    that.commentFlag = "no";

    //提示评论成功
    that.$message.warning("取消评论！");
}

window.handleCancelComment = handleCancelComment;