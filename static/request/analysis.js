/**
 * @description 审批类字段数组
 */
window.wflow_columns = [{
        title: "办理事项",
        dataIndex: "type",
        key: "type",
        slots: { title: "type" },
        width: 100,
        align: "center",
        scopedSlots: { customRender: "type" }
    },
    {
        title: "业务",
        width: 100,
        align: "center",
        key: "name",
        dataIndex: "name",
        scopedSlots: { customRender: "name" }
    },
    {
        title: "主题",
        width: 400,
        align: "left",
        key: "topic",
        dataIndex: "topic",
        scopedSlots: { customRender: "topic" }
    },
    {
        title: "操作人员",
        key: "username",
        width: 150,
        align: "left",
        dataIndex: "username",
        scopedSlots: { customRender: "username" }
    },
    {
        title: "流程发起人",
        key: "proponents",
        width: 150,
        align: "left",
        dataIndex: "proponents",
        scopedSlots: { customRender: "proponents" }
    },
    {
        title: "创建时间",
        width: 100,
        align: "center",
        key: "create_time",
        dataIndex: "create_time",
        scopedSlots: { customRender: "create_time" }
    }
];

/**
 * @description 公告类字段数组
 */
window.announce_columns = [{
        title: "类型",
        dataIndex: "announce_type",
        key: "announce_type",
        slots: { title: "announce_type" },
        width: 100,
        align: "center",
        scopedSlots: { customRender: "announce_type" }
    },
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
        slots: { title: "ctitle" },
        width: 800,
        align: "left",
        scopedSlots: { customRender: "ctitle" }
    },
    {
        title: "时间",
        width: 100,
        align: "center",
        key: "create_time",
        dataIndex: "create_time",
        scopedSlots: { customRender: "create_time" }
    }
];

/**
 * @function 查询我的已办，我的待办，行政公告，红头文件，新闻资讯，奖罚通报，市场观察等内容
 * @param {*} that 
 * @param {*} key 
 * @param {*} storage 
 * @param {*} manageAPI 
 */
async function getData(that, key, storage = window.storage, manageAPI = window.manageAPI) {
    //获取用户信息
    var userInfo = storage.getStore("cur_user");
    let username = userInfo["username"];
    let realname = userInfo["realname"];

    if (that.activeKey == 1 || key == 1) {
        //获取我的待办数据
        that.dataWaitList = await manageAPI.queryProcessLogWait(
            username,
            realname
        );
        that.dataWaitList = that.dataWaitList.slice(0, 10);
    } else if (that.activeKey == 2 || key == 2) {
        //获取我的已办数据
        that.dataDoneList = await manageAPI.queryProcessLogDone(
            username,
            realname
        );
        that.dataDoneList = that.dataDoneList.slice(0, 10);
    } else if (that.activeKey == 3 || key == 3) {
        //TODO 获取我的消息数据
    } else if (that.activeKey == 4 || key == 4) {
        //TODO 获取我的收藏数据
    } else if (that.activeKey == 5 || key == 5) {
        //获取行政公告数据
        that.dataAnnounceList = await manageAPI.queryAnnounceList(0, 10);
        that.dataAnnounceList = that.dataAnnounceList.slice(0, 10);
    } else if (that.activeKey == 6 || key == 6) {
        //获取红头文件数据
        that.dataHeadList = await manageAPI.queryHeadList(0, 10);
        that.dataHeadList = that.dataHeadList.slice(0, 10);
    } else if (that.activeKey == 7 || key == 7) {
        //获取新闻资讯数据
        that.dataNewsList = await manageAPI.queryNewsList(0, 10);
        that.dataNewsList = that.dataNewsList.slice(0, 10);
    } else if (that.activeKey == 8 || key == 8) {
        //获取奖罚通报数据
        that.dataNoticeList = await manageAPI.queryNoticeList(0, 10);
        that.dataNoticeList = that.dataNoticeList.slice(0, 10);
    } else if (that.activeKey == 9 || key == 9) {
        //获取市场观察数据
        that.dataViewsList = await manageAPI.queryViewsList(0, 10);
        that.dataViewsList = that.dataViewsList.slice(0, 10);
    }

    //用户姓名从英文转为中文
    that.transUsername(that.dataWaitList);
    that.transUsername(that.dataDoneList);

    //获取日访问量/总访问量
    try {
        var total = await manageAPI.queryTableDataAll("v_visit_total");
        total = total[0];
        that.ctotal = total["ctotal"];
        that.vtotal = total["vtotal"];
    } catch (error) {
        console.log("error :" + error);
    }

    try {
        var cmonth = moment().format("YYYY-MM");
        var cmonthLast = moment()
            .month(moment().month() - 1)
            .format("YYYY-MM");

        //获取日期格式
        var vMonthTotal = await manageAPI.queryTableDataAll("v_visit_month");

        //遍历数据
        for (let item of vMonthTotal) {
            if (item["month"] == cmonth) {
                that.mtotal = item.total;
            }
            if (item["month"] == cmonthLast) {
                that.mtotalLast = item.total;
            }
        }

        //计算月同比
        that.mtotalRatio = (
            ((that.mtotal - that.mtotalLast) / that.mtotalLast) *
            100
        ).toFixed(2);
    } catch (error) {
        console.log("error :" + error);
    }
}

window.getData = getData;

/**
 * @function 将列表中的用户信息的英文名转为中文名
 * @param {*} list 
 * @param {*} tools 
 * @param {*} storage 
 * @param {*} manageAPI 
 */
async function transUsername(list, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    //遍历数据，将英文名转为中文名
    for (let item of list) {
        try {
            item["username"] = await manageAPI.patchEnameCname(
                item["username"].toString()
            );
            item["proponents"] = await manageAPI.patchEnameCname(
                item["proponents"]
            );

            item["username"] = Betools.tools.deNull(item["username"]).split(",");
        } catch (error) {
            console.log(error);
        }
    }
}

