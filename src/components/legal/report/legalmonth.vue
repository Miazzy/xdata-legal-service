<template>
  <div id="reward-home">
      <div style="background-color:#f0f0f0;">
      <a-row :gutter="24">
        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">

            <div style="background-color:#f0f0f0;">

              <div class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 5rem; margin-right: 5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  诉讼案件月度报表
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      基础信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>报表月份</span>
                    </a-col>
                    <a-col :span="8">
                       <a-input :readonly="false" v-model="period" placeholder="请输入报表月份！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                       <div style="position:absolute; right: 5px; top: -2px;">
                        <van-button name="file" @click="querylegalmonthInfo();"  >查询</van-button>
                       </div>
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      明细数据
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                  <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                    <vue-excel-editor v-model="idata" ref="grid" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row autocomplete @delete="onDelete" @update="onUpdate" >
                        <vue-excel-column field="type"        label="分配性质"   width="80px" />
                        <vue-excel-column field="period"      label="发放期间"   width="80px" />
                        <vue-excel-column field="username"    label="员工姓名"   width="80px" />
                        <vue-excel-column field="account"     label="员工OA"    width="80px" />
                        <vue-excel-column field="company"     label="所属单位"   width="100px" />
                        <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                        <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                        <vue-excel-column field="department"  label="所属部门"   width="100px" />
                        <vue-excel-column field="position"    label="员工职务"   width="100px" />
                        <vue-excel-column field="amount"      label="分配金额"   width="100px" />
                        <vue-excel-column field="message"     label="抄送"      width="80px" />
                        <vue-excel-column field="v_status"    label="状态"      width="60px" />
                    </vue-excel-editor>
                   </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      汇总数据
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                  <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                    <vue-excel-editor v-model="data" ref="grid" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row autocomplete @delete="onDelete" @update="onUpdate" >
                        <vue-excel-column field="type"        label="分配性质"   width="80px" />
                        <vue-excel-column field="period"      label="发放期间"   width="80px" />
                        <vue-excel-column field="username"    label="员工姓名"   width="80px" />
                        <vue-excel-column field="account"     label="员工OA"    width="80px" />
                        <vue-excel-column field="company"     label="所属单位"   width="100px" />
                        <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                        <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                        <vue-excel-column field="department"  label="所属部门"   width="100px" />
                        <vue-excel-column field="position"    label="员工职务"   width="100px" />
                        <vue-excel-column field="amount"      label="分配金额"   width="100px" />
                        <vue-excel-column field="message"     label="抄送"      width="80px" />
                        <vue-excel-column field="v_status"    label="状态"      width="60px" />
                    </vue-excel-editor>
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

import * as query from '@/request/query';
import * as workconfig from '@/request/workconfig';

export default {
  mixins: [window.mixin],
  data() {
    return {
      pageName: "诉讼案件月度报表",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      tablename:'bs_reward_items',
      size: 0,
      loading:false,
      item:{
              title: '',
              company: '',
              department: '',
              content: '',
              amount: '',
              wflowid: '',
              bpm_status: '',
              reward_type: '',
              reward_name: '',
              reward_period: dayjs().format('YYYY年MM月'),
              reward_release_period: dayjs().format('YYYY年MM月'),
              reward_release_feature: '当期分配',
              hr_admin_ids: '',
              hr_admin_names: '',
              hr_id: '',
              hr_name: '',
              user_admin_name:'',
              apply_username: '',
              apply_realname: '',
              files: '',
              status: '',
              month:dayjs().format('YYYY年MM月'),
            },
      period:dayjs().format('YYYY年MM月'),
      columns: workconfig.columns.reward.items,
      wfcolumns: workconfig.columns.reward.wfcolumns,
      idata:[], //明细数据
      data: [], //汇总数据
      userList:[],
      approve_userid:'',
      approve_username:'',
      approve_mobile:'',
      approve_department:'',
      approve_company:'',
      approve_position:'',
      approve_userlist:[],
      approve_notify_userid:'',
      approve_notify_username:'',
      approve_notify_mobile:'',
      approve_notify_department:'',
      approve_notify_company:'',
      approve_notify_position:'',
      approve_notify_userlist:[],
      approve_executelist:[],
      approve_notifylist:[],
      role:'',
      tablename:'bs_reward_apply',
      readonly: false,
      uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
      downloadURL:'https://upload.yunwisdom.club:30443/',
      message: workconfig.compValidation.legalapply.message,
      valid: workconfig.compValidation.legalapply.valid,
      goodsborrowtype: workconfig.goodsborrowtype,
      diplomaType: workconfig.compcolumns.diplomaTypeColumns,
      acceptType: workconfig.compcolumns.acceptType,
      commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
      sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
      panename:'',
      typename:'',
      approve_content:'',
      processLogList:[],
      workflowLogList:[],
      bpm_status:'',
      proponents:'',
      statusType:{'valid':'有效','invalid':'删除'},
      zoneType:{'领地集团总部':'领地集团总部','重庆区域':'重庆区域','两湖区域':'两湖区域','川北区域':'川北区域','成都区域':'成都区域','乐眉区域':'乐眉区域','中原区域':'中原区域','攀西区域':'攀西区域','新疆区域':'新疆区域','大湾区域':'大湾区域','北京区域':'北京区域'},
    };
  },
  activated() {
    this.queryInfo();
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
      async onDelete(){

      },
      async onUpdate(){

      },
      //上传提示
      async toastUpload(flag){
        if(flag == 'start'){
          vant.Toast.loading({duration: 0, forbidClick: true, message: '上传中...',});
        } else if(flag == 'fail'){
          this.$toast.success('文件上传失败，请稍后重试！');
        }
      },
      async saveAsFile(file , name){
        try {
          window.open(file , '_blank');
        } catch (error) {
          console.log(error);
        }
        try {
          window.saveAs(file , name);
        } catch (error) {
          console.log(error);
        }
      },
      async download(file){
        const toast = vant.Toast.loading({duration: 0, forbidClick: true, message: '下载中...',});
        await this.saveAsFile(this.downloadURL + file, '相关附件_' + file.split('/')[1]);
        vant.Toast.clear();
      },
      // 企业微信登录处理函数
      async weworkLogin(){
        try {
          return await query.queryWeworkUser();
        } catch (error) {
          console.log(error);
        }
      },
      // 查询基础信息
      async queryInfo() {

        this.userinfo = await this.weworkLogin(); //查询当前登录用户

      },

      // 获取诉讼案件月度报表数据
      async querylegalmonthInfo(){
        if(!this.period){
          return this.$toast.fail('请输入报表月份！');
        }
        const list = await query.queryRewardDataByID(this.period);
        this.data = list;
        this.$toast.success(`查询${this.period}月度报表成功！`);
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
</style>
