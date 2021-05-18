<template>
  
  <div id="reward-home">
      <div style="background-color:#f0f0f0;">
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
        </keep-alive>
      </a-row>
    </div>
  </div>
</template>
<script>
import * as workconfig from '@/request/workconfig';

export default {
  mixins: [window.mixin],
  data() {
    return {
      iswechat:false,
      iswework:false,
      pageName: "案件管理",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      tablename:'bs_law_firm',
      size: 0,
      options:{
        create_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        in_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        establish_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        start_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        coop_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
      },
      legal:{
        id:'', // varchar(36)  default ''  not null comment '律所编号' primary key,
        title:'录入律师申请', // 申请流程标题,
        serialID:'', // varchar(16)  default ''  not null comment '律所序号',
        create_time: dayjs().format('YYYY-MM-DD'), // timestamp    default CURRENT_TIMESTAMP not null comment '填报日期',
        create_by :'', // varchar(32)  default '' not null comment '填报人员',
        xid :'', // varchar(36) default '' not null comment '更新ID',
        in_zone:'', // varchar(32)  default ''  not null comment '入库区域',
        firm_name:'', // varchar(64)  default ''  not null comment '律所名称',
        in_time:'', // varchar(32)  default ''  not null comment '入库时间',
        tags:'常年法律顾问',
        plate:'地产板块',
        establish_time:'', // varchar(32)  default ''  not null comment '成立时间',
        address:'', // varchar(64)  default ''  not null comment '地址',
        phone:'', // varchar(16)  default ''  not null comment '电话',
        scale:'1-10人', // varchar(16)  default ''  not null comment '律所规模（人数）',
        brief:'', // varchar(256) default ''  not null comment '律所简要介绍',
        firm_count:'N人', // varchar(16)  default ''  not null comment '服务团队人数',
        team_brief:'', // varchar(256) default ''  not null comment '团队介绍',
        fee:'￥N万/年', // varchar(64)  default ''  not null comment '费用',
        major_fee:'一事一议', // varchar(64)  default ''  not null comment '重大诉讼费用',
        common_fee: '商品房纠纷案件：￥N/件', // varchar(64)  default ''  not null comment '一般诉讼费用',
        diligence_fee:'￥N万/项目', // varchar(64)  default ''  not null comment '尽调专项费用',
        notice_fee: '￥N万/年', // varchar(64)  default ''  not null comment '发函专项费用',
        penal_fee: '一事一议', // varchar(64)  default ''  not null comment '刑事专项费用',
        coop_flag:'已合作', // varchar(1)   default 'Y' not null comment '是否已合作',
        start_time:'', // varchar(32)  default ''  not null comment '开始合作时间',
        coop_time:'', // varchar(32)  default ''  not null comment '最近合作期间',
        coop_stime:'', // varchar(32)  default ''  not null comment '最近合作期间(开始时间)',
        coop_etime:'', // varchar(32)  default ''  not null comment '最近合作期间(结束时间)',
        out_flag:'未出库', // varchar(32)  default 'N' not null comment '是否出库',
      },
      columns: workconfig.columns.reward.items,
      wfcolumns: workconfig.columns.reward.wfcolumns,
      data: [],
      readonly: false,
      userList:[],
      release_userid:'',
      release_username:'',
      release_company:'',
      release_department:'',
      release_position:'',
      release_amount:'',
      release_mobile:'',
      release_userlist:[],
      release_zone:'',
      release_project:'',
      approve_userid:'',
      approve_username:'',
      approve_mobile:'',
      approve_department:'',
      approve_company:'',
      approve_position:'',
      approve_userlist:[],
      approve_executelist:[],
      role:'',
      file:'',
      uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
      message: workconfig.compValidation.legalapply.message,
      valid: workconfig.compValidation.legalapply.valid,
      goodstype: workconfig.goodstype,
      goodsborrowtype: workconfig.goodsborrowtype,
      diplomaType: workconfig.compcolumns.diplomaTypeColumns,
      acceptType: workconfig.compcolumns.acceptType,
      commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
      sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "Sheet1", data: [{}] }],
      collection: [{ }],
      userinfo: '',
      usertitle:'',
      statusType:{'valid':'有效','invalid':'删除'},
      zoneType:{'领地集团总部':'领地集团总部','重庆区域':'重庆区域','两湖区域':'两湖区域','川北区域':'川北区域','成都区域':'成都区域','乐眉区域':'乐眉区域','中原区域':'中原区域','攀西区域':'攀西区域','新疆区域':'新疆区域','大湾区域':'大湾区域','北京区域':'北京区域'},
    };
  },
  activated() {
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
      moment,
      
      // 企业微信登录处理函数
      async  weworkLogin  (codeType = 'search', systemType = 'search')  {
        const userinfo_work = await Betools.query.queryWeworkUser(codeType, systemType,'v5');
          const userinfo = await Betools.storage.getStore('system_userinfo');
          this.legal.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
          this.usertitle = (userinfo && userinfo.parent_company && userinfo.parent_company.name ? userinfo.parent_company.name + ' > ' :'')  + (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
          return userinfo;
      },

      // 执行页面跳转
      async redirectView(path) {
          this.$router.push(path);
      },
     
      // 获取基础信息
      async queryInfo() {
        try {
          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          this.userinfo = await this.weworkLogin(); //查询当前登录用户
          this.back = Betools.tools.getUrlParam('back') || '/legal/workspace'; //查询上一页
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          this.legal.apply_realname = userinfo.realname;
          this.legal.apply_username = userinfo.username;
        } catch (error) {
          console.log(error);
        }
      },

  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";
</style>
