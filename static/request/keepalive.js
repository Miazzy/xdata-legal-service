/**
 * @function 保存Session在线
 * @param {*} manageAPI
 */
function keepAlive(storage = window.storage, manageAPI = window.manageAPI) {

    var timestamp = new Date().getTime();

    var prestamp = storage.getStore(`keep_alive_status`)

    //小时内,只执行一次keepalive
    if (prestamp != null && timestamp - prestamp > 60 * 60 * 1000) {
        storage.setStore(`keep_alive_status`, timestamp);

        //设置每十分钟请求用户信息
        manageAPI.setTimeouts(() => {
            manageAPI.queryToken();
        }, 15 * 60 * 1000, 35 * 60 * 1000, 55 * 60 * 1000);
    }

}

window.keepAlive = keepAlive;