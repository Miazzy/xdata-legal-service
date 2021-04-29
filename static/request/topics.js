const topicPostURL = `https://kafka.shengtai.club/topics/{topic}/messages?key=default&sync`;
const topicGetURL = `https://kafka.shengtai.club/topics/{topic}/messages?group=0`;

/**
 * @function 通过Kafka推送消息函数
 * @param {*} topic 发布/订阅消息的topic
 * @param {*} message 推送的消息
 */
async function sendTopic(topic, message, sender) {

    try {
        var content = {
            receiver: topic,
            message: message,
            sender: sender,
            timestamp: new Date().getTime()
        }

        message = await superagent
            .post(topicPostURL.replace('{topic}', topic))
            .send(JSON.stringify(content))
            .set('Content-Type', 'text/plain')
            .set('accept', 'text')
            .end((err, res) => {
                console.log(err, res);
            });

        console.log(` Kafka推送消息：`, content, ` 返回结果：`, message);

        return message;
    } catch (error) {
        console.log(error);
    }

}

window.sendTopic = sendTopic;

/**
 * @function 通过kafka订阅消息
 * @param {*} topic 
 * @param {*} group 
 * @param {*} noask 
 * @param {*} offset 
 * @param {*} partionID 
 */
async function queryTopic(topic, group, noask, offset, partionID) {

    try {
        var url = topicGetURL.replace('{topic}', topic);
        var message = await superagent.get(url);

        message = message.body;
        message.key = decodeBase64(message.key);
        message.value = decodeBase64(message.value);

        console.log(` Kafka订阅消息：`, topic, ` 返回结果：`, message);

        return message;
    } catch (error) {
        console.log(error);
    }

}

window.queryTopic = queryTopic;

/**
 * @function Base64解密
 * @param {*} message 
 */
function decodeBase64(message) {
    try {
        return decodeURIComponent(window.atob(message));
    } catch (error) {
        console.error(error);
    }
}

window.decodeBase64 = decodeBase64;