window.transUsername = transUsername;

/**
 * @function 刷新页面重新加载函数
 */
async function reloadData(that, tools = window.tools, storage = window.storage, manageAPI = window.manageAPI) {
    that.spinning = true;
    var userInfo = storage.getStore("cur_user");
    let username = userInfo["username"];
    let realname = userInfo["realname"];
    if (that.activeKey == 1) {
        //获取我的待办数据
        that.dataWaitList = await manageAPI.queryProcessLogWait(
            username,
            realname
        );
        that.dataWaitList = that.dataWaitList.slice(0, 10);
    } else if (that.activeKey == 2) {
        //获取我的已办数据
        that.dataDoneList = await manageAPI.queryProcessLogDone(
            username,
            realname
        );
        that.dataDoneList = that.dataDoneList.slice(0, 10);
    } else if (that.activeKey == 3) {
        console.log(that.activeKey);
    } else if (that.activeKey == 4) {
        console.log(that.activeKey);
    } else if (that.activeKey == 5) {
        //获取行政公告数据
        that.dataAnnounceList = await manageAPI.queryAnnounceList(0, 10);
        that.dataAnnounceList = that.dataAnnounceList.slice(0, 10);
    } else if (that.activeKey == 6) {
        //获取红头文件数据
        that.dataHeadList = await manageAPI.queryHeadList(0, 10);
        that.dataHeadList = that.dataHeadList.slice(0, 10);
    } else if (that.activeKey == 7) {
        //获取新闻资讯数据
        that.dataNewsList = await manageAPI.queryNewsList(0, 10);
        that.dataNewsList = that.dataNewsList.slice(0, 10);
    } else if (that.activeKey == 8) {
        //获取奖罚通报数据
        that.dataNoticeList = await manageAPI.queryNoticeList(0, 10);
        that.dataNoticeList = that.dataNoticeList.slice(0, 10);
    } else if (that.activeKey == 9) {
        //获取市场观察数据
        that.dataViewsList = await manageAPI.queryViewsList(0, 10);
        that.dataViewsList = that.dataViewsList.slice(0, 10);
    }
    //用户姓名从英文转为中文
    that.transUsername(that.dataWaitList);
    that.transUsername(that.dataDoneList);
    that.spinning = false;
}

window.reloadData = reloadData;

/**
 * @function 查看详情页面
 */
async function handleDetailWF(that, record, storage = window.storage) {
    //获取当前操作对象
    var curRow = JSON.parse(JSON.stringify(record));

    //获取当前用户
    var userInfo = storage.getStore("cur_user");

    //获取选中记录的所属表单名称
    var tableName = curRow["tname"];

    //获取操作类型
    var type = curRow["type"] == "知会" ? "notify" : "workflow";

    //设置跳转URL
    var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&processLogID=${curRow.pid}&user=${userInfo.username}&type=${type}`;

    //跳转到相应页面
    that.$router.push(detailURL);
}

window.handleDetailWF = handleDetailWF;

/**
 * @function 查看详情页面
 */
async function handleAnnounceInfo(that, record, tableName, storage = window.storage) {
    //获取当前操作对象
    var curRow = JSON.parse(JSON.stringify(record));

    //获取当前用户
    var userInfo = storage.getStore("cur_user");

    //设置跳转URL
    var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify`;

    //跳转到相应页面
    that.$router.push(detailURL);
}

window.handleAnnounceInfo = handleAnnounceInfo;

/**
 * @function 获取近期用户访问统计，
 */
async function initLogInfo(that, getLoginfo, getVisitInfo, manageAPI) {
    //统计信息
    let loginfo = {};

    //获取缓存
    let temp = window.storage.getStore(`log_info_statistic`);

    //如果获取到缓存，则使用缓存
    if (typeof temp === 'string' && !Object.is(temp, null)) {
        loginfo = JSON.parse(temp);
    } else if (typeof temp === 'object' && !Object.is(temp, null)) {
        loginfo = temp;
    } else {
        //查询登录统计数据
        loginfo.loginfo = (await getLoginfo(null))['result'];

        //查询访问统计数据
        loginfo.visitInfo = (await getVisitInfo())['result'];

        //查询用户信息
        loginfo.vuserTotal = await manageAPI.queryUserCount();

        //查询流程统计
        loginfo.vwflowTotal = await manageAPI.queryWflowCount();

        //查询月度流程统计
        loginfo.vwflowMonthTotal = await manageAPI.queryWflowMonthCount();

        //查询日常流程统计
        loginfo.vwflowDayTotal = await manageAPI.queryWflowDayCount();

        //查询日同比率
        loginfo.vwflowDailyRatio = await manageAPI.queryWflowDailyRatio();

        //查询月同比率
        loginfo.vwflowMonthlyRatio = await manageAPI.queryWflowMonthlyRatio();

        //查询月度新增用户数
        loginfo.vNewUserTotal = await manageAPI.queryNewUserTotal();

        //返回上月月度新增用户数
        loginfo.vNewUserTotalLast = await manageAPI.queryNewUserTotalLastMonth();

        //查询日新增用户数
        loginfo.vNewUserTotalD =
            typeof that.vNewUserTotal == "number" ?
            Number.parseFloat(that.vNewUserTotal / 30).toFixed(2) :
            "-";

        //查询业务数据
        loginfo.vBussinessTotal = await manageAPI.queryBusinessTotal();

        //设置缓存
        window.storage.setStore(`log_info_statistic`, JSON.stringify(loginfo), 36000);
    }

    //设置属性合并
    Object.assign(that, loginfo);
}

window.initLogInfo = initLogInfo;