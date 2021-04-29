import * as workconfig from '@/request/workconfig';

try {
    localforage.config({
        driver: localforage.WEBSQL,
        name: 'cache',
        version: 1.0,
        size: 4294967296,
        storeName: 'keyvaluepairs',
        description: 'some description'
    });
} catch (error) {
    console.log(error);
}

export const STORAGE_KEY = 'system_oa_app';

/**
 * @function Set storage
 * @param name
 * @param content
 * @param maxAge
 */
export const setStore = (name, content, maxAge = null) => {
    if (!global.window || !name) {
        return;
    }

    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }

    var storage = global.window.localStorage;

    try {
        Betools.storage.setItem(name, content);
        localforage.setItem(name, content);
    } catch (error) {
        console.log(error);
    }

    try {
        var timeout = parseInt(new Date().getTime() / 1000);
        if (maxAge && !isNaN(parseInt(maxAge))) {
            Betools.storage.setItem(`${name}_expire`, timeout + maxAge);
            localforage.setItem(`${name}_expire`, timeout + maxAge);
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * @function Get storage
 * @param name
 * @returns {*}
 */
export const getStore = name => {
    if (!global.window || !name) {
        return;
    }

    let content = window.localBetools.storage.getItem(name);
    let _expire = window.localBetools.storage.getItem(`${name}_expire`);

    if (_expire) {
        let now = parseInt(new Date().getTime() / 1000);
        if (now > _expire) {
            return;
        }
    }

    try {
        if (typeof content === 'string') {
            content = JSON.parse(content);
        }
    } catch (error) {
        console.log(error);
    }

    // 特殊情况，如果获取用户信息，且用户信息不存在，则返回默认用户信息
    if (name == 'system_userinfo' && !content) {
        return content || workconfig.commonUserInfo
    }

    return content;

};

/**
 * @function clearStore storage
 * @param name
 */
export const clearStore = (name) => {
    if (!global.window || !name) {
        return;
    }
    window.localStorage.removeItem(name);
    window.localStorage.removeItem(`${name}_expire`);
};

/**
 * @function Clear all storage
 */
export const clearAll = (name) => {
    if (!global.window || !name) {
        return;
    }
    if (name == 'all') {
        localforage.clear();
        window.localBetools.storage.clear();
    } else if (name == 'storage') {
        window.localBetools.storage.clear();
    } else if (name == 'db') {
        localforage.clear();
    } else {
        window.localBetools.storage.clear();
    }
};

/**
 * @function 获取缓存信息
 * @param {*} key
 */
export const get = (key = STORAGE_KEY) => {
    return JSON.parse(window.localBetools.storage.getItem(key));
};

/**
 * @function 设置缓存信息
 * @param {*} items
 * @param {*} key
 */
export const save = (items, key = STORAGE_KEY) => {
    window.localBetools.storage.setItem(key, JSON.stringify(items));
};

/**
 * @function Set storage
 * @param name
 * @param content
 * @param maxAge
 */
export const setStoreAll = async(name, content, maxAge = null) => {

    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }

    try {
        localforage.setItem(name, content);
    } catch (error) {
        console.log(error);
    }

    try {
        localBetools.storage.setItem(name, content);
    } catch (error) {
        console.log(error);
    }

    if (maxAge && !isNaN(parseInt(maxAge))) {

        let timeout = parseInt(new Date().getTime() / 1000);

        try {
            localforage.setItem(`${name}_expire`, timeout + maxAge);
        } catch (error) {
            console.log(error);
        }

        try {
            localBetools.storage.setItem(`${name}_expire`, timeout + maxAge);
        } catch (error) {
            console.log(error);
        }
    }
};

/**
 * @function Get storage
 * @param name
 * @returns {*}
 */
export const getStoreAll = async(name) => {

    let content = await localforage.getItem(name);
    let _expire = await localforage.getItem(`${name}_expire`);

    if (content == null || typeof content == 'undefined') {
        content = localBetools.storage.getItem(name);
    }

    if (_expire == null || typeof _expire == 'undefined') {
        _expire = localBetools.storage.getItem(`${name}_expire`);
    }

    if (_expire) {
        let now = parseInt(new Date().getTime() / 1000);
        if (now > _expire) {
            return;
        }
    }

    try {
        if (typeof content === 'string') {
            content = JSON.parse(content);
        }
    } catch (error) {
        console.log(error);
    }

    // 特殊情况，如果获取用户信息，且用户信息不存在，则返回默认用户信息
    if (name == 'system_userinfo' && !content) {
        return content || workconfig.commonUserInfo
    }

    return content;
};

/**
 * @function Set storage
 * @param name
 * @param content
 * @param maxAge
 */
export const setStoreDB = async(name, content, maxAge = null) => {

    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }

    try {
        localforage.setItem(name, content);
    } catch (error) {
        console.log(error);
    }

    if (maxAge && !isNaN(parseInt(maxAge))) {

        let timeout = parseInt(new Date().getTime() / 1000);

        try {
            localforage.setItem(`${name}_expire`, timeout + maxAge);
        } catch (error) {
            console.log(error);
        }

    }
};

/**
 * @function Get storage
 * @param name
 * @returns {*}
 */
export const getStoreDB = async(name) => {

    let content = await localforage.getItem(name);
    let _expire = await localforage.getItem(`${name}_expire`);

    if (_expire) {
        let now = parseInt(new Date().getTime() / 1000);
        if (now > _expire) {
            return;
        }
    }

    try {
        if (typeof content === 'string') {
            content = JSON.parse(content);
        }
    } catch (error) {
        console.log(error);
    }

    // 特殊情况，如果获取用户信息，且用户信息不存在，则返回默认用户信息
    if (name == 'system_userinfo' && !content) {
        return content || workconfig.commonUserInfo
    }

    return content;

};

/**
 * @function Clear storage
 * @param name
 */
export const clearDB = name => {
    if (name == 'all') {
        localforage.clear();
    } else {
        localforage.removeItem(name);
        localforage.removeItem(`${name}_expire`);
    }
};

/**
 * @function Clear storage
 * @param name
 */
export const clearAllDB = () => {
    localforage.clear();
};

export const TokenKey = 'Access-Token'

export function getToken() {
    return getStore(TokenKey)
}

export function setToken(token) {
    return setStore(TokenKey, token, 86400 * 30)
}

export function removeToken() {
    return clearStore(TokenKey)
}

export async function clearLoginInfo() {

    try {

        let info = await getStore('system_linfo');

        this.username = info.username;
        this.password = info.password;

        clearStore('system_userinfo');
        clearStore('system_token');
        clearStore('system_department');
        clearStore('system_login_time');

    } catch (error) {
        console.log(error);
    }

}