<template>
    <div id="app">
        <welcome></welcome>
        <div class="outter" :class="{'hideLeft':$route.path.split('/').length>2}">
        </div>
        <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
            <router-view name="subPage" class="sub-page"></router-view>
        </transition>
    </div>
</template>

<script>
    import welcome from '@/components/common/welcome.vue'
    import mixin from "./vuex/mixin.js" // 混合被单独放在 mixin.js 中管理
    window.mixin = mixin // 将 混合/mixin 暴露在窗口对象中，某些组件需要时，直接提取 window.mixin
    export default {
        name: 'app',
        components: {
            welcome
        },
        data() {
            return {
                "pageName": "",
                "routerAnimate": false,
                "enterAnimate": "", //页面进入动效
                "leaveAnimate": "" //页面离开动效
            }
        },
        watch: {
            // 监听 $route 为店内页设置不同的过渡效果
            "$route" (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                if (toDepth === 2) {
                    this.$store.commit("setPageName", to.name)
                }
                //同一级页面无需设置过渡效果
                if (toDepth === fromDepth) {
                    return;
                }
                this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft"
                this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight"
                // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
                if (toDepth === 3) {
                    this.leaveAnimate = "animated fadeOutRight"
                }
            }
        }
    }
</script>
<style>
    @import "assets/css/base.css";
    @import "assets/css/common.css";
    @import "assets/css/wx-header.css";
    @import "assets/css/lib/iconfont.css"; 
    @import "assets/css/lib/animate.css";
    @import "assets/css/lib/weui.min.css";
</style>
