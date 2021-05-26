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
                      <a-input-search placeholder="输入搜索关键字、律师名称、大学、学历、电话、地址等" style="width:450px;" enter-button @search="execSearch" />
                      <a-button type="primary" @click="execApply" >新增</a-button>
                      <a-button type="primary" @click="execFresh">刷新</a-button>
                      <a-button type="primary" @click="execExport" >导出</a-button>
                  </div>

                  <div style="margin-left:20px;">
                      <a-tabs default-active-key="1" @change="callback">
                        <a-tab-pane key="1" tab="列表">
                          <a-empty v-if="data.length == 0" style="margin-top:10%;height:580px;"/>
                          <div v-if="data.length > 0" class="reward-content-table" style="margin-left:0px; width:98%;"> 
                              <a-list item-layout="horizontal" :data-source="data">
                                <a-list-item slot="renderItem" slot-scope="item, index">
                                  <a slot="actions" @click="execView(item)">查看</a>
                                  <a slot="actions" @click="execPatch(item)">修改</a>
                                  <a-list-item-meta :index="index" :description="`${item.lawyer_name} 所属律所：${item.firmID}，执业简介：${item.brief}，执业年限：${item.years}，开始执业时间：${item.start_time} ${ item.out_flag == '已出库' ? `，出库时间:${item.out_time}，出库原因：${item.out_reason}`:''}`" >
                                    <a slot="title" >{{ `${item.lawyer_name} ${item.mobile}，大学就读于${item.college}，学历：${item.degree}` }}</a>
                                  </a-list-item-meta>
                                </a-list-item>
                              </a-list>
                          </div>
                        </a-tab-pane>

                        <a-tab-pane key="2" tab="表格" force-render>
                          <a-empty v-if="data.length == 0" style="margin-top:10%;height:580px;"/>
                          <a-table v-if="data.length > 0 " style="width:105%;" size="middle" tableLayout="column.ellipsis" :bordered="false" :columns="columns" :data-source="data" />
                        </a-tab-pane>

                        <a-tab-pane key="3" tab="表单">
                          <a-empty v-if="data.length == 0" style="margin-top:10%;height:580px;"/>
                          <vue-excel-editor v-if="data.length > 0" v-model="data" ref="grid" width="100%" filter-row autocomplete >
                                <vue-excel-column field="serialID"      label="序号"          width="60px" />
                                <vue-excel-column field="lawyer_name"   label="律师姓名"       width="100px" />
                                <vue-excel-column field="firmID"        label="所属律所"       width="200px" />
                                <vue-excel-column field="college"       label="大学名称"       width="120px" />
                                <vue-excel-column field="degree"        label="学历"          width="120px" />
                                <vue-excel-column field="brief"         label="简介"          width="120px" />
                                <vue-excel-column field="years"         label="执业年限"       width="120px" />
                                <vue-excel-column field="start_time"    label="开始执业时间"    width="120px" />
                                <vue-excel-column field="mobile"        label="联系电话"       width="120px" />
                                <vue-excel-column field="out_flag"      label="是否出库"       width="120px" />
                                <vue-excel-column field="out_time"      label="出库时间"       width="120px" />
                                <vue-excel-column field="out_reason"    label="出库原因"       width="120px" />
                          </vue-excel-editor>
                        </a-tab-pane>

                      </a-tabs>
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
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'律所管理',path:'/legal/workspace'},{icon:'form',text:'律师管理',path:''}],
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
            item.brief = item.brief.length > 30 ? item.brief.slice(0,30) + '...' : item.brief;
            item.out_reason =  item.out_reason.length > 30 ? item.out_reason.slice(0,30) + '...' :  item.out_reason;
            item.out_time = dayjs(item.out_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.out_time).format('YYYY-MM-DD'); 
            item.out_flag = 'YN'.includes(item.out_flag) ? {'Y':'已出库','N':'未出库'}[item.out_flag] : item.out_flag;
            item.start_time = dayjs(item.start_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.start_time).format('YYYY-MM-DD'); 
        });
        return list;
      },

      // 律师录入申请
      async execApply(){
          const { $router } = this;
          $router.push(`/legal/lawyer/lawyerapply?type=1&tname=律师录入&apply=new`);
      },

      // 律师删除申请
      async execDelete(){
          const { $router } = this;
      },

      // 律师修改申请
      async execPatch(elem){
          const { $router } = this;
          $router.push(`/legal/lawyer/lawyerapply?id=${elem.id}&type=1&tname=律师修改&apply=edit`);
      },

      // 律师修改申请
      async execView(elem){
          const { $router } = this;
          $router.push(`/legal/lawyer/lawyerview?id=${elem.id}&type=1&tname=律师查看&apply=view`);
      },

      // 律师导出功能
      async execExport(){
          const { $router } = this;
          this.$refs.grid.exportTable('xlsx', false, '律师台账数据');
      },

      // 律师执行刷新操作
      async execFresh(){
        const tableName = this.tablename;
        const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
        this.data = await this.handleList(tableName , '待处理,处理中,审批中,已完成', userinfo, '' , 0 , 10000);
      },

      // 律所执行搜索功能
      async execSearch(value){
        const tableName = this.tablename;
        const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
        const searchSql = `~and((lawyer_name,like,~${value}~)~or(firmID,like,~${value}~)~or(college,like,~${value}~)~or(degree,like,~${value}~)~or(brief,like,~${value}~)~or(years,like,~${value}~)~or(mobile,like,~${value}~)~or(out_reason,like,~${value}~))`;
        this.data = await this.handleList(tableName , '待处理,处理中,审批中,已完成', userinfo, searchSql , 0 , 10000);
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
</style>
