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
                      <span @click="redirectView(elem.path)" >{{ elem.text }}</span>
                    </a-breadcrumb-item>
                  </template>
                </a-breadcrumb>
              </div>

              <div style="background-color:#f0f0f0;">
              <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 2.5rem; margin-right: 2.5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >
                <div style="width:100%;margin-left:0px;margin-right:0px;background:#fbf9fe;">

                    <div class="reward-top-button" style="margin-top:20px;margin-bottom:20px; margin-left:20px; width:100%;">
                        <a-input-search placeholder="输入搜索关键字、律所名称、地址" style="width:450px;" enter-button @search="execSearch" />
                        <a-button type="primary" @click="execApply" >新增</a-button>
                        <a-button type="primary" @click="execFresh" >刷新</a-button>
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
                                  <a-list-item-meta :index="index" :description="`${item.firm_name} 简介：${item.brief_min}，团队简介：${item.team_brief_min}`" >
                                    <a slot="title" >{{ `${item.firm_name} ${item.phone} 规模:${item.scale}，位于${item.address}，服务团队:${item.firm_count}人` }}</a>
                                  </a-list-item-meta>
                                </a-list-item>
                              </a-list>
                          </div>
                        </a-tab-pane>

                        <a-tab-pane key="2" tab="表格" force-render>
                          <a-empty v-if="data.length == 0" style="margin-top:10%;height:580px;"/>
                          <a-table v-if="data.length > 0 " style="width:105%;" size="middle" tableLayout="column.ellipsis" :bordered="false" :columns="columns" :data-source="data"  />
                        </a-tab-pane>

                        <a-tab-pane key="3" tab="表单">
                          <a-empty v-if="data.length == 0" style="margin-top:10%;height:580px;"/>
                          <vue-excel-editor v-if="data.length > 0" v-model="data" ref="grid" width="100%" filter-row autocomplete >
                                <vue-excel-column field="serialID"      label="序号"          width="60px" />
                                <vue-excel-column field="firm_name"     label="律所名称"       width="100px" />
                                <vue-excel-column field="address"       label="地址"          width="200px" />
                                <vue-excel-column field="phone"         label="电话"          width="120px" />
                                <vue-excel-column field="scale"         label="规模"          width="120px" />
                                <vue-excel-column field="brief"         label="简介"          width="300px" />
                                <vue-excel-column field="firm_count"    label="人数"          width="120px" />
                                <vue-excel-column field="team_brief"    label="团队介绍"       width="300px" />
                                <vue-excel-column field="coop_flag"     label="合作"          width="120px" />
                                <vue-excel-column field="out_flag"      label="出库"          width="120px" />
                                <vue-excel-column field="establish_time" label="成立时间"      width="120px" />
                                <vue-excel-column field="in_zone"        label="区域"         width="120px" />
                                <vue-excel-column field="in_time"        label="入库时间"      width="120px" />
                                <vue-excel-column field="start_time"     label="最近合作时间"   width="120px" />
                                <vue-excel-column field="coop_time"      label="合作期间"      width="180px" />
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
      tablename:'bs_law_firm',
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
        { width: '4%', title: '序号', dataIndex: 'serialID', key: 'serialID', },
        { width: '15%', title: '律所名称', dataIndex: 'firm_name', key: 'firm_name', },
        { width: '12%', title: '地址', dataIndex: 'address', key: 'address', },
        { width: '10%', title: '电话', dataIndex: 'phone', key: 'phone', },
        { width: '5%', title: '规模', dataIndex: 'scale', key: 'scale', },
        { width: '20%', title: '简介', dataIndex: 'brief_min', key: 'brief_min', },
        { width: '4%', title: '人数', dataIndex: 'firm_count', key: 'firm_count', },
        { width: '18%', title: '团队介绍', dataIndex: 'team_brief_min', key: 'team_brief_min', },
        { width: '5%', title: '合作', dataIndex: 'coop_flag', key: 'coop_flag', },
        { width: '5%', title: '出库', dataIndex: 'out_flag', key: 'out_flag', },
        { width: '5%', title: '成立', dataIndex: 'establish_time', key: 'establish_time', }, 
        // { width: '5%', title: '区域', dataIndex: 'in_zone', key: 'in_zone', }, // { width: '5%', title: '入库时间', dataIndex: 'in_time', key: 'in_time', }, // { width: '5%', title: '合作时间', dataIndex: 'start_time', key: 'start_time', }, // { width: '5%', title: '合作期间', dataIndex: 'coop_time', key: 'coop_time', },
      ],
      data:[],
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'律所管理',path:'/legal/workspace'},{icon:'form',text:'律所管理',path:''}],
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
          this.data = await this.handleList(tableName , '待处理,处理中,审批中,已完成,已驳回', userinfo, '' , 0 , 10000);
        } catch (error) {
          console.log(error);
        }
      },

      // 查询不同状态的领用数据
      async handleList(tableName , status = '待处理', userinfo, searchSql , page = 0 , size = 10000){
        if(Betools.tools.isNull(userinfo) || Betools.tools.isNull(userinfo.username)){
            return [];
        }
        let list = await Betools.manage.queryTableData(tableName , `_where=(status,in,${status})${searchSql}&_sort=-id&_p=${page}&_size=${size}`);
        list.map((item)=>{ 
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD'); 
            item.establish_time = dayjs(item.establish_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.establish_time).format('YYYY-MM-DD');
            item.brief_min = item.brief.length > 35 ? item.brief.slice(0,35) + '...' : item.brief;
            item.team_brief_min = item.team_brief.length > 35 ? item.team_brief.slice(0,35) + '...' : item.team_brief;
            item.firm_count = parseInt(item.firm_count);
            item.coop_flag = 'YN'.includes(item.coop_flag) ? {'Y':'已合作','N':'未合作'}[item.coop_flag] : item.coop_flag;
            item.out_flag = 'YN'.includes(item.out_flag) ? {'Y':'已出库','N':'未出库'}[item.out_flag] : item.out_flag;
        });
        return list;
      },

      // 律所录入申请
      async execApply(){
          const { $router } = this;
          $router.push(`/legal/firm/firmapply?type=1&tname=律所录入&apply=new`);
      },

      // 律所删除申请
      async execDelete(elem){
          const { $router } = this;
      },

      // 律所修改申请
      async execPatch(elem){
          const { $router } = this;
          $router.push(`/legal/firm/firmapply?id=${elem.id}&type=1&tname=律所修改&apply=edit`);
      },

      // 律所查看申请
      async execView(elem){
          const { $router } = this;
          $router.push(`/legal/firm/firmview?id=${elem.id}&type=1&tname=律所详情&apply=view`);
      },

      // 律所导出功能
      async execExport(){
        const { $router } = this;
        this.$refs.grid.exportTable('xlsx', false, '律所台账数据');
      },

      // 律所执行刷新操作45
      async execFresh(){
        const tableName = this.tablename;
        const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
        this.data = await this.handleList(tableName , '待处理,处理中,审批中,已完成,已驳回', userinfo, '' , 0 , 10000);
      },

      // 律所执行搜索功能
      async execSearch(value){
        const tableName = this.tablename;
        const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
        const searchSql = `~and((firm_name,like,~${value}~)~or(address,like,~${value}~)~or(brief,like,~${value}~)~or(team_brief,like,~${value}~)~or(phone,like,~${value}~)~or(scale,like,~${value}~))`;
        this.data = await this.handleList(tableName , '待处理,处理中,审批中,已完成,已驳回', userinfo, searchSql , 0 , 10000);
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
</style>
