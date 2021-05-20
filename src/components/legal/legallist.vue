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
            <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" style="background-color:#f0f0f0;">

              <div id="" class="" style="padding-left:2.75rem;padding-top:0.25rem;padding-bottom:0.25rem;background-color:#fefefe;" >
                <a-breadcrumb>
                  <template v-for="(elem,index) in breadcrumb">
                    <a-breadcrumb-item :key="elem.icon" :index="index" >
                      <a-icon :type="elem.icon" />
                      <span @click="redirectView(elem.path)">{{ elem.text }}</span>
                    </a-breadcrumb-item>
                  </template>
                </a-breadcrumb>
              </div>

              <div style="background-color:#f0f0f0;">
                <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 2.5rem; margin-right: 2.5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >
                <div style="width:100%;margin-left:0px;margin-right:0px;background:#fbf9fe;">

                    <div class="reward-top-button" style="margin-top:20px;margin-bottom:20px; margin-left:20px;">
                        <a-button type="primary">查看</a-button>
                        <a-button type="primary">新增</a-button>
                        <a-button type="primary">修改</a-button>
                        <a-button type="primary">删除</a-button>
                    </div>

                    <div class="reward-content-table" style="margin-left:20px;">
                        <a-table style="width:100%;" size="middle" tableLayout="column.ellipsis" :bordered="false" :columns="columns" :data-source="data" :row-selection="rowSelection" />
                    </div>

                </div>
                </div>
              </div>

            </a-col>
        </keep-alive>
      </a-row>
    </div>
  </div>
</template>
<script>
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
      tablename:'bs_legal',
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
      userinfo: '',
      usertitle:'',
      columns:[
        { title: '案件编号', dataIndex: 'caseID', key: 'caseID', },
        { title: '案件案由', dataIndex: 'caseType', key: 'caseType', },
        { title: '程序阶段', dataIndex: 'stage', key: 'stage', },
        { title: '业务接收(业务部)', dataIndex: 'receiveTime', key: 'receiveTime', },
        { title: '法律接收(法务部)', dataIndex: 'lawRTime', key: 'lawRTime', },
        { title: '发起(原告)', dataIndex: 'accuser', key: 'accuser', },
        { title: '应诉(被告)', dataIndex: 'defendant', key: 'defendant', },
        { title: '法院受理', dataIndex: 'handledTime', key: 'handledTime', },
        { title: '受理法院', dataIndex: 'court', key: 'court', },
        { title: '承办法官', dataIndex: 'judge', key: 'judge', },
        { title: '内部律师(承)', dataIndex: 'inHouseLawyers', key: 'inHouseLawyers', },
        { title: '案件状态', dataIndex: 'legalStatus', key: 'legalStatus', }, // { title: '流程标题', dataIndex: 'title', key: 'title', }, // { title: '填报日期', dataIndex: 'create_time', key: 'create_time', }, // { title: '填报人员', dataIndex: 'create_by', key: 'create_by', }, // { title: '案件类别', dataIndex: 'legalType', key: 'legalType', }, // { title: '所属板块', dataIndex: 'plate', key: 'plate', }, // { title: '公司名称', dataIndex: 'firm', key: 'firm', }, // { title: '所属区域', dataIndex: 'zone', key: 'zone', }, // { title: '项目名称', dataIndex: 'zoneProject', key: 'zoneProject', }, // { title: '第三人', dataIndex: 'thirdParty', key: 'thirdParty', }, // { title: '外聘律所', dataIndex: 'externalFlag', key: 'externalFlag', }, // { title: '外聘律所名称', dataIndex: 'lawOffice', key: 'lawOffice', }, // { title: '委托时间', dataIndex: 'lawOfficeTime', key: 'lawOfficeTime', }, // { title: '外聘律师', dataIndex: 'lawyer', key: 'lawyer', }, // { title: '律师电话', dataIndex: 'lawyerMobile', key: 'lawyerMobile', }, // { title: '诉讼请求', dataIndex: 'claims', key: 'claims', }, // { title: '诉讼本金', dataIndex: 'claimsCapital', key: 'claimsCapital', }, // { title: '诉讼违约金', dataIndex: 'claimsDedit', key: 'claimsDedit', }, // { title: '诉讼标的额', dataIndex: 'claimsBidSum', key: 'claimsBidSum', }, // { title: '法官电话', dataIndex: 'judgeMobile', key: 'judgeMobile', }, // { title: '外部律师(承办)', dataIndex: 'outHouseLawyers', key: 'outHouseLawyers', }, // { title: '事项披露', dataIndex: 'disclosure', key: 'disclosure', }, // { title: '案件进展', dataIndex: 'lawcase', key: 'lawcase', }, // { title: '最后修改时间', dataIndex: 'lastTime', key: 'lastTime', }, // { title: '最后修改人员', dataIndex: 'lastModifier', key: 'lastModifier', }, // { title: '结案日期', dataIndex: 'closeDate', key: 'closeDate', }, // { title: '归档日期', dataIndex: 'archiveDate', key: 'archiveDate', }, // { title: '办理进展', dataIndex: 'progress', key: 'progress', }, // { title: '申请人姓名', dataIndex: 'apply_realname', key: 'apply_realname', }, // { title: '申请人账号', dataIndex: 'apply_username', key: 'apply_username', }, // { title: '案件类型', dataIndex: 'legalTname', key: 'legalTname', },
      ],
      data:[],
      rowSelection:[],
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'案件管控',path:'/legal/workspace'},{icon:'form',text:'案件管理',path:''}],
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
      isNull:Betools.tools.isNull,
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
          Betools.tools.isNull(path) ? null: this.$router.push(path);
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
          this.data = await this.handleList(tableName , '待处理,处理中,审批中,已完成,已结案,已驳回', userinfo, '' , 0 , 10000);
        } catch (error) {
          console.log(error);
        }
      },

      //查询不同状态的领用数据
      async handleList(tableName , status = '待处理,处理中,审批中,已完成,已结案,已驳回', userinfo, searchSql , page = 0 , size = 10000){
        if(Betools.tools.isNull(userinfo) || Betools.tools.isNull(userinfo.username)){
            return [];
        }
        let list = await Betools.manage.queryTableData(tableName , `_where=(status,in,${status})${searchSql}&_sort=-id&_p=${page}&_size=${size}`);
        list.map((item)=>{ 
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD'); 
            item.receiveTime = dayjs(item.receiveTime).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.receiveTime).format('YYYY-MM-DD');
            item.lawRTime = dayjs(item.lawRTime).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.lawRTime).format('YYYY-MM-DD');
            item.handledTime = dayjs(item.handledTime).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.handledTime).format('YYYY-MM-DD');
            item.legalStatus = Betools.tools.isNull(item.legalStatus) ? '开庭举证' : item.legalStatus;
        });
        return list;
      },

  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";
</style>
