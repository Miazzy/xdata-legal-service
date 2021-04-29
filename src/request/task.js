import * as query from '@/request/query';

//计时待办任务常量数组
export const TIME_TASK_NAME = ['请假申请表', '外出申请表', '加班申请表', '出差申请表', '车补申请表'];

export async function queryProcessLogDone(
    username,
    realname,
    page = 0,
    size = 50,
) {

    // 查询用户数据信息
    if (Betools.tools.isNull(username) || Betools.tools.isNull(realname)) {
        return [];
    }

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
            var optime = Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
            var ctime = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            var time = Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
            var dtime = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd hh:mm:ss');
            item['createtime'] = dtime;
            item['operate_time'] = optime;
            item['create_time'] = ctime;
            item['timestamp'] = time;
            item['username'] = Betools.tools.deNull(item['username']).split(',');
            item['content'] = Betools.tools.abbreviation(Betools.tools.delHtmlTag(item['content']));
            item['topic'] = Betools.tools.abbreviation(Betools.tools.delHtmlTag(item['topic']));

            //查询是否存在此用户名
            var flag =
                window.__.contains(item['username'], username) ||
                window.__.contains(item['username'], realname);

            //返回结果
            return flag;
        });

        try {
            for (let item of result) {
                try {
                    if (Betools.tools.isNull(item['sponsor']) && !Betools.tools.isNull(item.proponents)) {
                        const temp = await query.queryUserInfoByAccount(item.proponents);
                        item['sponsor'] = temp.realname || temp.lastname;
                    }
                } catch (error) {
                    console.log(error);
                }
            };
        } catch (error) {
            console.log(error);
        }

        //根据ID编号去掉重复的数据
        result = window.__.uniq(result, false, 'id');

        return result;
    } catch (err) {
        console.log(err);
    }
}

export async function queryProcessLogWait(
    username,
    realname,
    page = 0,
    size = 50,
) {

    // 查询用户数据信息
    if (Betools.tools.isNull(username) || Betools.tools.isNull(realname)) {
        return [];
    }

    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_handling_events?_where=(username,like,~${username}~)~or(username,like,~${realname}~)&_p=${page}&_size=${size}&_sort=-create_time`;
    var result = {};

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        result = res.body;

        try {
            result = window.__.filter(result, function(item) {
                //格式化日期
                var optime = Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                var dtime = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd hh:mm:ss');
                item['createtime'] = dtime;
                item['timestamp'] = time;
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['username'] = Betools.tools.deNull(item['username']).split(',');
                item['content'] = Betools.tools.abbreviation(Betools.tools.delHtmlTag(item['content']));
                item['topic'] = Betools.tools.abbreviation(Betools.tools.delHtmlTag(item['topic']));

                //查询是否存在此用户名，且已处理用户中，不含登录用户
                if (item.tname === 'bs_seal_regist') {
                    var flag = (window.__.contains(item['username'], username) || window.__.contains(item['username'], realname));
                    //返回结果
                    return flag;
                } else if (item.tname === 'bs_goods_receive') {
                    var flag = (window.__.contains(item['username'], username) || window.__.contains(item['username'], realname));
                    //返回结果
                    return flag;
                } else {
                    var flag = (window.__.contains(item['username'], username) || window.__.contains(item['username'], realname)) && (!item.user.includes(username));
                    //返回结果
                    return flag;
                }
            });
        } catch (error) {
            console.log(error);
        }

        try {
            for (let item of result) {
                try {
                    if (Betools.tools.isNull(item['sponsor']) && !Betools.tools.isNull(item.proponents)) {
                        if (!item.proponents.includes(',')) {
                            const temp = await query.queryUserInfoByAccount(item.proponents);
                            item['sponsor'] = temp.realname || temp.lastname;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            };
        } catch (error) {
            console.log(error);
        }

        return result;
    } catch (err) {
        console.log(err);
    }
}

export async function queryProcessLogWaitSeal(
    username,
    realname,
    page = 0,
    size = 50,
) {

    // 查询用户数据信息
    if (Betools.tools.isNull(username) || Betools.tools.isNull(realname)) {
        return [];
    }

    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_handling_events?_where=(username,like,~${username}~)~or(username,like,~${realname}~)&_p=${page}&_size=${size}&_sort=-create_time`;
    var result = {};

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        result = res.body;

        try {
            result = window.__.filter(result, function(item) {
                //格式化日期
                var optime = Betools.tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
                var ctime = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
                var time = Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
                var dtime = Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd hh:mm:ss');
                item['createtime'] = dtime;
                item['timestamp'] = time;
                item['operate_time'] = optime;
                item['create_time'] = ctime;
                item['username'] = Betools.tools.deNull(item['username']).split(',');
                item['content'] = Betools.tools.abbreviation(Betools.tools.delHtmlTag(item['content']));
                item['topic'] = Betools.tools.abbreviation(Betools.tools.delHtmlTag(item['topic']));

                //查询是否存在此用户名，且已处理用户中，不含登录用户
                if (item.tname === 'bs_seal_regist') {
                    return (window.__.contains(item['username'], username) || window.__.contains(item['username'], realname));
                } else if (item.tname === 'bs_goods_receive') {
                    return (window.__.contains(item['username'], username) || window.__.contains(item['username'], realname));
                } else {
                    return false;
                }

            });
        } catch (error) {
            console.log(error);
        }

        try {
            for (let item of result) {
                try {
                    if (Betools.tools.isNull(item['sponsor']) && !Betools.tools.isNull(item.proponents)) {
                        if (!item.proponents.includes(',')) {
                            const temp = await query.queryUserInfoByAccount(item.proponents);
                            item['sponsor'] = temp.realname || temp.lastname;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            };
        } catch (error) {
            console.log(error);
        }

        return result;
    } catch (err) {
        console.log(err);
    }
}