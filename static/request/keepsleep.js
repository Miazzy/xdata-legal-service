/**
 * @function JS Sleep休眠函数
 * @param {*} time 
 */
const sleep = async(time = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

window.sleep = sleep;