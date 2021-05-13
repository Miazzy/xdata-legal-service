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

              <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 2.5rem; margin-right: 2.5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  律师录入申请
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属律所</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.firmID" :readonly="false" placeholder="请输入所属律所名称！" @blur="validFieldToast('firmID')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>执业年限</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.years" :readonly="false" placeholder="请填写此律师的执业年限！" @blur="validFieldToast('years')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>大学名称</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.college" :default-value="options.college" placeholder="请输入此律师大学名称！" @blur="validFieldToast('college')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>学位学历</span>
                    </a-col>
                    <a-col :span="8">
                      <a-radio-group  v-model="legal.degree" placeholder="请输入此律师学位学历！" @blur="validFieldToast('degree')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 0px solid #f0f0f0;">
                        <a-radio-button value="专科">
                          专科
                        </a-radio-button>
                        <a-radio-button value="本科">
                          本科
                        </a-radio-button>
                        <a-radio-button value="硕士">
                          硕士
                        </a-radio-button>
                        <a-radio-button value="博士">
                          博士
                        </a-radio-button>
                      </a-radio-group>
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>开始执业时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.start_time" :default-value="options.start_time" placeholder="请输入此律师开始执业时间！" @blur="validFieldToast('start_time')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>联系电话</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.mobile" placeholder="请输入此律师联系电话！" @blur="validFieldToast('mobile')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师简介</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="legal.brief"
                        placeholder="请输入此律师简介(工作、经验、能力、学历等)！"
                        :auto-size="{ minRows: 10, maxRows: 100 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      出库情况
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>是否出库</span>
                    </a-col>
                    <a-col :span="8">
                      <a-radio-group  v-model="legal.out_flag" placeholder="请选择此律所是否出库！" @blur="validFieldToast('out_flag')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 0px solid #f0f0f0;">
                        <a-radio-button value="已入库">
                          已入库
                        </a-radio-button>
                        <a-radio-button value="未出库">
                          未出库
                        </a-radio-button>
                        <a-radio-button value="已出库">
                          已出库
                        </a-radio-button>
                      </a-radio-group>
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>出库时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.out_time" :default-value="options.out_time" placeholder="请输入此律师出库时间！" @blur="validFieldToast('out_time')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>出库原因</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="legal.out_reason"
                        placeholder="请输入此律师出库原因！"
                        :auto-size="{ minRows: 10, maxRows: 100 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
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
      options:{
        create_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        in_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        establish_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        start_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        coop_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        out_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
      },
      legal:{
        id: '', // varchar(36)  default ''  not null
        title: 'XX律师申请流程',
        create_time: dayjs().format('YYYY-MM-DD'),
        firmID: '', // varchar(36)  default ''  not null comment '所属律所ID',
        college: 'XX大学', // varchar(32)  default ''  not null comment '大学名称',
        degree: '本科', // varchar(32)  default ''  not null comment '学位',
        brief: '无', // varchar(256) default ''  not null,
        years: 'N年', // varchar(16)  default ''  not null comment '执业年限',
        start_time: '', // varchar(32)  default ''  not null comment '开始执业时间',
        mobile: '18XXXXXXXXX', // varchar(16)  default ''  not null,
        xid: '', // varchar(36)  default ''  not null,
        out_time: '', // varchar(32)  default ''  not null,
        out_flag: '未出库', // varchar(1)   default 'N' not null,
        out_reason: '无', // varchar(256) default ''  not null
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
     
      // 获取URL或者二维码信息
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

      validField(fieldName){
        const userinfo = Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const regMail = workconfig.system.config.regexp.mail; // 邮箱验证正则表达式
        this.message[fieldName] = Betools.tools.isNull(this.legal[fieldName]) ? this.valid[fieldName] : '';
        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.legal[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }
        Betools.storage.setStore(`system_${this.tablename}_item#${this.legal.type}#@${userinfo.realname}` , JSON.stringify(this.legal) , 3600 * 2 );
        return Betools.tools.isNull(this.message[fieldName]);
      },

      validFieldToast(fieldName){
        const flag = !this.validField(fieldName);
        if(flag){
          this.$toast.fail(`${this.message[fieldName]}！` );
          return false;
        }
      },
      
      // 用户提交入职登记表函数
      async handleApply() {
        await this.handleSave(); //先执行保存操作，保存完毕后执行流程跳转功能
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
            content: "是否确认保存此律师录入申请单?",
            onOk: async() => {
                  const { legal } = this;
                  legal.id = id;
                  const result = await Betools.manage.postTableData(this.tablename , this.legal); // 向表单提交form对象数据
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }
                  this.$toast.success('律师录入申请成功！');
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `律师录入申请成功！`, });
               }
          });
      },

  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";
</style>
