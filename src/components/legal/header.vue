<template>
    <a-menu mode="horizontal">
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper" ><a-icon type="user" />{{ 'username' }} </span>
            <a-menu-item-group title="应用中心">
            <a-menu-item key="setting:1" :to="`/legal/message`"  @click="redirectView('/legal/message')" >
                审批
            </a-menu-item>
            <a-menu-item key="setting:2" :to="`/legal/workspace`" @click="redirectView('/legal/workspace')" >
                工作台
            </a-menu-item>
            </a-menu-item-group>
        </a-sub-menu>
    </a-menu>
</template>
<script>

export default {
  data() {
    return {
        
    };
  },
  activated() {
  },
  mounted() {

  },
  created(){

  },
  methods: {
    // 执行页面跳转
    async redirectView(path) {
        Betools.tools.isNull(path) ? null: this.$router.push(path);
    },
  },
};
</script>
<style scoped >
</style>
