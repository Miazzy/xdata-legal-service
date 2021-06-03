self.addEventListener('install', function(event) {
    console.log(event);
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                "/index.html",
                "https://wechat.yunwisdom.club:30443/script/vant@index.css",
                "https://wechat.yunwisdom.club:30443/script/nutui.min.css",
                "https://wechat.yunwisdom.club:30443/script/muse-ui.css",
                "https://wechat.yunwisdom.club:30443/script/material-icons.css",
                "https://wechat.yunwisdom.club:30443/script/antd.min.css",
                "https://wechat.yunwisdom.club:30443/script/handsontable.full.min.css",
                "https://wechat.yunwisdom.club:30443/script/datepicker.min.css",
                "https://wechat.yunwisdom.club:30443/script/vue-excel-editor.umd.min.css",
                "https://wechat.yunwisdom.club:30443/script/iview.css",
                "https://wechat.yunwisdom.club:30443/script/photoswipe.css",
                "https://wechat.yunwisdom.club:30443/script/default-skin.css",
                "https://wechat.yunwisdom.club:30443/script/vue-mindmap.css",
                "https://wechat.yunwisdom.club:30443/script/vconsole.common.css",
                "https://wechat.yunwisdom.club:30443/static/img/leading.jpeg",
                "https://wechat.yunwisdom.club:30443/script/process.env.js",
                "https://wechat.yunwisdom.club:30443/script/polyfill.min.js",
                "https://wechat.yunwisdom.club:30443/script/keeplocation.js",
                "https://wechat.yunwisdom.club:30443/script/vue.min.js",
                "https://wechat.yunwisdom.club:30443/script/vuex.min.js",
                "https://wechat.yunwisdom.club:30443/script/axios.min.js",
                "https://wechat.yunwisdom.club:30443/script/dayjs.min.js",
                "https://wechat.yunwisdom.club:30443/script/localforage.min.js",
                "https://wechat.yunwisdom.club:30443/script/superagent.min.js",
                "https://wechat.yunwisdom.club:30443/script/underscore-min.js",
                "https://wechat.yunwisdom.club:30443/script/keepconfig.js",
                "https://wechat.yunwisdom.club:30443/script/vant.min.js",
                "https://wechat.yunwisdom.club:30443/script/vue-json-excel.umd.js",
                "https://wechat.yunwisdom.club:30443/script/vue-xlsx.umd.js",
                "https://wechat.yunwisdom.club:30443/script/handsontable.full.min.js",
                "https://wechat.yunwisdom.club:30443/script/vue-handsontable.min.js",
                "https://wechat.yunwisdom.club:30443/script/vuedraggable.umd.min.js",
                "https://wechat.yunwisdom.club:30443/script/xlsx.full.min.js",
                "https://wechat.yunwisdom.club:30443/script/datepicker.min.js",
                "https://wechat.yunwisdom.club:30443/script/Sortable.min.js",
                "https://wechat.yunwisdom.club:30443/script/xeditor.min.js",
                "https://wechat.yunwisdom.club:30443/script/nutui.min.js",
                "https://wechat.yunwisdom.club:30443/script/FileSaver.min.js",
                "https://wechat.yunwisdom.club:30443/script/betools.min.js",
                "https://wechat.yunwisdom.club:30443/script/fastclick.js",
                "https://wechat.yunwisdom.club:30443/script/fp.min.js",
                "https://wechat.yunwisdom.club:30443/script/vconsole.min.js",
                "https://wechat.yunwisdom.club:30443/script/html2canvas.js",
                "https://wechat.yunwisdom.club:30443/script/vcharts.min.js",
                "https://wechat.yunwisdom.club:30443/script/jquery.min.js",
                "https://wechat.yunwisdom.club:30443/script/echarts.min.js",
                "https://wechat.yunwisdom.club:30443/script/moment.min.js",
                "https://wechat.yunwisdom.club:30443/script/x6.js",
                "https://wechat.yunwisdom.club:30443/script/photoswipe.min.js",
                "https://wechat.yunwisdom.club:30443/script/photoswipe-ui-default.min.js",
                "https://wechat.yunwisdom.club:30443/script/qrcode.min.js",
                "https://wechat.yunwisdom.club:30443/script/antd.min.js",
                "https://wechat.yunwisdom.club:30443/script/screenfull.js",
                "https://wechat.yunwisdom.club:30443/script/relation-graph.min.js",
                "https://wechat.yunwisdom.club:30443/script/relationgraph.min.js",
                "https://wechat.yunwisdom.club:30443/script/datav.min.vue.js",
                "https://wechat.yunwisdom.club:30443/script/visgraph.min.js?v=20201008",
                "https://wechat.yunwisdom.club:30443/script/visgraph-layout.min.js?v=20201008",
                "https://wechat.yunwisdom.club:30443/script/visgraph-community.min.js?v=20201008",
                "https://wechat.yunwisdom.club:30443/script/vue.d3.cloud.js",
                "https://wechat.yunwisdom.club:30443/script/word-cloud.js",
                "https://wechat.yunwisdom.club:30443/script/mindmap.umd.min.js",
                "https://wechat.yunwisdom.club:30443/script/orgchart.umd.min.js",
                "https://webapi.amap.com/maps?v=2.0&key=801a8f79cee7c592c263add18813489b",
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function(response) {
                let responseClone = response.clone();
                if (/\.(png|jpg|gif|html|js|css|ico|svg|jpeg|doc|docx|ppt|pptx|xls|xlsx|pdf|eot|ttf|woff|woff2|json|txt)$/.test(event.request.url.toLocaleLowerCase())) {
                    caches.open('v1').then(function(cache) {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(function() {
                return false;
            });
        }
    }));
});