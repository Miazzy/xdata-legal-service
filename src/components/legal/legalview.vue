<template>
  <div id="reward-home">
      <div style="background-color:#f0f0f0;">
      <a-row :gutter="24">

        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">

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

            <!-- 诉讼案件申请 -->
            <div style="background-color:#f0f0f0;">

              <div class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 5rem; margin-right: 5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  案件发起申请
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>流程标题</span>
                    </a-col>
                    <a-col :span="8">
                       <a-input readonly v-model="item.title" placeholder="请输入案件发起申请标题！" @blur="validFieldToast('title')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col v-show="item.serialid" :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;margin-left:-12px;" ><span style="color:red;margin-right:0px;position:absolute;left:-20px;top:0px;width:100%;"></span>流程序号</span>
                    </a-col>
                    <a-col v-show="item.serialid" :span="8">
                       <a-input readonly v-model="item.serialid" placeholder="" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼案件类别</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_type" readonly placeholder="请填写诉讼案件类别！" @blur="validFieldToast('reward_type')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.create_time" readonly placeholder="请输入申请时间！" @blur="validFieldToast('create_time')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      人员信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.apply_realname" :readonly="!!item.apply_realname" placeholder="请输入申请人员姓名！" @blur="validFieldToast('apply_realname')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属公司</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input readonly v-model="item.company" placeholder="请输入申请人员所属公司！" @blur="validFieldToast('company')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属部门</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input readonly v-model="item.department" placeholder="请输入申请人员所属部门！" @blur="validFieldToast('department')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      知会信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>人力经理</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input readonly v-model="item.hr_name" placeholder="请输入案件发起申请需要知会的人力职能人员！" @blur="validFieldToast('hr_name')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      诉讼案件信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请奖金</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input readonly v-model="item.amount"  placeholder="请输入本次诉讼案件申请的单项奖金总额！" @blur="validFieldToast('amount')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>发放周期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_release_period"  placeholder="请输入本次诉讼案件/激励申请的发放周期，注意是发放周期！" @blur="validFieldToast('reward_release_period')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>发放性质</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_release_feature"  placeholder="请输入本次诉讼案件/激励申请的发放性质，如当期分配/延期分配！" @blur="validFieldToast('reward_release_feature')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属周期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input readonly v-model="item.reward_period"  placeholder="请输入本次诉讼案件/激励申请的所属周期，注意不是发放周期！" @blur="validFieldToast('reward_period')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼案件名称</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input readonly v-model="item.reward_name" placeholder="请输入本次诉讼案件申请的诉讼案件名称！" @blur="validFieldToast('reward_name')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="height:auto;margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row style="height:auto;">
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请事由</span>
                    </a-col>
                    <a-col :span="20" style="height:auto;">
                      <a-textarea
                        v-model="item.content" readonly
                        @blur="validFieldToast('content')"
                        placeholder="请输入案件发起申请的申请事由！"
                        :auto-size="{ minRows: 10, maxRows: 50 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div v-show="item.remark" class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      备注信息
                    </a-col>
                   </a-row>
                </div>

                <div v-show="item.remark" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      备注说明
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="item.remark" readonly
                        placeholder=""
                        :auto-size="{ minRows: 10, maxRows: 50 }"
                        style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      附件信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="position:relative; margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <van-cell-group style="margin-left:5rem;width:45%;" >
                    <van-cell v-show="item.files" title="诉讼案件明细" class="van-cell-upload" :label="item.files.slice(0,30)">
                      <template #right-icon>
                        <van-button name="file" @click="download(item.files);"  >下载</van-button>
                      </template>
                    </van-cell>
                    <van-cell v-show="item.files_00" title="相关附件 #1" class="van-cell-upload" :label="item.files_00.slice(0,30)">
                      <template #right-icon>
                        <van-button name="file" @click="download(item.files_00);"  >下载</van-button>
                      </template>
                    </van-cell>
                    <van-cell v-show="item.files_01" title="相关附件 #2" class="van-cell-upload" :label="item.files_01.slice(0,30)">
                      <template #right-icon>
                        <van-button name="file" @click="download(item.files_01);"  >下载</van-button>
                      </template>
                    </van-cell>
                    <van-cell v-show="item.files_02" title="相关附件 #3" class="van-cell-upload" :label="item.files_02.slice(0,30)">
                      <template #right-icon>
                        <van-button name="file" @click="download(item.files_02);"  >下载</van-button>
                      </template>
                    </van-cell>
                    <van-cell v-show="item.files_03" title="相关附件 #4" class="van-cell-upload" :label="item.files_03.slice(0,30)">
                      <template #right-icon>
                        <van-button name="file" @click="download(item.files_03);"  >下载</van-button>
                      </template>
                    </van-cell>
                    <van-cell v-show="item.files_04" title="相关附件 #5" class="van-cell-upload" :label="item.files_04.slice(0,30)">
                      <template #right-icon>
                        <van-button name="file" @click="download(item.files_04);"  >下载</van-button>
                      </template>
                    </van-cell>
                    <van-cell v-show="item.files_05" title="相关附件 #6" class="van-cell-upload" :label="item.files_05.slice(0,30)">
                      <template #right-icon>
                        <van-button name="file" @click="download(item.files_05);"  >下载</van-button>
                      </template>
                    </van-cell>
                  </van-cell-group>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      诉讼案件明细
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                  <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                    <a-table :columns="columns" :data-source="data">
                    </a-table>
                   </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      审批记录
                    </a-col>
                   </a-row>
                </div>

                 <div class="reward-apply-content-item reward-apply-content-title" style="">
                  <div style="margin-left:100px;">
                    <van-steps direction="vertical" :active="processLogList.length - 1">
                      <template v-for="value in processLogList">
                        <van-step :key="value.id">
                          <h3>{{ value.action + ' ' + value.employee + ' ' + value.action_opinion }}</h3>
                          <p>{{ value.create_time }}</p>
                        </van-step>
                      </template>
                    </van-steps>
                  </div>
                </div>



                <div v-show="(!(panename == 'myapplylist' || panename == 'mydonelist' || typename == 'hr_admin_ids')) && workflowLogList.length > 0 && role !='view' " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">

                  <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                    <a-row>
                      <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                        审批意见
                      </a-col>
                      <a-col :span="20">
                        <a-textarea
                          v-model="approve_content"
                          placeholder="请输入此申请流程的审批意见！"
                          :auto-size="{ minRows: 10, maxRows: 50 }"
                          style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                        />
                      </a-col>
                    </a-row>
                  </div>

                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">

                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleDisagree();"  >
                        驳回
                      </a-button>
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleAgree();"  >
                        同意
                      </a-button>
                    </a-col>
                    <a-col :span="8">

                    </a-col>
                   </a-row>
                </div>

                <div v-show="panename == 'myrewardlist' && typename == 'hr_admin_ids' && (bpm_status == '4' || bpm_status == '5') && role != 'view' " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">

                   <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                    <a-row>
                      <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                        知会意见
                      </a-col>
                      <a-col :span="20">
                        <a-textarea
                          v-model="approve_content"
                          placeholder="请输入此申请流程的知会(薪资/人力)确认意见！"
                          :auto-size="{ minRows: 10, maxRows: 50 }"
                          style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                        />
                      </a-col>
                    </a-row>
                   </div>

                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="24" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleNotifyConfirm();"  >
                        知会确认
                      </a-button>
                    </a-col>
                   </a-row>

                </div>

                <div v-show="panename == 'myapplylist' && typename == 'create_by' && (bpm_status == '1' || bpm_status == '100') && workflowLogList.length == 0 && role != 'view' " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">

                  <div class="reward-apply-content-item reward-apply-content-title" style="margin-top: 35px;">
                    <a-row style="border-top: 1px dash #f0f0f0;" >
                      <a-col class="reward-apply-content-title-text" :span="4" style="">
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

                  <div v-show="approve_executelist.length > 0" class="reward-apply-content-item reward-apply-content-title" style="">
                    <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                      <a-table :columns="wfcolumns" :data-source="approve_executelist">
                      </a-table>
                    </a-row>
                  </div>

                  <div id="van-user-list" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                    <a-row style="position:relative;">
                      <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                        <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>知会人员</span>
                      </a-col>
                      <a-col :span="8">
                        <a-input v-model="approve_notify_username" placeholder="请输入申请流程的知会人员！" @blur="queryNotifyMan();" @click="queryNotifyMan();" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width:320px;" />
                        <div style="position:absolute; right: 5px; top: -2px;">
                          <van-button name="file" @click="rewardNotifyAdd();"  >添加</van-button>
                        </div>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="3" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      </a-col>
                      <a-col :span="9">
                        <div style="margin-left: 10px;">
                          <van-address-list v-show="approve_notify_userlist.length > 0" v-model="approve_notify_userid" :list="approve_notify_userlist" default-tag-text="默认" edit-disabled @select="selectNotifyUser();" />
                        </div>
                      </a-col>
                    </a-row>
                  </div>

                  <div v-show="approve_notifylist.length > 0" class="reward-apply-content-item reward-apply-content-title" style="">
                    <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                      <a-table :columns="wfcolumns" :data-source="approve_notifylist">
                      </a-table>
                    </a-row>
                  </div>

                   <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                    <a-row>
                      <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                        提交意见
                      </a-col>
                      <a-col :span="20">
                        <a-textarea
                          v-model="approve_content"
                          placeholder="请输入此申请流程的申请意见！"
                          :auto-size="{ minRows: 10, maxRows: 50 }"
                          style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                        />
                      </a-col>
                    </a-row>
                   </div>

                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="24" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleStartConfirm();"  >
                        提交审批
                      </a-button>
                    </a-col>
                   </a-row>

                </div>

                <div v-show="panename == 'myapplylist' && typename == 'create_by' && (bpm_status == '4' || bpm_status == '5') && workflowLogList.length == 0 && role != 'view' " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">

                  <div class="reward-apply-content-item reward-apply-content-title" style="margin-top: 35px;">
                    <a-row style="border-top: 1px dash #f0f0f0;" >
                      <a-col class="reward-apply-content-title-text" :span="4" style="">
                        知会设置
                      </a-col>
                    </a-row>
                  </div>

                  <div id="van-user-list" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                    <a-row style="position:relative;">
                      <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                        <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>知会人员</span>
                      </a-col>
                      <a-col :span="8">
                        <a-input v-model="approve_notify_username" placeholder="请输入申请流程的知会人员！" @blur="queryNotifyMan();" @click="queryNotifyMan();" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width:320px;" />
                        <div style="position:absolute; right: 5px; top: -2px;">
                          <van-button name="file" @click="rewardNotifyAdd();"  >添加</van-button>
                        </div>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="3" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      </a-col>
                      <a-col :span="9">
                        <div style="margin-left: 10px;">
                          <van-address-list v-show="approve_notify_userlist.length > 0" v-model="approve_notify_userid" :list="approve_notify_userlist" default-tag-text="默认" edit-disabled @select="selectNotifyUser();" />
                        </div>
                      </a-col>
                    </a-row>
                  </div>

                  <div class="reward-apply-content-item reward-apply-content-title" style="">
                    <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                      <a-table :columns="wfcolumns" :data-source="approve_notifylist">
                      </a-table>
                    </a-row>
                  </div>

                  <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                    <a-row>
                      <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                        知会意见
                      </a-col>
                      <a-col :span="20">
                        <a-textarea
                          v-model="approve_content"
                          placeholder="请输入此申请流程的申请意见！"
                          :auto-size="{ minRows: 10, maxRows: 50 }"
                          style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                        />
                      </a-col>
                    </a-row>
                  </div>

                  <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="24" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleNotifyConfirm();"  >
                        知会
                      </a-button>
                    </a-col>
                  </a-row>

                </div>

                <div v-show="panename == 'myapplylist' && typename == 'create_by' && (bpm_status == '2' || bpm_status == '3') && workflowLogList.length >= 0 && role != 'view' " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">

                  <div class="reward-apply-content-item reward-apply-content-title" style="">
                    <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                      <a-table :columns="wfcolumns" :data-source="approve_executelist">
                      </a-table>
                    </a-row>
                  </div>

                   <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                    <a-row>
                      <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                        撤销原因
                      </a-col>
                      <a-col :span="20">
                        <a-textarea
                          v-model="approve_content"
                          placeholder="请输入此申请流程的撤销原因！"
                          :auto-size="{ minRows: 10, maxRows: 50 }"
                          style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                        />
                      </a-col>
                    </a-row>
                   </div>

                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="24" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleRejectConfirm();"  >
                        撤销审批
                      </a-button>
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
import * as query from '@/request/query';
import * as workflow from '@/request/workflow';
import * as wflowprocess from '@/request/wflow.process';
import * as workconfig from '@/request/workconfig';

