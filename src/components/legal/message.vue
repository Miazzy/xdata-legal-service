<template>
  <div id="reward-message" style="background-color:#f0f0f0; height:auto;" >
    <div style="background-color:#f0f0f0; height:auto;">
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

            <div style="position:absolute; left:80px; width:240px;">
              <a-card class="pane-flow-card" :style="paneflowcard">
                <div style="margin:10px 15px 10px 25px;">
                  <a-input-search
                    :value="searchwords"
                    placeholder="搜索"
                    loading
                    @change="searchWordChange"
                  />
                </div>

                <template v-for="item in paneflows" :style="paneflowcard">
                  <a-card-grid
                    class="pane-flow-card-grid"
                    :key="item.href"
                    v-show="item.show"
                    @click="menuCardClick(item.id , item.ename);"
                    :style="item.css"
                    style="border-bottom: 1px solid #f9f9f9; border-radius: 4px;"
                  >
                    <a-card-meta>
                      <div slot="title" class="card-title pane-flow-card-meta"  @click="item.click">
                        <div class="pane-flow-card-meta-icon">
                          <a-avatar size="middle" :src="item.avatar" style="margin-top: 5px;" />
                        </div>
                        <div class="pane-flow-card-meta-title">
                          <a class="pane-flow-card-meta-tname">{{ item.name }}</a>
                          <div class="pane-flow-card-meta-description">{{ item.description }}</div>
                        </div>
                      </div>
                    </a-card-meta>
                    <div ></div>
                  </a-card-grid>
                </template>
              </a-card>
            </div>

            <div id="van-reward-content" style="position:absolute; left:325px; width:1100px;">
              <a-col style="padding: 0 12px 0 0" >
                <template v-for=" paneflow in paneflows ">

                  <a-card
                    :key="paneflow.ename"
                    v-show=" panename == paneflow.ename "
                    style="margin-top: 0px; height: 800px; overflow-y:scroll;"
                    :bordered="false"
                    :title="paneflow.name">

                    <div slot="extra">

                      <a-radio-group v-show="paneflow.periodTabsFlag" v-model="year" style="margin-right:20px;display:none;">
                        <a-radio-button value="all">所有</a-radio-button>
                        <a-radio-button value="half">半年</a-radio-button>
                        <a-radio-button value="year">全年</a-radio-button>
                      </a-radio-group>

                      <a-radio-group v-model="status">
                        <a-radio-button v-show="paneflow.tabs[0]" @click="queryDataByType(0 , typename , panename);" value="all">{{ paneflow.tabs[0]}}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[1]" @click="queryDataByType(1 , typename , panename);" value="init">{{ paneflow.tabs[1] }}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[2]" @click="queryDataByType(2 , typename , panename);" value="processing">{{ paneflow.tabs[2] }}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[3]" @click="queryDataByType(3 , typename , panename);" value="complete">{{ paneflow.tabs[3] }}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[3]" @click="queryDataByType(4 , typename , panename);" value="reject">{{ paneflow.tabs[4] }}</a-radio-button>
                      </a-radio-group>
                      <a-input-search style="margin-left: 16px; width: 272px;" />
                    </div>

                    <div id="reward-list-item" style="background:#fefefe;margin:10px 2px; pading:10px 2px; height: 650px; overflow-y:scroll;">
                      <a-list-item :key="index" v-for="(item, index) in paneflow.dataSource" style="background:#fefefe;margin:10px 10px;pading:10px 10px;border-bottom:1px solid #f0f0f0;">
                        <a-list-item-meta :description="item.description" style="display:block;">
                          <a-avatar style="display:none;" slot="avatar" size="large" shape="square" :src="item.avatar"/>
                          <a slot="title">
                            <span style="display:block;"> {{ item.title ? (item.title) : ''}} </span>
                            <span style="display:block;margin-top:5px;">{{ item.content ? (item.content.slice(0,30) + '...') : '' }} </span>
                          </a>
                        </a-list-item-meta>
                     <div slot="actions">
                          <a @click="querylegalview(item.id , panename , item.typename , item.bpm_status , item.apply_realname || item.proponents , item.pid)">查看</a>
                        </div>
                        <div class="list-content">
                          <div v-show="item.reward_period" class="list-content-item">
                            <span>申请奖金</span>
                            <p>{{ item.amount }}</p>
                          </div>
                          <div v-show="item.reward_period" class="list-content-item">
                            <span>所属周期</span>
                            <p>{{ item.reward_period }}</p>
                          </div>
                          <div class="list-content-item">
                            <span>开始时间</span>
                            <p>{{ item.startAt }}</p>
                          </div>
                          <div v-show="item.apply_realname || item.proponents" class="list-content-item">
                            <span>流程发起</span>
                            <p>{{ item.apply_realname || item.proponents }}</p>
                          </div>
                          <div v-show="item.action" class="list-content-item">
                            <span>审批操作</span>
                            <p>{{ item.action }}</p>
                          </div>
                          <div v-show="bpm_status[item.bpm_status]" class="list-content-item">
                            <span>流程发起</span>
                            <p>{{ bpm_status[item.bpm_status] }}</p>
                          </div>
                          <div class="list-content-item" style="display:none;">
                            <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
                          </div>
                        </div>
                      </a-list-item>
                    </div>
                  </a-card>
                </template>
              </a-col>
            </div>

          </a-col>
        </keep-alive>
        <keep-alive>


        </keep-alive>
      </a-row>
    </div>
  </div>
