<template>
  
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
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">

            <!-- 案件申请 -->
            <div style="background-color:#f0f0f0;">

              <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 5rem; margin-right: 5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  律所录入申请
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      基础信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>流程标题</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.title" :readonly='false' placeholder="请填写申请流程标题！" @blur="validFieldToast('title')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>填报日期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.create_time" readonly placeholder="请填写填报日期！" @blur="validFieldToast('create_time')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>填报人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.create_by" readonly placeholder="请输入填报人员！" @blur="validFieldToast('create_by')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律所名称</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.firm_name" :readonly="false" placeholder="请输入律所名称！" @blur="validFieldToast('firm_name')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>入库区域</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.in_zone" :readonly="false" placeholder="请填写入库区域！" @blur="validFieldToast('in_zone')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>业务标签</span>
                    </a-col>
                    <a-col :span="8">
                      <a-select mode="multiple" v-model="legal.legalType" default-value="一般案件" @blur="validFieldToast('legalType')"  placeholder="请选择业务标签！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                        <a-select-option value="常年法律顾问">
                          常年法律顾问
                        </a-select-option>
                        <a-select-option value="一般案件">
                          一般案件
                        </a-select-option>
                        <a-select-option value="重大案件">
                          重大案件
                        </a-select-option>
                        <a-select-option value="尽调专项">
                          尽调专项
                        </a-select-option>
                        <a-select-option value="发函专项">
                          发函专项
                        </a-select-option>
                        <a-select-option value="刑事">
                          刑事
                        </a-select-option>
                      </a-select>
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>业务板块</span>
                    </a-col>
                    <a-col :span="8">
                      <a-select  v-model="legal.plate" default-value="地产板块" @blur="validFieldToast('plate')"  placeholder="请选择业务板块！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                        <a-select-option value="融量集团总部">
                          融量集团总部
                        </a-select-option>
                        <a-select-option value="地产板块">
                          地产板块
                        </a-select-option>
                        <a-select-option value="金融板块">
                          金融板块
                        </a-select-option>
                        <a-select-option value="物业板块">
                          物业板块
                        </a-select-option>
                        <a-select-option value="医疗健康板块">
                          医疗健康板块
                        </a-select-option>
                        <a-select-option value="商业板块">
                          商业板块
                        </a-select-option>
                        <a-select-option value="合作方财务公司">
                          合作方财务公司
                        </a-select-option>
                      </a-select>
                    </a-col>
                  </a-row>
                </div>

                

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      流程设置
                    </a-col>
                   </a-row>
                </div>

                <div id="van-user-list" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row style="position:relative;">
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>审批人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="approve_username" placeholder="请输入申请流程的审批人员！" @blur="queryApproveMan();" @click="queryApproveMan();" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width:320px;" />
                      <div style="position:absolute; right: 5px; top: -2px;">
                        <van-button name="file" @click="rewardApproveAdd();"  >添加</van-button>
                      </div>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="3" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                    </a-col>
                    <a-col :span="9">
                      <div style="margin-left: 10px;">
                        <van-address-list v-show="approve_userlist.length > 0" v-model="approve_userid" :list="approve_userlist" default-tag-text="默认" edit-disabled @select="selectApproveUser();" />
                      </div>
                    </a-col>
                  </a-row>
                </div>

                <div v-show="role != 'view' " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleSave();"  >
                        保存
                      </a-button>
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleApply();"  >
                        提交
                      </a-button>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                   </a-row>
                </div>

                <div style="height:100px;">
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
import * as task from '@/request/task';
import * as query from '@/request/query';
import * as workflow from '@/request/workflow';
import * as workconfig from '@/request/workconfig';
try {
  Vue.component("downloadExcel", JsonExcel);
  Vue.component("excelImport", PikazJsExcel.ExcelImport);
} catch (error) {
  console.log(error);
}

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
      options:{
        datetime:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
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
        establish_time:'', // varchar(32)  default ''  not null comment '成立时间',
        address:'', // varchar(64)  default ''  not null comment '地址',
        phone:'', // varchar(16)  default ''  not null comment '电话',
        scale:'', // varchar(16)  default ''  not null comment '律所规模（人数）',
        brief:'', // varchar(256) default ''  not null comment '律所简要介绍',
        count:'', // varchar(16)  default ''  not null comment '服务团队人数',
        team_brief:'', // varchar(256) default ''  not null comment '团队介绍',
        fee:'', // varchar(64)  default ''  not null comment '费用',
        major_fee:'', // varchar(64)  default ''  not null comment '重大诉讼费用',
        common_fee: '', // varchar(64)  default ''  not null comment '一般诉讼费用',
        diligence_fee:'', // varchar(64)  default ''  not null comment '尽调专项费用',
        notice_fee: '', // varchar(64)  default ''  not null comment '发函专项费用',
        penal_fee: '', // varchar(64)  default ''  not null comment '刑事专项费用',
        coop_flag:'', // varchar(1)   default 'Y' not null comment '是否已合作',
        start_time:'', // varchar(32)  default ''  not null comment '开始合作时间',
        coop_time:'', // varchar(32)  default ''  not null comment '最近合作期间',
        out_flag:'', // varchar(32)  default 'N' not null comment '是否出库',
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
      fields: {
              '分配性质':'type',
              '发放期间': 'period',
              '员工姓名':'username',
              '员工OA':'account',
              '所属单位':'company',
              '所属部门':'department',
              '所属区域':'zone',
              '所属项目':'project',
              '员工职务':'position',
              '分配金额':'amount',
            },
      datas:[{
              'type':'当期分配',
              'period': '‘2020年01月’',
              'username':'员工姓名XXX',
              'account':'account',
              'company':'领地集团总部',
              'department':'XX部',
              'zone':'XX区域',
              'project':'XXX项目',
              'position':'XXX专员',
              'amount':'10000.00',
            },],
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
      async onDelete(){
        console.log('delete');
      },
      // 执行页面跳转
      async redirectView(path) {
          this.$router.push(path);
      },
     
      // 获取URL或者二维码信息
      async queryInfo() {

        try {

          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          this.userinfo = await this.weworkLogin(); //查询当前登录用户
          this.back = Betools.tools.getUrlParam('back') || '/legal/workspace'; //查询上一页
          this.legal.legalTname = (Betools.tools.getUrlParam('type') || '0') == '0' ? '起诉' : '应诉';  //查询type
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          this.legal.apply_realname = userinfo.realname;
          this.legal.apply_username = userinfo.username;

          //获取缓存信息
          const item = Betools.storage.getStore(`system_${this.tablename}_item#${this.legal.type}#@${userinfo.realname}`);

          try {
            //自动回显刚才填写的用户基础信息
            if(item){
              this.legal.create_by = legal.create_by || this.legal.create_by;
              this.legal.remark = legal.remark || this.legal.remark;
              this.legal.status = legal.status || this.legal.status;
            }
            if(userinfo.department && userinfo.department.name){
              this.legal.department = userinfo.department.name;
              this.legal.company = userinfo.parent_company.name;
            } else if(userinfo.systemuserinfo && userinfo.systemuserinfo.textfield1){
              let temp = userinfo.systemuserinfo.textfield1.split('||')[0];
              this.legal.company = temp.split('>')[temp.split('>').length - 1];
              temp = userinfo.systemuserinfo.textfield1.split('||')[1];
              this.legal.department = temp.split('>')[temp.split('>').length - 1];
            }

            //查询当前应诉案件、起诉案件状态

          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      },
      // 计算案件涉案金额
      caculateSum(){
       
      },
      // 用户提交入职登记表函数
      async handleApply() {
        await this.handleSave(); //先执行保存操作，保存完毕后执行流程跳转功能
      },

      // 提交自由流程
      async handleSubmitWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime) {

        try {
          //校验提交信息是否准确
          var checkFlag = workflow.checkSubmitInfo( wfUsers,  nfUsers, approver, );
          let vflag = await Betools.manage.queryApprovalExist(curTableName, curItemID); //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
          let vflag_ = Betools.storage.getStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`);

          //如果校验标识有误，则直接返回
          if ( Betools.tools.isNull(approver) || !checkFlag || vflag || vflag_ == "true") {
              return !checkFlag ? null : vant.Toast.fail("已提交过申请，无法再次提交审批！"); //数据库中已经存在此记录，提示用户无法提交审批
          }

          try {
            await this.handleStartWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime);
          } catch (error) {
            console.log(error);
          }

        } catch (error) {
          console.log(error);
        }

      },

      // 启动自由流程
      async handleStartWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime){

        try {
          //自由流程节点
           var node = {
               id: Betools.tools.queryUniqueID(),
               create_by: userinfo["username"],
               create_time: ctime,
               table_name: curTableName,
               main_key: curItemID,
               audit_node: Betools.tools.deNull(wfUsers),
               approve_node: Betools.tools.deNull(approver),
               notify_node: Betools.tools.deNull(nfUsers)
           };

           const freeWFNode = JSON.parse(JSON.stringify(node));

           //提交发起人审批相关处理信息
           node = {
               id: Betools.tools.queryUniqueID(), //获取随机数
               table_name: curTableName, //业务表名
               main_value: curItemID, //表主键值
               business_data_id: curItemID, //业务具体数据主键值
               business_code: "000000000", //业务编号
               process_name: "自由流程审批", //流程名称
               employee: userinfo["username"],
               process_station: "自由流程审批",
               process_audit: "000000000",
               proponents: userinfo["username"],
               approve_user: userinfo["username"],
               action: "发起",
               action_opinion: "发起自由流程",
               content: data["content"],
               operate_time: ctime,
               create_time: ctime,
               business_data: JSON.stringify(freeWFNode)
           };

           //发起节点，审批信息，写入审批历史表中
           const startFreeNode = JSON.parse(JSON.stringify(node));

           //获取审核节点中，第一个待审批用户，如果没有选择审核用户，则直接选择审批用户
           var firstWflowUser = Betools.tools.deNull(wfUsers) == "" ?  Betools.tools.deNull(approver) : Betools.tools.deNull(wfUsers).split(",")[0];

           //提交审批相关处理信息
           node = {
               id: Betools.tools.queryUniqueID(), //获取随机数
               table_name: curTableName, //业务表名
               main_value: curItemID, //表主键值
               business_data_id: curItemID, //业务具体数据主键值
               business_code: "000000000", //业务编号
               process_name: "自由流程审批", //流程名称
               employee: firstWflowUser,
               process_station: "自由流程审批",
               process_audit: "000000000",
               proponents: userinfo["username"],
               content: data["content"],
               operate_time: ctime,
               create_time: ctime,
               business_data: JSON.stringify(node)
           };

           //保存审批相关处理信息
           const nextWflowNode = JSON.parse(JSON.stringify(node));

           //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
           if (await Betools.manage.queryApprovalExist(curTableName,  curItemID)) {
             return vant.Toast.fail("已提交过申请，无法再次提交审批！");
           }

           //处理自由流程发起提交审批操作
           await workflow.postWorkflowFree(userinfo, curTableName, data, freeWFNode, startFreeNode, nextWflowNode, "2");
           //弹出审批完成提示框
           vant.Toast.success("提交自由流程审批成功！");
           //记录当前流程已经提交，短时间内无法再次提交
           Betools.storage.setStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`,  "true", 60 );


           // 此处推送消息至第一个审批处
           try {
              const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/legalview?id=${curItemID}&pid=${node.id}&tname=bs_reward_apply&panename=mytodolist&typename=wflow_todo&bpm_status=2&proponents=${firstWflowUser}`);
              await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${firstWflowUser}/亲爱的同事，${userinfo['name']||userinfo['realname']}(${userinfo["username"]})提交了案件发起申请：${data["title"]}，内容：${data['content']}，请您及时进行审批处理！?type=reward&rurl=${receiveURL}`)
                          .set('accept', 'json');
           } catch (error) {
             console.log(error);
           }

           //操作完毕，返回结果
           return true;
        } catch (error) {
            console.log(error);
        }
      },

      // 处理流程日志
      async handleStartWFLog(tablename , elem , userinfo){

        try {
          const prLogHisNode = {
              id: Betools.tools.queryUniqueID(),
              table_name: tablename,
              main_value: elem.id,
              proponents: userinfo.username,
              business_data_id : elem.id ,//varchar(100)  null comment '业务数据主键值',
              business_code  : '000000100' ,//varchar(100)  null comment '业务编号',
              process_name   : '案件发起申请审批',//varchar(100)  null comment '流程名称',
              employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
              approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
              action         : '保存'    ,//varchar(100)  null comment '操作动作',
              action_opinion : '保存案件申请',//text          null comment '操作意见',
              operate_time   : dayjs().subtract(100,'second').format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
              functions_station : userinfo.position, //varchar(100)  null comment '职能岗位',
              process_station   : '案件申请', //varchar(100) null comment '流程岗位',
              business_data     : JSON.stringify(elem), //text null comment '业务数据',
              content           : `${elem.content}`,//text          null comment '业务内容',
              process_audit     : elem.id, //varchar(100)  null comment '流程编码',
              create_time       : dayjs().subtract(100,'second').format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
              relate_data       : JSON.stringify(userinfo), //text null comment '关联数据',
              origin_data       : JSON.stringify(elem),
            }
            await workflow.approveViewProcessLog(prLogHisNode);
        } catch (error) {
            console.log(error);
        }

      },

      // 执行知会操作
      async handleNotifyHR(user_group_ids , userinfo ,  value , receiveURL){
        try {
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${user_group_ids}/亲爱的同事，员工‘${userinfo.realname}(${userinfo.department.name})’提交了案件发起申请，请在流程审批完成后及时进行知会确认操作！?type=reward&rurl=${receiveURL}`)
                          .set('accept', 'json');
        } catch (error) {
          console.log(error);
        }
      },

      // 保存用户数据但是不提交
      async handleSave(){
        
        this.loading = true; // 显示加载状态
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const id = Betools.tools.queryUniqueID(); // 表单ID

        // 验证数据是否已经填写
        const keys = Object.keys({ title: '' })

        const invalidKey =  keys.find(key => {
          const flag = this.validField(key);
          return !flag;
        });

        if(invalidKey != '' && invalidKey != null){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：请输入[${invalidKey}]信息！`,
          });
          return false;
        }

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认保存此案件发起申请单?",
            onOk: async() => {

                  const { legal } = this;

                  legal.id = id;

                  legal.zone = JSON.stringify(legal.zone); //进行序列化
                  legal.caseType = JSON.stringify(legal.caseType); //进行序列化

                  const result = await Betools.manage.postTableData(this.tablename , this.legal); // 向表单提交form对象数据
                  
                  legal.zone = JSON.parse(legal.zone); //进行序列化
                  legal.caseType = JSON.parse(legal.caseType); //进行序列化

                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }

                  this.$toast.success('案件发起申请成功！');
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `案件发起申请成功！`, });
               }
          });

      },

      // 审批人员添加函数
      async rewardApproveAdd(){
        if(!this.approve_userid){
          return this.$toast.success('请选择审批人员处下拉列表中的待选审批人员！');
        }
        const index = this.approve_executelist.findIndex( item => {
          return item.userid == this.approve_userid;
        })
        if(index >= 0){
          return this.$toast.success('该审批人员已经添加，请重新输入！');
        }
        try {
          const mobile = this.approve_mobile ? `${this.approve_mobile.slice(0,3)}****${this.approve_mobile.slice(-4)}` : '';
          const user = {key: this.approve_executelist.length + 1 , id:Betools.tools.queryUniqueID(),username:this.approve_username , userid: this.approve_userid , mobile , company: this.approve_company , department : this.approve_department , position : this.approve_position};
          this.approve_executelist.push(JSON.parse(JSON.stringify(user)));
          this.approve_userid = '';
          this.approve_username = '';
          this.approve_mobile = '';
          this.approve_position = '';
          this.approve_userlist = [];
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
