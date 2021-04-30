try {
    //设置moment
    moment = null || moment;
} catch (error) {
    console.log(error);
}

try {
    //设置superagent
    superagent = null || superagent;
} catch (error) {
    console.log(error);
}

try {
    //定义工具
    window.tools = null || tools;
} catch (e) {
    console.log(e)
}

try {
    //定义请求API
    window.requestAPI = null || requestAPI;
} catch (error) {
    console.log(error);
}

try {
    //定义存储工具
    window.storage = null || storage;
} catch (error) {
    console.log(error);
}

try {
    //定义流程API
    window.workflowAPI = null || workflowAPI;
} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 获取问卷信息列表
     */
    var queryQuestionById = async(id, page = 0, size = 99) => {

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_questions?_where=(id,eq,${id})&_p=${page}&_size=${size}`;



        try {
            //发送请求
            var res = await window.superagent.get(queryURL);

            //业务数据
            var list = res.body[0];

            //返回业务数据
            return list;
        } catch (err) {
            console.log(err);
            //未获取到数据，返回空
            return null;
        }

    }

    window.queryQuestionById = queryQuestionById;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 获取问卷信息列表
     */
    var queryQuestionList = async(username, page = 0, size = 99) => {

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_questions?_where=(create_by,eq,${username})&_p=${page}&_size=${size}`;

        try {
            //发送请求
            var res = await window.superagent.get(queryURL);

            //业务数据
            var list = res.body;

            //返回业务数据
            return list;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryQuestionList = queryQuestionList;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询业务数据
     */
    var queryBusinessTotal = async() => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/onl_cgform_head/count`;

        try {
            //发送请求
            var res = await window.superagent.get(queryURL);

            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));

            //业务数据
            var ratio = res.body[0]['no_of_rows'];

            //返回业务数据
            return ratio;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryBusinessTotal = queryBusinessTotal;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询上月月度新增用户数
     */
    var queryNewUserTotalLastMonth = async() => {

        try {
            //获取日期格式
            var cmonth = moment().month(moment().month() - 1).format('YYYY-MM');

            //提交URL
            var queryURL = `${window.requestAPIConfig.restapi}/api/v_user_monthly?_where=(month,eq,${cmonth})`;

            //发送请求
            var res = await window.superagent.get(queryURL);

            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));

            //月度新增用户数
            var ratio = res.body[0]['total'];

            //返回月度新增用户数
            return ratio;
        } catch (err) {
            console.log(err);
            //返回月度新增用户数
            return 0;
        }
    }

    window.queryNewUserTotalLastMonth = queryNewUserTotalLastMonth;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询月度新增用户数
     */
    var queryNewUserTotal = async() => {

        try {
            //获取日期格式
            var cmonth = moment().format('YYYY-MM')

            //提交URL
            var queryURL = `${window.requestAPIConfig.restapi}/api/v_user_monthly?_where=(month,eq,${cmonth})`;

            //发送请求
            var res = await window.superagent.get(queryURL);

            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));

            //月度新增用户数
            var ratio = res.body[0]['total'];

            //返回月度新增用户数
            return ratio;
        } catch (err) {
            console.log(err);
            //返回月度新增用户数
            return 0;
        }
    }

    window.queryNewUserTotal = queryNewUserTotal;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询流程总数
     */
    var queryWflowMonthlyRatio = async() => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_workflow_monthly`;

        try {
            //打印
            var res = await window.superagent.get(queryURL);

            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));

            //流程日同比率
            var ratio =
                parseInt(
                    ((res.body[0]['total'] - res.body[1]['total']) / res.body[1]['total']) *
                    10000
                ) / 100;

            //返回流程日同比率
            return ratio;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryWflowMonthlyRatio = queryWflowMonthlyRatio;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询流程总数
     */
    var queryWflowDailyRatio = async() => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_workflow_daily`;

        try {
            //打印
            var res = await window.superagent.get(queryURL);

            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));

            //流程日同比率
            var ratio =
                parseInt(
                    ((res.body[0]['total'] - res.body[1]['total']) / res.body[1]['total']) *
                    10000
                ) / 100;

            //返回流程日同比率
            return ratio;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryWflowDailyRatio = queryWflowDailyRatio;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询流程总数
     */
    var queryWflowDayCount = async(tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //获取日期格式
        var ctime = window.Betools.tools.formatDate(new Date(), 'yyyy-MM-dd');

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_workflow_total?_where=(ctime,eq,${ctime})`;

        try {
            var res = await window.superagent.get(queryURL);
            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));
            return res.body.length;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryWflowDayCount = queryWflowDayCount;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询月度流程数
     */
    var queryWflowMonthCount = async() => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_workflow_monthly`;

        try {
            //打印
            var res = await window.superagent.get(queryURL);

            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));

            //流程日同比率
            var ratio = res.body[0]['total'];

            //返回流程日同比率
            return ratio;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryWflowMonthCount = queryWflowMonthCount;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询流程总数
     */
    var queryWflowCount = async() => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_workflow_total/count`;

        try {
            var res = await window.superagent.get(queryURL);
            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));
            return res.body[0]['no_of_rows'];
        } catch (err) {
            console.log(err);
        }
    }

    window.queryWflowCount = queryWflowCount;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 将英文名转化为中文名
     */
    var patchCnameEname = async(origin, tools = window.tools, queryUserName = window.queryUserName) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //中文名称
        var chinese = '';

        //原始英文名称列表
        var originlist = window.Betools.tools.deNull(origin).split(',');

        //查询用户信息
        var userlist = await queryUserName();

        //遍历用户获取中文名称列表
        for (var ename of originlist) {

            //获取流程发起人的中文信息
            var user = window.__.find(userlist, item => {
                return ename == item.realname;
            });

            //如果找到用户信息，则设置用户信息
            if (!window.Betools.tools.isNull(user)) {
                chinese = `${chinese},${user.username}`;
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

    window.patchCnameEname = patchCnameEname;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 将英文名转化为中文名
     */
    var patchEnameCname = async(origin, tools = window.tools, queryUserName = window.queryUserName) => {
        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //中文名称
        var chinese = '';

        //原始英文名称列表
        var originlist = window.Betools.tools.deNull(origin).split(',');

        //查询用户信息
        var userlist = await queryUserName();

        //遍历用户获取中文名称列表
        for (var ename of originlist) {
            //获取流程发起人的中文信息
            var user = window.__.find(userlist, item => {
                return ename == item.username;
            });

            //如果找到用户信息，则设置用户信息
            if (!window.Betools.tools.isNull(user)) {
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

    window.patchEnameCname = patchEnameCname;

} catch (error) {
    console.log(error);
}

try {

    /**
     * @function 查询用户总数
     */
    var queryUserCount = async() => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_user/count`;

        try {
            var res = await window.superagent.get(queryURL);
            console.log(' url :' + queryURL + ' result :' + JSON.stringify(res));
            return res.body[0]['no_of_rows'];
        } catch (err) {
            console.log(err);
        }
    }

    window.queryUserCount = queryUserCount;

} catch (error) {
    console.log(error);
}


try {

    /**
     * @function 检测URL是否有效
     * @param {*} url
     */
    var queryUrlValid = async(url) => {
        //提交URL
        var queryURL = `${window._CONFIG['validURL']}${url}`;

        try {
            var res = await window.superagent.get(queryURL);
            console.log(' url :' + url + ' result :' + JSON.stringify(res));
            return res.body.success;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryUrlValid = queryUrlValid;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询工作流节点状态
     */
    var queryWorkflowStatus = async(tableName, id, tools = window.tools, queryTableData = window.queryTableData) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //定义返回节点信息
        var node = null;

        //节点状态信息（待提交）
        var node_0 = JSON.parse(
            '{"start":{"status":"wait","name":"发起","color":""},"audit":{"status":"wait","name":"审核","color":""},"approve":{"status":"wait","name":"审批","color":""},"message":{"status":"wait","name":"知会","color":""}}'
        );
        //节点状态信息（处理中）
        var node_1 = JSON.parse(
            '{"start":{"status":"finish","name":"发起","color":"skyblue"},"audit":{"status":"wait","name":"审核","color":""},"approve":{"status":"wait","name":"审批","color":""},"message":{"status":"wait","name":"知会","color":""}}'
        );
        //节点状态信息（审核完成）
        var node_2 = JSON.parse(
            '{"start":{"status":"finish","name":"发起","color":"skyblue"},"audit":{"status":"finish","name":"审核","color":""},"approve":{"status":"wait","name":"审批","color":""},"message":{"status":"wait","name":"知会","color":""}}'
        );
        //节点状态信息（审批完成）
        var node_3 = JSON.parse(
            '{"start":{"status":"finish","name":"发起","color":"skyblue"},"audit":{"status":"finish","name":"审核","color":""},"approve":{"status":"finish","name":"审批","color":""},"message":{"status":"wait","name":"知会","color":""}}'
        );
        //节点状态信息（知会完成）
        var node_4 = JSON.parse(
            '{"start":{"status":"finish","name":"发起","color":"skyblue"},"audit":{"status":"finish","name":"审核","color":""},"approve":{"status":"finish","name":"审批","color":""},"message":{"status":"finish","name":"知会","color":"pink"}}'
        );

        //获取当前表单信息
        var curRow = await queryTableData(tableName, id);

        //根据流程状态，设置流程图渲染状态
        if (window.Betools.tools.deNull(curRow) != '' && curRow.bpm_status == 1) {
            node = node_0;
        } else if (window.Betools.tools.deNull(curRow) != '' && curRow.bpm_status == 2) {
            node = node_1;
        } else if (window.Betools.tools.deNull(curRow) != '' && curRow.bpm_status == 3) {
            node = node_2;
        } else if (window.Betools.tools.deNull(curRow) != '' && curRow.bpm_status == 4) {
            node = node_3;
        } else if (window.Betools.tools.deNull(curRow) != '' && curRow.bpm_status == 5) {
            node = node_4;
        } else {
            node = node_0;
        }

        //打印查询参数
        console.log(`tableName: ${tableName} \n\r id: ${id}`);

        //返回节点信息
        return node;
    }

    window.queryWorkflowStatus = queryWorkflowStatus;

} catch (error) {
    console.log(error);
}


try {

    /**
     * @function 查询表字段信息
     * @param {*} tableName
     */
    var queryTableFieldInfoJSON = async(tableName, tools = window.tools, queryTableDataByField = window.queryTableDataByField) => {
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

    window.queryTableFieldInfoJSON = queryTableFieldInfoJSON;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 渲染审批流程详情
     */
    var colorProcessDetail = async(that, main, tools = window.tools, queryFileType = window.queryFileType, queryFileViewURL = window.queryFileViewURL, queryOfficeURL = window.queryOfficeURL, queryImageURL = window.queryImageURL, queryCurNodePageType = window.queryCurNodePageType, changeImageCSS = window.changeImageCSS) => {
        try {
            main.curRow = that.curRow;
        } catch (error) {
            console.log('set curRow error :' + error);
        }
        try {
            main.depart = that.depart;
        } catch (error) {
            console.log('set depart error :' + error);
        }
        try {
            main.workflows = that.workflows;
        } catch (error) {
            console.log('set curRow workflows error :' + error);
        }
        try {
            main.columns = that.curRow.sub_columns;
        } catch (error) {
            console.log('set curRow sub_columns error :' + error);
        }
        try {
            main.data = that.curRow.sub_data;
        } catch (error) {
            console.log('set curRow sub_data error :' + error);
        }
        try {
            main.pageType = window.Betools.tools.queryUrlString('type');
        } catch (error) {
            console.log('set curRow pageType error :' + error);
        }
        try {
            main.curRow.fileStatus = window.Betools.tools.deNull(main.curRow.files) == '' ? 1 : 0;
        } catch (error) {
            console.log('set curRow fileStatus error :' + error);
        }
        try {
            main.curRow.bpm_status = window.Betools.tools.deNull(main.curRow.bpm_status) == '' ? 1 : main.curRow.bpm_status;
        } catch (error) {
            console.log('set curRow bpm_status error :' + error);
        }
        try {
            main.curRow.fileType = queryFileType(main.curRow.files);
        } catch (error) {
            console.log('set curRow fileType error :' + error);
        }
        try {

            if (!window.Betools.tools.isNull(main.curRow.interview_paper)) {
                main.curRow.files = `${main.curRow.files},${main.curRow.interview_paper}`
            }

            if (!window.Betools.tools.isNull(main.curRow.resume)) {
                main.curRow.files = `${main.curRow.files},${main.curRow.resume}`
            }

            if (!window.Betools.tools.isNull(main.curRow.contract)) {
                main.curRow.files = `${main.curRow.files},${main.curRow.contract}`
            }

            main.curRow.fileURL = await queryFileViewURL(main.curRow.files);
        } catch (error) {
            console.log('set curRow fileURL error :' + error);
        }
        try {
            main.curRow.officeList = await queryOfficeURL(main.curRow.files);
        } catch (error) {
            console.log('set curRow OfficeURL error :' + error);
        }
        try {
            main.curRow.videoList = await queryVideoURL(main.curRow.files);
        } catch (error) {
            console.log('set curRow VideoURL error :' + error);
        }
        try {
            main.curRow.musicList = await queryMusicURL(main.curRow.files);
        } catch (error) {
            console.log('set curRow MusicURL error :' + error);
        }
        try {
            main.slides = await window.queryImageURL(main.curRow.files);
        } catch (error) {
            console.log('set curRow slides error :' + error);
        }
        try {
            main.tableName = window.Betools.tools.queryUrlString('table_name');
        } catch (error) {
            console.log('set curRow tableName error :' + error);
        }
        //检查是否可以进行审批/同意等操作
        try {
            main.pageType = await queryCurNodePageType(main.pageType);
        } catch (error) {
            console.log('set curRow pageType error :' + error);
        }
        //查询表字段信息
        try {
            main.tableInfo = await queryTableFieldInfoJSON(main.tableName);
        } catch (error) {
            console.log('set tableInfo error :' + error);
        }
        //修改图片样式
        try {
            changeImageCSS();
        } catch (error) {
            console.log('change image css error :' + error);
        }

        //返回设置结果
        return main;
    }

    window.colorProcessDetail = colorProcessDetail;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 获取当前节点是否有知会或者审批节点信息
     */
    var queryCurNodePageType = async(pageType, tools = window.tools, queryProcessLogByID = window.queryProcessLogByID, queryProcessLogInfByID = window.queryProcessLogInfByID) => {
        //获取页面类型
        var type = window.Betools.tools.queryUrlString('type');

        try {
            //如果审批详情或者知会详情页面，则设置pageType
            if (type == 'workflow' || type == 'notify') {
                //获取当前节点审批流程数据）
                var flag = await queryProcessLogByID(
                    window.Betools.tools.queryUrlString('table_name'),
                    window.Betools.tools.queryUrlString('processLogID')
                );

                //获取当前节点知会流程数据
                if (window.Betools.tools.deNull(flag) == '') {
                    flag = await queryProcessLogInfByID(
                        window.Betools.tools.queryUrlString('table_name'),
                        window.Betools.tools.queryUrlString('processLogID')
                    );
                }

                //获取页面类型
                pageType = window.Betools.tools.deNull(flag) == '' ? 'view' : pageType;
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

    window.queryCurNodePageType = queryCurNodePageType;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 设置css样式
     */
    var postcss = () => {
        try {
            //图片预览，Css设置Float:left
            $('figure[itemscope="itemscope"]').css('float', 'left');
            $('figure[itemscope="itemscope"]').css('margin-right', '10px');
            $('figure[itemscope="itemscope"]').css('margin-bottom', '10px');
            //图片预览，文件名称展示位置Center
            $('.pswp__caption__center').css('text-align', 'center');
            //异常图片高度，避免竖版图片走样
            $('.pswp__img').css('height', '');
            //设置图片宽度和高度
            $('.fileshow').find('.my-gallery').find('img').css('width', '120');
            $('.fileshow').find('.my-gallery').find('img').css('height', '72');
        } catch (error) {
            console.error(error);
        }
    }

    window.postcss = postcss;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function callback连续执行函数
     */
    var setTimeouts = (callback, ...times) => {
        for (let time of times) {
            setTimeout(() => {
                callback();
            }, time);
        }
    }

    window.setTimeouts = setTimeouts;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 设置详情页面图片展示样式
     */
    var changeImageCSS = () => {
        //执行间隔
        var imgInterval = [100, 500, 1000, 3000, 5000, 7000, 9000];
        //设置图片预览CSS样式
        try {
            setTimeouts(
                () => {
                    postcss();
                },
                ...imgInterval
            );
        } catch (error) {
            console.log('change image css error :' + error);
        }
        //隐藏文档预览服务的图标
        try {
            //等待一段时间，文档加载完毕后，才可隐藏图标
            setTimeout(() => {
                $('.fa-file-image-o', $('#fileviewFrame')).remove();
            }, 3000);
        } catch (error) {
            console.log('hidden image icon of fileview framework');
        }
    }

    window.changeImageCSS = changeImageCSS;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询附件中的文档地址
     */
    var queryOfficeURL = async(text, tools = window.tools) => {

        //文档数组
        var fileList = [];
        var officeList = [];

        try {
            //如果text为空，则返回空数组
            if (window.Betools.tools.deNull(text) == '') {
                return [];
            }
            //如果含有多个地址，则split后获取数组
            if (window.Betools.tools.deNull(text).indexOf(',') > 0) {
                fileList = text.split(',');
            } else {
                fileList.push(text);
            }
        } catch (error) {
            console.log('query office url error :' + error);
        }

        try {
            //遍历并筛选出里面的图片信息
            fileList = window.__.filter(fileList, function(text) {
                //获取小写后的路径
                var ptext = window.Betools.tools.deNull(text).toLowerCase();
                //定义下载地址
                var download = window._CONFIG['ossURL'] + '/';
                //文档预览URL
                var previewURL = window._CONFIG['viewURL'];

                //获取图片标识
                var flag =
                    ptext.includes('jpg') ||
                    ptext.includes('jpeg') ||
                    ptext.includes('bmp') ||
                    ptext.includes('gif') ||
                    ptext.includes('webp') ||
                    ptext.includes('svg') ||
                    ptext.includes('png');

                //文档名称
                var name = ptext;

                //设置文档名称
                try {
                    name = name.replace('files/', '');
                } catch (error) {
                    console.log('设置文档名称异常：' + error);
                }

                //获取文档真实下载地址
                download = download + text;

                //URL加密，保证中文路径可以被正常解析
                var xurl = download.replace('files/', 'files/convert/');
                //去掉后缀
                xurl = xurl.substring(0, xurl.lastIndexOf('.'));

                //获取文件后缀
                var suffix = window.tools
                    .deNull(download)
                    .substring(download.lastIndexOf('.'), download.length)
                    .toLowerCase();

                //如果word文档，则使用微软API打开
                text = window.Betools.tools.deNull(suffix).includes('xls') ? xurl + '.html' : download;

                //如果word文档，则使用微软API打开
                text = window.Betools.tools.deNull(suffix).includes('svg') ? download : download;

                //如果word文档，则使用微软API打开
                text =
                    window.Betools.tools.deNull(suffix).includes('doc') ||
                    window.Betools.tools.deNull(suffix).includes('ppt') ||
                    window.Betools.tools.deNull(suffix).includes('pdf') ?
                    xurl + '.pdf' :
                    download;

                //file文件URL路径
                var fileURL = `${text}`;

                //设置加密路径
                xurl = encodeURIComponent(xurl);

                //如果word文档，则使用微软API打开
                text =
                    window.Betools.tools.deNull(suffix).includes('doc') ||
                    window.Betools.tools.deNull(suffix).includes('ppt') ||
                    window.Betools.tools.deNull(suffix).includes('pdf') ?
                    previewURL + xurl + '.pdf' :
                    text;

                //如果文件路径为文档地址，则存入officeList中
                if (!flag) {
                    //将数据存入officeList中
                    officeList.push({
                        title: '文档',
                        src: text,
                        file: fileURL,
                        msrc: download,
                        name: name,
                    });
                }

                //返回过滤结果
                return flag;
            });
        } catch (error) {
            console.log('query office url error :' + error);
        }

        //返回office数组信息
        return officeList;
    }

    window.queryOfficeURL = queryOfficeURL;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询工资表单信息
     */
    var queryRegisterByParam = async(
        username = '',
        params = '',
        page = 0,
        size = 50,
        result = '',
        tools = window.tools
    ) => {
        //条件SQL
        var whereSQL = '';

        try {
            //根据条件构造参数
            if (window.Betools.tools.deNull(params.name) != '') {
                whereSQL = whereSQL + `~and(name,eq,${params.name})`;
            }
        } catch (error) {
            console.error(error);
        }

        try {
            //检查查询条件中是否含有时间
            if (window.Betools.tools.deNull(params.time) != '') {
                var starttime = '';
                var endtime = '';

                //设置时间
                if (params.time.length == 0) {
                    starttime = new Date();
                    endtime = new Date();
                } else if (params.time.length == 1) {
                    try {
                        starttime = params.time[0].format('YYYY-MM-DD');
                        endtime = new Date();
                    } catch (error) {
                        starttime = params.time[0];
                        endtime = new Date();
                    }
                } else if (params.time.length >= 2) {
                    try {
                        starttime = params.time[0].format('YYYY-MM-DD');
                        endtime = params.time[1].format('YYYY-MM-DD');
                    } catch (error) {
                        starttime = params.time[0];
                        endtime = params.time[1];
                    }
                }

                starttime = window.Betools.tools.formatDate(starttime, 'yyyy-MM-dd') + ' 00:00:00';
                endtime = window.Betools.tools.formatDate(endtime, 'yyyy-MM-dd') + ' 23:59:59';

                whereSQL = whereSQL + `~and(join_time,bw,${starttime},${endtime})`;
            }
        } catch (error) {
            console.error(error);
        }

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_user_info?_where=(id,ne,'')${whereSQL}&_p=${page}&_size=${size}&_sort=-join_time`;

        try {
            //发送HTTP请求，获取博文数量
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);

            //遍历所有数据，设置日期格式
            result = window.__.filter(res.body, item => {
                //日期格式化操作
                item['create_time'] = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                item['join_time'] = window.Betools.tools.formatDate(item['join_time'], 'yyyy-MM-dd');

                //遍历对象属性
                for (let key of Object.keys(item)) {
                    //获取属性的值
                    var value = item[key];
                    //如果是数字类型，则保留两位小数
                    if (typeof value == 'number') {
                        item[key] = value.toFixed(2);
                    }
                }

                return true;
            });

            return result;
        } catch (err) {
            console.log(err);

            return 0;
        }
    }

    window.queryRegisterByParam = queryRegisterByParam;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询花名册信息
     */
    var queryRegisterByUserName = async(
        realname = '',
        username = '',
        page = 0,
        size = 50,
        result = '',
        tools = window.tools
    ) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_user_info?_where=(name,eq,${realname})~or(username,eq,${username})&_p=${page}&_size=${size}&_sort=-join_time`;

        try {
            //发送HTTP请求，获取博文数量
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);

            //遍历所有数据，设置日期格式
            result = window.__.filter(res.body, item => {
                //日期格式化操作
                item['create_time'] = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                item['join_time'] = window.Betools.tools.formatDate(item['join_time'], 'yyyy-MM-dd');

                //遍历对象属性
                for (let key of Object.keys(item)) {
                    //获取属性的值
                    var value = item[key];
                    //如果是数字类型，则保留两位小数
                    if (typeof value == 'number') {
                        item[key] = value.toFixed(2);
                    }
                }

                return true;
            });

            return result[0];
        } catch (err) {
            console.log(err);
            return 0;
        }
    }

    window.queryRegisterByUserName = queryRegisterByUserName;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询工资信息
     */
    var queryWageByUserName = async(
        realname = '',
        username = '',
        page = 0,
        size = 50,
        result = '',
        tools = window.tools
    ) => {

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_salary?_where=(name,eq,${realname})~or(username,eq,${username})&_p=${page}&_size=${size}`;

        try {
            //发送HTTP请求，获取博文数量
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);

            //遍历所有数据，设置日期格式
            result = window.__.filter(res.body, item => {
                //日期格式化操作
                //item['create_time'] = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                item['join_time'] = window.Betools.tools.formatDate(item['join_time'], 'yyyy-MM-dd');

                //遍历对象属性
                for (let key of Object.keys(item)) {
                    //获取属性的值
                    var value = item[key];
                    //如果是数字类型，则保留两位小数
                    if (typeof value == 'number') {
                        item[key] = value.toFixed(2);
                    }
                }

                return true;
            });

            return result[0];
        } catch (err) {
            console.log(err);

            return 0;
        }
    }

    window.queryWageByUserName = queryWageByUserName;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询工资表单信息
     */
    var queryWageBillByParam = async(
        username = '',
        params = '',
        page = 0,
        size = 50,
        result = '',
        tools = window.tools
    ) => {

        //条件SQL
        var whereSQL = '';

        try {
            //根据条件构造参数
            if (window.Betools.tools.deNull(params.name) != '') {
                whereSQL = whereSQL + `~and(name,eq,${params.name})`;
            }
        } catch (error) {
            console.error(error);
        }

        try {
            //检查查询条件中是否含有时间
            if (window.Betools.tools.deNull(params.time) != '') {
                var starttime = '';
                var endtime = '';

                //设置时间
                if (params.time.length == 0) {
                    starttime = new Date();
                    endtime = new Date();
                } else if (params.time.length == 1) {
                    try {
                        starttime = params.time[0].format('YYYY-MM-DD');
                        endtime = new Date();
                    } catch (error) {
                        starttime = params.time[0];
                        endtime = new Date();
                    }
                } else if (params.time.length >= 2) {
                    try {
                        starttime = params.time[0].format('YYYY-MM-DD');
                        endtime = params.time[1].format('YYYY-MM-DD');
                    } catch (error) {
                        starttime = params.time[0];
                        endtime = params.time[1];
                    }
                }

                starttime = window.Betools.tools.formatDate(starttime, 'yyyy-MM-dd') + ' 00:00:00';
                endtime = window.Betools.tools.formatDate(endtime, 'yyyy-MM-dd') + ' 23:59:59';

                whereSQL = whereSQL + `~and(pay_wages_date,bw,${starttime},${endtime})`;
            }
        } catch (error) {
            console.error(error);
        }

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_salary?_where=(id,ne,'')${whereSQL}&_p=${page}&_size=${size}&_sort=-wages_date`;

        try {
            //发送HTTP请求，获取博文数量
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);

            //遍历所有数据，设置日期格式
            result = window.__.filter(res.body, item => {
                //日期格式化操作
                item['wages_date'] = window.Betools.tools.formatDate(item['wages_date'], 'yyyy-MM-dd');
                item['join_time'] = window.Betools.tools.formatDate(item['join_time'], 'yyyy-MM-dd');

                //遍历对象属性
                for (let key of Object.keys(item)) {
                    //获取属性的值
                    var value = item[key];
                    //如果是数字类型，则保留两位小数
                    if (typeof value == 'number') {
                        item[key] = value.toFixed(2);
                    }
                }

                return true;
            });

            return result;
        } catch (err) {
            console.log(err);

            return 0;
        }
    }

    window.queryWageBillByParam = queryWageBillByParam;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询工资表单信息
     */
    var queryWageByParam = async(
        username = '',
        params = '',
        page = 0,
        size = 50,
        result = '',
        tools = window.tools
    ) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //条件SQL
        var whereSQL = '';

        try {
            //根据条件构造参数
            if (window.Betools.tools.deNull(params.name) != '') {
                whereSQL = whereSQL + `~and(name,eq,${params.name})`;
            }
        } catch (error) {
            console.error(error);
        }

        try {
            //检查查询条件中是否含有时间
            if (window.Betools.tools.deNull(params.time) != '') {
                var starttime = '';
                var endtime = '';

                //设置时间
                if (params.time.length == 0) {
                    starttime = new Date();
                    endtime = new Date();
                } else if (params.time.length == 1) {
                    try {
                        starttime = params.time[0].format('YYYY-MM-DD');
                        endtime = new Date();
                    } catch (error) {
                        starttime = params.time[0];
                        endtime = new Date();
                    }
                } else if (params.time.length >= 2) {
                    try {
                        starttime = params.time[0].format('YYYY-MM-DD');
                        endtime = params.time[1].format('YYYY-MM-DD');
                    } catch (error) {
                        starttime = params.time[0];
                        endtime = params.time[1];
                    }
                }

                starttime = window.Betools.tools.formatDate(starttime, 'yyyy-MM-dd') + ' 00:00:00';
                endtime = window.Betools.tools.formatDate(endtime, 'yyyy-MM-dd') + ' 23:59:59';

                whereSQL = whereSQL + `~and(pay_wages_date,bw,${starttime},${endtime})`;
            }
        } catch (error) {
            console.error(error);
        }

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_salary?_where=(id,ne,'')${whereSQL}&_p=${page}&_size=${size}&_sort=-wages_date`;

        try {
            //发送HTTP请求，获取博文数量
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);

            //遍历所有数据，设置日期格式
            result = window.__.filter(res.body, item => {
                //日期格式化操作
                item['wages_date'] = window.Betools.tools.formatDate(item['wages_date'], 'yyyy-MM-dd');
                item['join_time'] = window.Betools.tools.formatDate(item['join_time'], 'yyyy-MM-dd');

                //遍历对象属性
                for (let key of Object.keys(item)) {
                    //获取属性的值
                    var value = item[key];
                    //如果是数字类型，则保留两位小数
                    if (typeof value == 'number') {
                        item[key] = value.toFixed(2);
                    }
                }

                return true;
            });

            return result;
        } catch (err) {
            console.log(err);

            return 0;
        }
    }

    window.queryWageByParam = queryWageByParam;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 获取博文信息
     */
    var queryBloggerInfo = async(username, result) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_blog/groupby?_fields=create_by,page_type`;

        try {
            //发送HTTP请求，获取博文数量
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);

            //查找作者的原创博文数量
            result = window.__.find(res.body, function(item) {
                return item.create_by == username && item.page_type == 'Y';
            });

            return result._count || 0;
        } catch (err) {
            console.log(err);

            return 0;
        }
    }

    window.queryBloggerInfo = queryBloggerInfo;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询附件中的视频地址
     */
    var queryVideoURL = (text, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //文档数组
        var fileList = [];
        var images = [];

        try {
            //如果text为空，则返回空数组
            if (window.Betools.tools.deNull(text) == '') {
                return [];
            }
            //如果含有多个地址，则split后获取数组
            if (window.Betools.tools.deNull(text).indexOf(',') > 0) {
                fileList = text.split(',');
            } else {
                fileList.push(text);
            }
        } catch (error) {
            console.log('query image url error :' + error);
        }

        try {
            //遍历并筛选出里面的图片信息
            fileList = window.__.filter(fileList, function(text) {
                //获取小写后的路径
                var ptext = window.Betools.tools.deNull(text).toLowerCase();

                //获取图片标识
                var flag =
                    ptext.includes('mp4') || ptext.includes('flv') || ptext.includes('avi');

                //获取文件后缀
                var suffix = window.tools
                    .deNull(ptext)
                    .substring(ptext.lastIndexOf('.') + 1, ptext.length)
                    .toLowerCase();

                //获取图片真实下载地址 在线压缩地址：window._CONFIG['thumborURL'] + encodeURIComponent(text)  离线压缩地址：text.replace('files/', 'files/images/').replace(suffix,'_S240x160'+suffix)
                text =
                    window._CONFIG['ossURL'] + '/' + text.replace('files/', 'files/');

                //如果文件路径为图片地址，则存入images中
                if (flag) {
                    //将数据存入images中
                    images.push({
                        src: text,
                        type: `video/${suffix}`
                    });
                }

                console.log('video suffix :' + suffix);

                return flag;
            });
        } catch (error) {
            console.log('query video url error :' + error);
        }

        console.log('video list : ' + images);

        //返回图片数组信息
        return images;
    }

    window.queryVideoURL = queryVideoURL;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询附件中的视频地址
     */
    var queryMusicURL = (text, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //文档数组
        var fileList = [];
        var images = [];

        try {
            //如果text为空，则返回空数组
            if (window.Betools.tools.deNull(text) == '') {
                return [];
            }
            //如果含有多个地址，则split后获取数组
            if (window.Betools.tools.deNull(text).indexOf(',') > 0) {
                fileList = text.split(',');
            } else {
                fileList.push(text);
            }
        } catch (error) {
            console.log('query image url error :' + error);
        }

        try {
            //遍历并筛选出里面的图片信息
            fileList = window.__.filter(fileList, function(text, index) {
                //获取小写后的路径
                var ptext = window.Betools.tools.deNull(text).toLowerCase();

                //获取图片标识
                var flag =
                    ptext.includes('mp3') || ptext.includes('wav');

                //获取文件后缀
                var suffix = window.tools
                    .deNull(ptext)
                    .substring(ptext.lastIndexOf('.'), ptext.length)
                    .toLowerCase();

                //获取图片真实下载地址 在线压缩地址：window._CONFIG['thumborURL'] + encodeURIComponent(text)  离线压缩地址：text.replace('files/', 'files/images/').replace(suffix,'_S240x160'+suffix)
                text =
                    window._CONFIG['ossURL'] + '/' + text.replace('files/', 'files/');

                //如果文件路径为图片地址，则存入images中
                if (flag) {
                    //将数据存入images中
                    images.push({
                        title: ptext.replace('.' + suffix, '').replace(`files/`, ``),
                        artist: '音频',
                        src: text,
                    });
                }

                console.log('image suffix :' + suffix);

                return flag;
            });
        } catch (error) {
            console.log('query image url error :' + error);
        }

        //设置取消显示音频长度
        if (images.length > 0) {
            setTimeout(() => {
                $('.aplayer-pause').css('border', '0px solid #fefefe');
                $('.aplayer-dtime').html(window.Betools.tools.deNull($('.aplayer-dtime').html()).replace(`Infinity:NaN:NaN`, ``));
            }, 300);
        }

        //返回图片数组信息
        return images;
    }

    window.queryMusicURL = queryMusicURL;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询附件中的图片地址
     */
    var queryImageURL = (text, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //文档数组
        var fileList = [];
        var images = [];

        try {
            //如果text为空，则返回空数组
            if (window.Betools.tools.deNull(text) == '') {
                return [];
            }
            //如果含有多个地址，则split后获取数组
            if (window.Betools.tools.deNull(text).indexOf(',') > 0) {
                fileList = text.split(',');
            } else {
                fileList.push(text);
            }
        } catch (error) {
            console.log('query image url error :' + error);
        }

        try {
            //遍历并筛选出里面的图片信息
            fileList = window.__.filter(fileList, function(text) {
                //获取小写后的路径
                var ptext = window.Betools.tools.deNull(text).toLowerCase();

                //获取图片标识
                var flag =
                    ptext.includes('jpg') ||
                    ptext.includes('jpeg') ||
                    ptext.includes('bmp') ||
                    ptext.includes('gif') ||
                    ptext.includes('webp') ||
                    ptext.includes('svg') ||
                    ptext.includes('png');

                //获取文件后缀
                var suffix = window.tools
                    .deNull(ptext)
                    .substring(ptext.lastIndexOf('.'), ptext.length)
                    .toLowerCase();

                //定义压缩图片URL
                var thumborURL = text;
                // .replace('files/', 'files/images/')
                // .replace(suffix, '_S240x160' + suffix);

                //获取图片真实下载地址 在线压缩地址：window._CONFIG['thumborURL'] + encodeURIComponent(text)  离线压缩地址：text.replace('files/', 'files/images/').replace(suffix,'_S240x160'+suffix)
                text = window._CONFIG['ossURL'] + '/' + text.replace('files/', 'files/');
                //获取压缩图片地址
                thumborURL = window._CONFIG['ossURL'] + '/' + thumborURL;
                //图片预加载地址
                ptext = thumborURL;
                //获取在线裁剪预览地址
                //thumborURL = thumborURL;

                //动态加载图片，并计算图片高宽比
                var img = new Image();
                img.src = ptext;
                // img.onload = () => {
                //     //如果文件路径为图片地址，则存入images中
                //     if (flag) {
                //         //将数据存入images中
                //         images.push({
                //             src: text,
                //             msrc: thumborURL,
                //             title: '图片预览',
                //             w: 900,
                //             h: (900 * img.height) / img.width,
                //         });
                //     }
                // };

                if (flag) {
                    //将数据存入images中
                    images.push({
                        src: text,
                        msrc: thumborURL,
                        title: '图片预览',
                        w: 900,
                        h: (900 * img.height) / img.width,
                    });
                }

                return flag;
            });
        } catch (error) {
            console.log('query image url error :' + error);
        }

        //返回图片数组信息
        return images;
    }

    window.queryImageURL = queryImageURL;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询文件类型
     * @description 查询表单含有的文件的文档类型
     * @param {*} text
     */
    var queryFileType = (text, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //文档类型
        var type = '';
        //文件后缀
        var suffix = '';

        try {
            //获取文件后缀
            suffix = window.Betools.tools.deNull(text).toLowerCase();
        } catch (error) {
            suffix = `${text}`;
        }

        try {
            //如果office文档，则使用微软API打开
            type =
                suffix.includes('jpg') ||
                suffix.includes('jpeg') ||
                suffix.includes('bmp') ||
                suffix.includes('gif') ||
                suffix.includes('webp') ||
                suffix.includes('svg') ||
                suffix.includes('png') ?
                '@image@' :
                '';

            type =
                suffix.includes('doc') ||
                suffix.includes('xls') ||
                suffix.includes('ppt') ||
                suffix.includes('pdf') ?
                `${type}@office@` :
                type;
        } catch (error) {
            console.log('query file type error :' + error);
        }

        //打印文档URL
        console.log('url type :' + type);

        //返回URL
        return type;
    }

    window.queryFileType = queryFileType;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询文档对应预览地址
     * @param {*} text
     */
    var queryFileViewURL = async(text, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //文档URL
        var url = '';

        //查询文档对应预览地址
        try {
            //获取小写文档下载地址
            var textURL = window.Betools.tools.deNull(text).toLowerCase();
            //如果不含有office文档
            if (!(
                    textURL.includes('doc') ||
                    textURL.includes('ppt') ||
                    textURL.includes('xls') ||
                    textURL.includes('pdf')
                )) {
                return false;
            }

            //文档数组
            var fileList = [];

            if (text.indexOf(',') > 0) {
                fileList = text.split(',');
            } else {
                fileList.push(text);
            }

            //获取第一个office文档
            url = window.__.find(fileList, function(text) {
                //获取小写字符串
                text = window.Betools.tools.deNull(text).toLowerCase();
                return (
                    text.includes('doc') ||
                    text.includes('ppt') ||
                    text.includes('xls') ||
                    text.includes('pdf')
                );
            });

            //文档预览URL
            var previewURL = window._CONFIG['viewURL'];

            //文档下载地址
            url = window._CONFIG['docDownURL'] + '/' + url;
            //暂存文档地址
            var tempUrl = `${url}`;

            //URL加密，保证中文路径可以被正常解析
            var xurl = url.replace('files/', 'files/convert/');
            //去掉后缀
            xurl = xurl.substring(0, xurl.lastIndexOf('.'));

            //获取文件后缀
            var suffix = window.tools
                .deNull(url)
                .substring(url.lastIndexOf('.'), url.length)
                .toLowerCase();

            //如果word文档，则使用微软API打开
            url = window.Betools.tools.deNull(suffix).includes('xls') ? xurl + '.html' : url;
            //如果word文档，则使用微软API打开
            url =
                window.Betools.tools.deNull(suffix).includes('doc') ||
                window.Betools.tools.deNull(suffix).includes('ppt') ||
                window.Betools.tools.deNull(suffix).includes('pdf') ?
                xurl + '.pdf' :
                url;

            //待检测URL
            var checkURL = decodeURIComponent(url);

            //打印checkURL
            console.log('checkURL :' + checkURL);

            //设置加密路径
            xurl = encodeURIComponent(xurl);

            //如果word文档，则使用微软API打开
            url =
                window.Betools.tools.deNull(suffix).includes('doc') ||
                window.Betools.tools.deNull(suffix).includes('ppt') ||
                window.Betools.tools.deNull(suffix).includes('pdf') ?
                previewURL + xurl + '.pdf' :
                url;

            //检测文件URL标识
            var existFlag = await queryUrlValid(checkURL);

            //如果文件地址不存在，则使用kkfileview预览模式
            if (!existFlag) {
                url = window._CONFIG['previewURL'] + tempUrl;
                console.log('地址不存在：' + url);
            }

            //打印预览地址日志
            console.log('preview url :' + url);
        } catch (error) {
            //打印错误日志
            console.log('query file view url error :' + error);
        }

        //返回URL
        return url;
    }

    window.queryFileViewURL = queryFileViewURL;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 知会/流程通知转移到历史记录的子操作
     */
    var transWflowHistoring = async(tableName, wfnode, deleteProcessLog = window.deleteProcessLog, deleteProcessLogInf = window.deleteProcessLogInf, postProcessLogHistory = window.postProcessLogHistory, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //定义返回结果
        var result = null;

        try {
            //删除当前审批节点中的所有记录
            result = await deleteProcessLog(tableName, wfnode);
            result = await deleteProcessLogInf(tableName, wfnode);
        } catch (error) {
            console.log(error);
        }

        try {
            //如果是数组，则遍历并转历史，如果是对象，则直接转历史
            if (wfnode instanceof Array && wfnode.length > 0) {
                for (var item of wfnode) {
                    //转化日期格式
                    item['operate_time'] = window.Betools.tools.formatDate(
                        item['operate_time'],
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    item['create_time'] = window.Betools.tools.formatDate(
                        item['create_time'],
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
                    result = await postProcessLogHistory(item);
                }
            } else {
                //转化日期格式
                wfnode['operate_time'] = window.Betools.tools.formatDate(
                    wfnode['operate_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                wfnode['create_time'] = window.Betools.tools.formatDate(
                    wfnode['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
                result = await postProcessLogHistory(wfnode);
            }
        } catch (error) {
            console.log(error);
        }

        //返回结果
        return result;
    }

    window.transWflowHistoring = transWflowHistoring;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 知会/流程通知转移到历史记录中
     */
    var transWflowToHistory = async(tableName, id, queryProcessLog = window.queryProcessLog, queryProcessLogInformed = window.queryProcessLogInformed, transWflowHistoring = window.transWflowHistoring, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //定义返回结果
        var result = null;
        //执行转历史操作
        try {
            //对应表单没有数据，故此知会/流程通知转移到历史记录中，获取关于此表单的所有当前审批日志信息
            var wfnode = await queryProcessLog(tableName, id);
            //对应表单没有数据，故此知会/流程通知转移到历史记录中，获取关于此表单的所有当前知会日志信息
            var messageNode = await queryProcessLogInformed(tableName, id);
            //如果审批日志信息不为空，则将审批日志信息转化为历史数据
            if (window.Betools.tools.deNull(wfnode) != '') {
                result = await transWflowHistoring(tableName, wfnode);
            }
            //如果知会日志信息不为空，则将知会日志信息转化为历史数据
            if (window.Betools.tools.deNull(messageNode) != '') {
                result = await transWflowHistoring(tableName, messageNode);
            }
        } catch (error) {
            console.log(error);
        }
        //返回结果
        return result;
    }

    window.transWflowToHistory = transWflowToHistory;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询表单详情页面
     */
    var watchFormLeave = async(that, queryFormName = window.queryFormName, queryTableData = window.queryTableData, transWflowToHistory = window.transWflowToHistory, queryDepartNameByCode = window.queryDepartNameByCode, queryWorkflows = window.queryWorkflows, queryLeaveType = window.queryLeaveType, queryFormTypeValue = window.queryFormTypeValue, queryBpmStatus = window.queryBpmStatus, queryFormTypeName = window.queryFormTypeName, queryFormMainTable = window.queryFormMainTable, queryFormMTSubColumns = window.queryFormMTSubColumns, queryFormMTSubData = window.queryFormMTSubData, queryFormMTStarttimeName = window.queryFormMTStarttimeName, queryFormMTEndtimeName = window.queryFormMTEndtimeName, queryFormMTFileName = window.queryFormMTFileName, queryWorkflowStatus = window.queryWorkflowStatus, queryTableFieldInfo = window.queryTableFieldInfo, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //显示提示信息
        var path = window.location.href.split(window.location.host)[1];
        //获取部门信息
        var department = '';
        //获取对应表单信息
        var tableName = window.Betools.tools.queryUrlString('table_name');
        //查询主键ID
        var id = window.Betools.tools.queryUrlString('id');
        //获取用户名称
        var username = window.Betools.tools.queryUrlString('user');

        //如果不是表单详情页面，则直接返回
        if (!(path.includes('/workflow/view') || path.includes('/basewflow/view'))) {
            return false;
        }

        try {
            //查询表单信息
            that.formName = queryFormName(tableName);
            //查询用户名称信息
            that.username = username;
        } catch (error) {
            console.log('query base info error :' + error);
        }

        try {
            //查询对应表单数据
            that.curRow = await queryTableData(tableName, id);
        } catch (error) {
            console.log('query cur row info error :' + error);
        }

        //此表单数据已经被删除，无法查看
        if (typeof that.curRow == 'undefined' || that.curRow == null) {
            try {
                //提示信息
                var message = '此表单数据已经被删除，无法查看此数据！';
                //当前审批流程相关信息转历史记录
                var result = await transWflowToHistory(tableName, id);

                //显示并确认提示信息
                that.$confirm_({
                    title: '提示',
                    content: message,
                    onOk: function() {
                        //关闭当前Tab页面
                        that.$root.$tabs.closeTab(path);
                    },
                });
                console.log('此表单数据已经被删除，无法查看此数据，result :' + result);
            } catch (error) {
                console.log('message confirm error :' + error);
            }
            return false;
        }

        try {
            department = await queryTableData(
                'sys_depart',
                that.curRow.department ||
                that.curRow.depart_name ||
                that.curRow.sys_org_code
            );
        } catch (error) {
            console.log('query department error :' + error);
        }

        //如果没查询到部门信息，则通过org_code字段查询部门信息
        try {
            department =
                department || (await queryDepartNameByCode(that.curRow.sys_org_code));
            //部门信息
            //that.curRow.depart_name = department;
        } catch (error) {
            console.log('query department error :' + error);
        }

        try {
            //查询审批流程信息
            that.workflows = await queryWorkflows(that.curRow.id);
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            that.curRow.leave_type_name =
                queryLeaveType(that.curRow.leave_off_type) ||
                queryFormTypeValue(tableName);
            //查询当前流程状态
            that.curRow.bpm_status_name = queryBpmStatus(that.curRow.bpm_status);
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            //查询申请开始日期
            that.curRow.starttime = window.Betools.tools.formatDate(
                that.curRow.starttime,
                'yyyy-MM-dd hh:mm:ss'
            );

            //如果未查询到开始日期，则使用申请日期
            if (that.curRow.starttime == '--') {
                that.curRow.starttime = window.Betools.tools.formatDate(
                    that.curRow.create_time,
                    'yyyy-MM-dd hh:mm:ss'
                );
            }
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            //查询申请结束日期
            that.curRow.endtime = window.Betools.tools.formatDate(
                that.curRow.endtime,
                'yyyy-MM-dd hh:mm:ss'
            );
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            //查询申请创建日期
            that.curRow.create_time = window.Betools.tools.formatDate(
                that.curRow.create_time,
                'yyyy-MM-dd'
            );

            //查询采购交付日期
            that.curRow.purchase_date = window.Betools.tools.formatDate(that.curRow.purchase_date, 'yyyy-MM-dd');

            //设置申请日期
            that.curRow.apply_date = window.Betools.tools.formatDate(that.curRow.apply_date, 'yyyy-MM-dd');

            //设置归还日期
            that.curRow.pay_back_date = window.Betools.tools.formatDate(that.curRow.pay_back_date, 'yyyy-MM-dd');

            //设置支付日期
            that.curRow.pay_date = window.Betools.tools.formatDate(that.curRow.pay_date, 'yyyy-MM-dd');

            //设置开始日期
            that.curRow.start_time = window.Betools.tools.formatDate(that.curRow.start_time, 'yyyy-MM-dd');

            //设置结束日期
            that.curRow.end_time = window.Betools.tools.formatDate(that.curRow.end_time, 'yyyy-MM-dd');

            //设置开始日期
            that.curRow.real_start_time = window.Betools.tools.formatDate(that.curRow.start_time, 'yyyy-MM-dd');

            //设置结束日期
            that.curRow.real_end_time = window.Betools.tools.formatDate(that.curRow.end_time, 'yyyy-MM-dd');

            //设置工作日期
            that.curRow.work_date = window.Betools.tools.formatDate(that.curRow.work_date, 'yyyy-MM-dd');

            //设置完成日期
            that.curRow.complete_date = window.Betools.tools.formatDate(that.curRow.complete_date, 'yyyy-MM-dd');

            //设置汇报日期
            that.curRow.report_date = window.Betools.tools.formatDate(that.curRow.report_date, 'yyyy-MM-dd');

            //设置期望到岗日期
            that.curRow.exp_join_date = window.Betools.tools.formatDate(that.curRow.exp_join_date, 'yyyy-MM-dd');

            //设置最后工作日
            that.curRow.resign_date = window.Betools.tools.formatDate(that.curRow.resign_date, 'yyyy-MM-dd');

            //设置入职日期
            that.curRow.join_date = window.Betools.tools.formatDate(that.curRow.join_date, 'yyyy-MM-dd');

            //设置面试日期
            that.curRow.interview_date = window.Betools.tools.formatDate(that.curRow.interview_date, 'yyyy-MM-dd');

            //设置换班日期
            that.curRow.shift_date = window.Betools.tools.formatDate(that.curRow.shift_date, 'yyyy-MM-dd');

            //设置还班日期
            that.curRow.back_date = window.Betools.tools.formatDate(that.curRow.back_date, 'yyyy-MM-dd');

            //设置补卡日期
            that.curRow.repair_date = window.Betools.tools.formatDate(that.curRow.repair_date, 'yyyy-MM-dd');

        } catch (error) {
            console.error(error);
        }

        try {
            //查询表单类型名称
            that.curRow.formTypeName = queryFormTypeName(tableName);
            //查询日期之间的天数
            // that.curRow.total_days = queryDateDiff(
            //     that.curRow.starttime,
            //     that.curRow.endtime
            // );
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            //查询此表单是否为主表单
            that.curRow.main_table_status = queryFormMainTable(tableName);
            //查询此表单的附表字段
            that.curRow.sub_columns = queryFormMTSubColumns(tableName);
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            //查询此表单的附表数据
            that.curRow.sub_data = await queryFormMTSubData(
                tableName,
                'foreign_key_id',
                id
            );
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            //查询结束时间表单显示名称
            that.curRow.startTimeName = queryFormMTStarttimeName(tableName) || '开始';
            //查询结束时间表单显示名称
            that.curRow.endTimeName = queryFormMTEndtimeName(tableName) || '结束';
            //查询文件名称显示标题
            that.curRow.fileNameTitle = queryFormMTFileName(tableName) || '文件名称';
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            //查询字段中文名称
            that.curRow.fieldName = {};
        } catch (error) {
            console.log('watch form leave error :' + error);
        }

        try {
            //查询工作流程状态
            that.wflowstatus = await queryWorkflowStatus(tableName, id);
        } catch (error) {
            console.log('query workflow status error :' + error);
        }

        try {
            //设置字段名称
            var filedValue = await queryTableFieldInfo(
                'v_table_field',
                tableName,
                'file_name'
            );

            //设置字段名称
            if (typeof filedValue != 'undefined') {
                that.curRow.fieldName['file_name'] = filedValue['txt'];
            }
        } catch (error) {
            console.log('setup fieldName info error :' + error);
        }

        try {
            that.depart = department;
            that.curRow.depart_name = department.depart_name;
        } catch (error) {
            console.log('setup department error : ' + error);
        }

        return that;
    }

    window.watchFormLeave = watchFormLeave;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 获取某业务记录对应的审批日志信息
     */
    var queryDepartNameByCode = async(code, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/sys_depart?_where=(org_code,eq,${code})`;
        //根据部门编号，查询部门信息
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            return res.body[0];
        } catch (err) {
            console.log(err);
        }
    }

    window.queryDepartNameByCode = queryDepartNameByCode;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询审批流程信息
     */
    var queryWorkflows = async(business_data_id, queryPRLogHistoryByDataID = window.queryPRLogHistoryByDataID, queryUserRealName = window.queryUserRealName, queryPRLogByDataID = window.queryPRLogByDataID, queryPRLogInfByDataID = window.queryPRLogInfByDataID, storage = window.storage, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //待返回审批流程数据
        var workflows = null;

        //从浏览器缓存中获取审批日志数据
        try {
            workflows = window.storage.getStore(`workflows_by_data_id@${business_data_id}`);
        } catch (error) {
            console.log('query store info of workflows error :' + error);
        }

        //没有从缓存中获取到审批日志信息，则从数据中获取数据
        if (
            workflows == null ||
            workflows == '' ||
            typeof workflows == 'undefined' ||
            workflows.length == 0
        ) {
            //流程数据设置为数组
            workflows = [];

            //获取审批日志信息
            var processLogs = {};

            try {
                //查询审批日志信息
                processLogs = await queryPRLogHistoryByDataID(business_data_id);

                //遍历审批日志
                window.__.each(processLogs, (item, index) => {
                    //获取下一节点
                    var next =
                        index < processLogs.length - 1 ?
                        processLogs[index + 1] : {
                            action: '',
                        };
                    //获取标识
                    var flag = index == processLogs.length - 1;
                    //获取操作时间
                    var optime = window.Betools.tools.formatDate(
                        new Date(item.operate_time),
                        'yyyy-MM-dd hh:mm:ss'
                    );

                    var content = `节点：${window.Betools.tools.deNull(
              item.process_station
            )} , 处理人： ${window.Betools.tools.deNull(
              queryUserRealName(item.approve_user)
            )} , 审批：${window.Betools.tools.deNull(item.action)} , 审批意见：${window.Betools.tools.deNull(
              item.action_opinion
            )}  时间：${window.Betools.tools.deNull(optime)} `;

                    var color =
                        item.action == '同意' ?
                        'green' :
                        item.action == '驳回' || item.action == '撤销' ?
                        'red' :
                        item.action == '知会' ?
                        'yellow' :
                        item.action == '发起' ?
                        '#00DD77' :
                        'blue';

                    //默认认为最靠近知会的节点为审批节点，颜色标识为蓝色
                    color = item.action == '同意' && next.action == '知会' ? 'blue' : color;
                    color = flag && item.action == '同意' ? 'blue' : color;
                    color = flag && item.action == '知会' ? 'orange' : color;

                    var status =
                        (item.action == '同意' && next.action == '知会') ||
                        (flag && item.action == '同意') ?
                        'over' :
                        item.action == '发起' ?
                        'start' :
                        item.action == '同意' ?
                        'agree' :
                        item.action == '驳回' || item.action == '撤销' ?
                        'cancel' :
                        item.action == '知会' ?
                        'message' :
                        'over';

                    var node = {
                        id: item.id,
                        color: color,
                        content: content,
                        status: status,
                    };

                    workflows.push(node);
                });
            } catch (error) {
                console.log('获取已处理的审批日志信息异常 :' + error);
            }

            try {
                //最后一条审核节点
                var auditnode = {};
                //获取正在审批的审批日志信息
                processLogs = await queryPRLogByDataID(business_data_id);

                //遍历数据
                window.__.each(processLogs, (item, index) => {
                    var node = {
                        id: item.id,
                        employee: item.employee,
                        color: 'pink',
                        content: `节点：${window.Betools.tools.deNull(
                item.process_station
              )} , 待处理人： ${window.Betools.tools.deNull(
                queryUserRealName(item.employee)
              )} , 审批：待处理 , 时间：-- `,
                        status: 'wait',
                        index: index,
                    };
                    workflows.push(node);
                    //设置最后一条审核节点
                    auditnode = node;
                });

                //获取正在审批的最后一条数据
                window.storage.setStore(
                    `workflows_audit_node_by_data_id@${business_data_id}`,
                    JSON.stringify(auditnode),
                    60
                );
            } catch (error) {
                console.log('获取正在审批的审批日志信息失败 :' + error);
            }

            try {
                //最后一条知会节点
                var notifynode = {};
                //获取正在审批的知会日志信息
                processLogs = await queryPRLogInfByDataID(business_data_id);

                window.__.each(processLogs, (item, index) => {
                    //获取操作时间
                    var optime = window.Betools.tools.formatDate(
                        new Date(item.operate_time),
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    var appruser = window.Betools.tools.deNull(item.approve_user);
                    var node = {
                        id: item.id,
                        employee: item.employee,
                        appruser: appruser,
                        color: 'orange',
                        content: `节点：${window.Betools.tools.deNull(
                item.process_station
              )} , 待处理人： ${window.Betools.tools.deNull(
                queryUserRealName(item.employee)
              )} ,  已处理人： ${window.Betools.tools.deNull(
                queryUserRealName(appruser)
              )} , 审批：知会 , 时间：${window.Betools.tools.deNull(optime)} `,
                        status: 'sound',
                        index: index,
                    };
                    workflows.push(node);
                    //设置最后一条知会节点
                    notifynode = node;
                });

                //获取知会的最后一条数据
                window.storage.setStore(
                    `workflows_notify_node_by_data_id@${business_data_id}`,
                    JSON.stringify(notifynode),
                    60
                );
            } catch (error) {
                console.log('获取正在审批的知会日志信息异常：' + error);
            }

            try {
                window.storage.setStore(
                    `workflows_by_data_id@${business_data_id}`,
                    JSON.stringify(workflows),
                    10
                );
            } catch (error) {
                console.log('save workflows data error :' + error);
            }
        }

        //返回工作流程数据
        return workflows;
    }

    window.queryWorkflows = queryWorkflows;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询当前评论信息
     */
    var queryCurReplayList = async(id, tools = window.tools, storage, authortool) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_comments?_where=(main_key,eq,${id})&_sort=create_time`;

        //根据业务编号，查询业务数据
        var wflow = await storage.getStoreDB(`cache_bs_comments_id:${id}`);

        //从缓存中获取到评论信息，则直接返回
        if (wflow !== null && typeof wflow !== 'undefined' && Object.prototype.toString.call(wflow) === '[object Array]') {
            return wflow;
        }

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
                wflow = [];
            } else if (res.body.length >= 1) {
                wflow = res.body;
            }

            //遍历数据，格式化日期
            for await (let item of wflow) {
                item['create_time'] = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                item['replay'] = JSON.parse(item['replay']);
                item['avatar'] = `${window._CONFIG['uploadURL']}/` + (await authortool.queryAvatarByName(item.create_by, storage)).avatar;
                //遍历二级评论
                for await (let subItem of item['replay']) {
                    subItem['avatar'] = `${window._CONFIG['uploadURL']}/` + (await authortool.queryAvatarByName(subItem.create_by, storage)).avatar;
                }
            }

            //设置缓存信息
            storage.setStoreDB(`cache_bs_comments_id:${id}`, JSON.stringify(wflow), 3600 * 2);

        } catch (err) {
            console.log(err);
        }

    }

    window.queryCurReplayList = queryCurReplayList;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 获取当前自动生成的文件编号
     */
    var queryFileNumb = async(companyName, tableName, date, curRow, tname, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

        if (tname == 'bs_ask_report') {
            date = window.Betools.tools.formatDate(new Date(curRow.starttime), 'yyyyMMddhhmmss');
            var fileNO = `${companyName}审字第${date}号`;
            console.log('文件编号：' + fileNO);
            return fileNO;
        } else {
            return curRow.no;
        }
    }

    window.queryFileNumb = queryFileNumb;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询表单对应的历史自由流程
     */
    var queryCurFreeWorkflow = async(id, tools = window.tools) => {

        //初始化
        window.tools = window.tools == null ? tools : window.tools;

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

    window.queryCurFreeWorkflow = queryCurFreeWorkflow;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询表单对应的历史自由流程
     */
    var queryHisFreeWorkflow = async(id) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_free_process?_where=(main_key,eq,${id})&_sort=-create_time`;
        //根据业务编号，查询业务数据
        var wflist = [];

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);

            //如果只有一条数据，则返回[]；如果有多条数据，则返回多个数据
            if (typeof res.body == 'undefined' || res.body == null || res.body == '') {
                wflist = [];
            } else if (res.body.length == 1) {
                wflist = [];
            } else {
                wflist = res.body.splice(1);
            }
        } catch (err) {
            console.log(err);
        }

        return wflist;
    }

    window.queryHisFreeWorkflow = queryHisFreeWorkflow;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询用户的真实姓名
     */
    var queryUserRealName = (name, queryUserNameByCache = window.queryUserNameByCache) => {
        //查询用户信息
        var userlist = queryUserNameByCache();
        var user = '';

        try {
            //如果用户信息不存在，则直接返回，否则，查询用户的真实名称
            if (
                typeof userlist == 'undefined' ||
                userlist == null ||
                userlist.length == 0
            ) {
                return user;
            } else {
                if (name.includes(',')) {
                    var ulist = name.split(',');
                    window.__.each(ulist, item => {
                        //查询用户信息
                        var obj = window.__.find(userlist, user => {
                            return user.username == item;
                        });
                        user = user + ',' + obj.realname;
                    });

                    //如果是逗号开头，则去掉第一个字符
                    if (user.startsWith(',')) {
                        user = user.substring(1);
                    }
                } else {
                    //查询用户信息
                    user = window.__.find(userlist, user => {
                        return user.username == name;
                    });

                    if (typeof user.realname != 'undefined' && user.realname != '') {
                        user = user.realname;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        return user;
    }

    window.queryUserRealName = queryUserRealName;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 查询附表数据
     */
    var queryFormMTSubData = async(tableName, foreignKey, id, queryTableDataByField = window.queryTableDataByField, queryBpmStatus = window.queryBpmStatus, tools = window.tools) => {
        //大写转小写
        tableName = tableName.toUpperCase();

        //配置说明
        var config = window.mainTableConfig || {};

        //表单配置
        var tableConfig = window.mainSubTableNameConfig || {};

        //设置返回数据
        var data = [];

        //定义执行标识
        var cflag = false;

        //检查是否存在表单
        try {
            cflag = ['BS_ATTENDANCE', 'BS_REIM', 'BS_PURCHASE', 'BS_MIREANNA', 'BS_PLAN_TASK', 'BS_DOCUMENT', 'BS_WORK_CONTACT'].includes(tableName);
        } catch (error) {
            console.error(error);
        }

        //查询主表的子表信息
        if (cflag) {
            try {
                //查询子表单数据
                try {
                    data = await queryTableDataByField(
                        tableConfig[tableName],
                        foreignKey,
                        id
                    );
                } catch (error) {
                    console.log('查询子表单数据异常：' + error);
                }
                //遍历子表单数据并设置序号
                try {
                    data.forEach(function(item, index) {
                        try {
                            item.no = index + 1;
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.date = window.Betools.tools.formatDate(item.date, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.start_time = window.Betools.tools.formatDate(item.start_time, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.end_time = window.Betools.tools.formatDate(item.end_time, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.real_start_time = window.Betools.tools.formatDate(item.real_start_time, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.real_end_time = window.Betools.tools.formatDate(item.real_end_time, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.work_date = window.Betools.tools.formatDate(item.work_date, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.complete_date = window.Betools.tools.formatDate(item.complete_date, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.join_date = window.Betools.tools.formatDate(item.join_date, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.interview_date = window.Betools.tools.formatDate(item.interview_date, 'yyyy-MM-dd');
                        } catch (error) {
                            console.error(error);
                        }
                        try {
                            item.status = /^[0-9]*$/.test(item.status) ? queryBpmStatus(item.status) : item.status;
                        } catch (error) {
                            console.error(error);
                        }
                    });
                } catch (error) {
                    console.log('子表单设置序号异常：' + error);
                }
                //设置子表单数据
                config[tableName] = data;
            } catch (error) {
                console.log('查询子表信息异常：' + error);
            }
        }
        //返回考勤异常表的子表信息
        return config[tableName];
    }

    window.queryFormMTSubData = queryFormMTSubData;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询附表字段
     */
    var queryFormMTSubColumns = (tableName) => {
        //大写转小写
        tableName = tableName.toUpperCase();
        //配置说明
        var config = window.subTableFieldConfig || {};

        return config[tableName];
    }

    window.queryFormMTSubColumns = queryFormMTSubColumns;
} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 结束日期表单显示名称
     */
    var queryFormMTFileName = (tableName) => {
        //大写转小写
        tableName = tableName.toUpperCase();
        //配置说明
        var config = window.fileNameConfig || {};

        return config[tableName];
    }

    window.queryFormMTFileName = queryFormMTFileName;
} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 根据表名查询表单名称
     */
    var queryFormName = (tableName) => {
        //大写转小写
        tableName = tableName.toUpperCase();
        //配置说明
        var config = window.tableConfig || {};

        return config[tableName];
    }

    window.queryFormName = queryFormName;
} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 根据表名查询表单名称
     */
    var queryFormTypeName = (tableName) => {
        //大写转小写
        tableName = tableName.toUpperCase();
        //配置说明
        var config = window.formTypeNameConfig || {};

        return config[tableName];
    }

    window.queryFormTypeName = queryFormTypeName;
} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 根据表名查询表单名称
     */
    var queryFormTypeValue = (tableName) => {
        //大写转小写
        tableName = tableName.toUpperCase();
        //配置说明
        var config = window.formTypeValueConfig || {};

        return config[tableName];
    }

    window.queryFormTypeValue = queryFormTypeValue;
} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 根据表名查询表单名称
     */
    var queryFormMainTable = (tableName) => {
        //大写转小写
        tableName = tableName.toUpperCase();
        //配置说明
        var config = window.formMainTypeConfig || {};

        return config[tableName];
    }

    window.queryFormMainTable = queryFormMainTable;
} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 开始日期表单显示名称
     */
    var queryFormMTStarttimeName = (tableName) => {
        //大写转小写
        tableName = tableName.toUpperCase();
        //配置说明
        var config = window.startTimeConfig || {};

        return config[tableName];
    }

    window.queryFormMTStarttimeName = queryFormMTStarttimeName;
} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 结束日期表单显示名称
     */
    var queryFormMTEndtimeName = (tableName) => {
        //大写转小写
        tableName = tableName.toUpperCase();
        //配置说明
        var config = window.endTimeConfig || {};

        return config[tableName];
    }

    window.queryFormMTEndtimeName = queryFormMTEndtimeName;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 获取n位随机数,随机来源chars
     */
    var queryRandomStr = (length = 32, tools = window.tools) => {

        var res = '';

        try {
            //使用新算法，获取唯一字符串
            res = window.Betools.tools.queryUniqueID(length);
        } catch (error) {
            console.log('获取n位随机数异常：' + error);
        }

        //返回随机数
        return res;
    }

    window.queryRandomStr = queryRandomStr;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 获取n位随机数,随机来源chars
     */
    var queryRandom = (n) => {
        var temp =
            'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
        var res = '';

        try {

            var chars = temp.split(',');
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * (temp.length - 1));
                res += chars[id];
            }

        } catch (error) {
            console.log('获取n位随机数异常：' + error);
        }

        //返回随机数
        return res;
    }

    window.queryRandom = queryRandom;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 获取诉讼案件通报数据
     */
    var queryNoticeList = async(page = 0, size = 50, tools = window.tools) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_notice?_where=(bpm_status,in,4,5)&_sort=-create_time&_p=${page}&_size=${size}`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            var result = res.body;

            //遍历并格式化日期
            window.__.each(result, function(item) {
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['table_name'] = 'bs_notice';
                item['content'] = item['content'] || item['title'];
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryNoticeList = queryNoticeList;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 获取市场观察数据
     */
    var queryViewsList = async(page = 0, size = 50, tools = window.tools) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_market_info?_where=(bpm_status,in,4,5)&_sort=-create_time&_p=${page}&_size=${size}`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            var result = res.body;

            //遍历并格式化日期
            window.__.each(result, function(item) {
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['table_name'] = 'bs_market_info';
                item['content'] = item['content'] || item['title'];
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryViewsList = queryViewsList;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 获取所有公告信息
     */
    var queryNotifyAll = async(
        type = 'all',
        size = 50,
        content = '',
        starttime,
        endtime,
        queryAnnounceList = window.queryAnnounceList,
        queryHeadList = window.queryHeadList,
        queryNewsList = window.queryNewsList,
        queryNoticeList = window.queryNoticeList,
        queryViewsList = window.queryNoticeList,
        tools = window.tools
    ) => {
        //定义内容
        var result = [];

        //获取行政公告
        var temp = [];

        //查询结果统计数
        var length = 0;

        //格式化起始时间
        starttime = window.Betools.tools.isNull(starttime) ? '' : starttime.format('YYYY-MM-DD');
        endtime = window.Betools.tools.isNull(endtime) ? '' : endtime.format('YYYY-MM-DD');

        //遍历查询所有公告信息
        for (var i = 0; i <= 1000; i++) {
            //查询前结果
            length = result.length;

            //如果为行政公告，则合并数据
            if (type == 'all' || type == '行政公告') {
                temp = await queryAnnounceList(i, size, starttime, endtime);
                result = result.concat(temp);
            }

            //如果为红头文件，则合并数据
            if (type == 'all' || type == '红头文件') {
                temp = await queryHeadList(i, size, starttime, endtime);
                result = result.concat(temp);
            }

            //如果为新闻资讯，则合并数据
            if (type == 'all' || type == '新闻资讯') {
                temp = await queryNewsList(i, size, starttime, endtime);
                result = result.concat(temp);
            }

            //如果为诉讼案件通报，则合并数据
            if (type == 'all' || type == '诉讼案件通报') {
                temp = await queryNoticeList(i, size, starttime, endtime);
                result = result.concat(temp);
            }

            //如果为市场观察，则合并数据
            if (type == 'all' || type == '市场观察') {
                temp = await queryViewsList(i, size, starttime, endtime);
                result = result.concat(temp);
            }

            //本次查询结果数
            length = result.length - length;

            //如果最新查询结果小于等于0，则停止查询
            if (length == 0) {
                break;
            }
        }

        //遍历并筛选数据
        result = window.__.filter(result, function(item) {
            //设置数据
            var flag = true;

            //判断查询内容是否为空，不为空，则进行内容筛选
            if (!window.Betools.tools.isNull(content)) {
                flag =
                    (flag && window.Betools.tools.deNull(item['title'].includes(content))) ||
                    window.Betools.tools.deNull(item['content'].includes(content));
            }

            //判断查询时间
            if (!window.Betools.tools.isNull(starttime) && !window.Betools.tools.isNull(endtime)) {
                flag =
                    flag &&
                    window.Betools.tools.deNull(item['create_time']) >= starttime &&
                    window.Betools.tools.deNull(item['create_time']) <= endtime;
            }

            return flag;
        });

        //遍历数据并排序
        result = window.__.sortBy(result, function(item) {
            return item['timestamp'] * -1.0;
        });

        //返回查询结果
        return result;
    }

    window.queryNotifyAll = queryNotifyAll;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 获取某业务记录对应的审批日志信息
     */
    var queryPRLogByDataID = async(business_data_id, tools = window.tools) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            return res.body;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryPRLogByDataID = queryPRLogByDataID;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 获取某业务记录对应的审批日志信息
     */
    var queryPRLogInfByDataID = async(business_data_id, tools = window.tools) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            return res.body;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryPRLogInfByDataID = queryPRLogInfByDataID;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 获取某业务记录对应的审批日志信息
     */
    var queryPRLogInfTotal = async(business_data_id, tools = window.tools) => {
        //获取今天日期
        var ctime = window.Betools.tools.formatDate(new Date(), 'yyyy-MM-dd');

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed/count?_where=(business_data_id,eq,${business_data_id})`;
        var queryTodayURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed/count?_where=(business_data_id,eq,${business_data_id})~and(operate_time,like,~${ctime}~)`;
        var result = {};
        var count = 0;
        var today = 0;

        try {
            //统计知会总数
            try {
                count = await superagent.get(queryURL).set('accept', 'json');
            } catch (error) {
                console.log('query total loginfo error :' + error);
            }
            //统计当天知会次数
            try {
                today = await superagent.get(queryTodayURL).set('accept', 'json');
            } catch (error) {
                console.log('query today loginfo error :' + error);
            }
            result.total = count.body[0].no_of_rows;
            result.today = today.body[0].no_of_rows;
            console.log(result);
            return result;
        } catch (err) {
            console.log('获取某业务记录对应的审批日志信息', err);
        }
    }

    window.queryPRLogInfTotal = queryPRLogInfTotal;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 获取登录用户
     */
    var queryLoginUser = async() => {
        var queryURL = `${window.requestAPIConfig.domain}/jeecg-boot/api/login/user`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);

            return res.body;
        } catch (err) {
            console.log('获取登录用户', err);
        }
    }

    window.queryLoginUser = queryLoginUser;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 定时刷新Token，保持连接，Keep-Alive
     */
    var queryToken = async(storage = window.storage) => {
        try {
            var token = window.storage.getStore('pro__Access-Token');

            var queryURL = `${window.requestAPIConfig.token}/${token.value}`;

            var result = await superagent.get(queryURL);

            return result;
        } catch (error) {
            console.log(' error : ' + error);
        }
    }

    window.queryToken = queryToken;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 下载文件 用于excel导出
     * @param url
     * @param parameter
     * @returns {*}
     */
    var downFile = async(url, parameter, requestAPI = window.requestAPI) => {
        //检查此处的URL,改成Nginx服务器对应的下载地址
        console.log(' download url :' + url);

        try {
            return window.requestAPI.axios({
                url: url,
                params: parameter,
                method: 'get',
                responseType: 'blob',
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.downFile = downFile;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 获取文件访问路径
     * @param avatar
     * @param imgerver
     * @param str
     * @returns {*}
     */
    var getFileAccessHttpUrl = (avatar, imgerver, subStr) => {
        if (avatar && avatar.indexOf(subStr) != -1) {
            return avatar;
        } else {
            return imgerver + '/' + avatar;
        }
    }

    window.getFileAccessHttpUrl = getFileAccessHttpUrl;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询URL地址TableID变量
     */
    var queryURLTableParam = () => {
        var url = null;
        try {
            url = document.location.toString();
            url = url.substring(url.lastIndexOf('/') + 1, url.length);
            console.log('tableID : ' + url);
            return url;
        } catch (error) {
            console.log(error);
        }
    }

    window.queryURLTableParam = queryURLTableParam;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 查询当前业务对应表单名称
     * @param {*} url
     */
    var queryTableName = async(callback, queryURLTableParam = window.queryURLTableParam) => {
        //获取主键ID
        var tableID = queryURLTableParam();
        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/onl_cgform_head/${tableID}`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res.body);

            if (
                typeof res != 'undefined' &&
                res.body instanceof Array &&
                res.body.length > 0 &&
                typeof callback != 'undefined'
            ) {
                callback(res.body[0]);
            }

            return res.body[0];
        } catch (err) {
            console.log(err);
        }
    }

    window.queryTableName = queryTableName;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 检测审批是否存在 存在 false  不存在 true
     * @param {*} tableName
     * @param {*} businessID
     */
    var queryApprovalExist = async(tableName, businessID) => {

        //大写转小写
        tableName = tableName.toLowerCase();
        //查询URL GET	/api/tableName/:id/exists	True or false whether a row exists or not  /api/tableName/findOne
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(table_name,eq,${tableName})~and(business_data_id,eq,${businessID})`;

        //查询标识
        var vflag = false;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');

            vflag = res.body.length > 0 ? true : false;

            return vflag;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryApprovalExist = queryApprovalExist;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 检测审批是否存在 存在 false  不存在 true
     * @param {*} tableName
     * @param {*} businessID
     */
    var queryApprovalLength = async(tableName, businessID) => {

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

    window.queryApprovalLength = queryApprovalLength;

} catch (error) {
    console.log(error);
}


try {

    /**
     * 添加数据
     * @param {*} tableName
     * @param {*} id
     */
    var insertTableData = async(tableName, node) => {
        //大写转小写
        tableName = tableName.toLowerCase();
        //Post数据的URL地址
        var insertURL = `${window.requestAPIConfig.restapi}/api/${tableName}`;

        //如果传入数据为数组，则URL添加bulk路径
        if (typeof node != 'undefined' && node != null && node instanceof Array) {
            insertURL = insertURL + '/bulk';
        }

        try {
            var res = await superagent
                .post(insertURL)
                .send(node)
                .set('accept', 'json');
            return res.body[0];
        } catch (err) {
            console.log(err);
        }
    }

    window.insertTableData = insertTableData;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 提交并持久化数据到服务器
     */
    var postTableData = async(tableName, node) => {

        //大写转小写
        tableName = tableName.toLowerCase();
        //Post数据的URL地址
        var insertURL = `${window.requestAPIConfig.restapi}/api/${tableName}`;

        //如果传入数据为数组，则URL添加bulk路径
        if (typeof node != 'undefined' && node != null && node instanceof Array) {
            insertURL = insertURL + '/bulk';
        }

        try {
            var res = await superagent
                .post(insertURL)
                .send(node)
                .set('accept', 'json');
            return res.body[0];
        } catch (err) {
            console.log(err);
        }
    }

    window.postTableData = postTableData;
} catch (error) {
    console.log(error);
}


try {
    /**
     * 添加数据
     * @param {*} tableName
     * @param {*} id
     */
    var deleteTableData = async(tableName, id) => {
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

    window.deleteTableData = deleteTableData;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 更新数据
     * @param {*} tableName
     * @param {*} id
     * @param {*} node
     */
    var patchTableData = async(tableName, id, node) => {

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

    window.patchTableData = patchTableData;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 更新数据
     * @param {*} tableName
     * @param {*} id
     * @param {*} node
     */
    var patchTableItem = async(tableName, id, node, patchTableData = window.patchTableData) => {
        //大写转小写
        tableName = tableName.toLowerCase();
        try {
            return patchTableData(tableName, id, node);
        } catch (err) {
            console.log(err);
        }
    }

    window.patchTableItem = patchTableItem;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询数据
     * @param {*} tableName
     * @param {*} id
     */
    var queryTableData = async(tableName, id) => {
        //大写转小写
        tableName = tableName.toLowerCase();
        //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
        var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}/${id}`;

        try {
            //获取缓存中的数据
            var cache = window.storage.getStore(`sys_user_cache@${tableName}&id${id}`);

            //返回缓存值
            if (typeof cache != 'undefined' && cache != null && cache != '') {
                return cache;
            }

            var res = await superagent.get(queryURL).set('accept', 'json');

            if (res.body != null && res.body.length > 0) {
                window.storage.setStore(`sys_user_cache@${tableName}&id${id}`, res.body[0], 2);
            }

            return res.body[0];
        } catch (err) {
            console.log(err);
        }
    }

    window.queryTableData = queryTableData;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 分页查询表单数据
     */
    var queryTableDataByParam = async(
        tableName,
        username,
        realname,
        page,
        size,
        param
    ) => {

        var data = [];
        //定义默认页面大小
        const page_size = 99;

        //大写转小写
        tableName = tableName.toLowerCase();
        username = username.trim();
        realname = realname.trim();
        var queryURL = null;
        var res = null;

        if (size <= page_size) {
            //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
            queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(create_by,like,~${username}~)~or(create_by,like,~${realname}~)&_p=${page}&_size=${size}&_sort=-create_time`;

            try {
                res = await superagent.get(queryURL).set('accept', 'json');
                data = [...data, ...res.body];
            } catch (err) {
                console.log(...arguments.args, ...[err]);
            }
        } else {
            //设置循环次数
            const times = parseInt(size / page_size) + 1;
            //定义当前循环次数
            var i = 0;
            //进行遍历查询
            while (i <= times) {
                //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
                queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(create_by,like,~${username}~)~or(create_by,like,~${realname}~)&_p=${page + i++}&_size=${page_size}&_sort=-create_time`;
                res = null;
                try {
                    res = await superagent.get(queryURL).set('accept', 'json');
                    data = [...data, ...res.body];
                } catch (err) {
                    console.log(...arguments.args, ...[err]);
                }
                if (res.body.length == 0) {
                    break;
                }
            }
        }

        var response = {
            success: true,
            result: {
                records: data,
                total: data.length + 1
            }
        }
        return response;
    }

    window.queryTableDataByParam = queryTableDataByParam;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询数据(all)
     * @param {*} tableName
     */
    var queryTableAll = async(tableName) => {
        //大写转小写
        tableName = tableName.toLowerCase();
        //查询URL Get	/api/tableName	query all rows by tableName
        var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}`;
        //定义查询结果
        var result = null;

        try {
            //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
            result = window.storage.getStore('system_table_data_info_all');

            if (!(typeof result != 'undefined' && result != null && result != '')) {
                //发送HTTP请求，获取返回值后，设置数据
                var res = await superagent.get(queryURL).set('accept', 'json');
                result = res.body;

                //遍历并格式化日期
                window.__.each(result, function(item) {
                    var optime = window.Betools.tools.formatDate(
                        item['create_time'],
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                    item['createtime'] = window.Betools.tools.formatDate(
                        item['create_time'],
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    item['timestamp'] = time;
                    item['create_time'] = optime;
                });

                //设置缓存数据，缓存时间，暂定为5秒钟
                window.storage.setStore('system_table_data_info_all', result, 5);
            }
        } catch (err) {
            console.log(err);
        }

        //返回查询后的数据
        return result;
    }

    window.queryTableAll = queryTableAll;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询部门信息
     */
    var queryDepartName = async(id) => {
        //设置查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_depart_name?_where=(id,eq,${id})&_p=0&_size=10`;
        //定义查询结果
        var result = null;

        try {
            //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
            result = window.storage.getStore(`system_depart_name_by_id@${id}`);

            if (!(typeof result != 'undefined' && result != null && result != '')) {
                //发送HTTP请求，获取返回值后，设置数据
                var res = await superagent.get(queryURL).set('accept', 'json');

                //获取返回结果
                result = res.body[0];

                //设置缓存数据，缓存时间，暂定为5秒钟
                window.storage.setStore(`system_depart_name_by_id@${id}`, result, 3600 * 2);
            }
        } catch (err) {
            console.log(err);
        }

        //返回查询后的动态数据
        return result;
    }

    window.queryDepartName = queryDepartName;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询动态数据
     */
    var queryDynamic = async() => {
        //设置查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_dynamic?_size=10&_sort=-create_time`;
        //定义查询结果
        var result = null;

        try {
            //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
            result = window.storage.getStore('system_dynamic_info_all');

            if (!(typeof result != 'undefined' && result != null && result != '')) {
                //发送HTTP请求，获取返回值后，设置数据
                var res = await superagent.get(queryURL).set('accept', 'json');
                result = res.body;

                //遍历并格式化日期
                window.__.each(result, function(item) {
                    var optime = window.Betools.tools.formatDate(
                        item['create_time'],
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                    item['createtime'] = window.Betools.tools.formatDate(
                        item['create_time'],
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    item['timestamp'] = time;
                    item['create_time'] = optime;
                });

                //设置缓存数据，缓存时间，暂定为5秒钟
                window.storage.setStore('system_dynamic_info_all', result, 3600 * 2);
            }
        } catch (err) {
            console.log(err);
        }

        //返回查询后的动态数据
        return result;
    }

    window.queryDynamic = queryDynamic;

} catch (error) {
    console.log(error);
}


try {
    var queryDynamicByUser = async(username, storage = window.storage) => {
        //设置查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_dynamic?_where=(relate_users,like,~${username}~)&_size=10&_sort=-create_time`;
        //定义查询结果
        var result = null;

        try {
            //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
            result = window.storage.getStore(`system_dynamic_info_by_user@${username}`);

            if (!(typeof result != 'undefined' && result != null && result != '')) {
                //发送HTTP请求，获取返回值后，设置数据
                var res = await superagent.get(queryURL).set('accept', 'json');
                result = res.body;

                //遍历并格式化日期
                window.__.each(result, function(item) {
                    var optime = window.Betools.tools.formatDate(
                        item['create_time'],
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                    item['createtime'] = window.Betools.tools.formatDate(
                        item['create_time'],
                        'yyyy-MM-dd hh:mm:ss'
                    );
                    item['timestamp'] = time;
                    item['create_time'] = optime;
                });

                //设置缓存数据，缓存时间，暂定为5秒钟
                window.storage.setStore(
                    `system_dynamic_info_by_user@${username}`,
                    result,
                    3600 * 2
                );
            }
        } catch (err) {
            console.log(err);
        }

        //返回查询后的动态数据
        return result;
    }

    window.queryDynamicByUser = queryDynamicByUser;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询数据
     * @param {*} tableName
     * @param {*} foreignKey
     * @param {*} id
     */
    var queryTableDataByField = async(tableName, field, value) => {
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
    window.queryTableDataByField = queryTableDataByField;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 查询用户是否为管理员
     * @param {*} username 待查询用户
     */
    var queryAdminUserByView = async(username) => {
        //更新URL PATCH	/api/tableName/:id	Updates row element by primary key http://api.shengtai.club/api/v_admin?_where=(username,eq,zhaoziyun)
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_admin?_where=(username,eq,${username})`;

        //定义查询结果
        var result = null;

        try {
            //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
            result = window.storage.getStore(`system_v_admin_info@username$${username}`);

            if (!(typeof result != 'undefined' && result != null && result != '')) {
                //发送HTTP请求，获取返回值后，设置数据
                var res = await superagent.get(queryURL).set('accept', 'json');
                //设置返回结果
                result = res.body;

                //设置缓存数据，缓存时间，暂定为5秒钟
                window.storage.setStore(
                    `system_v_admin_info@username$${username}`,
                    result,
                    3600 * 2
                );
            }
        } catch (err) {
            console.log(err);
        }

        //返回查询后的动态数据
        return result;
    }

    window.queryAdminUserByView = queryAdminUserByView;
} catch (e) {
    console.log('查询管理员用户信息失败：' + e);
}

try {
    var queryUserInfoByView = async(username) => {
        //更新URL PATCH	/api/tableName/:id	Updates row element by primary key http://api.shengtai.club/api/v_admin?_where=(username,eq,zhaoziyun)
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_user?_where=(username,eq,${username})`;

        //定义查询结果
        var result = null;

        try {
            //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
            result = window.storage.getStore(`system_v_user_info@username$${username}`);

            if (!(typeof result != 'undefined' && result != null && result != '')) {
                //发送HTTP请求，获取返回值后，设置数据
                var res = await superagent.get(queryURL).set('accept', 'json');
                //设置返回结果
                result = res.body;

                //设置缓存数据，缓存时间，暂定为5秒钟
                window.storage.setStore(
                    `system_v_user_info@username$${username}`,
                    result,
                    3600 * 2
                );
            }
        } catch (err) {
            console.log(err);
        }

        //返回查询后的动态数据
        return result;
    }

    window.queryUserInfoByView = queryUserInfoByView;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询数据
     * @param {*} tableName
     * @param {*} foreignKey
     * @param {*} id
     */
    var queryTableDataAll = async(tableName) => {
        //大写转小写
        tableName = tableName.toLowerCase();
        //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
        var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            return res.body;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryTableDataAll = queryTableDataAll;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询表单字段数据
     * @param {*} tableName
     * @param {*} foreignKey
     * @param {*} id
     */
    var queryTableFieldInfo = async(tableName, field, value) => {
        //大写转小写
        tableName = tableName.toLowerCase();
        //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
        var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(name,eq,${field})~and(field,eq,${value})`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            return res.body[0];
        } catch (err) {
            console.log(err);
        }
    }

    window.queryTableFieldInfo = queryTableFieldInfo;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询流程权责业务信息
     */
    var queryBusinessInfo = async(tableName, callback) => {
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

    window.queryBusinessInfo = queryBusinessInfo;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的员工信息
     */
    var queryProcessNodeEmployee = async(node, callback) => {
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

    window.queryProcessNodeEmployee = queryProcessNodeEmployee;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var queryProcessNodeProcName = async(node, callback) => {
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

    window.queryProcessNodeProcName = queryProcessNodeProcName;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询审批处理页面的记录
     */
    var queryUserList = async(params) => {
        //pageNo从0开始计算
        params.pageNo = params.pageNo - 1;

        //用户名称
        var whereFlag =
            window.Betools.tools.deNull(params.username) == '' ?
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
                item['status'] = '1';
                item['orgCode'] = '';
                item['updateBy'] = '';
                item['createTime'] = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                item['createBy'] = 'admin';
                item['workNo'] = '';
                item['delFlag'] = '0';
                item['status_dictText'] = '';
                item['birthday'] = window.Betools.tools.formatDate(item['birthday'], 'yyyy-MM-dd');
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

    window.queryUserList = queryUserList;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询审批处理页面的记录
     */
    var queryProcessLogToApproved = async(username, realname, params) => {
        //pageNo从0开始计算
        params.pageNo = params.pageNo - 1;

        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(employee,like,~${username}~)~or(employee,like,~${realname}~)&_p=${params.pageNo}&_size=${params.pageSize}`;
        var queryCountURL = `${window.requestAPIConfig.restapi}/api/pr_log/count?_where=(employee,like,~${username}~)~or(employee,like,~${realname}~)`;
        var result = {};
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            var count = await superagent.get(queryCountURL).set('accept', 'json');
            console.log(res);
            result.records = res.body;
            result.total =
                count.body[0].no_of_rows <= 30 ?
                res.body.length :
                count.body[0].no_of_rows;

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogToApproved = queryProcessLogToApproved;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询审批历史记录页面的记录
     */
    var queryProcessLogHisApproved = async(username, realname, params, tools = window.tools) => {
        //pageNo从0开始计算
        params.pageNo = params.pageNo - 1;

        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_history?_where=(approve_user,like,~${username}~)~or(approve_user,like,~${realname}~)~or(proponents,like,~${username}~)~or(proponents,like,~${realname}~)&_p=${params.pageNo}&_size=${params.pageSize}&_sort=-operate_time`;
        var queryCountURL = `${window.requestAPIConfig.restapi}/api/pr_log_history/count?_where=(approve_user,like,~${username}~)~or(approve_user,like,~${realname}~)~or(proponents,like,~${username}~)~or(proponents,like,~${realname}~)`;
        var result = {};

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            var count = await superagent.get(queryCountURL).set('accept', 'json');
            console.log(res);
            result.records = res.body;

            //遍历并格式化日期
            window.__.each(result.records, function(item) {
                var optime = window.Betools.tools.formatDate(
                    item['operate_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                optime = optime.replace('T', ' ');
                item['operate_time'] = optime;
            });

            result.total =
                count.body[0].no_of_rows <= 30 ?
                res.body.length :
                count.body[0].no_of_rows;
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogHisApproved = queryProcessLogHisApproved;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 查询我的待办数据
     */
    var queryProcessLogWait = async(
        username,
        realname,
        page = 0,
        size = 50,
        tools = window.tools
    ) => {
        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_handling_events?_where=(username,like,~${username}~)~or(username,like,~${realname}~)&_p=${page}&_size=${size}&_sort=-create_time`;
        var result = {};

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            result = res.body;
            result = window.__.filter(result, function(item) {
                //格式化日期
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['createtime'] = window.Betools.tools.formatDate(
                    item['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                item['timestamp'] = time;
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['content'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['content']));
                item['topic'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['topic']));

                //查询是否存在此用户名，且已处理用户中，不含登录用户
                var flag =
                    (window.__.contains(item['username'], username) ||
                        window.__.contains(item['username'], realname)) &&
                    !item.user.includes(username);

                //返回结果
                return flag;
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogWait = queryProcessLogWait;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询用户名称信息
     */
    var queryUserNameByDB = async(storage = window.storage) => {
        //查询URL
        var index = 0;
        var queryURL;
        var result = [];

        try {
            //从缓存中获取用户数据
            var userlist = window.storage.getStore('cache_all_user_name_db');

            if (
                typeof userlist == 'undefined' ||
                userlist == null ||
                userlist.length == 0
            ) {
                while (index < 10000) {
                    queryURL = `${window.requestAPIConfig.restapi}/api/v_uname?_p=${index++}&_size=95`;
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
                window.storage.setStore('cache_all_user_name_db', result, 300);
            } else {
                result = userlist;
            }

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryUserNameByDB = queryUserNameByDB;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 查询用户名称信息
     */
    var queryUserName = async(storage = window.storage) => {
        //查询URL
        var index = 0;
        var queryURL;
        var result = [];

        try {
            //从缓存中获取用户数据
            var userlist = window.storage.getStore('cache_all_user_name');

            if (
                typeof userlist == 'undefined' ||
                userlist == null ||
                userlist.length == 0
            ) {
                while (index < 10000) {
                    queryURL = `${window.requestAPIConfig.restapi}/api/v_uname?_p=${index++}&_size=50`;
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
                window.storage.setStore('cache_all_user_name', result, 3600 * 2);
            } else {
                result = userlist;
            }

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryUserName = queryUserName;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 查询用户名称信息
     */
    var queryUserNameByCache = () => {
        //返回对象结果
        var result = [];

        try {
            //从缓存中获取用户数据
            var userlist = window.storage.getStore('cache_all_user_name');

            if (
                typeof userlist == 'undefined' ||
                userlist == null ||
                userlist.length == 0
            ) {
                result = [];
            } else {
                result = userlist;
            }
        } catch (err) {
            console.log(err);
        }

        return result;
    }

    window.queryUserNameByCache = queryUserNameByCache;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 检查是否存在流程
     */
    var queryExistWorkflow = async(id) => {
        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_handling_events?_where=(id,eq,${id})`;
        //返回结果对象
        var result = {};

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');

            if (
                typeof res.body != 'undefined' &&
                res.body != null &&
                res.body.length > 0
            ) {
                result = res.body[0];
            }
        } catch (err) {
            console.log('打印错误日志：' + err);
        }

        return result;
    }

    window.queryExistWorkflow = queryExistWorkflow;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询工作流程的节点配置(审核节点、审批节点、知会节点)
     */
    var queryWorkflowNode = async(id, storage = window.storage, tools = window.tools) => {
        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_workflow_node?_where=(id,eq,${id})`;
        //返回结果对象
        var result = {};

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');

            if (
                typeof res.body != 'undefined' &&
                res.body != null &&
                res.body.length > 0
            ) {
                result = res.body[0];

                if (result.notify == null || result.notify == '') {
                    let notifynode = window.storage.getStore(
                        `workflows_notify_node_by_data_id@${id}`
                    );
                    result.notify = notifynode.employee + ',' + notifynode.appruser;
                    console.log('知会人员：' + result.notify);
                }

                //获取当前正在审批用户
                let auditnode = window.storage.getStore(`workflows_audit_node_by_data_id@${id}`);
                result.operate = auditnode.employee;
            }
        } catch (err) {
            console.log('打印错误日志：' + err);
        }

        return result;
    }

    window.queryWorkflowNode = queryWorkflowNode;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询工作流程的节点配置(审核节点、审批节点、知会节点)
     */
    var queryWorkflowNodeByUser = async(tableName, username) => {
        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_workflow_type_node?_where=(tname,eq,${tableName})~and(cname,eq,${username})`;
        //返回结果对象
        var result = {};

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');

            if (
                typeof res.body != 'undefined' &&
                res.body != null &&
                res.body.length > 0
            ) {
                result = res.body[0];
            }
        } catch (err) {
            console.log('打印错误日志：' + err);
        }

        return result;
    }

    window.queryWorkflowNodeByUser = queryWorkflowNodeByUser;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询我的待办数据
     */
    var queryProcessLogWaitByParam = async(
        username,
        param,
        page = 0,
        size = 50,
        tools = window.tools
    ) => {
        //条件SQL
        var whereSQL = '';

        //根据条件构造参数
        if (window.Betools.tools.deNull(param.type) != '') {
            whereSQL = whereSQL + `~and(type,eq,${param.type})`;
        }
        if (window.Betools.tools.deNull(param.name) != '') {
            whereSQL = whereSQL + `~and(tname,eq,${param.name})`;
        }
        if (window.Betools.tools.deNull(param.topic) != '') {
            whereSQL = whereSQL + `~and(topic,like,~${param.topic}~)`;
        }
        if (window.Betools.tools.deNull(param.startman) != '') {
            whereSQL = whereSQL + `~and(sponsor,like,~${param.startman}~)`;
        }
        if (window.Betools.tools.deNull(param.time) != '') {
            var starttime = '';
            var endtime = '';

            //设置时间
            if (param.time.length == 0) {
                starttime = new Date();
                endtime = new Date();
            } else if (param.time.length == 1) {
                starttime = param.time[0].format('YYYY-MM-DD');
                endtime = param.time[1].format('YYYY-MM-DD');
            } else if (param.time.length >= 2) {
                starttime = param.time[0].format('YYYY-MM-DD');
                endtime = param.time[1].format('YYYY-MM-DD');
            }

            starttime = window.Betools.tools.formatDate(starttime, 'yyyy-MM-dd') + ' 00:00:00';
            endtime = window.Betools.tools.formatDate(endtime, 'yyyy-MM-dd') + ' 23:59:59';

            whereSQL = whereSQL + `~and(create_time,bw,${starttime},${endtime})`;
        }

        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_handling_events?_where=(username,like,~${username}~)${whereSQL}&_p=${page}&_size=${size}&_sort=-create_time`;
        var result = {};

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            result = res.body;

            //遍历并格式化日期
            result = window.__.filter(result, function(item) {
                //格式化日期
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['createtime'] = window.Betools.tools.formatDate(
                    item['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                item['timestamp'] = time;
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['content'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['content']));
                item['topic'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['topic']));

                //查询是否存在此用户名
                var flag = window.__.contains(item['username'], username);

                //返回结果
                return flag;
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogWaitByParam = queryProcessLogWaitByParam;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询我的已办数据
     */
    var queryProcessLogDoneByTime = async(
        username,
        realname,
        page = 0,
        size = 50,
        time,
        tools = window.tools
    ) => {
        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_handled_events_unq?_where=(username,like,~${username}~)~and(create_time,gte,${time})&_p=${page}&_size=${size}&_sort=-create_time`;
        var result = {};
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            result = res.body;

            //遍历并格式化日期
            result = window.__.filter(result, function(item) {
                //格式化日期
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['createtime'] = window.Betools.tools.formatDate(
                    item['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['content'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['content']));
                item['topic'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['topic']));

                //查询是否存在此用户名
                var flag =
                    window.__.contains(item['username'], username) ||
                    window.__.contains(item['username'], realname);

                //返回结果
                return flag;
            });

            //根据ID编号去掉重复的数据
            result = window.__.uniq(result, false, 'id');

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogDoneByTime = queryProcessLogDoneByTime

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询最新的10篇博文数据
     */
    var queryBlogInfoNew = async(page = 0, size = 10, tools = window.tools) => {

        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_blog?_p=${page}&_size=${size}&_sort=-create_time`;
        var result = {};
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            result = res.body;

            //遍历并格式化日期
            result = window.__.filter(result, function(item) {
                //格式化日期
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['createtime'] = window.Betools.tools.formatDate(
                    item['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['description'] = window.Betools.tools.abbreviation(
                    window.Betools.tools.delHtmlTag(item['content']),
                    300
                );
                item['title'] = item['name'] = window.Betools.tools.abbreviation(
                    window.Betools.tools.delHtmlTag(item['blog_title']),
                    100
                );
                item['avatar'] = "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-blog-hot.svg";
                //返回结果
                return true;
            });

            //根据ID编号去掉重复的数据
            result = window.__.uniq(result, false, 'id');

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryBlogInfoNew = queryBlogInfoNew;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 查询我的博文数据
     */
    var queryBlogInfoByUser = async(username, page = 0, size = 50, tools = window.tools) => {


        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_blog?_where=(create_by,eq,${username})&_p=${page}&_size=${size}&_sort=-create_time`;
        var result = {};
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            result = res.body;

            //遍历并格式化日期
            result = window.__.filter(result, function(item) {
                //格式化日期
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['createtime'] = window.Betools.tools.formatDate(
                    item['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['description'] = window.Betools.tools.abbreviation(
                    window.Betools.tools.delHtmlTag(item['content']),
                    300
                );
                item['title'] = window.Betools.tools.abbreviation(
                    window.Betools.tools.delHtmlTag(item['blog_title']),
                    100
                );

                //返回结果
                return true;
            });

            //根据ID编号去掉重复的数据
            result = window.__.uniq(result, false, 'id');

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryBlogInfoByUser = queryBlogInfoByUser;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询所有博文数据
     */
    var queryBlogInfo = async(
        page = 0,
        size = 50,
        username,
        nousername,
        starttime,
        endtime,
        tools = window.tools
    ) => {
        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_blog?_p=${page}&_size=${size}&_sort=-create_time`;
        var result = {};
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            result = res.body;

            //遍历并格式化日期
            result = window.__.filter(result, function(item) {
                //格式化日期
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['createtime'] = window.Betools.tools.formatDate(
                    item['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['description'] = window.Betools.tools.abbreviation(
                    window.Betools.tools.delHtmlTag(item['content']),
                    300
                );
                item['title'] = window.Betools.tools.abbreviation(
                    Betools.tools.delHtmlTag(item['blog_title']),
                    100
                );

                //返回结果
                return true;
            });

            //根据ID编号去掉重复的数据
            result = window.__.uniq(result, false, 'id');

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryBlogInfo = queryBlogInfo;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 查询我的已办数据
     */
    var queryProcessLogDone = async(
        username,
        realname,
        page = 0,
        size = 50,
        tools = window.tools
    ) => {
        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_handled_events_unq?_where=(username,like,~${username}~)~or(username,like,~${realname}~)&_p=${page}&_size=${size}&_sort=-create_time`;
        var result = {};
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            result = res.body;

            //遍历并格式化日期
            result = window.__.filter(result, function(item) {
                //格式化日期
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['createtime'] = window.Betools.tools.formatDate(
                    item['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['content'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['content']));
                item['topic'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['topic']));

                //查询是否存在此用户名
                var flag =
                    window.__.contains(item['username'], username) ||
                    window.__.contains(item['username'], realname);

                //返回结果
                return flag;
            });

            //根据ID编号去掉重复的数据
            result = window.__.uniq(result, false, 'id');

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogDone = queryProcessLogDone;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询我的已办数据
     */
    var queryProcessLogDoneAll = async(username, realname, storage = window.storage, tools = window.tools) => {
        //返回结果
        var result = [];
        //遍历计数器
        var i = 0;

        try {
            result = window.storage.getStore(`system_process_log_done_all_user@${username}`);

            if (window.Betools.tools.isNull(result) || result.length == 0) {
                result = [];

                for (i = 0; i < 1000000; i++) {
                    var list = await queryProcessLogDone(username, realname, i, 50);
                    console.log(` 第${i}次 查询数据 ：${JSON.stringify(list)}`);
                    if (typeof list == 'undefined' || list == null || list.length == 0) {
                        break;
                    } else {
                        result = result.concat(list);
                    }
                }

                //遍历数据，将英文名转为中文名
                for (let item of result) {
                    try {
                        item['username'] = await patchEnameCname(item['username'].toString());
                        item['proponents'] = await patchEnameCname(item['proponents']);

                        item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                    } catch (error) {
                        console.log(error);
                    }
                }

                //根据ID编号去掉重复的数据
                result = window.__.uniq(result, false, 'id');

                //将数据缓存到localwindow.storage中
                window.storage.setStore(
                    `system_process_log_done_all_user@${username}`,
                    JSON.stringify(result),
                    3600 * 2
                );
            } else {
                //获取到数据，查询最新的数据，取出数组中第一条数据，然后查询时间大于等于这条的待办，然后去掉重复数据
                var first = window.__.max(result, function(item) {
                    let time = window.Betools.tools.isNull(item.timestamp) ?
                        window.Betools.tools.formatDate(new Date(item.create_time), 'yyyyMMddhhmmss') :
                        item.timestamp;
                    return time;
                });
                var curtime = window.Betools.tools.isNull(first.createtime) ?
                    window.Betools.tools.formatDate(first['create_time'], 'yyyy-MM-dd hh:mm:ss') :
                    first.createtime;
                var nlist = [];

                for (i = 0; i < 1000000; i++) {
                    var list = await queryProcessLogDoneByTime(
                        username,
                        realname,
                        i,
                        50,
                        curtime
                    );
                    console.log(` 第${i}次 查询数据 ：${JSON.stringify(list)}`);
                    if (typeof list == 'undefined' || list == null || list.length == 0) {
                        break;
                    } else {
                        nlist = nlist.concat(list);
                    }
                }

                //遍历数据，将英文名转为中文名
                for (let item of nlist) {
                    try {
                        item['username'] = await patchEnameCname(item['username'].toString());
                        item['proponents'] = await patchEnameCname(item['proponents']);

                        item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                    } catch (error) {
                        console.log(error);
                    }
                }

                //合并原始数据和最新查询处理的数据
                result = result.concat(nlist);

                //根据ID编号去掉重复的数据
                result = window.__.uniq(result, false, 'id');

                //根据时间戳排序
                result = window.__.sortBy(result, item => {
                    return item['timestamp'] * -1;
                });

                //将数据缓存到localwindow.storage中
                window.storage.setStore(
                    `system_process_log_done_all_user@${username}`,
                    JSON.stringify(result),
                    3600 * 2
                );
            }

            //返回查询结果
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    window.queryProcessLogDoneAll = queryProcessLogDoneAll;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询我的待办数据
     */
    var queryProcessLogWaitAll = async(username, realname, tools = window.tools) => {
        //返回结果
        var result = [];

        try {
            for (var i = 0; i < 1000000; i++) {
                var list = await queryProcessLogWait(username, realname, i, 50);
                console.log(` 第${i}次 查询数据 ：${JSON.stringify(list)}`);
                if (typeof list == 'undefined' || list == null || list.length == 0) {
                    break;
                } else {
                    result = result.concat(list);
                }
            }

            //遍历数据，将英文名转为中文名
            for (var item of result) {
                try {
                    item['username'] = await patchEnameCname(item['username'].toString());
                    item['proponents'] = await patchEnameCname(item['proponents']);

                    item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                } catch (error) {
                    console.log(error);
                }
            }

            //返回查询结果
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    window.queryProcessLogWaitAll = queryProcessLogWaitAll;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 查询我的已办数据（条件查询ALL）
     */
    var queryProcessLogDoneByParamAll = async(username, param, tools = window.tools) => {
        //返回结果
        var result = [];

        try {
            for (var i = 0; i < 1000000; i++) {
                var list = await queryProcessLogDoneByParam(username, param, i, 50);
                console.log(` 第${i}次 查询数据 ：${JSON.stringify(list)}`);
                if (typeof list == 'undefined' || list == null || list.length == 0) {
                    break;
                } else {
                    result = result.concat(list);
                }
            }

            //遍历数据，将英文名转为中文名
            for (var item of result) {
                try {
                    item['username'] = await patchEnameCname(item['username'].toString());
                    item['proponents'] = await patchEnameCname(item['proponents']);

                    item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                } catch (error) {
                    console.log(error);
                }
            }

            //根据ID编号去掉重复的数据
            result = window.__.uniq(result, false, 'id');

            //根据时间戳排序
            result = window.__.sortBy(result, item => {
                return item['timestamp'] * -1;
            });

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    window.queryProcessLogDoneByParamAll = queryProcessLogDoneByParamAll;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 查询我的待办数据（条件查询ALL）
     */
    var queryProcessLogWaitByParamAll = async(username, param, tools = window.tools) => {
        //返回结果
        var result = [];

        try {
            for (var i = 0; i < 1000000; i++) {
                var list = await queryProcessLogWaitByParam(username, param, i, 50);
                console.log(` 第${i}次 查询数据 ：${JSON.stringify(list)}`);
                if (typeof list == 'undefined' || list == null || list.length == 0) {
                    break;
                } else {
                    result = result.concat(list);
                }
            }

            //遍历数据，将英文名转为中文名
            for (var item of result) {
                try {
                    item['username'] = await patchEnameCname(item['username'].toString());
                    item['proponents'] = await patchEnameCname(item['proponents']);

                    item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                } catch (error) {
                    console.log(error);
                }
            }

            return result;
        } catch (error) {
            console.log(error);
        }
    }

    window.queryProcessLogWaitByParamAll = queryProcessLogWaitByParamAll;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 查询我的已办数据（条件查询）
     */
    var queryProcessLogDoneByParam = async(
        username,
        param,
        page = 0,
        size = 50,
        tools = window.tools
    ) => {
        //条件SQL
        var whereSQL = '';

        //根据条件构造参数
        if (window.Betools.tools.deNull(param.type) != '') {
            whereSQL = whereSQL + `~and(type,eq,${param.type})`;
        }
        if (window.Betools.tools.deNull(param.name) != '') {
            whereSQL = whereSQL + `~and(tname,eq,${param.name})`;
        }
        if (window.Betools.tools.deNull(param.topic) != '') {
            whereSQL = whereSQL + `~and(topic,like,~${param.topic}~)`;
        }
        if (window.Betools.tools.deNull(param.startman) != '') {
            whereSQL = whereSQL + `~and(sponsor,like,~${param.startman}~)`;
        }
        if (window.Betools.tools.deNull(param.time) != '') {
            var starttime = '';
            var endtime = '';

            //设置时间
            if (param.time.length == 0) {
                starttime = new Date();
                endtime = new Date();
            } else if (param.time.length == 1) {
                try {
                    starttime = param.time[0].format('YYYY-MM-DD');
                    endtime = param.time[1].format('YYYY-MM-DD');
                } catch (error) {
                    starttime = param.time[0];
                    endtime = param.time[1];
                }
            } else if (param.time.length >= 2) {
                try {
                    starttime = param.time[0].format('YYYY-MM-DD');
                    endtime = param.time[1].format('YYYY-MM-DD');
                } catch (error) {
                    starttime = param.time[0];
                    endtime = param.time[1];
                }
            }

            starttime = window.Betools.tools.formatDate(starttime, 'yyyy-MM-dd') + ' 00:00:00';
            endtime = window.Betools.tools.formatDate(endtime, 'yyyy-MM-dd') + ' 23:59:59';

            whereSQL = whereSQL + `~and(create_time,bw,${starttime},${endtime})`;
        }

        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/v_handled_events_unq?_where=(username,like,~${username}~)${whereSQL}&_p=${page}&_size=${size}&_sort=-create_time`;
        var result = {};
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            result = res.body;

            //遍历并格式化日期
            result = window.__.filter(result, function(item) {
                //格式化日期
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['createtime'] = window.Betools.tools.formatDate(
                    item['create_time'],
                    'yyyy-MM-dd hh:mm:ss'
                );
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['content'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['content']));
                item['topic'] = window.Betools.tools.abbreviation(window.Betools.tools.delHtmlTag(item['topic']));

                //查询是否存在此用户名
                var flag = window.__.contains(item['username'], username);

                //返回结果
                return flag;
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogDoneByParam = queryProcessLogDoneByParam;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 查询审批知会记录页面的记录
     */
    var queryProcessLogInfApproved = async(username, realname, params) => {
        //pageNo从0开始计算
        params.pageNo = params.pageNo - 1;

        //查询URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed?_where=((employee,like,~${username}~)~or(employee,like,~${realname}~))&_p=${params.pageNo}&_size=${params.pageSize}&_sort=-operate_time`;
        var queryCountURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed/count?_where=((employee,like,~${username}~)~or(employee,like,~${realname}~))`;
        var result = {};
        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            var count = await superagent.get(queryCountURL).set('accept', 'json');

            console.log('query url : ' + queryURL);

            console.log(res);
            result.records = res.body;
            result.total =
                count.body[0].no_of_rows <= 30 ?
                res.body.length :
                count.body[0].no_of_rows;
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogInfApproved = queryProcessLogInfApproved;

} catch (error) {
    console.log(error);
}


try {

    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var queryProcessLogInfByID = async(tableName, id) => {
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

    window.queryProcessLogInfByID = queryProcessLogInfByID;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 获取某业务记录对应的审批日志信息
     */
    var queryProcessLogInformed = async(tableName, business_data_id) => {
        //大写转小写
        tableName = tableName.toLowerCase();
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed?_where=(table_name,eq,${tableName})~and(business_data_id,eq,${business_data_id})&_sort=operate_time`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            return res.body;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryProcessLogInformed = queryProcessLogInformed;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var queryProcessLog = async(tableName, businessID) => {
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

    window.queryProcessLog = queryProcessLog;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var queryProcessLogByID = async(tableName, id) => {
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

    window.queryProcessLogByID = queryProcessLogByID;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var deleteTableItem = async(tableName, node) => {
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
            window.__.each(node, function(item) {
                ids = ids + ',' + item['id'];
            });

            //去掉开头的逗号
            ids = ids.indexOf(',') == 0 ? ids.substring(1) : ids;
        } catch (error) {
            console.log(error);
        }

        try {
            deleteURL = `${window.requestAPIConfig.restapi}/api/${tableName}/bulk?_ids=${ids}`;
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

    window.deleteTableItem = deleteTableItem;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var deleteProcessLog = async(tableName, node) => {
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
            window.__.each(node, function(item) {
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

    window.deleteProcessLog = deleteProcessLog;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 根据数据字典中的节点编号，删除到这个节点对应的流程信息
     */
    var deleteProcessLogInf = async(tableName, node) => {
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
            window.__.each(node, function(item) {
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

    window.deleteProcessLogInf = deleteProcessLogInf;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var postTableItem = async(tableName, node) => {
        //大写转小写
        tableName = tableName.toLowerCase();
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

        //构建表单提交数据的URL
        try {
            postURL = `${window.requestAPIConfig.restapi}/api/${tableName}${bflag}`;
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

    window.postTableItem = postTableItem;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var postProcessLog = async(node) => {
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

    window.postProcessLog = postProcessLog;

} catch (error) {
    console.log(error);
}


try {

    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var postProcessFreeNode = async(node) => {
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

    window.postProcessFreeNode = postProcessFreeNode;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
     */
    var postProcessLogHistory = async(node) => {
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

    window.postProcessLogHistory = postProcessLogHistory;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 想知会记录列表提交数据
     */
    var postProcessLogInformed = async(node, tools = window.tools) => {
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

    window.postProcessLogInformed = postProcessLogInformed;

} catch (error) {
    console.log(error);
}


try {
    /**
     * 获取某业务记录对应的审批日志信息
     */
    var queryPRLogHistoryByDataID = async(business_data_id, tools = window.tools) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_history?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time&_p=0&_size=1000`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');
            console.log(res);
            return res.body;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryPRLogHistoryByDataID = queryPRLogHistoryByDataID;

} catch (error) {
    console.log(error);
}

try {
    /**
     * 获取行政公告数据
     */
    var queryAnnounceList = async(page = 0, size = 50, tools = window.tools) => {

        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_announce?_where=(bpm_status,in,4,5)&_sort=-create_time&_p=${page}&_size=${size}`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');

            var result = res.body;

            //遍历并格式化日期
            window.__.each(result, function(item) {
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['table_name'] = 'bs_announce';
                item['content'] = item['content'] || item['title'];
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryAnnounceList = queryAnnounceList;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 获取红头文件数据
     */
    var queryHeadList = async(page = 0, size = 50, tools = window.tools) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_redhead?_where=(bpm_status,in,4,5)&_sort=-create_time&_p=${page}&_size=${size}`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');

            var result = res.body;

            //遍历并格式化日期
            window.__.each(result, function(item) {
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['table_name'] = 'bs_redhead';
                item['content'] = item['content'] || item['title'];
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryHeadList = queryHeadList;

} catch (error) {
    console.log(error);
}

try {

    /**
     * 获取新闻资讯数据
     */
    var queryNewsList = async(page = 0, size = 50, tools = window.tools) => {
        //提交URL
        var queryURL = `${window.requestAPIConfig.restapi}/api/bs_news?_where=(bpm_status,in,4,5)&_sort=-create_time&_p=${page}&_size=${size}`;

        try {
            var res = await superagent.get(queryURL).set('accept', 'json');

            var result = res.body;

            //遍历并格式化日期
            window.__.each(result, function(item) {
                var optime = window.Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['timestamp'] = time;
                item['username'] = window.Betools.tools.deNull(item['username']).split(',');
                item['table_name'] = 'bs_news';
                item['content'] = item['content'] || item['title'];
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    }

    window.queryNewsList = queryNewsList;

} catch (error) {
    console.log(error);
}


try {
    /**
     * @function 发送post请求
     */
    var postAction = async(url, parameter, requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: url,
                method: 'post',
                data: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.postAction = postAction;

} catch (error) {
    console.log(error);
}


try {
    //post method= {post | put}
    var httpAction = async(url, parameter, method, requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: url,
                method: method,
                data: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.httpAction = httpAction;

} catch (error) {
    console.log(error);
}

try {
    //put
    var putAction = async(url, parameter, requestAPI = window.requestAPI) => {

        try {
            return window.requestAPI.axios({
                url: url,
                method: 'put',
                data: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.putAction = putAction;

} catch (error) {
    console.log(error);
}

try {
    //get
    var getAction = async(url, parameter) => {
        try {
            return window.requestAPI.axios({
                url: url,
                method: 'get',
                params: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.getAction = getAction;

} catch (error) {
    console.log(error);
}

try {
    //deleteAction
    var deleteAction = async(url, parameter, requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: url,
                method: 'delete',
                params: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.deleteAction = deleteAction;

} catch (error) {
    console.log(error);
}

try {
    var getUserList = async(parameter, requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: window.requestAPIConfig.user,
                method: 'get',
                params: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.getUserList = getUserList;

} catch (error) {
    console.log(error);
}

try {
    var getRoleList = async(parameter, requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: window.requestAPIConfig.role,
                method: 'get',
                params: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.getRoleList = getRoleList;

} catch (error) {
    console.log(error);
}

try {
    var getServiceList = async(parameter, requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: window.requestAPIConfig.service,
                method: 'get',
                params: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.getServiceList = getServiceList;

} catch (error) {
    console.log(error);
}

try {
    var getPermissions = async(parameter, requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: window.requestAPIConfig.permissionNoPager,
                method: 'get',
                params: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.getPermissions = getPermissions;

} catch (error) {
    console.log(error);
}

try {

    /**
     * @function 获取用户信息操作
     */
    var getInfo = (requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: `${window._CONFIG['domainURL']}/api/user/info`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.getInfo = getInfo;

} catch (error) {
    console.log(error);
}

try {
    /**
     * @function 保存操作
     */
    var saveService = async(parameter, requestAPI = window.requestAPI) => {
        try {
            return window.requestAPI.axios({
                url: window.requestAPIConfig.service,
                method: parameter.id == 0 ? 'post' : 'put',
                data: parameter,
            });
        } catch (error) {
            console.log(error);
        }
    }

    window.saveService = saveService;
} catch (error) {
    console.log(error);
}