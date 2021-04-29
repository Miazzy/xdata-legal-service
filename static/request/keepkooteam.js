const md5 = require("md5");

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

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} whereSQL
 */
var queryTableData = async(tableName, whereSQL) => {
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
 * @function 获取URL请求参数
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

/**
 * @function 设置cookie信息
 */
function setCookie(name, value, days = 1) {
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 * @function 读取cookie信息
 */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

/**
 * @function 删除cookies
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

/**
 * @function 执行初始化操作
 */
function init() {

    //第一步，获取节点
    var node = JSON.stringify({
        "nick": getUrlParam('username'),
        "uid": getUrlParam('uid'),
        "tag": getUrlParam('tag'),
        "ukey": getUrlParam('ukey')
    });

    //判断用户信息完整性，重新设置节点信息
    if (getUrlParam('uid') === '') {
        node = postUserInfo(getUrlParam('username'), '');
    }

    try {
        //打印日志
        console.log('node : ' + node);

        //第二步，写入节点到cookie中
        setCookie('zenUser', node, 0.5);

        //打印第二步日志
        console.log('设置缓存');

        //第三步，跳转页面到主页面
        window.location.href = window.location.protocol + '://' + window.location.host + ':' + window.location.port + '/todo/home.xhtm';
    } catch (error) {
        console.log(error);
    }

}

/**
 * @function 提交用户信息
 */
function postUserInfo(username, password = '52c659fb5682722d19b163af2818f1fa') {

    //第一步，生成随机UID，UKey，Password
    let uid = "5eec7dc25091f2" + Math.random().toString().slice(2, 12);
    let ukey = "101010" + Math.random().toString().slice(2, 12);

    //第二步，查询userinfo是否存在于数据库，若存在，则直接返回；若不存在，则执行第三步
    let response = queryTableData('user', `_fields=_id&_where=(username, eq, ${username})`)

    //直接返回空字符串
    if (response != null && response.length > 0) {
        return '';
    }

    //第三步，将userinfo添加到数据库中
    var info = {
        avator: "",
        calendar: "",
        dingUserId: "",
        email: null,
        from: "",
        home: "",
        mkey: "",
        mobile: "",
        nick: username,
        profession: "",
        pwd: password,
        report: "",
        sex: 0,
        skin: 0,
        tag: 0,
        tile: "",
        ukey: ukey,
        ukey_time: 0,
        union_id: null,
        username: username,
        _id: uid
    }

    //想服务器发送请求
    let result = postTableData('user', info);

    //打印返回结果
    console.log(result);

    //获取ukey的md5值
    let md5Key = md5(ukey);

    //第四步，返回node信息，以便进行登录操作
    return JSON.stringify({
        "nick": username,
        "uid": uid,
        "tag": 0,
        "ukey": md5Key
    });
}

init();