</template>
<script>
import * as workconfig from "@/request/workconfig";
import * as task from '@/request/task';
import * as manageAPI from '@/request/manage';
import * as query from '@/request/query';
import * as contact from '@/vuex/contacts';

export default {
  mixins: [window.mixin],
  data() {
    return {
      activeTabKey: 0,
      pageName: "诉讼案件消息",
      momentNewMsg: true,
      paneflowcard: "",
      paneflowcardGrid: "",
      searchwords: "",
      tabname: 1,
      tablename:'bs_reward_apply',
      panename:'myrewardlist',
      constpaneflows: workconfig.getPaneflows(this),
      paneflows: workconfig.getPaneflows(this),
      allList:[],
      initList:[],
      confirmList:[],
      doneList:[],
      rejectList:[],
      status: 'all',
      statusMap: {0:'all',1:'init',2:'processing',3:'complete',4:'reject'},
      year:'all',
      bpm_status:{1:'待提交',2:'审核中',3:'审批中',4:'已完成',5:'已完成',6:'已确认',10:'已作废' , 100:'已驳回',}, //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废
      business_code: '000000000',
      typename:'',
      userinfo:'',
      usertitle:'',
    };
  },
  activated() {
    this.init();
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.panename = Betools.tools.getUrlParam('panename') || Betools.storage.getStore(`reward_message_panename`) || 'myrewardlist';
      this.userinfo = await this.weworkLogin(); //查询当前登录用户
      this.tabname = Betools.storage.getStore(`reward_message_tabname`) || 0 ;
      this.status = this.statusMap[this.tabname];
      this.constpaneflows = JSON.parse(JSON.stringify(this.paneflows));
      if(this.panename == 'myrewardlist' ){
        this.typename = 'hr_admin_ids';
        this.queryRewardListByType(this.tabname , this.typename , this.panename);
      } else if(this.panename == 'mytodolist'){ //我的待办
        this.typename = 'wflow_todo';
        this.queryRewardTodoListByType(this.tabname, this.typename , this.panename);
      } else if(this.panename == 'mydonelist'){ //我的已办
        this.typename = 'wflow_done';
        this.queryRewardDoneListByType(this.tabname , this.typename , this.panename);
      } else if(this.panename == 'myapplylist'){ //我的申请
        this.typename = 'create_by';
        this.queryRewardListByType(this.tabname , this.typename , this.panename);
      }
      this.paneflows.map((item) => {item.css = item.ename == this.panename ? "background:#f9f9f9;" : '';});
      Betools.storage.setStore(`reward_message_typename` , this.typename , 3600 );
      Betools.storage.setStore(`reward_message_panename` , this.panename , 3600 );
      const userinfo = this.userinfo = await Betools.storage.getStore('system_userinfo');
      this.usertitle = (userinfo && userinfo.parent_company && userinfo.parent_company.name ? userinfo.parent_company.name + ' > ' :'')  + (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
    },
    // 执行页面跳转
    async redirectView(path) {
        Betools.tools.isNull(path) ? null: this.$router.push(path);
    },
    async queryDataByType(tabname = '', typename = '' , panename){
      this.tabname = tabname;
      if(this.panename == 'myrewardlist' ){
        this.typename = 'hr_admin_ids';
        this.queryRewardListByType(this.tabname , typename , panename);
      } else if(this.panename == 'mytodolist'){ //我的待办
        this.typename = 'wflow_todo';
        this.queryRewardTodoListByType(this.tabname, typename , panename);
      } else if(this.panename == 'mydonelist'){ //我的已办
        this.typename = 'wflow_done';
        this.queryRewardDoneListByType(this.tabname , typename , panename);
      } else if(this.panename == 'myapplylist'){ //我的申请
        this.typename = 'create_by';
        this.queryRewardListByType(this.tabname , typename , panename);
      }
    },
    async searchWordChange() {
      this.paneflows.map((item, index) => {
        if (
          item.name.includes(this.searchwords) ||
          item.description.includes(this.searchwords)
        ) {
          item.show = true;
        } else {
          item.show = false;
        }
      });
      this.paneflows.sort();
    },
    async menuCardClick(id , panename) {
      // 设置panename属性
      this.panename = panename;
      this.status = 'all';
      this.tabname = 0;
      // 遍历paneflows
      this.paneflows.map((item) => {
        item.css =  item.id === id || item.ename == panename ? "background:#f9f9f9;" : '';
        item.dataSource = item.id === id || item.ename == panename ? item.dataSource : [];
        if(panename == 'myrewardlist'){
          this.typename = 'hr_admin_ids';
          this.queryRewardListByType(0 , 'hr_admin_ids' , panename);
        } else if(panename == 'mytodolist'){ //我的待办
          this.typename = 'wflow_todo';
          this.queryRewardTodoListByType(0 , 'wflow_todo' , panename);
        } else if(panename == 'mydonelist'){ //我的已办
          this.typename = 'wflow_done';
          this.queryRewardDoneListByType(0 , 'wflow_done' , panename);
        } else if(panename == 'myapplylist'){ //我的诉讼案件申请
          this.typename = 'create_by';
          this.queryRewardListByType(0 , 'create_by' , panename);
        }
      });
      Betools.storage.setStore(`reward_message_typename` , this.typename , 3600 );
      Betools.storage.setStore(`reward_message_panename` , this.panename , 3600 );
      Betools.storage.setStore(`reward_message_tabname` , this.tabname , 3600 );
    },
    async queryRewardList(tabname = '', typename = ''){

        const userinfo = await Betools.storage.getStore('system_userinfo');  //获取当前用户信息

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');

        //设置查询语句
        var searchSql = '';

        const titlePrefix = typename == 'hr_admin_ids' ? '知会人力' : '申请历史';

        //如果存在搜索关键字
        if(this.searchWord) {
          searchSql = `~and((name,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(receive_name,like,~${this.searchWord}~)~or(type,like,~${this.searchWord}~)~or(company,like,~${this.searchWord}~)~or(approve_name,like,~${this.searchWord}~))`;
        }

        if(tabname == 0){
          //获取最近6个月的待用印记录
          this.allList = await manageAPI.queryTableData(this.tablename , `_where=(bpm_status,in,1,2,3,4,5,10,100,0)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.allList.map((item , index) => {
            item.name = `#${item.serialid} ` + ` ${titlePrefix} ` + item.reward_type + '申请: ' + item.title ;
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '待审批';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.allList;

        } else if(tabname == 1){
          //获取最近6个月的待用印记录
          this.initList = await manageAPI.queryTableData(this.tablename , `_where=(bpm_status,in,1)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.initList.map((item , index) => {
            item.name = `#${item.serialid} ` + ` ${titlePrefix} ` + item.reward_type + '申请: ' + item.title ;
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '待审批';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.initList;

        } else if(tabname == 2){
          //获取最近6个月的已用印记录
          this.confirmList = await manageAPI.queryTableData(this.tablename , `_where=(bpm_status,in,2,3)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.confirmList.map((item , index) => {
            item.name = `#${item.serialid} ` + ` ${titlePrefix} ` + item.reward_type + '诉讼案件申请: ' + item.title ,
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '审批中';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.confirmList;

        } else if(tabname == 3) {
          //获取最近6个月的已领取记录
          this.doneList = await manageAPI.queryTableData(this.tablename , `_where=(bpm_status,in,4,5,6)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.doneList.map((item , index) => {
            item.name = `#${item.serialid} `  + ` ${titlePrefix} ` +  item.reward_type + '诉讼案件申请: ' + item.title ,
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '已完成';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.doneList;

         } else if(tabname == 4) {
          //获取最近6个月的已领取记录
          this.rejectList = await manageAPI.queryTableData(this.tablename , `_where=(bpm_status,in,10,100)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.rejectList.map((item , index) => {
            item.name = `#${item.serialid} ` + ` ${titlePrefix} ` + item.reward_type + '诉讼案件申请: ' + item.title ,
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '已驳回';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.rejectList;

        }
    },
    async queryRewardTodoList(tabname = '', typename = ''){

      try {
        let logList = await query.queryProcessLogByUserName(this.tablename , this.userinfo.username);

        logList.map((item , index) => {
          item.pid = item.id;
          item.id = item.business_data_id;
          item.name = `发起：${item.content} `;
          item.title = item.name;
          item.avatar = '',
          item.description = '';
          item.owner = item.create_by;
          item.tel = '';
          item.all = '';
          item.typename = typename;
          item.progress = { value: 90 };
          item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
        })

        //如果tabname == 0 ，则展示所有数据 ，如果为 1 展示审批数据 ， 如果为 2 展示知会数据
        if(tabname == 1){
          logList = logList.filter(item => {  return item.action == '待审批';  });
        } else if(tabname == 2){
          logList = logList.filter(item => {  return item.action == '知会';  });
        }

        return logList;
      } catch (error) {
        console.log(error);
      }

    },
    async queryRewardTodoListByType(tabname = '', typename = '' , panename){
      const tlist =  await this.queryRewardTodoList(tabname , typename , panename);
      this.paneflows.map( item => { //遍历paneflows
        if( panename == item.ename){
          item.dataSource = tlist;
          item.ename = panename;
        }
      })
    },
    async queryRewardDoneList(tabname = '', typename = ''){

      try {
        let logList = await query.queryProcessLogHistoryByUserName(this.tablename , this.userinfo.username);

        logList.map((item , index) => {
          item.pid = item.id;
          item.id = item.business_data_id;
          item.name = `发起：${item.content} `;
          item.title = item.name;
          item.avatar = '',
          item.description = '';
          item.owner = item.create_by;
          item.tel = '';
          item.all = '';
          item.typename = typename;
          item.progress = { value: 90 };
          item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
        })

        //如果tabname == 0 ，则展示所有数据 ，如果为 1 展示发起数据 ， 如果为 2 展示审批数据 ， 如果为 3 展示驳回数据 ，如果为 4 展示知会数据
        if(tabname == 1){
          logList = logList.filter(item => {  return item.action == '发起';  });
        } else if(tabname == 2){
          logList = logList.filter(item => {  return item.action == '同意';  });
        } else if(tabname == 3){
          logList = logList.filter(item => {  return item.action == '驳回';  });
        } else if(tabname == 4){
          logList = logList.filter(item => {  return item.action == '知会' || item.action == '人力确认';  });
        }

        return logList;
      } catch (error) {
        console.log(error);
      }

    },
    async queryRewardDoneListByType(tabname = '', typename = '' , panename){
      const tlist =  await this.queryRewardDoneList(tabname , typename , panename);
      this.paneflows.map( item => { //遍历paneflows
        if( panename == item.ename){
          item.dataSource = tlist;
          item.ename = panename;
        }
      })
    },
    async queryRewardListByType(tabname = 1 , typename = '' , panename){
      this.tabname = tabname;
      const tlist =  await this.queryRewardList(tabname , typename , panename);
      this.paneflows.map( item => { //遍历paneflows
        if( panename == item.ename){
          item.dataSource = tlist;
          item.ename = panename;
        }
      });
      Betools.storage.setStore(`reward_message_tabname` , this.tabname , 3600 );
    },
    // 跳转到详情页面
    async querylegalview(id = '', panename = '', typename = '', bpm_status = 1 , proponents = '' , pid){
      try {
        this.$router.push(`/legal/case/legalview?id=${id}&pid=${pid}&tname=bs_reward_apply&panename=${panename}&typename=${typename}&bpm_status=${bpm_status}&proponents=${proponents}`);
      } catch (error) {
        console.log(error);
      }
    },
    // 企业微信登录处理函数
    async weworkLogin(){
      try {
        return await query.queryWeworkUser();
      } catch (error) {
        console.log(error);
      }
    },
},
};
</script>
<style scoped >
@import "../../assets/css/reward.home.css";
@import "../../assets/css/reward.message.css";
</style>
