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

      <a-row :gutter="24" style="background:#fbf9fe;">
        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
              <div style="width:100%;margin-left:0px;margin-right:0px;background:#fbf9fe;">

                  <div class="reward-top-button" style="margin-top:20px;margin-bottom:20px; margin-left:20px;">
                      <a-button type="primary" @click="execView" >查看</a-button>
                      <a-button type="primary" @click="execApply" >新增</a-button>
                      <a-button type="primary" @click="execPatch" >修改</a-button>
                      <a-button type="primary" @click="execDelete">删除</a-button>
                  </div>

                  <div class="reward-content-table" style="margin-left:20px;">
                      <a-table style="width:100%;" size="middle" tableLayout="column.ellipsis" :bordered="false" :columns="columns" :data-source="data" :row-selection="rowSelection" />
                  </div>

              </div>
          </a-col>
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
      tablename:'bs_lawyer',
      size: 0,
      options:{},
      legal:{},
      data: [],
      readonly: false,
      userList:[],
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "Sheet1", data: [{}] }],
      collection: [{ }],
      columns:[
        { title: '序号', dataIndex: 'serialID', key: 'serialID', },
        { title: '律师名称', dataIndex: 'lawyer_name', key: 'lawyer_name', },
        { title: '所属律所', dataIndex: 'firmID', key: 'firmID', },
        { title: '大学', dataIndex: 'college', key: 'college', },
        { title: '学位', dataIndex: 'degree', key: 'degree', },
        { title: '执业简介', dataIndex: 'brief', key: 'brief', },
        { title: '执业年限', dataIndex: 'years', key: 'years', },
        { title: '开始执业时间', dataIndex: 'start_time', key: 'start_time', },
        { title: '联系电话', dataIndex: 'mobile', key: 'mobile', },
        { title: '是否出库', dataIndex: 'out_flag', key: 'out_flag', },
        { title: '出库时间', dataIndex: 'out_time', key: 'out_time', },
        { title: '出库原因', dataIndex: 'out_reason', key: 'out_reason', },
      ],
      data:[],
      rowSelection:[],
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
          const tableName = this.tablename;
          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          this.userinfo = await this.weworkLogin(); //查询当前登录用户
          this.back = Betools.tools.getUrlParam('back') || '/legal/workspace'; //查询上一页
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          this.data = await this.handleList(tableName , '待处理,处理中,审批中,已完成', userinfo, '' , 0 , 10000);
        } catch (error) {
          console.log(error);
        }
      },

      //查询不同状态的领用数据
      async handleList(tableName , status = '已完成', userinfo, searchSql , page = 0 , size = 10000){
        if(Betools.tools.isNull(userinfo) || Betools.tools.isNull(userinfo.username)){
            return [];
        }
        let list = await Betools.manage.queryTableData(tableName , `_where=(status,in,${status})${searchSql}&_sort=-id&_p=${page}&_size=${size}`);
        list.map((item, index)=>{ 
            item.serialID = Betools.tools.isNull(item.serialID) ? index : item.serialID;
            item.brief = item.brief.slice(0,25) + '...';
            item.out_reason = item.out_reason.slice(0,25) + '...';
            item.out_time = dayjs(item.out_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.out_time).format('YYYY-MM-DD'); 
            item.start_time = dayjs(item.start_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.start_time).format('YYYY-MM-DD'); 
            item.out_flag = 'YN'.includes(item.out_flag) ? {'Y':'已出库','N':'未出库'}[item.out_flag] : item.out_flag;
        });
        return list;
      },

      // 律所录入申请
      async execApply(){
          const { $router } = this;
          $router.push(`/legal/firmapply?type=1&tname=律所录入&apply=申请`);
      },

      // 律所删除申请
      async execDelete(){
          const { $router } = this;
      },

      // 律所修改申请
      async execPatch(){
          const { $router } = this;
      },

      // 律所修改申请
      async execView(){
          const { $router } = this;
      },

  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";
</style>
