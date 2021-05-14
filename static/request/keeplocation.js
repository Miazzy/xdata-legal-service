const wstorage = localStorage; //设置别名

/**
 * 查询位置信息
 * @param {*} info 
 */
function queryLocationInfo(info) {
    if (info != '' && typeof info != 'undefined' && info != null) {
        window.ip_location = info;
        console.log('location info :' + JSON.stringify(info));
        wBetools.storage.setItem(`system_location_info`, JSON.stringify(info));
    } else {
        wstorage.removeItem(`system_location_info`);
    }
}

window.queryLocationInfo = queryLocationInfo;