export default {
  mixins: [window.mixin],
  data() {
    return {
      pageName: "诉讼案件管理",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      tablename:'bs_reward_apply',
      size: 0,
      loading:false,
      item:{
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              create_by: '',
              apply_date: dayjs().format('YYYY-MM-DD'),
              title: '',
              company: '',
              department: '',
              content: '',
              remark: '',//备注
              amount: '',
              wflowid: '',
              bpm_status: '', //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废
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
              files_00:'',
              files_01:'',
              files_02:'',
              files_03:'',
              files_04:'',
              files_05:'',
              status: '',
            },
      columns: workconfig.columns.reward.items,
      wfcolumns: workconfig.columns.reward.wfcolumns,
      data: [],
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
      goodstype: workconfig.goodstype,
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
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'案件管控',path:'/legal/workspace'},{icon:'form',text:'案件详情',path:''}],
      bpm_status:'',
      proponents:'',
    };
  },
  activated() {
    this.queryInfo();
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
    //上传提示
    async toastUpload(flag){
      if(flag == 'start'){
        vant.Toast.loading({duration: 0, forbidClick: true, message: '上传中...',});
      } else if(flag == 'fail'){
        this.$toast.success('文件上传失败，请稍后重试！');
      }
    },
    //上传文件成功后回调函数
      async uploadSuccess(file , res){
        vant.Toast.clear();
        this.item.files = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_00(file , res){
        vant.Toast.clear();
        this.item.files_00 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_01(file , res){
        vant.Toast.clear();
        this.item.files_01 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_02(file , res){
        vant.Toast.clear();
        this.item.files_02 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_03(file , res){
        vant.Toast.clear();
        this.item.files_03 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_04(file , res){
        vant.Toast.clear();
        this.item.files_04 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_05(file , res){
        vant.Toast.clear();
        this.item.files_05 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
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
      /**
       * @function 获取处理日志
       */
      async queryProcessLog(){
        //获取当前业务编号
        const id = Betools.tools.getUrlParam('id');
        //获取用户基础信息
        const userinfo = await Betools.Betools.storage.getStore('system_userinfo');

        try {
          const historyLogList = await workflow.queryPRLogHistoryByDataID(id);
          const logList = await workflow.queryPRLogByDataID(id);
          logList.map(item => { item.action = '待审批'; item.action_opinion = '尚未审批，请等待审批完成！'; });
          this.processLogList = [...historyLogList , ...logList];
          this.workflowLogList = logList;

          // 查找是否有本人的待审批记录，如果不存在，则无法进行驳回及同意操作
          const mylog = logList.find(item => {return item.employee == userinfo.username});

          for(let item of this.processLogList){
            try {
              item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm') ;
              item.action_opinion = item.action_opinion ? item.action_opinion : '';
            } catch (error) {
              console.log(error);
            }
            try {
              item.empinfo =  (await Betools.manageAPI.queryUserByNameHRM(item.employee))[0];
              item.employee = item.empinfo && item.empinfo.lastname ? `${item.empinfo.lastname}(${item.employee})` : item.employee;
            } catch (error) {
              console.log(error);
            }
          }

          // 如果不存在本人待审批记录，则无法处理
          if(Betools.tools.isNull(mylog) && !Betools.tools.isNull(logList) && logList.length > 0 && this.item.create_by !== userinfo.username){
            this.role = 'view';
          }

          // 如果存在待审批处理日志，则状态不应该不是审批中
          if(!Betools.tools.isNull(logList) && logList.length > 0 && !(this.item.bpm_status == 2 || this.item.bpm_status == 3)){
            //修改表单流程状态bpm_status为审批中
            await Betools.manageAPI.patchTableData(this.tablename , id , { id,  status: '审批中', bpm_status: '2', });
          }

          this.processLogList.sort();
        } catch (error) {
          console.log(error);
        }
      },
      async deleteProcessLog(){

        const id = Betools.tools.getUrlParam('id');

        //查询业务编号，如果不存在，则直接返回
        if(Betools.tools.isNull(id)){
          return ;
        }

        //获取用户基础信息
        const userinfo = await Betools.Betools.storage.getStore('system_userinfo');

        //如果最后一条是已完成，或者已驳回，则删除待办记录 //查询当前所有待办记录
        let tlist = await workflow.queryPRLogByDataID(id);

        //如果存在当前待办数据，则删除待办数据
        if(tlist && tlist.length > 0){
          //先遍历删除一次，然后批量在删除一次，因为发现批量删除有时，执行不正常
          for(let item of tlist){
            await Betools.manageAPI.deleteTableData('pr_log', item.id);
          }
          await Betools.Betools.Betools.storage.clearStore(`sys_workflow_cache@$now&id${id}`);
          //同时删除本条待办记录当前(印章管理员)
          await Betools.manageAPI.deleteProcessLog('' , tlist);
        }

      },
      validField(fieldName){
        //获取用户基础信息
        const userinfo = Betools.Betools.storage.getStore('system_userinfo');

        // 邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        Betools.Betools.storage.setStore(`system_${this.tablename}_item#${this.item.type}#@${userinfo.realname}` , JSON.stringify(this.item) , 3600 * 2 );

        return Betools.tools.isNull(this.message[fieldName]);
      },
      validFieldToast(fieldName){
        const flag = !this.validField(fieldName);
        if(flag){
          this.$toast.fail(`${this.message[fieldName]}！` );
          return false;
        }
      },

      async queryApproveMan(){

        //获取盖章人信息
        const user_admin_name = this.approve_username;

        //输入的用户
        if(!user_admin_name || user_admin_name.length <= 1){
          return;
        }

        try {
          if(!!user_admin_name){

            //从用户表数据中获取填报人资料
            let user = await Betools.manageAPI.queryUserByNameHRM(user_admin_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    let mobile = elem.mobile ? `${elem.mobile.slice(0,3)}****${elem.mobile.slice(-4)}` : '';
                    this.approve_userlist.push({id:elem.loginid , name:elem.lastname , mobile:elem.mobile, tel: mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })

                  //获取盖印人姓名
                  this.approve_username = user[0].lastname;
                  //当前盖印人编号
                  this.approve_userid = this.userid = user[0].loginid;

                  try {
                    this.selectApproveUser();
                  } catch (error) {
                    console.log(error);
                  }

                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let mobile = elem.mobile ? `${elem.mobile.slice(0,3)}****${elem.mobile.slice(-4)}` : '';
                  //将用户数据推送至对方数组
                  this.approve_userlist.push({id:user.loginid , name:user.lastname , mobile:elem.mobile, tel:mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.release_userlist.length });

                  //获取盖印人姓名
                  this.approve_username = user.lastname;
                  //当前盖印人编号
                  this.approve_userid = this.userid = user.loginid;

                  try {
                    this.selectApproveUser();
                  } catch (error) {
                    console.log(error);
                  }

                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.approve_userlist = this.approve_userlist.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.approve_userlist.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }

      },

      //选中当前知会人员
      async selectApproveUser(value){
        //获取员工基本信息
        const user = this.approve_userlist.find((item,index) => {return this.approve_userid == item.id});
        //设置员工
        this.approve_username = user.name;
        this.approve_mobile = user.mobile;
        this.approve_company = user.company;
        this.approve_department = user.department;
        //查询员工职务
        const temp = await query.queryUserInfoByMobile(user.mobile);
        //设置员工职务
        this.approve_position = temp.position;
      },

      async queryNotifyMan(){

        //获取盖章人信息
        const user_admin_name = this.approve_notify_username;

        //输入的用户
        if(!user_admin_name || user_admin_name.length <= 1){
          return;
        }

        try {
          if(!!user_admin_name){

            //从用户表数据中获取填报人资料
            let user = await Betools.manageAPI.queryUserByNameHRM(user_admin_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    let mobile = elem.mobile ? `${elem.mobile.slice(0,3)}****${elem.mobile.slice(-4)}` : '';
                    this.approve_notify_userlist.push({id:elem.loginid , name:elem.lastname , mobile:elem.mobile, tel: mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })

                  //获取盖印人姓名
                  this.approve_notify_username = user[0].lastname;
                  //当前盖印人编号
                  this.approve_notify_userid = this.userid = user[0].loginid;

                  try {
                    this.selectNotifyUser();
                  } catch (error) {
                    console.log(error);
                  }

                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let mobile = elem.mobile ? `${elem.mobile.slice(0,3)}****${elem.mobile.slice(-4)}` : '';
                  //将用户数据推送至对方数组
                  this.approve_notify_userlist.push({id:user.loginid , name:user.lastname , mobile:elem.mobile, tel:mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.release_userlist.length });

                  //获取盖印人姓名
                  this.approve_notify_username = user.lastname;
                  //当前盖印人编号
                  this.approve_notify_userid = this.userid = user.loginid;

                  try {
                    this.selectNotifyUser();
                  } catch (error) {
                    console.log(error);
                  }

                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.approve_notify_userlist = this.approve_notify_userlist.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.approve_notify_userlist.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }

      },

      //选中当前知会人员
      async selectNotifyUser(value){
        //获取员工基本信息
        const user = this.approve_notify_userlist.find((item,index) => {return this.approve_notify_userid == item.id});
        //设置员工
        this.approve_notify_username = user.name;
        this.approve_notify_mobile = user.mobile;
        this.approve_notify_company = user.company;
        this.approve_notify_department = user.department;
        //查询员工职务
        const temp = await query.queryUserInfoByMobile(user.mobile);
        //设置员工职务
        this.approve_notify_position = temp.position;
      },

      // 获取URL或者二维码信息
      async queryInfo() {

        try {

          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          this.back = Betools.tools.getUrlParam('back') || '/app'; //查询上一页
          this.type = Betools.tools.getUrlParam('type') || '0'; //查询type
          this.item.id = Betools.tools.getUrlParam('id') || '';  //查询诉讼案件模块编号
          this.panename = Betools.tools.getUrlParam('panename'); //获取panename
          this.typename = Betools.tools.getUrlParam('typename'); //获取typename
          this.bpm_status = Betools.tools.getUrlParam('bpm_status'); //获取bpm状态
          this.proponents = Betools.tools.getUrlParam('proponents'); //获取此申请的流程应发起人

          const userinfo = await Betools.Betools.storage.getStore('system_userinfo'); //获取用户基础信息
          const item = await query.queryTableData(this.tablename , this.item.id); //查询数据

          try {
            this.data = await query.queryTableDataByPid('bs_reward_items' , this.item.id); //查询诉讼案件明细数据
          } catch (error) {
            console.log(error);
          }

          try {
            this.workflowLogList = await workflow.queryPRLogByDataID(this.item.id);
          } catch (error) {
            console.log(error);
          }

          try {
            if(item){
              this.item = {
                id: item.id,
                serialid: item.serialid,
                create_time: dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss'),
                create_by: item.create_by,
                apply_date: dayjs(item.apply_date).format('YYYY-MM-DD HH:mm:ss'),
                title: item.title,
                company: item.company,
                department: item.department,
                content: item.content,
                remark: item.remark, //备注
                amount: item.amount,
                wflowid: item.wflowid,
                bpm_status: item.bpm_status, //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废
                reward_type: item.reward_type,
                reward_name: item.reward_name,
                reward_period: item.reward_period,
                reward_release_period: item.reward_release_period,
                reward_release_feature: item.reward_release_feature,
                hr_admin_ids: item.hr_admin_ids,
                hr_admin_names: item.hr_admin_names,
                hr_id: item.hr_id,
                hr_name: item.hr_name,
                apply_username: item.apply_username,
                apply_realname: item.apply_realname,
                files: item.files,
                files_00: item.files_00,
                files_01: item.files_01,
                files_02: item.files_02,
                files_03: item.files_03,
                files_04: item.files_04,
                files_05: item.files_05,
                status: item.status,
              }
            }

            await this.queryProcessLog(); //查询流程日志

          } catch (error) {
            console.log(error);
          }

        } catch (error) {
          console.log(error);
        }

      },

      /**
       * @function 同意流程申请
       */
      async handleAgree() {

        if(!this.approve_content){
          return this.$toast.fail('请输入此申请流程的审批意见！');
        }

        const id = Betools.tools.getUrlParam('id');
        const logList = await workflow.queryPRLogByDataID(id);

        if(logList.length <= 0){
          return this.$toast.fail('此流程的审批已处理完毕，请不要重复审批！');
        }

        // 执行审批业务
        await this.handleAgreeWF();
        // 清除缓存信息
        await Betools.Betools.Betools.storage.clearStore(`sys_workflow_cache@$now&id${id}`);

        // 提示执行成功！
        // this.$toast.success('同意流程审批成功！');
      },

      /**
       * @function 驳回流程申请
       */
      async handleDisagree(){

        if(!this.approve_content){
          return this.$toast.fail('请输入此申请流程的驳回意见！');
        }

        const id = Betools.tools.getUrlParam('id');
        const logList = await workflow.queryPRLogByDataID(id);

        if(logList.length <= 0){
          return this.$toast.fail('此流程的审批已处理完毕，请不要重复审批！');
        }

        const userinfo = await Betools.Betools.storage.getStore('system_userinfo'); //获取用户基础信息

        //修改表单流程状态bpm_status为已驳回
        await Betools.manageAPI.patchTableData(this.tablename , id , { id,  status: '待审批', bpm_status: '100', });

        //删除当前流程中待处理流程记录
        await this.deleteProcessLog();

        //新增驳回记录
        await this.handleSaveHistoryWFLog(this.tablename , this.item , userinfo , '驳回' , this.approve_content);

        this.workflowLogList = await workflow.queryPRLogByDataID(id);
        this.$toast.fail('驳回流程审批成功！');
        this.role = 'view';
        this.status = '已驳回';

        //发送企业微信通知，知会流程发起人，此案件发起申请已经完成！
        try {
            const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/legalview?id=${id}&pid=&tname=bs_reward_apply&panename=mytodolist&typename=wflow_done&bpm_status=4&proponents=${this.item.create_by}`);
            await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/亲爱的同事，您提交的案件发起申请已被驳回：${this.item["title"]}，内容：${this.item['content']}，驳回意见：${this.approve_content}，请修改申请内容后重新提交流程?type=reward&rurl=${receiveURL}`)
                .set('accept', 'json');
        } catch (error) {
            console.log(error);
        }

        //休息1000ms，在查询日志
        await Betools.tools.sleep(1000);

        //查询最新审批记录
        await this.queryProcessLog();

      },

      // 处理流程日志
      async handleSaveHistoryWFLog(tablename , elem , userinfo , action , action_opinion){

        try {
          const prLogHisNode = {
              id: Betools.tools.queryUniqueID(),
              table_name: tablename,
              main_value: elem.id,
              proponents: userinfo.username,
              business_data_id : elem.id , //varchar(100)  null comment '业务数据主键值',
              business_code  : '000000000' , //varchar(100)  null comment '业务编号',
              process_name   : '案件发起申请审批', //varchar(100)  null comment '流程名称',
              employee       : userinfo.username , //varchar(1000) null comment '操作职员',
              approve_user   : userinfo.username , //varchar(100)  null comment '审批人员',
              action         : action    , //varchar(100)  null comment '操作动作',
              action_opinion : action_opinion , //text          null comment '操作意见',
              operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
              functions_station : userinfo.position, //varchar(100)  null comment '职能岗位',
              process_station   : '自由流程审批', //varchar(100) null comment '流程岗位',
              business_data     : JSON.stringify(elem), //text null comment '业务数据',
              content           : `${elem.content}`,//text          null comment '业务内容',
              process_audit     : elem.id, //varchar(100)  null comment '流程编码',
              create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
              relate_data       : JSON.stringify(userinfo), //text null comment '关联数据',
              origin_data       : JSON.stringify(elem),
            }
            await workflow.approveViewProcessLog(prLogHisNode);
        } catch (error) {
            console.log(error);
        }

      },

      /**
       * @function 提交自由流程
       */
      async handleSubmitWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime) {

          try {
            //校验提交信息是否准确
            var checkFlag = workflow.checkSubmitInfo( wfUsers,  nfUsers, approver, );
            let vflag = await Betools.manageAPI.queryApprovalExist(curTableName, curItemID); //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
            let vflag_ = Betools.Betools.storage.getStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`);

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

      /**
       * @function 启动自由流程
       */
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

           // 此处推送消息至第一个审批处
           try {
              const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/legalview?id=${curItemID}&pid=${node.id}&tname=bs_reward_apply&panename=mytodolist&typename=wflow_todo&bpm_status=2&proponents=${firstWflowUser}`);
              await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${firstWflowUser}/亲爱的同事，${userinfo['name']||userinfo['realname']}(${userinfo["username"]})提交了案件发起申请：${data["title"]}，内容：${data['content']}，请您及时进行审批处理！?type=reward&rurl=${receiveURL}`)
                          .set('accept', 'json');
           } catch (error) {
             console.log(error);
           }

           // 保存审批相关处理信息
           const nextWflowNode = JSON.parse(JSON.stringify(node));

           // 提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
           if (await Betools.manageAPI.queryApprovalExist(curTableName,  curItemID)) {
             return vant.Toast.fail("已提交过申请，无法再次提交审批！");
           }

           //处理自由流程发起提交审批操作
           await workflow.postWorkflowFree(userinfo, curTableName, data, freeWFNode, startFreeNode, nextWflowNode, "2");
           //弹出审批完成提示框
           vant.Toast.success("提交自由流程审批成功！");
           //记录当前流程已经提交，短时间内无法再次提交
           Betools.Betools.storage.setStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`,  "true", 60 );
           //操作完毕，返回结果
           return true;
        } catch (error) {
            console.log(error);
        }

      },

      /**
       * @function 处理知会确认
       */
      async handleNotifyConfirm(){
        if(!this.approve_content){
          return this.$toast.fail('请输入此申请流程的人力确认意见！');
        }

        const id = Betools.tools.getUrlParam('id');
        const logList = await workflow.queryPRLogByDataID(id);

        if(logList.length > 0 || (this.item.bpm_status != '4' && this.item.bpm_status != '5')){
          return this.$toast.fail('此流程申请尚在审批中，请审批完成后在进行确认操作！');
        }

        const userinfo = await Betools.Betools.storage.getStore('system_userinfo'); //获取用户基础信息

        //修改表单流程状态bpm_status为已驳回
        await Betools.manageAPI.patchTableData(this.tablename , id , { id,  status: '待审批', bpm_status: '6', });

        //新增知会确认记录
        await this.handleSaveHistoryWFLog(this.tablename , this.item , userinfo , '人力确认' , this.approve_content);

        this.$toast.success('知会确认成功！');
        this.role = 'view';

        //休息1000ms，在查询日志
        await Betools.tools.sleep(1000);

        //查询最新审批记录
        await this.queryProcessLog();


      },
      async handleStartConfirm(){

        //获取用户基础信息
        const userinfo = await Betools.Betools.storage.getStore('system_userinfo');

        //查询最新审批记录
        await this.queryProcessLog();

        if(!this.approve_content){
          return this.$toast.fail('请输入此申请流程的提交意见！');
        }

        const id = Betools.tools.getUrlParam('id');
        const logList = await workflow.queryPRLogByDataID(id);

        if(logList.length > 0){
          return this.$toast.fail('此流程的尚有审批未处理完成，请先撤销或等待流程审批结束在重新发起流程！');
        }

         //流程审批人员
        let wfUsers = '';  //流程审批人员
        let approver = ''; //最终审批人员
        let nfUsers = '';  //流程知会人员
        let wfAll = '';    //流程所有人员

        if(!this.approve_executelist || this.approve_executelist.length <= 0){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `请在流程设置处，添加审批人员！`,
          });
          return false;
        } else {
          if(this.approve_executelist.length == 1){
            approver = this.approve_executelist[0].userid;
          } else {
            const tempIndex = this.approve_executelist.length - 1;
            const templist = this.approve_executelist.slice(0,tempIndex);

            approver = this.approve_executelist[tempIndex].userid;
            wfUsers = (templist.map(obj => {return obj.userid})).toString();

            nfUsers = (this.approve_notifylist.map(obj => {return obj.userid})).toString();
            wfAll = (this.approve_executelist.map(obj => {return obj.userid})).toString();

            //保存流程审批人员、知会人员
            await Betools.manageAPI.patchTableData(this.tablename , this.item.id , { id : this.item.id ,  wflow_all: wfAll , wflow_notify: nfUsers, });
          }
        }

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认提交此自由流程?",
            onOk: async() => {

                  try {
                    //查询直接所在工作组，注意此处是诉讼案件人力经理管理员
                    const response = await query.queryRoleGroupList('COMMON_REWARD_HR_ADMIN' , this.item.hr_id);

                    //获取到印章管理员组信息
                    let user_group_ids = response && response.length > 0 ? response[0].userlist : '';
                    let user_group_names = response && response.length > 0 ? response[0].enuserlist : '';

                    //如果未获取用户名称，则直接设置用印人为分组成员
                    if(Betools.tools.isNull(user_group_ids)){
                      user_group_ids = this.item.hr_id;
                      user_group_names = this.item.hr_name;
                    }

                    // 返回预览URL
                    const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/legalview?id=${this.item.id}&pid=&tname=bs_reward_apply&panename=myrewardlist&typename=hr_admin_ids&bpm_status=4&proponents=${user_group_ids}&role=hr`);

                    /************************  工作流程日志(开始)  ************************/
                    //修改bpm流程状态为 2:审批中
                    await Betools.manageAPI.patchTableData(this.tablename , this.item.id , { id : this.item.id ,  status: '审批中', bpm_status: '2', });

                    //向HR推送，HR确认后
                    await this.handleNotifyHR(user_group_ids , userinfo ,  this.item , receiveURL);

                    //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
                    await this.handleSubmitWF(userinfo , wfUsers , nfUsers , approver , this.tablename , this.item.id , this.item  , dayjs().format('YYYY-MM-DD HH:mm:ss'));

                    /************************  工作流程日志(结束)  ************************/

                    //设置状态
                    try {
                      this.loading = false;
                      this.status = '审批中';
                      this.readonly = true;
                      this.role = 'view';
                    } catch (error) {
                      console.log(error);
                    }

                    this.$toast.success('提交案件发起申请成功，请等待审批完成！');

                    //休息1000ms，在查询日志
                    await Betools.tools.sleep(1000);

                    //查询最新审批记录
                    await this.queryProcessLog();

                  } catch (error) {
                    console.log(error);
                  }
               }
          });

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
              action_opinion : '保存诉讼案件申请',//text          null comment '操作意见',
              operate_time   : dayjs().subtract(100,'second').format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
              functions_station : userinfo.position, //varchar(100)  null comment '职能岗位',
              process_station   : '诉讼案件申请', //varchar(100) null comment '流程岗位',
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

      // 审批人员添加函数
      async rewardApproveAdd(){

        if(!this.approve_userid){
          return this.$toast.success('请选择审批人员处下拉列表中的待选审批人员！');
        }

        const index = this.approve_executelist.findIndex( item => {
          return item.userid == this.approve_userid;
        })

        if(index>=0){
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
      async rewardNotifyAdd(){

        if(!this.approve_notify_userid){
          return this.$toast.success('请选择知会人员处下拉列表中的待选知会人员！');
        }

        const index = this.approve_notifylist.findIndex( item => {
          return item.userid == this.approve_notify_userid;
        })

        if(index>=0){
          return this.$toast.success('该知会人员已经添加，请重新输入！');
        }

        try {
          const mobile = this.approve_notify_mobile ? `${this.approve_notify_mobile.slice(0,3)}****${this.approve_notify_mobile.slice(-4)}` : '';
          const user = {key: this.approve_notifylist.length + 1 , id:Betools.tools.queryUniqueID(),username:this.approve_notify_username , userid: this.approve_notify_userid , mobile , company: this.approve_notify_company , department : this.approve_notify_department , position : this.approve_notify_position};
          this.approve_notifylist.push(JSON.parse(JSON.stringify(user)));
          this.approve_notify_userid = '';
          this.approve_notify_username = '';
          this.approve_notify_mobile = '';
          this.approve_notify_position = '';
          this.approve_notify_userlist = [];
        } catch (error) {
          console.log(error);
        }

      },

      // 通知HR（人力薪资相关专职人员查看数据）
      async handleNotifyHR(user_group_ids , userinfo ,  value , receiveURL){
        try {
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${user_group_ids}/亲爱的同事，${userinfo.realname}(${userinfo.username})提交了案件发起申请，请您在流程审批完成后及时进行知会确认处理！?type=reward&rurl=${receiveURL}`)
                          .set('accept', 'json');
        } catch (error) {
          console.log(error);
        }
      },

      // 撤销审批流程
      async handleRejectConfirm(){
        this.loading = true;

        if(!this.approve_content){
          return this.$toast.fail('请输入此申请流程的撤销意见！');
        }

        const id = Betools.tools.getUrlParam('id');
        const userinfo = await Betools.Betools.storage.getStore('system_userinfo'); //获取用户基础信息

        //修改表单流程状态bpm_status为已驳回
        await Betools.manageAPI.patchTableData(this.tablename , id , { id,  status: '待审批', bpm_status: '1', });

        //删除当前流程中待处理流程记录
        await this.deleteProcessLog();

        //新增驳回记录
        await this.handleSaveHistoryWFLog(this.tablename , this.item , userinfo , '撤销' , this.approve_content);

        this.workflowLogList = await workflow.queryPRLogByDataID(id);
        this.$toast.fail('撤销流程审批成功！');

        this.role = 'view';
        await Betools.tools.sleep(1000);
        await this.queryInfo();
        this.loading = false;
        await Betools.tools.sleep(2000);
        await this.queryProcessLog();
      },

      // 执行驳回功能
      async handleDisagreeWF(){
        this.loading = true;
        let result = await wflowprocess.handleRejectWF();
        result == 'success' ? (this.tasktype = 'done' , this.role = 'view') : '';

        this.role = 'view';
        await Betools.tools.sleep(1000);
        await this.queryInfo();
        this.loading = false;
        await Betools.tools.sleep(2000);
        await this.queryProcessLog();
      },

      // 执行知会确认功能
      async handleConfirmWF(){
        this.loading = true;
        let result = await wflowprocess.handleConfirmWF();
        result == 'success' ? (this.tasktype = 'done' , this.role = 'view') : '';

        this.role = 'view';
        await Betools.tools.sleep(1000);
        await this.queryInfo();
        this.loading = false;
        await Betools.tools.sleep(2000);
        await this.queryProcessLog();
      },

      // 执行审批同意操作
      async handleAgreeWF(){
        this.loading = true;
        let result = await wflowprocess.handleApproveWF();
        result == 'success' ? (this.tasktype = 'done', this.role = 'view') : '';

        this.role = 'view';
        await Betools.tools.sleep(1000);
        await this.queryInfo();
        this.loading = false;
        await Betools.tools.sleep(2000);
        await this.queryProcessLog();
      },
  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";
</style>
