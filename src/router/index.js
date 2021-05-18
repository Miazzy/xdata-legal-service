// import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);

// app整体由店面页和店内页组成 暂时并没有用到嵌套路由
const routes = [{
    path: '/legal',
    name: "案件管理",
    component: resolve => require(["../components/legal/home.vue"], resolve)
}, {
    path: '/',
    name: "工作台",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/workspace.vue"], resolve)
    }
}, {
    path: '/legal/workspace',
    name: "工作台",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/workspace.vue"], resolve)
    }
}, {
    path: '/legal/legalapply',
    name: "案件申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/legalapply.vue"], resolve)
    }
}, {
    path: '/legal/legalview',
    name: "案件列表",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/legalview.vue"], resolve)
    }
}, {
    path: '/legal/firmapply',
    name: "律所申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/firmapply.vue"], resolve)
    }
}, {
    path: '/legal/lawyerapply',
    name: "律师申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/lawyerapply.vue"], resolve)
    }
}, {
    path: '/legal/firmlist',
    name: "律所管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/firmlist.vue"], resolve)
    }
}, {
    path: '/legal/lawyerlist',
    name: "律师管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/lawyerlist.vue"], resolve)
    }
}, {
    path: '/legal/netdisk',
    name: "云文件",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/netdisk.vue"], resolve)
    }
}, {
    path: '/legal/collect',
    name: "案件收藏",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/collect.vue"], resolve)
    }
}, {
    path: '/legal/contact',
    name: "联系人",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/contact.vue"], resolve)
    }
}, {
    path: '/legal/message',
    name: "消息",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/message.vue"], resolve)
    }
}, {
    path: '/legal/legalmonth',
    name: "月度报表",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/legalmonth.vue"], resolve)
    }
}, {
    path: '/legal/legalquarter',
    name: "季度报表",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/legalquarter.vue"], resolve)
    }
}];

// 设置路由信息
const router = new Router({ base: "/", routes, });

// history模式跳转到新页面，返回顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

export default router;