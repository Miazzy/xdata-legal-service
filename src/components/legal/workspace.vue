<template>
  <div id="reward-home" style="background-color:#f0f0f0;width:100%;height:auto;">
      <div style="background-color:#f0f0f0;width:100%;height:auto;">
      <a-menu mode="horizontal">
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper" >
              <a-avatar :src="userinfo.avatar" style="margin-left:0.25rem; margin-right:0.55rem;" />
              {{ usertitle }} 
              </span>
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
      <a-row :gutter="24">

        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" style="position:relative;">

            <div style="position:absolute;left:0px width:80px;" >
              <van-sidebar v-model="activeTabKey">
                <van-sidebar-item style="display:block;" title="审批" :to="`/legal/message`" />
                <van-sidebar-item style="display:none;" title="云文档" :to="`/legal/netdisk`" />
                <van-sidebar-item style="display:none;" title="联系人" :to="`/legal/contact`" />
                <van-sidebar-item style="display:block;" title="工作台" :to="`/legal/workspace`" />
                <van-sidebar-item style="display:none;" title="收藏" :to="`/legal/collect`" />
                <van-sidebar-item style="display:none;" title="设置" :to="`/legal/setup`" />
              </van-sidebar>
            </div>

            <div style="position:absolute; left:80px; width:900px;" >

              <div v-show="role.includes('LEGAL_ADMIN')" id="" class="" style="padding-left:0.75rem;padding-top:0.25rem;padding-bottom:0.25rem;background-color:#fefefe;" >
                <a-breadcrumb>
                  <template v-for="(elem,index) in breadcrumb">
                    <a-breadcrumb-item :key="elem.icon" :index="index" >
                      <a-icon :type="elem.icon" />
                      <span @click="redirectFunc(elem.text)">{{ elem.text }}</span>
                    </a-breadcrumb-item>
                  </template>
                </a-breadcrumb>
              </div>

              <template v-for="(pane,index) in paneflows"  >
                <a-card v-show="pane.display" :key="pane.id"  :title="pane.title"  class="pane-flow-card" >
                  <template v-for="item in pane.taskflows"  >
                    <a-card-grid :key="item.href" style="width:25%;textAlign:'center'">
                      <a-card-meta>
                        <div slot="title" class="card-title pane-flow-card-meta" @click="item.click" >
                          <div class="pane-flow-card-meta-icon">
                            <a-avatar size="large"  :src="item.avatar" />
                          </div>
                          <div class="pane-flow-card-meta-title" >
                            <a class="pane-flow-card-meta-tname" >{{ item.name }}</a>
                            <div class="pane-flow-card-meta-description" > {{ item.description }} </div>
                          </div>
                        </div>
                      </a-card-meta>
                    </a-card-grid>
                  </template>
                </a-card>
                <a-card v-show="pane.display" v-if="index <= 1000" :key="pane.id + pane.title" :title="' '" class="pane-flow-card-middle" >
                </a-card>
              </template>
            </div>

            <div v-show="role.includes('LEGAL_ADMIN')" style="position:absolute; left:1000px; width: 300px;">
                <a-card title="便捷导航" style="margin-bottom: 10px" :bordered="false" :body-style="{padding: 0}" >
                  <div class="item-group">
                    <div class="pane-right-item-group" >
                      <template v-for=" item in quicktags">
                        <a-tag class="pane-right-item-group-tag" :key="item.name" :color="item.color" @click="item.click" >{{item.name}}</a-tag>
                      </template>
                    </div>
                  </div>
                </a-card>
                <div id="nav-content-process" style="">
                  <a-card :loading="loading" title="诉讼案件流程" :bordered="false" style="margin-top:10px;">
                    <a-tag color="blue" style="margin-bottom:10px;position:absolute;top:18px;right:20px;display:none;" ></a-tag>
                    <div class="members">
                      <a-row>
                        <a-col :span="12" v-for="item in wflows" :key="item.href">
                          <a @click="item.click">
                            <a-avatar class="pane-right-avatar" size="small" :src="item.avatar" />
                            <span class="member">{{ item.name }}</span>
                          </a>
                        </a-col>
                      </a-row>
                    </div>
                  </a-card>
                </div>
                <div id="nav-content-law" style="">
                  <a-card :loading="loading" title="法律网站" :bordered="false" style="margin-top:10px;">
                    <a-tag color="blue" style="margin-bottom:0px;position:absolute;top:18px;right:20px;display:none;" ></a-tag>
                    <div class="members" >
                      <a-row>
                        <a-col :span="item.span" v-for="item in lawsites" :key="item.href" style="padding-bottom:10px;">
                          <a @click="item.click" style="margin-top:0px;margin-bottom:5px;padding-bottom:5px;">
                            <span class="member" style="margin-top:0px;margin-bottom:5px;padding-bottom:5px;" >{{ item.name }}</span>
                          </a>
                        </a-col>
                      </a-row>
                    </div>
                  </a-card>
                </div>
            </div>
            
          </a-col>
        </keep-alive>

      </a-row>
    </div>
  </div>
</template>
<script>
import header from '@/components/legal/header.vue';
import * as workconfig from '@/request/workconfig';

