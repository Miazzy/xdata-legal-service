const yunpanToken = async(that, UUID, md5) => {

    //清空缓存
    window.localBetools.storage.clear();

    var response = null;
    var stoken = that.getQueryString('token');
    var hashtoken = that.getQueryString('hashtoken');
    var hashkey = that.getQueryString('hashkey');
    var sfingerprint = that.getQueryString('fingerprint');
    var flag = that.getQueryString('flag');
    var date = dayjs().format('YYYY-MM-DD');
    var tokenname = '';


    //第一步，获取默认登录账户
    try {
        that.username = that.getQueryString('username') || that.username;
        that.password = window.atob(`${that.password}`);
    } catch (error) {
        console.log(error);
    }

    //第二步，检查stoken、hashtoken、hashkey、fingerprint是否合法

    //设置用户flag
    localBetools.storage.setItem(`system_user_flag`, flag);

    //服务端stoken认证
    try {
        response = localBetools.storage.getItem(`system_user_stoken:${stoken}`);
        let tflag = (response == null || typeof response == 'undefined' || response == '');
        if (tflag) {
            let url = `${window.requestAPIConfig.domain}/jeecg-boot/sys/user/list?pageSize=0`;
            response = (await superagent.get(url).set('x-access-token', stoken))['body'];
            localBetools.storage.setItem(`system_user_stoken:${stoken}`, JSON.stringify(response));
        } else {
            response = JSON.parse(response);
        }
        console.log(response);
    } catch (error) {
        response = null;
        console.log(error);
    }

    if (response == null || typeof response == 'undefined' || response.status == 500 || !(response.code == 0 && response.success == true)) {
        that.$message.error('AccessToken认证失败！[0x01远端token认证失败]')
        return;
    }

    //如果是公司网盘，则直接登录，不进行后续认证
    if (that.username == window.atob(window.atob(that.companyname))) {
        that.login();
        return;
    }

    //本地计算token
    var chashtoken = md5(hashkey + date + that.username);

    //token校验失败
    if (chashtoken !== hashtoken || !hashtoken.startsWith('0000') || !chashtoken.startsWith('0000') || hashkey.length != 128) {
        that.$message.error('AccessToken认证失败！[0x02HashToken认证失败]')
        return;
    }

    //客户端认证stoken和username是否匹配
    try {
        tokenname = JSON.parse(window.atob(stoken.split('.')[1]));
    } catch (error) {
        console.log(error);
    }

    if (that.username !== tokenname.username) {
        that.$message.error('AccessToken认证失败！[0x03TokenName认证失败]')
        return;
    }

    //计算指纹
    var cfingerprint = await that.calcuFingerPrint();

    //指纹认证失败
    if (sfingerprint !== cfingerprint || sfingerprint.length != 128) {
        that.$message.error('AccessToken认证失败！[0x04指纹认证失败]')
        return;
    }

    //第三步，查看用户是否存在于数据库中，如果存在，则登录用户，如果不存在，则注册用户
    var userinfo = localBetools.storage.getItem(`system_pan_vue_user_info`);
    var pflag = (userinfo == null || typeof userinfo == 'undefined' || userinfo == '');

    //如果获取到用户缓存信息，则解析用户缓存信息
    if (!pflag) {
        userinfo = JSON.parse(userinfo);
    }

    //如果未获取到用户缓存信息，查询用户信息
    if (pflag || userinfo.username !== that.username) {
        try {
            let url = `https://api.shengtai.club/api/tank30_user?_where=(username,eq,${that.username})`;
            response = (await superagent.get(url))['body'];
            console.log(response);
            localBetools.storage.setItem(`system_pan_vue_user_info`, JSON.stringify(response[0]));
        } catch (error) {
            console.log(error);
        }
    }

    //第四步，注册用户或登录用户
    try {
        if (!pflag || response.length > 0) {
            that.login();
        } else {
            that.register();
        }
    } catch (error) {
        console.log(error);
    }
}

window.yunpanToken = yunpanToken;

const webchatToken = async(that, UUID, md5) => {

    //清空缓存localstorage
    window.localStorage.removeItem(`vue-device-id`);
    window.localStorage.removeItem(`vue-token`);
    window.localStorage.removeItem(`vue-user-id`);

    var response = null;

    //获取username and token
    var username = that.querystring('username');
    var token = that.querystring('token');
    var stoken = that.querystring('token');
    var hashtoken = that.querystring('hashtoken');
    var hashkey = that.querystring('hashkey');
    var sfingerprint = that.querystring('fingerprint');
    var date = dayjs().format('YYYY-MM-DD');
    var tokenname = '';

    //计算有效md5
    var validmd5 = md5(`u:${username}|t:${token}|s:${stoken}|h:${hashtoken}|k:${hashkey}|f:${sfingerprint}|d:${date}`);

    //获取缓存中的md5value
    var validmd5value = localBetools.storage.getItem(`system_valid_md5_value`);

    //计算指纹
    var cfingerprint = await that.calcuFingerPrint();

    //检查stoken、hashtoken、hashkey、fingerprint是否合法

    //指纹认证失败
    if (sfingerprint !== cfingerprint || sfingerprint.length != 128) {
        that.$message.error('AccessToken认证失败！[0x01指纹认证失败]')
        return;
    }

    //已经验证过，自动登录
    if (validmd5 === validmd5value) {
        that.autologin(username);
        return;
    }

    //服务端stoken认证
    try {
        let url = `${window.requestAPIConfig.domain}/jeecg-boot/sys/user/list?pageSize=0`;
        response = (await superagent.get(url).set('x-access-token', stoken))['body'];
        console.log(response);
    } catch (error) {
        response = null;
        console.log(error);
    }

    if (response == null || typeof response == 'undefined' || response.status == 500 || !(response.code == 0 && response.success == true)) {
        that.$message.error('AccessToken认证失败！[0x01服务端Token认证失败]')
        return;
    }

    //客户端认证stoken和username是否匹配
    try {
        tokenname = JSON.parse(window.atob(stoken.split('.')[1]));
    } catch (error) {
        console.log(error);
    }

    if (username !== tokenname.username) {
        that.$message.error('AccessToken认证失败！[0x02TokenName认证失败]')
        return;
    }

    //校验token是否合法
    if (!(md5(hashkey + date + username) === hashtoken && hashtoken.startsWith('0000') && hashkey.length == 128)) {
        that.$message.error("AccessToken认证失败！[0x03Token异常权限校验失败]");
        return;
    }

    //验证通过深圳validmd5
    localBetools.storage.setItem(`system_valid_md5_value`, validmd5);

    //执行登录操作
    that.autologin(username);

}

window.webchatToken = webchatToken;