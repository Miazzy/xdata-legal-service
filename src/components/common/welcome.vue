<template>
    <div class="welcome" :class="{hide:hide}">
        <img :src="src" alt="">
    </div>
</template>
<script>


export default {
    data() {
        return {
            hide: false,
            src:`https://wechat.yunwisdom.club:30443/static/img/leading.jpeg`,
        }
    },
    async mounted() {
        const timestamp = Betools.tools.isPCWeb() ? 300 : 300;
        await Betools.tools.sleep(timestamp);
        this.hide = true;
    },
    created(){
      this.src = Betools.tools.isPCWeb() ? this.src : this.src;
    },
}
</script>
<style>

.welcome {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 6;
    background: #000b17;
    animation: welcome 0.75s;
    transition: 0.3s;
    -webkit-transition: 0.3s;
}

.welcome img {
    width: 100%;
    height: 100%;
}

.welcome.hide{
    opacity: 0;
    visibility: hidden;
}

</style>
