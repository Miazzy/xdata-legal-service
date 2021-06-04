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
                        <a-input-search v-model="legal.value" placeholder="输入搜索关键字、案件名称、相关信息等" style="width:450px;" enter-button @search="execSearch('view')" />
                        
                        <div v-if="getUrlParam('stage') == '全部' " style="display:inline;margin-left:15px;font-size:14px;margin-right:10px;">
                          <span>案件阶段</span>
                          <a-select  v-model="legal.stage" default-value="一审阶段" placeholder="选择案件程序阶段" style="width:150px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                            <a-select-option value="全部">
                              全部
                            </a-select-option>
                            <a-select-option value="一审阶段">
                              一审阶段
                            </a-select-option>
                            <a-select-option value="二审阶段">
                              二审阶段
                            </a-select-option>
                            <a-select-option value="执行阶段">
                              执行阶段
                            </a-select-option>
                            <a-select-option value="再审阶段">
                              再审阶段
                            </a-select-option>
                            <a-select-option value="行政复议">
                              行政复议
                            </a-select-option>
                            <a-select-option value="劳动仲裁">
                              劳动仲裁
                            </a-select-option>
                            <a-select-option value="结案闭单">
                              结案闭单
                            </a-select-option>
                          </a-select>
                        </div>

                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>案件类别</span>
                          <a-select  v-model="legal.caseSType" default-value="起诉案件" placeholder="请选择案件类别！" style="width:150px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                            <a-select-option value="全部">
                              全部
                            </a-select-option>
                            <a-select-option value="起诉案件">
                              起诉案件
                            </a-select-option>
                            <a-select-option value="应诉案件">
                              应诉案件
                            </a-select-option>
                          </a-select>
                        </div>

                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>案件级别</span>
                          <a-select  v-model="legal.legalType" default-value="一般案件"  placeholder="请选择案件类别" style="width:150px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                            <a-select-option value="全部">
                              全部
                            </a-select-option>
                            <a-select-option value="一般案件">
                              一般案件
                            </a-select-option>
                            <a-select-option value="重大案件">
                              重大案件
                            </a-select-option>
                          </a-select>
                        </div>
                        <a-button type="primary" @click="execSearch('view')" >查询</a-button>
                        <a-button type="primary" @click="execFresh" style="display:none;">刷新</a-button>
                        <a-button type="primary" @click="execApply" style="display:none;">新增</a-button>
                        <a-button type="primary" @click="execExport" >导出</a-button>
                    </div>

                    <div style="margin-left:20px;">
                      <a-tabs default-active-key="1" @change="callback">
                        <a-tab-pane key="1" tab="列表">
                          <a-empty v-if="data.length == 0" style="margin-top:10%;height:580px;"/>
                          <div v-if="data.length > 0" class="reward-content-table" style="margin-left:0px; width:98%;"> 
                              <a-list item-layout="horizontal" :data-source="data">
                                <a-list-item v-show=" item.status != '已删除' && item.status != '已作废' " slot="renderItem" slot-scope="item, index" style="position:relative;">

                                  <a-dropdown slot="actions">
                                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                      操作<a-icon type="down" />
                                    </a>
                                    <a-menu slot="overlay" >
                                      <a-menu-item key="200" @click="execView(item)">
                                        查看案件
                                      </a-menu-item>
                                      <a-menu-item v-if=" item.stage != '结案闭单'" key="201" @click="execPatch(item)">
                                        修改案件
                                      </a-menu-item>
                                      <a-menu-item v-if=" item.stage != '结案闭单' && item.status == '待处理' " key="101" @click="execDelete(item)">
                                        删除案件
                                      </a-menu-item>
                                      <a-menu-item v-if=" item.stage != '结案闭单' && item.status == '待处理' " key="99" @click="execBan(item)">
                                        禁用案件
                                      </a-menu-item>
                                      <a-menu-item key="300" @click="execNotify(item)">
                                        发起知会
                                      </a-menu-item>
                                    </a-menu>
                                  </a-dropdown>
                                  
                                  <a-dropdown slot="actions" v-if=" item.stage != '结案闭单'">
                                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                      管理<a-icon type="down" />
                                    </a>
                                    <a-menu slot="overlay" >
                                      <a-menu-item key="0" @click="execProcess(item , '案件进展')">
                                        录入案件进展
                                      </a-menu-item>
                                      <a-menu-item key="1" @click="execHear(item , '一审阶段')">
                                        进入一审阶段
                                      </a-menu-item>
                                      <a-menu-item key="2" @click="execHear(item , '二审阶段')">
                                        进入二审阶段
                                      </a-menu-item>
                                      <a-menu-item key="3" @click="execHear(item , '执行阶段')">
                                        进入执行阶段
                                      </a-menu-item>
                                      <a-menu-item key="4" @click="execHear(item , '再审阶段')">
                                        进入再审阶段
                                      </a-menu-item>
                                      <a-menu-item key="100" @click="execHear(item , '结案闭单')">
                                        结案闭单
                                      </a-menu-item>
                                    </a-menu>
                                  </a-dropdown>

                                  <a-dropdown slot="actions" v-if=" item.stage == '结案闭单'" >
                                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                      评价<a-icon type="down" />
                                    </a>
                                    <a-menu slot="overlay" >
                                      <a-menu-item key="200" v-if=" item.evaluate_flag == 'N' " @click="execEvaluate(item,'evaluate')">
                                        案件评价
                                      </a-menu-item>
                                      <a-menu-item key="299" v-if=" item.evaluate_flag == 'Y' " @click="execEvaluate(item,'view')">
                                        查看评价
                                      </a-menu-item>
                                    </a-menu>
                                  </a-dropdown>


                                  <a-list-item-meta :index="index" :description="`${item.caseID} 法院：${item.court}，法官：${item.judge}，程序：${item.stage}`" >
                                    <a slot="title" >{{ `序号: ${item.serialID} ${item.caseID} 程序：${item.stage} ，案由：${ item.caseType } ，原告：${item.accuser}，被告：${item.defendant.slice(0,15) + (item.defendant.length>15?'...':'') }` }}</a>
                                  </a-list-item-meta>

                                  <a-badge style="float:left;z-index:1000000;right:-10px;position:absolute;top:35px;">
                                    <a-icon slot="count" :type="item.stage == '结案闭单' ? 'check-circle' : item.stage == '一审阶段' ? 'question-circle':'clock-circle'" :style="item.stage == '结案闭单' ? `color:DodgerBlue;`: item.stage == '一审阶段' ? `color:Chocolate;`:`color: #f5222d;`" />
                                  </a-badge>
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
                                <vue-excel-column field="caseID"      label="案件编号"          width="120px" />
                                <vue-excel-column field="create_time"    label="填报日期"       width="120px" />
                                <vue-excel-column field="create_by"    label="填报人员"       width="120px" />
                                <vue-excel-column field="legalType"    label="案件级别"       width="120px" />
                                <vue-excel-column field="legalTname"    label="案件类型"       width="120px" />
                                <vue-excel-column field="stage"       label="程序阶段"          width="120px" />
                                <vue-excel-column field="plate"    label="所属板块"       width="120px" />
                                <vue-excel-column field="zone"    label="所属区域"       width="120px" />
                                <vue-excel-column field="zoneProject"    label="项目名称"       width="120px" />
                                <vue-excel-column field="receiveTime" label="接收时间(业务部)" width="120px" />
                                <vue-excel-column field="lawRTime"    label="接收时间(法务部)" width="120px" />
                                <vue-excel-column field="accuser"      label="发起(原告)"          width="150px" />
                                <vue-excel-column field="defendant"    label="应诉(被告)"          width="150px" />
                                <vue-excel-column field="thirdParty"    label="第三人"          width="150px" />
                                <vue-excel-column field="caseType"    label="案件案由"       width="200px" />
                                <vue-excel-column field="handledTime"  label="法院受理时间"       width="120px" />
                                <vue-excel-column field="court"        label="受理法院"          width="200px" />
                                <vue-excel-column field="judge"        label="承办法官"          width="120px" />
                                <vue-excel-column field="judgeMobile"        label="法官电话"          width="120px" />
                                <vue-excel-column field="inHouseLawyers" label="内部律师"      width="120px" />
                                <vue-excel-column field="inHouseLawyersMobile" label="律师电话"      width="120px" />
                                <vue-excel-column field="lawOffice"     label="律所名称"          width="120px" />
                                <vue-excel-column field="lawOfficeTime" label="委托时间"          width="120px" />
                                <vue-excel-column field="lawyer"        label="外聘律师"          width="120px" />
                                <vue-excel-column field="lawyerMobile"  label="律师电话"          width="120px" />
                                <vue-excel-column field="claims"        label="诉讼请求"          width="120px" />
                                <vue-excel-column field="claimsBidSum"  label="诉讼标的额"        width="120px" />
                                <vue-excel-column field="disclosure"    label="事项披露"          width="120px" />
                                <vue-excel-column field="lawcase"       label="案件进展"          width="120px" />
                                <vue-excel-column field="fstEvidence"   label="一审举证期限"          width="120px" />
                                <vue-excel-column field="fstCourtDate"  label="一审开庭时间"          width="120px" />
                                <vue-excel-column field="fstPlan"       label="一审诉讼预案"          width="120px" />
                                <vue-excel-column field="fstReason"     label="一审未填写原因"        width="120px" />
                                <vue-excel-column field="fstConform"    label="一审与预案是否相符"     width="200px" />
                                <vue-excel-column field="fstUnConformReasom"    label="一审不符原因"  width="120px" />
                                <vue-excel-column field="fstDetractionSum"      label="一审减损金额"  width="120px" />
                                <vue-excel-column field="fstValid"      label="一审是否生效"          width="120px" />
                                <vue-excel-column field="fstAppeal"     label="一审是否上诉"          width="120px" />
                                <vue-excel-column field="fstAppealTime" label="一审上诉期"            width="120px" />
                                <vue-excel-column field="secEvidence"   label="二审举证期限"          width="120px" />
                                <vue-excel-column field="secCourtDate"  label="二审开庭时间"          width="120px" />
                                <vue-excel-column field="secPlan"       label="二审诉讼预案"          width="120px" />
                                <vue-excel-column field="secReason"     label="二审未填写原因"        width="120px" />
                                <vue-excel-column field="secConform"    label="二审与预案是否相符"     width="200px" />
                                <vue-excel-column field="secUnConformReasom"    label="二审不符原因"  width="120px" />
                                <vue-excel-column field="secDetractionSum"      label="二审减损金额"  width="120px" />
                                <vue-excel-column field="secValid"      label="二审是否生效"          width="120px" />
                                <vue-excel-column field="secAppeal"     label="二审是否上诉"          width="120px" />
                                <vue-excel-column field="secAppealTime" label="二审上诉期"            width="120px" />
                                <vue-excel-column field="reviewEvidence"   label="再审举证期限"          width="120px" />
                                <vue-excel-column field="reviewCourtDate"  label="再审开庭时间"          width="120px" />
                                <vue-excel-column field="reviewPlan"       label="再审诉讼预案"          width="120px" />
                                <vue-excel-column field="reviewReason"     label="再审未填写原因"        width="120px" />
                                <vue-excel-column field="reviewConform"    label="再审与预案是否相符"     width="200px" />
                                <vue-excel-column field="reviewUnConformReasom"    label="再审不符原因"  width="120px" />
                                <vue-excel-column field="reviewDetractionSum"      label="再审减损金额"  width="120px" />
                                <vue-excel-column field="reviewValid"      label="再审是否生效"          width="120px" />
                                <vue-excel-column field="reviewAppeal"     label="再审是否上诉"          width="120px" />
                                <vue-excel-column field="reviewAppealTime" label="再审上诉期"            width="120px" />
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
      getUrlParam:Betools.tools.getUrlParam,
      iswechat:false,
      iswework:false,
      pageName: "案件管理",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      tablename:'bs_legal',
      viewname:'bs_legal',
      size: 0,
      options:{},
      legal:{
        value:'',
        stage:'全部',
        caseSType:'全部',
        legalType:'全部',
      },
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
        { title: '接收时间(业务部)', dataIndex: 'receiveTime', key: 'receiveTime', },
        { title: '接收时间(法务部)', dataIndex: 'lawRTime', key: 'lawRTime', },
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
      stageVal:{
        '一审阶段': 1,
        '二审阶段': 2,
        '执行阶段': 2,
        '再审阶段': 2,
        '结案闭单': 100,
      },
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
      deNull:Betools.tools.deNull,

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
          this.legal.stage = Betools.tools.getUrlParam('stage') || '全部';
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          this.execSearch('view');
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
            item.caseType = JSON.parse(item.caseType);
            item.court = JSON.parse(item.court);
            Betools.tools.isNull(item.court[item.court.length-1]) ? item.court = item.court.slice(0,item.court.length-1) : null;
            item.court = Betools.tools.deNull(item.court[item.court.length-1],'') ;
        });
        return list;
      },

      // 案件发起录入申请
      async execApply(){
          const { $router } = this;
          $router.push(`/legal/case/legalapply?type=1&tname=案件录入&apply=new&role=new`);
      },

      // 案件记录修改申请
      async execPatch(elem){
          const { $router } = this;
          $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件修改&apply=edit&role=edit`);
      },

      // 案件记录追加进展
      async execProcess(elem){
          const { $router } = this;
          $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件进展&apply=process&role=process`);
      },

      // 案件记录查看申请
      async execView(elem){
          const { $router } = this;
          $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件详情&apply=view&role=view`);
      },

      // 案件记录发起知会
      async execNotify(elem){
          const { $router } = this;
          $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件详情&apply=view&role=notify`);
      },

      // 案件记录删除信息
      async execDelete(elem){
          const { $router , data , tablename , execFresh } = this;
          const that = this;
          this.$confirm({
              title: "温馨提示",
              content: "您好，删除案件记录后不可恢复，您确定执行删除操作?",
              onOk: async() => {
                    Betools.manage.patchTableData(tablename, elem.id, {status:'已删除'})
                    const result = await Betools.manage.patchTableData(tablename, elem.id, {status:'已删除'}); // 向表单提交form对象数据
                    if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                        return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                    }
                    await execFresh('view');
                    vant.Dialog.alert({  title: '温馨提示',  message: `已执行删除操作！`, }); 
                    await Betools.tools.sleep(300);
                    this.data.map(item => { (item.id == elem.id) ? item.status = '已删除' : null; });
                }
            });
      },

      // 案件记录禁用信息
      async execBan(elem){
          const { $router , data , tablename , execFresh } = this;
          const that = this;
          this.$confirm({
              title: "温馨提示",
              content: "您确定执行禁用操作?",
              onOk: async() => {
                    Betools.manage.patchTableData(tablename, elem.id, {status:'已作废'});
                    const result = await Betools.manage.patchTableData(tablename, elem.id, {status:'已作废'}); // 向表单提交form对象数据
                    if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                        return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                    }
                    await execFresh('view');
                    vant.Dialog.alert({  title: '温馨提示',  message: `已执行禁用操作！`, }); 
                    await Betools.tools.sleep(300);
                    this.data.map(item => { (item.id == elem.id) ? item.status = '已作废' : null; });
                }
            });
      },

      // 案件周期管理
      async execHear(elem, stage){
          const { $router , data , tablename , execFresh } = this;
          const that = this;

          const preStage = this.stageVal[elem.stage];
          const curStage = this.stageVal[stage];

          if(curStage < preStage){ // 检查案件阶段是否以正常周期流程
            return vant.Dialog.alert({  title: '温馨提示',  message: `您好，不能从‘${elem.stage}’进行到‘${stage}’`, });
          }

          this.$confirm({
              title: "温馨提示",
              content: `您确定进行${stage}操作?`,
              onOk: async() => {
                    Betools.manage.patchTableData(tablename, elem.id, {stage}); // 向表单提交form对象数据
                    const result = await Betools.manage.patchTableData(tablename, elem.id, {stage}); // 向表单提交form对象数据
                    if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                        return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                    }
                    await execFresh('view'); // vant.Dialog.alert({  title: '温馨提示',  message: `已完成进入${stage}操作！`, });  // 获取到本地缓存数据，然后将缓存数据的列表中的此数据的状态改为stage
                    this.data.map(item => { 
                      (item.id == elem.id) ? item.stage = stage : null; 
                      (item.id == elem.id) ? Betools.query.cacheTableDataByID(tablename, item.id , item) : null ;
                    });
                    $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&stage=${stage}&tname=${stage}&apply=stage&role=stage`);
                }
            });
      },

      // 案件评价管理
      async execEvaluate(elem , status){
        const { $router } = this;
        $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件评价&stage=evaluate&apply=case&role=${status}`);
      },

      // 案件记录导出功能
      async execExport(){
          const { $router } = this;
          this.$refs.grid.exportTable('xlsx', false, '案件台账数据');
      },

      // 案件列表执行刷新操作45
      async execFresh(value = ''){
        await this.execSearch(value);
      },



      // 案件列表执行搜索功能
      async execSearch(value = ''){
        console.log(`exec search ...` , dayjs().format('HH:mm:ss'));
        const tableName = this.viewname;
        const cacheRandomKey = value == 'view' ? ',' + Math.random().toString().slice(2,6) : '';
        const toast = value == 'view' ? vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', }):null;
        const { legal } = this;
        const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
        let searchSql = typeof legal.value == 'string' ? `~and((title,like,~${legal.value}~)~or(create_by,like,~${legal.value}~)~or(fstPlan,like,~${legal.value}~)~or(legalType,like,~${legal.value}~)~or(plate,like,~${legal.value}~)~or(firm,like,~${legal.value}~)~or(legalTname,like,~${legal.value}~)~or(zone,like,~${legal.value}~)~or(zoneProject,like,~${legal.value}~)~or(caseID,like,~${legal.value}~)~or(caseType,like,~${legal.value}~)~or(caseSType,like,~${legal.value}~)~or(stage,like,~${legal.value}~)~or(accuser,like,~${legal.value}~)~or(defendant,like,~${legal.value}~)~or(court,like,~${legal.value}~)~or(judge,like,~${legal.value}~)~or(judgeMobile,like,~${legal.value}~)~or(inHouseLawyers,like,~${legal.value}~)~or(disclosure,like,~${legal.value}~)~or(lawcase,like,~${legal.value}~)~or(thirdParty,like,~${legal.value}~)~or(lawOffice,like,~${legal.value}~)~or(lawyer,like,~${legal.value}~)~or(lawyerMobile,like,~${legal.value}~)~or(claims,like,~${legal.value}~))` : '';
        let stageSql = Betools.tools.isNull(legal.stage) || legal.stage == '全部' ? '' : `~and(stage,in,${legal.stage})`;
        let caseSTypeSQL = Betools.tools.isNull(legal.caseSType) || legal.caseSType == '全部' ? '':`~and(caseSType,eq,${legal.caseSType})`;
        let legalTypeSQL = Betools.tools.isNull(legal.legalType) || legal.legalType == '全部' ? '':`~and(legalType,eq,${legal.legalType})`;
        const data = await this.handleList(tableName , `待处理,处理中,审批中,已完成,已结案,已驳回${cacheRandomKey}`, userinfo, stageSql + caseSTypeSQL + legalTypeSQL + searchSql , 0 , 10000);
        value == 'view' ? (this.data = data)  : null;
        await Betools.tools.sleep(300);
        value == 'view' ? (vant.Toast.clear()) : null;
        return data; 
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
</style>
