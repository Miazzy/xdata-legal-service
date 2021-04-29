//定义配置文件对象
window._CONFIG = {};
//Vue服务器顶级域名
window._CONFIG['topDomain'] = 'shengtai.club';
//Vue服务器域名
window._CONFIG['domain'] = 'https://www.' + window._CONFIG['topDomain'];
//Vue-REST-API服务器域名
window._CONFIG['restAPI'] = 'https://api.' + window._CONFIG['topDomain'];
//API端服务器URL
window._CONFIG['domainURL'] = window._CONFIG['domain'] + '/jeecg-boot';
//Vue服务器域名,不要删除domian属性，因为有些组件是这样写的，而且位于node_module里面
window._CONFIG['domian'] = window._CONFIG['domain'];
//API端服务器URL,不要删除domianURL属性，因为有些组件是这样写的，而且位于node_module里面
window._CONFIG['domianURL'] = window._CONFIG['domain'] + '/jeecg-boot';
//下载服务器域名
window._CONFIG['uploadURL'] = 'https://upload.' + window._CONFIG['topDomain'];
//下载服务器域名
window._CONFIG['uploaxURL'] = `https://oa-system-oss.oss-cn-beijing.aliyuncs.com`;
//下载服务器域名
window._CONFIG['downloadURL'] = window._CONFIG['uploaxURL'];
//OSS对象服务域名
window._CONFIG['ossURL'] = window._CONFIG['uploaxURL'];
//document下载服务器地址
window._CONFIG['docDownURL'] = window._CONFIG['uploadURL'];
//图片服务器域名
window._CONFIG['imgDomainURL'] = window._CONFIG['uploadURL'];
//KKFileView文档预览URL
window._CONFIG['previewURL'] = 'https://fileview.' + window._CONFIG['topDomain'] + '/onlinePreview?officePreviewType=image&url=';
//微软文档预览URL
window._CONFIG['officeURL'] = 'https://view.officeapps.live.com/op/view.aspx?src=';
//图片压缩裁剪URL
window._CONFIG['thumborURL'] = 'https://thumbor.' + window._CONFIG['topDomain'] + '/unsafe/fill/100/60/sm/0/plain/';
//图片预览URL
window._CONFIG['imageURL'] = window._CONFIG['previewURL'];
//多媒体预览URL
window._CONFIG['videoURL'] = window._CONFIG['previewURL'];
//内置文档预览URL
window._CONFIG['viewURL'] = window._CONFIG['domainURL'] + '/generic/web/viewer.html?file=';
//单独登录URL
window._CONFIG['casPrefixUrl'] = 'https://sso.' + window._CONFIG['topDomain'] + '/cas';
//检测URL文件是否存在
window._CONFIG['validURL'] = window._CONFIG['domain'] + '/sys/common/url?path=';
//下载地址URL
window._CONFIG['staticDomainURL'] = window._CONFIG['uploadURL'];
//查询浏览器IP地址，所属地区
window._CONFIG['ipLocationURL'] = `https://apis.map.qq.com/ws/location/v1/ip?key=3BFBZ-ZKD3X-LW54A-ZT76D-E7AHO-4RBD5`;
//查询天气预报URL
window._CONFIG['weatherURL'] = `https://weather.shengtai.club`;
//设置公式名称
window._CONFIG['company'] = '鹏程';
//文档转换时间
window._CONFIG['office_expire_time'] = 10000;

//设置underscore
try {
    //定义underscore
    window.underscore = _;
    //定义underscore
    window.__ = _;
} catch (error) {
    console.log('设置 underscore : ' + error);
}