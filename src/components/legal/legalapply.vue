<template>
  <div id="reward-home">
      <div style="background-color:#f0f0f0;">
      <a-menu mode="horizontal">
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper" ><a-icon type="user" />{{ 'username' }} </span>
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

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>流程标题</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_type" readonly placeholder="请填写本案件流程标题！" @blur="validFieldToast('reward_type')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件编号</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.create_time" readonly placeholder="请输入案件编号！" @blur="validFieldToast('create_time')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>填报日期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_type" readonly placeholder="请填写填报日期！" @blur="validFieldToast('reward_type')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>填报人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.create_time" readonly placeholder="请输入填报人员！" @blur="validFieldToast('create_time')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件类别</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_type" readonly placeholder="请选择案件类别！" @blur="validFieldToast('reward_type')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>业务板块</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.create_time" readonly placeholder="请选择业务板块！" @blur="validFieldToast('create_time')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      区域信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属区域</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_type" readonly placeholder="请选择所属区域" @blur="validFieldToast('reward_type')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属项目</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.create_time" readonly placeholder="请选择所属项目！" @blur="validFieldToast('create_time')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      案由信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>一级案由</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.company" placeholder="请选择一级案由！" @blur="validFieldToast('company')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>二级案由</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.department" placeholder="请选择一级案由！" @blur="validFieldToast('department')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      诉讼信息
                    </a-col>
                   </a-row>
                </div>

                <div id="van-user-list" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>程序阶段</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.hr_name" placeholder="请选择当前案件程序阶段（一审/二审/执行/再审）！" @blur="validFieldToast('hr_name');queryNotifyMan();" @click="queryNotifyMan();" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="3" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                    </a-col>
                    <a-col :span="9">
                      <div style="margin-left: 10px;">
                        <van-address-list v-show="userList.length > 0" v-model="item.hr_id" :list="userList" default-tag-text="默认" edit-disabled @select="selectNotifyUser();" />
                      </div>
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>业务接收</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.company" placeholder="请输入业务部门接收时间！" @blur="validFieldToast('company')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>法律接收</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.department" placeholder="请输入法律部门接收时间！" @blur="validFieldToast('department')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      案件信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请奖金</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.amount"  placeholder="请输入本次案件申请的单项奖金总额！" @blur="validFieldToast('amount')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>发放周期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_release_period"  placeholder="请输入本次案件/激励申请的发放周期，注意是发放周期！" @blur="validFieldToast('reward_release_period')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>发放性质</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_release_feature"  placeholder="请输入本次案件/激励申请的发放性质，如当期分配/延期分配！" @blur="validFieldToast('reward_release_feature')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属周期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_period"  placeholder="请输入本次案件/激励申请的所属周期，注意不是发放周期！" @blur="validFieldToast('reward_period')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件名称</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_name" placeholder="请输入本次案件申请的案件名称！" @blur="validFieldToast('reward_name')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
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
                        v-model="item.content"
                        @blur="validFieldToast('content')"
                        placeholder="请输入案件发起申请的申请事由！"
                        :auto-size="{ minRows: 10, maxRows: 50 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      备注信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      备注说明
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="item.remark"
                        placeholder="请输入案件发起申请的申请事由！"
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
                    <van-icon name="add-o" style="position:absolute;top:0px;right:0px;z-index:100;" @click="size <= 6 ? size++ : size;"/>
                    <van-icon name="circle" style="position:absolute;top:45px;right:0px;z-index:100;" @click="size > 0 ? size-- : size;"  />
                    <download-excel id="reward-download-excel-button" v-if="!iswework"
                      :data="datas"
                      :fields="fields"
                      style="position:absolute;top:7px;right: -160px;z-index:100;"
                      worksheet="案件明细模板"
                      name="案件明细模板.xls"
                    >
                      下载模板
                    </download-excel>
                    <download-excel id="reward-items-download-excel-button" v-if="!iswework"
                      :data="data"
                      :fields="fields"
                      style="position:absolute;top:7px;right: -300px;z-index:100;"
                      worksheet="案件明细"
                      name="案件明细.xls"
                    >
                      下载明细
                    </download-excel>

                    <van-cell title="案件明细" class="van-cell-upload" :label="item.files.slice(0,30)">

                      <template #right-icon>
                        <excel-import :on-success="onSuccess">
                          <div>导入</div>
                        </excel-import>
                      </template>

                    </van-cell>

                    <van-cell v-show="size >= 1" title="相关附件 #1" class="van-cell-upload" :label="item.files_00.slice(0,30)">
                      <template #right-icon>
                        <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_00"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                      </template>
                    </van-cell>

                    <van-cell v-show="size >= 2" title="相关附件 #2" class="van-cell-upload" :label="item.files_01.slice(0,30)">
                      <template #right-icon>
                        <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_01"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                      </template>
                    </van-cell>

                    <van-cell v-show="size >= 3" title="相关附件 #3" class="van-cell-upload" :label="item.files_02.slice(0,30)">
                      <template #right-icon>
                        <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_02"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                      </template>
                    </van-cell>

                    <van-cell v-show="size >= 4" title="相关附件 #4" class="van-cell-upload" :label="item.files_03.slice(0,30)">
                      <template #right-icon>
                        <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_03"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                      </template>
                    </van-cell>

                    <van-cell v-show="size >= 5" title="相关附件 #5" class="van-cell-upload" :label="item.files_04.slice(0,30)">
                      <template #right-icon>
                        <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_04"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                      </template>
                    </van-cell>

                    <van-cell v-show="size >= 6" title="相关附件 #6" class="van-cell-upload" :label="item.files_05.slice(0,30)">
                      <template #right-icon>
                        <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_05"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                      </template>
                    </van-cell>

                  </van-cell-group>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="margin-top: 35px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      分配信息
                    </a-col>
                   </a-row>
                </div>

                <div id="van-user-list" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row style="position:relative;">
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>分配人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="release_username" placeholder="请输入案件明细中的分配人员！" @blur="queryReleaseMan();" @click="queryReleaseMan();" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>分配金额</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="release_amount" placeholder="请输入案件明细中的案件金额！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width: 320px; " />
                      <span style="color:red;font-size:0.6rem;display:block;margin-top:15px;">奖项金额，正数表示为奖励、激励，负数表示为罚款！</span>
                    </a-col>
                    <div style="position:absolute; right: 5px; top: -2px;">
                      <van-button name="file" @click="rewardRelease();"  >分配</van-button>
                    </div>
                  </a-row>
                  <a-row>
                    <a-col :span="3" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                    </a-col>
                    <a-col :span="9">
                      <div style="margin-left: 10px;">
                        <van-address-list v-show="release_userlist.length > 0" v-model="release_userid" :list="release_userlist" default-tag-text="默认" edit-disabled @select="selectReleaseUser" />
                      </div>
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      案件明细
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="width:100%;">
                  <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;width:100%;height:auto;" >
                    <vue-excel-editor v-model="data" ref="grid" width="100%" :page="20" :no-num-col="false" :readonly="false" filter-row autocomplete @delete="onDelete" @update="onUpdate" >
                        <vue-excel-column field="type"        label="分配性质"   width="80px" />
                        <vue-excel-column field="period"      label="发放期间"   width="80px" />
                        <vue-excel-column field="username"    label="员工姓名"   width="80px" />
                        <vue-excel-column field="account"     label="员工OA"    width="80px" />
                        <vue-excel-column field="company"     label="所属单位"   width="100px" />
                        <vue-excel-column field="zone"        label="所属区域"   width="100px" />
                        <vue-excel-column field="project"     label="项目/中心"  width="100px" />
                        <vue-excel-column field="department"  label="所属部门"   width="80px" />
                        <vue-excel-column field="position"    label="员工职务"   width="80px" />
                        <vue-excel-column field="amount"      label="分配金额"   width="80px" summary="sum" />
                        <vue-excel-column field="ratio"       label="分配比率"   width="80px" summary="sum" />
                        <vue-excel-column field="message"     label="抄送"      width="80px" />
                        <vue-excel-column field="v_status"    label="状态"      width="60px" type="map" :options="statusType" />
                    </vue-excel-editor>
                   </a-row>
                </div>

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

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                  <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                    <a-table :columns="wfcolumns" :data-source="approve_executelist">
                    </a-table>
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
      tablename:'bs_reward_apply',
      size: 0,
      item:{
              id: '',
              serialid:'',
              create_time: '',
              create_by: '',
              apply_date: dayjs().format('YYYY-MM-DD'),
              title: '',
              company: '',
              department: '',
              content: '',
              remark: '',//备注
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
      tablename:'bs_reward_apply',
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
      onDelete(){
        console.log('delete');
      },
      // 执行页面跳转
      async redirectView(path) {
          this.$router.push(path);
      },
      async onUpdate(records){

        if(records.length > 1){
          return this.$toast.fail('管理员您好，一次只能更新一条数据！');
        }
        const temp = this.data.filter(elem => { // 过滤被删除的数据
          return elem.v_status == 'valid';
        });

        if(this.data.length != temp.length){ // 过滤被删除的数据
          return vant.Dialog.confirm({
            title: '温馨提示',
            message: `您确定删除选中数据嘛？`,
          }).then(()=>{
            this.data = temp;
          }).catch(() => {
            this.data.map(item => { item.v_status = 'valid'; });
          })
        }

        for(const record of records){
          const item = temp.find( item => { return item.$id == record.$id });
          const elem = new Object() ;
          elem[record.name] = record.newVal ;
          if(record.name == 'message'){
            let list = await Betools.manage.queryUserByLoginID(record.newVal);
            const rlist = record.newVal.split(',');
            list = list.filter( (item,index) => {
              const findex = list.findIndex( elem => { return elem.loginid == item.loginid });
              return index == findex;
            })
            if(list.length != rlist.length){
              return vant.Dialog.confirm({
                  title: '温馨提示',
                  message: `请仔细检查OA账户是否有填写错误（抄送：${rlist.toString()}）!`,
                })
            }
          } else if(record.name == 'amount'){
            const temp = this.data.find( item => { return item.$id === record.$id });
            temp.ratio = Betools.tools.divisionPercentage(record.newVal , this.item.amount);
          }
        }
      },
      // Excel文件解析成功
      async onSuccess(data, file, ratio = 0.00, zone = '', project = '' , regexp = /[\ |‘|’|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g){
        if(!this.item.amount){
          return this.$toast.fail('请先输入申请奖金总额！');
        }
        if(!this.item.reward_release_feature){
          return this.$toast.fail('请输入案件申请的分配性质！');
        }
        if(!this.item.reward_release_period){
          return this.$toast.fail('请输入案件申请的发放周期！');
        }
        try {
          let trows = data[0].data;
          for(let item of trows){
            const list = await Betools.manage.queryUserByID(item['员工OA'],'融量',101); //查询OA账户，获取员工单位，部门，区域
            ratio = Betools.tools.divisionPercentage(item['分配金额'] , this.item.amount);
            try {
              let elem = { key: Betools.tools.queryUniqueID(), type: item['分配性质'], period: item['发放期间'].replace(regexp,""), username: item['员工姓名'], account: item['员工OA'], company: item['所属单位'], department: item['所属部门'], position: item['员工职务'], mobile: '', amount: item['分配金额'], ratio, zone:'', project: item['所属项目'], message:'',  v_status: 'valid', }
              if(list && list.length > 0){
                const user = list[0];
                let temp = Betools.tools.queryZoneProjectAll(user.company.split('||')[0], ['领地集团有限公司','领悦服务','宝瑞商管','医疗健康板块', '金融板块' ,'邛崃创达公司'], user.company.split('||')[1]);
                elem.username =  user.name;
                elem.account = user.loginid;
                elem.company = temp.company;
                elem.department = user.departname;
                elem.position = user.position;
                elem.mobile = user.mobile;
                elem.zone = temp.zone;
                elem.project = elem.project ? elem.project : temp.project;
                console.log(`project: ${elem.project} or temp.project:${temp.project}`);
              }
              this.data.push(elem);
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      onChange(event) {
        this.file = event.target.files ? event.target.files[0] : null;
      },
      // 上传提示
      async toastUpload(flag){
        if(flag == 'start'){
          vant.Toast.loading({duration: 0, forbidClick: true, message: '上传中...',});
        } else if(flag == 'fail'){
          this.$toast.success('文件上传失败，请稍后重试！');
        }
      },
      // 上传文件成功后回调函数
      async uploadSuccess(file , res){
        vant.Toast.clear();
        this.item.files = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_00(file , res){
        vant.Toast.clear();
        this.item.files_00 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_01(file , res){
        vant.Toast.clear();
        this.item.files_01 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_02(file , res){
        vant.Toast.clear();
        this.item.files_02 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_03(file , res){
        vant.Toast.clear();
        this.item.files_03 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_04(file , res){
        vant.Toast.clear();
        this.item.files_04 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_05(file , res){
        vant.Toast.clear();
        this.item.files_05 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
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
        const id = Betools.tools.getUrlParam('id');
        try {
          this.processLogList = await workflow.queryPRLogHistoryByDataID(id);
          this.processLogList.map(item => { item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm') });
          this.processLogList.sort();
        } catch (error) {
          console.log(error);
        }
      },

      async deleteProcessLog(){

        const id = Betools.tools.getUrlParam('id');
        const pid = Betools.tools.getUrlParam('pid');

        //查询业务编号，如果不存在，则直接返回
        if(Betools.tools.isNull(id) || Betools.tools.isNull(pid)){
          return ;
        }

        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //如果最后一条是已完成，或者已驳回，则删除待办记录 //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        if(tlist.length > 0){
          //同时删除本条待办记录当前(印章管理员)
          await workflow.deleteViewProcessLog(tlist);
        }

      },

      validField(fieldName){
        const userinfo = Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const regMail = workconfig.system.config.regexp.mail; // 邮箱验证正则表达式
        this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';
        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }
        Betools.storage.setStore(`system_${this.tablename}_item#${this.item.type}#@${userinfo.realname}` , JSON.stringify(this.item) , 3600 * 2 );
        return Betools.tools.isNull(this.message[fieldName]);
      },

      validFieldToast(fieldName){
        const flag = !this.validField(fieldName);
        if(flag){
          this.$toast.fail(`${this.message[fieldName]}！` );
          return false;
        }
      },

      //用户选择知会人员
      async queryNotifyMan(){

        //获取盖章人信息
        const user_admin_name = this.item.hr_name;

        if(!user_admin_name || user_admin_name.length <= 1){
          return;
        }

        try {
          if(!!user_admin_name){

            //从用户表数据中获取填报人资料
            let user = await Betools.manage.queryUserByNameReward(user_admin_name.trim(),200);

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.userList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })

                  //获取盖印人姓名
                  this.item.hr_name = user[0].lastname;
                  //当前盖印人编号
                  this.item.hr_id = this.userid = user[0].loginid;

                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  //将用户数据推送至对方数组
                  this.userList.push({id:user.loginid , name:user.lastname , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.userList.length });

                  //获取盖印人姓名
                  this.item.hr_name = user.lastname;
                  //当前盖印人编号
                  this.item.hr_id = this.userid = user.loginid;
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.userList = this.userList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.userList.findIndex((subitem,index) => { return subitem.id == item.id });
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
        const user = this.userList.find((item,index) => {return this.item.hr_id == item.id});
        this.item.hr_name = user.name;
      },

      async queryReleaseMan(){

        //获取盖章人信息
        const user_admin_name = this.release_username;

        //输入的用户
        if(!user_admin_name || user_admin_name.length <= 1){
          return;
        }

        try {
          if(!!user_admin_name){

            //从用户表数据中获取填报人资料
            let user = await Betools.manage.queryUserByNameReward(user_admin_name.trim(),200);

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){
                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    let department = elem.textfield1.split('||')[1];
                    let mobile = elem.mobile ? `${elem.mobile.slice(0,3)}****${elem.mobile.slice(-4)}` : '';
                    let temp = Betools.tools.queryZoneProjectAll(elem.textfield1.split('||')[0], ['领地集团有限公司','领悦服务','宝瑞商管','医疗健康板块', '金融板块' ,'邛崃创达公司'], department);
                    this.release_userlist.push({id:elem.loginid , name:elem.lastname , mobile:elem.mobile, tel: mobile , zone: temp.zone , project: temp.project , address: company + "||" + elem.textfield1.split('||')[1] , company: temp.company , department: temp.department , mail: elem.email , isDefault: !index });
                  })
                  this.release_username = user[0].lastname; //获取盖印人姓名
                  this.release_userid = this.userid = user[0].loginid; //当前盖印人编号
                  this.selectReleaseUser();
                } catch (error) {
                  console.log(error);
                }
              } else { //如果只有一个用户数据，则直接设置
                try {
                  let company = user.textfield1.split('||')[0];
                  let department = user.textfield1.split('||')[1];
                  let mobile = elem.mobile ? `${elem.mobile.slice(0,3)}****${elem.mobile.slice(-4)}` : '';
                  let temp = Betools.tools.queryZoneProjectAll(user.textfield1.split('||')[0], ['领地集团有限公司','领悦服务','宝瑞商管','医疗健康板块', '金融板块' ,'邛崃创达公司'], department);
                  this.release_userlist.push({id:user.loginid , name:user.lastname , mobile:elem.mobile, tel:mobile , zone: temp.zone , project: temp.project , address: company + "||" + user.textfield1.split('||')[1] , company: temp.company , department: temp.department , mail: this.item.dealMail, isDefault: !this.release_userlist.length }); //将用户数据推送至对方数组
                  this.release_username = user.lastname; //获取盖印人姓名
                  this.release_userid = this.userid = user.loginid; //当前盖印人编号
                  this.selectReleaseUser();
                } catch (error) {
                  console.log(error);
                }
              }

              //遍历去重
              try {
                this.release_userlist = this.release_userlist.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.release_userlist.findIndex((subitem,index) => { return subitem.id == item.id });
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
      async selectReleaseUser(record , value){

        try {
          if(Betools.tools.isNull(record)){
            const user = this.release_userlist.find((item,index) => {return this.release_userid == item.id}); //获取员工基本信息
            this.release_username = user.name;  //设置员工
            this.release_company = user.company;
            this.release_department = user.department;
            this.release_mobile = user.mobile;
            this.release_zone = user.zone;
            this.release_project = user.project;
            const temp = await query.queryUserInfoByMobile(user.mobile); //查询员工职务
            console.log(`temp: ${JSON.stringify(temp)}`);
            this.release_position = temp ? temp.position : ''; //设置员工职务
          } else {
            this.release_username = record.name;
            this.release_userid = record.id;
            this.release_company = record.company;
            this.release_department = record.department;
            this.release_mobile = record.mobile;
            this.release_zone = record.zone;
            this.release_project = record.project;
            const temp = await query.queryUserInfoByMobile(record.mobile); //查询员工职务
            console.log(`temp: ${JSON.stringify(temp)}`);
            this.release_position = temp ? temp.position : ''; //设置员工职务
          }
        } catch (error) {
          console.log(error);
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
            let user = await Betools.manage.queryUserByNameReward(user_admin_name.trim(),200);

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

      // 获取URL或者二维码信息
      async queryInfo() {

        try {

          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          //查询上一页
          this.back = Betools.tools.getUrlParam('back') || '/app';
          //查询type
          const type = Betools.tools.getUrlParam('type') || '0';

          //获取用户基础信息
          const userinfo = await Betools.storage.getStore('system_userinfo');

          this.item.apply_realname = userinfo.realname;
          this.item.apply_username = userinfo.username;

          //获取缓存信息
          const item = Betools.storage.getStore(`system_${this.tablename}_item#${this.item.type}#@${userinfo.realname}`);

          try {
            //自动回显刚才填写的用户基础信息
            if(item){
              this.item.create_by = item.create_by || this.item.create_by;
              this.item.remark = item.remark || this.item.remark;
              this.item.status = item.status || this.item.status;
            }

            if(userinfo.department && userinfo.department.name){
              this.item.department = userinfo.department.name;
              this.item.company = userinfo.parent_company.name;
            } else if(userinfo.systemuserinfo && userinfo.systemuserinfo.textfield1){
              let temp = userinfo.systemuserinfo.textfield1.split('||')[0];
              this.item.company = temp.split('>')[temp.split('>').length - 1];
              temp = userinfo.systemuserinfo.textfield1.split('||')[1];
              this.item.department = temp.split('>')[temp.split('>').length - 1];
            }
          } catch (error) {
            console.log(error);
          }

          try {
            //查询案件类型
            this.item.reward_type = workconfig.rewardtype[type];
          } catch (error) {
            console.log(error);
          }


        } catch (error) {
          console.log(error);
        }

      },
      // 计算奖惩金额
      caculateSum(){
        const sumValue = this.data.reduce(function(n1,n2){ //sum2 前两个数的和
            let v1 = 0 , v2 = 0;
            try {
              v1 = parseFloat(n1.amount || n1 || 0);
            } catch (error) {
              console.log(error);
            }
            try {
              v2 = parseFloat(n2.amount || n2 || 0)
            } catch (error) {
              console.log(error);
            }
            return v1 + v2 ;
        }, 0.00);
        const orgValue = this.item.amount;
        return {sumValue , orgValue};
      },

      // 用户提交入职登记表函数
      async handleApply() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //表单ID
        const id = Betools.tools.queryUniqueID();
        const type = Betools.tools.getUrlParam('type');

        //流程审批人员
        let wfUsers = '';  //流程审批人员
        let approver = ''; //最终审批人员

        //验证数据是否已经填写
        const keys = Object.keys({ title: '', company: '', department: '', content: '', amount: '', reward_type: '', reward_name: '', reward_period: '', hr_name: '', apply_realname: '' })

        const invalidKey =  keys.find(key => {
          const flag = this.validField(key);
          return !flag;
        });

        if(invalidKey != '' && invalidKey != null){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：${this.message[invalidKey]}！`,
          });
          return false;
        }

        // 如果案件明细数据为空，且不存在上传附件，提示请上传附件
        if((this.data == null || this.data.length == 0) && !this.item.files ){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：${this.message['files']}！`,
          });
          return false;
        }

        // 校验奖惩明细金额总额是否和申请奖金总额一致
        const sumValue = this.caculateSum().sumValue;
        const orgValue = this.caculateSum().orgValue;

        if( orgValue != sumValue){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `案件申请金额(${orgValue})和案件明细金额合计${sumValue}不一致，请仔细检查后在提交！`,
          });
          return false;
        }

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
          }
        }

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认提交此案件发起申请?",
            onOk: async() => {

                  //查询直接所在工作组，注意此处是案件人力经理管理员
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
                  const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/legalview?id=${id}&pid=&tname=bs_reward_apply&panename=myrewardlist&typename=hr_admin_ids&bpm_status=4&proponents=${user_group_ids}&role=hr`);

                  //第一步 保存用户数据到数据库中
                  const elem = {
                    id,
                    serialid:'',
                    create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    create_by: userinfo.username,
                    apply_date: dayjs().format('YYYY-MM-DD'),
                    title: this.item.title,
                    company: this.item.company,
                    department: this.item.department,
                    content: this.item.content,
                    remark: this.item.remark, //备注
                    amount: this.item.amount,
                    wflowid: '',
                    bpm_status: '', //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废
                    reward_type: this.item.reward_type,
                    reward_name: this.item.reward_name,
                    reward_period: this.item.reward_period,
                    reward_release_period: this.item.reward_release_period,
                    reward_release_feature: this.item.reward_release_feature,
                    hr_admin_ids: user_group_ids,
                    hr_admin_names: user_group_names,
                    hr_id: this.item.hr_id,
                    hr_name: this.item.hr_name,
                    apply_username: userinfo.username,
                    apply_realname: userinfo.realname,
                    files: this.item.files,
                    files_00: this.item.files_00,
                    files_01: this.item.files_01,
                    files_02: this.item.files_02,
                    files_03: this.item.files_03,
                    files_04: this.item.files_04,
                    files_05: this.item.files_05,
                    status: '待审批',
                  }; // 待处理元素

                  //第二步，向表单提交form对象数据
                  const result = await Betools.manage.postTableData(this.tablename , elem);

                  //提交此表单对应的案件明细数据
                  for(let item of this.data){
                    item.id = `${item.key}`;
                    item.unique_key = `${item.key}`;
                    item.create_by = userinfo.username;
                    item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
                    item.pid = id;
                    delete item.$id;
                    delete item.key;
                    delete item.v_status;
                    await Betools.manage.postTableData('bs_reward_items' , item);
                  }

                  //发送自动设置排序号请求
                  const patchResp = await superagent.get(workconfig.queryAPI.tableSerialAPI.replace('{table_name}', this.tablename)).set('accept', 'json');

                  //查询数据
                  const value = await query.queryTableData(this.tablename , id);

                  //显示序列号
                  this.item.serialid = value.serialid;
                  elem.serialid = value.serialid;

                  /************************  工作流程日志(开始)  ************************/
                  //向HR推送，HR确认后
                  await this.handleNotifyHR(user_group_ids , userinfo ,  value , receiveURL);

                  //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
                  await this.handleStartWFLog(this.tablename , elem , userinfo);

                  //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
                  await this.handleSubmitWF(userinfo , wfUsers , '' , approver , this.tablename , id , elem  , dayjs().format('YYYY-MM-DD HH:mm:ss'));

                  /************************  工作流程日志(结束)  ************************/

                  //设置状态
                  this.loading = false;
                  this.status = elem.status;
                  this.readonly = true;
                  this.role = 'view';

                  this.$toast.success('提交案件发起申请成功，请等待审批完成！');
               }
          });

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

      // 通知HR（人力薪资相关专职人员查看数据）
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
        // 显示加载状态
        this.loading = true;

        // 获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        // 表单ID
        const id = Betools.tools.queryUniqueID();
        const type = Betools.tools.getUrlParam('type');

        // 流程审批人员
        let wfUsers = '';  //流程审批人员
        let approver = ''; //最终审批人员

        // 验证数据是否已经填写
        const keys = Object.keys({ title: '', company: '', department: '', content: '', amount: '', reward_type: '', reward_name: '', reward_period: '', hr_name: '', apply_realname: ''})

        const invalidKey =  keys.find(key => {
          const flag = this.validField(key);
          return !flag;
        });

        if(invalidKey != '' && invalidKey != null){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：${this.message[invalidKey]}！`,
          });
          return false;
        }

        // 如果案件明细数据为空，且不存在上传附件，提示请上传附件
        if((this.data == null || this.data.length == 0) && !this.item.files ){
            await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：${this.message['files']}！`,
          });
          return false;
        }

        // 校验奖惩明细金额总额是否和申请奖金总额一致
        const sumValue = this.caculateSum().sumValue;
        const orgValue = this.caculateSum().orgValue;

        if( orgValue != sumValue){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `案件申请金额(${orgValue})和案件明细金额合计${sumValue}不一致，请仔细检查后在提交！`,
          });
          return false;
        }

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
          }
        }

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认保存此申请单?",
            onOk: async() => {
                  //查询直接所在工作组，注意此处是案件人力经理管理员
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
                  const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/reward?id=${id}&statustype=office&type=${type}&role=hr`);
                  //第一步 保存用户数据到数据库中
                  const elem = {
                    id,
                    serialid:'',
                    create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    create_by: userinfo.username,
                    apply_date: dayjs().format('YYYY-MM-DD'),
                    title: this.item.title,
                    company: this.item.company,
                    department: this.item.department,
                    content: this.item.content,
                    remark: this.item.remark, //备注
                    amount: this.item.amount,
                    wflowid: '',
                    bpm_status: '1', //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废 100：已驳回
                    reward_type: this.item.reward_type,
                    reward_name: this.item.reward_name,
                    reward_period: this.item.reward_period,
                    reward_release_period: this.item.reward_release_period,
                    reward_release_feature: this.item.reward_release_feature,
                    hr_admin_ids: user_group_ids,
                    hr_admin_names: user_group_names,
                    hr_id: this.item.hr_id,
                    hr_name: this.item.hr_name,
                    apply_username: userinfo.username,
                    apply_realname: userinfo.realname,
                    files: this.item.files,
                    files_00: this.item.files_00,
                    files_01: this.item.files_01,
                    files_02: this.item.files_02,
                    files_03: this.item.files_03,
                    files_04: this.item.files_04,
                    files_05: this.item.files_05,
                    status: '待审批',
                  }; // 待处理元素

                  //第二步，向表单提交form对象数据
                  const result = await Betools.manage.postTableData(this.tablename , elem);

                  //提交此表单对应的案件明细数据
                  for(let item of this.data){
                    item.id = `${item.key}`;
                    item.unique_key = `${item.key}`;
                    item.create_by = userinfo.username;
                    item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
                    item.pid = id;
                    delete item.$id;
                    delete item.key;
                    delete item.v_status;
                    await Betools.manage.postTableData('bs_reward_items' , item);
                  }

                  //发送自动设置排序号请求
                  const patchResp = await superagent.get(workconfig.queryAPI.tableSerialAPI.replace('{table_name}', this.tablename)).set('accept', 'json');

                  //查询数据
                  const value = await query.queryTableData(this.tablename , id);

                  //显示序列号
                  this.item.serialid = value.serialid;
                  elem.serialid = value.serialid;

                  //第三步 向HR推送，HR确认后 保存数据，不推送HR知晓
                  //await this.handleNotifyHR(user_group_ids , userinfo ,  value , receiveURL);

                  /************************  工作流程日志(开始)  ************************/

                  //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
                  await this.handleStartWFLog(this.tablename , elem , userinfo);

                  /************************  工作流程日志(结束)  ************************/

                  //设置状态
                  this.loading = false;
                  this.status = elem.status;
                  this.readonly = true;
                  this.role = 'view';

                  this.$toast.success('保存奖惩申请成功！');
               }
          });

      },

      // 执行案件明细分配函数
      async rewardRelease(){

        if(!this.item.amount){
          return this.$toast.fail('请先输入申请奖金总额！');
        }
        if(!this.release_amount){
          return this.$toast.fail('请输入案件明细的分配金额！');
        }
        if(!this.item.reward_release_feature){
          return this.$toast.fail('请输入案件申请的分配性质！');
        }
        if(!this.item.reward_release_period){
          return this.$toast.fail('请输入案件申请的发放周期！');
        }
        if(!/^[0-9]+.{0,1}[0-9]{0,2}$/g.test(this.release_amount)){
          return this.$toast.fail('请在分配金额处输入数字！');
        }

        if(/[,|，]/.test(this.release_username)){ //如果包含逗号，则表示批量添加

          const list = this.release_username.split(/[,|，]/);

          for(const username of list){
            try {
              let user = await Betools.manage.queryUserByNameReward(username.trim(),200);
              user = user[0];
              const temp = Betools.tools.queryZoneProjectAll(user.textfield1.split('||')[0], ['领地集团有限公司','领悦服务','宝瑞商管','医疗健康板块', '金融板块' ,'邛崃创达公司'], user.textfield1.split('||')[1]);
              const temp_ = await query.queryUserInfoByMobile(user.mobile); //查询员工职务
              await this.rewardAddUser(username , user.loginid , temp.company , temp.department , temp.zone , temp.project , temp_.position , this.release_amount);
            } catch (error) {
              console.log(error);
            }
          }

        } else {//如果不包含逗号，则使用默认方式
          try {
            if(this.release_username && !this.release_userid){
              return this.$toast.fail('未找到此分配人员，请确认分配人员是否为公司员工！');
            }
            if(!this.release_username || !this.release_userid){
              return this.$toast.fail('请输入案件明细的分配人员，并选择下拉列表中人员！');
            }
            await this.rewardAddUser(this.release_username , this.release_userid , this.release_company , this.release_department , this.release_zone , this.release_project , this.release_position , this.release_amount);
          } catch (error) {
            console.log(error);
          }
        }

        try {
          this.release_userlist = [];
          this.release_username = '';
          this.release_amount = '';
          this.release_company = '';
          this.release_department = '';
          this.release_position = '';
          this.release_userid = '';
          this.release_mobile = '';
        } catch (error) {
          console.log(error);
        }

      },

      async rewardAddUser(username = this.release_username, userid = this.release_userid , company = this.release_company , department = this.release_department , zone , project , position = this.release_position , amount = this.release_amount){

          try {
            //查询用户数据是否已经被分配过
            const findElem = this.data.find( item => {
              return item.username == username && item.account == userid;
            })
            //用户数据已经被分配过，无法再次分配
            if(findElem && findElem.username == username && findElem.account == userid){
              await vant.Dialog.confirm({
                title: '温馨提示',
                message: `用户(${username})已经在奖惩分配列表中，请确认添加奖惩明细！`,
              });
              let ratio = Betools.tools.divisionPercentage(amount , this.item.amount);
              return this.data.push({
                key: Betools.tools.queryUniqueID(),
                type: this.item.reward_release_feature,
                period: this.item.reward_release_period,
                username: username,
                account: userid,
                company: company,
                department: department,
                position: position,
                mobile: '',
                amount: `${parseFloat(amount).toFixed(2)}`,
                ratio,
                zone,
                project,
                message:'',
                v_status: 'valid',
              });
            }
          } catch (error) {
            console.log(error);
          }

          try {
            let ratio = Betools.tools.divisionPercentage(amount , this.item.amount);
            this.data.push({
              key: Betools.tools.queryUniqueID(),
              type: this.item.reward_release_feature,
              period: this.item.reward_release_period,
              username: username,
              account: userid,
              company: company,
              department: department,
              position: position,
              mobile: '',
              amount: `${parseFloat(amount).toFixed(2)}`,
              ratio,
              zone,
              project,
              message:'',
              v_status: 'valid',
            });
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

  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";


#reward-download-excel-button {
    background-image: linear-gradient(to right, #f96033, red);
    margin: 10px 10px 10px 10px;
    padding: 1px 20px;
    border-radius: 8px;
    color: #f0f0f0;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    height: 27px;
    line-height: 27px;
}

#reward-items-download-excel-button {
    background-image: linear-gradient(to right, #f96033, red);
    margin: 10px 10px 10px 10px;
    padding: 1px 20px;
    border-radius: 8px;
    color: #f0f0f0;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    height: 27px;
    line-height: 27px;
}

</style>