export default {
  mixins: [window.mixin],
  components: {
      header
  },
  data() {
    const { $router } = this;
    return {
      pageName: "案件管理",
      momentNewMsg: true,
      activeTabKey: 3,
      iswechat:'',
      paneflows: workconfig.reward($router),
      wflows: workconfig.getRewardWflow($router),
      lawsites: workconfig.getLawWebsiteflow($router),
      quicktags: workconfig.getRewardQuickTag($router),
      userinfo: '',
      usertitle:'',
      lawyerlist:[],
      role:'',
      breadcrumb:[{icon:'',text:'所有功能',path:'/legal/workspace'},{icon:'',text:'任务面板',path:'/legal/workspace'},{icon:'',text:'案件管控',path:'/legal/workspace'},{icon:'',text:'律所律师',path:'/legal/workspace'},{icon:'',text:'法院法官',path:'/legal/workspace'}],
    };
  },
  activated() {
    this.queryInfo();
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
    isNull:Betools.tools.isNull,
    deNull:Betools.tools.deNull,
    
    // 查询初始化信息
    async queryInfo() {
      try {
        const { $router } = this;
        this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
        this.userinfo = await this.weworkLogin(); //查询当前登录用户
        const userinfo = await Betools.storage.getStore('system_userinfo');

        (async() => { //获取操作权限信息,权限管控功能
          try {
            this.role = await Betools.query.queryRoleInfo();
            this.role = this.deNull(this.role,'');
            if(!this.role.includes('LEGAL_ADMIN')){
              Betools.storage.clearStore('system_role_rights_v1');
              this.role = await Betools.query.queryRoleInfo();
              this.role = this.deNull(this.role,'');
            }
            if(!this.role.includes('LEGAL_ADMIN')){
              const pname = this.userinfo.systemuserinfo.textfield1;
              pname.includes('法务') ? this.role += 'LEGAL_ADMIN' : null;
              this.role = this.deNull(this.role,'');
            }
            if(!this.role.includes('LEGAL_ADMIN')){
              this.paneflows.map(item=>{ item.display=false; });
              vant.Dialog.alert({  title: '温馨提示',  message: `您没有法务诉讼系统的操作权限！`, });
              console.log(`query permission no rights...`);
            } else {
              Betools.storage.clearStore('system_role_rights_v1');
              Betools.query.queryRoleInfo();
            }
          } catch (error) {
            console.error(`query permission error:`,error);
          }
        })();

        (async() => { //打印指纹信息
            try {
                await Betools.query.queryCrontab('18:0');
                const result = await(await FingerprintJS.load()).get();
                if(Betools.tools.isNull(userinfo)){
                  const content = result.visitorId + '__' + (Betools.tools.isNull(userinfo) ? '' : window.btoa(window.encodeURIComponent(JSON.stringify(userinfo||null))));
                  Betools.console.info('finger' , content , 'info' , 'ADM' , Betools.tools.isNull(userinfo) ? '' : userinfo.realname);
                }
            } catch (error) {
                console.error(`finger print error:`,error);
            }
        })();

        (async() => { //根据URL信息跳转到相应详情页面
            try {
              if(window.location.href.includes('/evaluate/')){
                const path = window.location.href.split(window.location.host)[1];
                const arr = path.slice(1).split('/');
                const apply = arr[0];
                if(apply == 'evaluate') {
                  const id = arr[1];
                  const username = arr[2];
                  $router.push(`/legal/case/legalapply?id=${id}&type=1&tname=案件详情&apply=${apply}&role=notify&rem=${username}`);
                }
              }
            } catch (error) {
              console.error(`redirect url error:`,error);
            }
        })();

      } catch (error) {
        console.log(error);
      }
    },

    // 企业微信登录处理函数
    async  weworkLogin  (codeType = 'search', systemType = 'search')  {
        const userinfo_work = await Betools.query.queryWeworkUser(codeType, systemType,'v5');
        const userinfo = await Betools.storage.getStore('system_userinfo');
        this.usertitle = (userinfo && userinfo.parent_company && userinfo.parent_company.name ? userinfo.parent_company.name + ' > ' :'')  + (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
        if(Betools.tools.isNull(this.usertitle)){ // 未获取到用户信息，直接根据浏览器记录获取用户信息
          const finger = await(await FingerprintJS.load()).get();
          const condition = `_where=(info,in,finger)~and(type,in,info)~and(content,like,~${finger.visitorId}__~)&_sort=-id&_p=0&_size=1`;
          let list = await Betools.manage.queryTableData('bs_async_log' , condition);
          let content = '';
          if(list && list.length > 0){
            content = window.atob(list[0].content.split('__')[1]);
            content = window.decodeURIComponent(content);
            await Betools.storage.setStore('system_userinfo', content, 3600);
            const userinfo = await Betools.storage.getStore('system_userinfo');
            this.usertitle = (userinfo && userinfo.parent_company && userinfo.parent_company.name ? userinfo.parent_company.name + ' > ' :'')  + (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
            return userinfo;
          }
        }
        return userinfo;
    },

    // 执行页面跳转
    async redirectView(path) {
        Betools.tools.isNull(path) ? null: this.$router.push(path);
    },

    // 执行页面跳转
    async redirectFunc(text) {
        this.paneflows.map(elem => {
          text != '所有功能' ? (elem.title == text ? elem.display = true : elem.display = false) : elem.display = true;
        });
    },
    
  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
</style>
