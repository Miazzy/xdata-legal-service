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

            <!-- 案件申请 -->
            <div style="background-color:#f0f0f0;">

              <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 2.5rem; margin-right: 2.5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  {{ legal.legalTname }}案件发起申请
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
                      <a-input v-model="legal.title" :readonly='false' placeholder="请填写本案件流程标题！" @blur="validFieldToast('title')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件编号</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.caseID" :readonly='false' placeholder="请输入案件编号！" @blur="validFieldToast('caseID')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件类别</span>
                    </a-col>
                    <a-col :span="8">
                      <a-select  v-model="legal.legalType" default-value="一般案件" @blur="validFieldToast('legalType')"  placeholder="请选择案件类别！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                        <a-select-option value="一般案件">
                          一般案件
                        </a-select-option>
                        <a-select-option value="重大案件">
                          重大案件
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
                      <a-cascader v-model="legal.zone" :options="options.zoneOptions" placeholder="请选择所属区域" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属项目</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.zoneProject" :readonly='false' placeholder="请选择所属项目！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      诉讼信息
                    </a-col>
                   </a-row>
                </div>

                <div id="van-user-list" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案由信息</span>
                    </a-col>
                    <a-col :span="8">
                      <a-cascader v-model="legal.caseType" :options="options.causeOptions" placeholder="请选择一级案由/二级案由信息！" @blur="validFieldToast('caseType')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>程序阶段</span>
                    </a-col>
                    <a-col :span="8">
                      <a-select  v-model="legal.stage" default-value="一审阶段" @blur="validFieldToast('stage')"  placeholder="请选择当前案件程序阶段（一审/二审/执行/再审）！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
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
                      </a-select>
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>业务接收时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.receiveTime" :default-value="options.datetime" placeholder="请输入业务部门接收时间！" @blur="validFieldToast('receiveTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>法律接收时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.lawRTime" :default-value="options.datetime" placeholder="请输入法律部门接收时间！" @blur="validFieldToast('lawRTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼发起人</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.accuser" placeholder="请输入诉讼发起人(原告/上诉人)！" @blur="validFieldToast('accuser')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>应诉人</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.defendant" placeholder="请输入应诉人(被告/被上诉人)！" @blur="validFieldToast('defendant')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>第三人</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.thirdParty" placeholder="请输入第三人！" @blur="validFieldToast('thirdParty')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>受理时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.handledTime" placeholder="请输入法院受理时间！" @blur="validFieldToast('handledTime')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼请求</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="legal.remark"
                        placeholder="请输入案件的诉讼请求！"
                        :auto-size="{ minRows: 10, maxRows: 100 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      涉案金额
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼本金</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.claimsCapital" placeholder="请输入诉讼本金！" @blur="validFieldToast('claimsCapital')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼违约金</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.claimsDedit" placeholder="请输入诉讼违约金！" @blur="validFieldToast('claimsDedit')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼标的额</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.claimsBidSum" placeholder="请输入诉讼标的额！" @blur="validFieldToast('claimsBidSum')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      律师信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>外部律所</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.externalFlag" placeholder="请选择是否聘用外部律所" @blur="validFieldToast('externalFlag')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师事务所</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.lawOffice" placeholder="请输入外聘律师事务所！" @blur="validFieldToast('lawOffice')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>委托时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.lawOfficeTime" placeholder="请选择外聘律所委托时间！" @blur="validFieldToast('lawOfficeTime')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>外聘律师</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.lawyer" placeholder="请输入外聘律师！" @blur="validFieldToast('lawyer')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>联系电话</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.lawyerMobile" placeholder="请输入律师联系电话！" @blur="validFieldToast('lawyerMobile')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      法院信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>受理法院</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.court"  placeholder="请输入受理法院！" @blur="validFieldToast('court')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>承办法官</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.judge"  placeholder="请输入承办法官！" @blur="validFieldToast('judge')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>法官联系方式</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.judgeMobile"  placeholder="请输入承办法官联系方式！" @blur="validFieldToast('judgeMobile')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>内部律师</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.inHouseLawyers"  placeholder="请输入内部律师！" @blur="validFieldToast('inHouseLawyers')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>外部律师</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.outHouseLawyers"  placeholder="请输入外部律师！" @blur="validFieldToast('outHouseLawyers')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>                

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      事项披露
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="height:auto;margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row style="height:auto;">
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>事项披露</span>
                    </a-col>
                    <a-col :span="20" style="height:auto;">
                      <a-textarea
                        v-model="legal.disclosure"
                        @blur="validFieldToast('disclosure')"
                        placeholder="请输入本诉讼案件中的重大事项披露！"
                        :auto-size="{ minRows: 10, maxRows: 50 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      案件进展
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件进展</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="legal.lawcase"
                        placeholder="请输入本案件的案件进展！"
                        :auto-size="{ minRows: 10, maxRows: 50 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
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
        zoneOptions:JSON.parse(`[{"label":"融量集团","value":"融量集团","children":[{"label":"融量集团总部","value":"融量集团总部"},{"label":"地产板块","value":"地产板块","children":[{"label":"领地集团总部","value":"领地集团总部"},{"label":"重庆区域","value":"重庆区域"},{"label":"两湖区域","value":"两湖区域"},{"label":"川北区域","value":"川北区域"},{"label":"成都区域","value":"成都区域"},{"label":"川南区域","value":"川南区域"},{"label":"中原区域","value":"中原区域"},{"label":"攀西区域","value":"攀西区域"},{"label":"新疆区域","value":"新疆区域"},{"label":"大湾区域","value":"大湾区域"},{"label":"北京区域","value":"北京区域"},{"label":"园林公司","value":"园林公司"}]},{"label":"金融板块","value":"金融板块","children":[{"label":"量石投资","value":"量石投资"}]},{"label":"物业板块","value":"物业板块","children":[{"label":"领悦集团总部","value":"领悦集团总部"},{"label":"川南区域","value":"川南区域"},{"label":"商写事业部","value":"商写事业部"},{"label":"川北区域","value":"川北区域"},{"label":"新疆区域","value":"新疆区域"},{"label":"攀西区域","value":"攀西区域"},{"label":"长春区域","value":"长春区域"},{"label":"大湾区域","value":"大湾区域"},{"label":"郑州荆州区域","value":"郑州荆州区域"},{"label":"贵阳区域","value":"贵阳区域"},{"label":"佳美物业公司","value":"佳美物业公司"}]},{"label":"医疗健康板块","value":"医疗健康板块","children":[{"label":"健康事业部","value":"健康事业部"},{"label":"至诚和爱健管中心","value":"至诚和爱健管中心"},{"label":"高康国际医院","value":"高康国际医院"}]},{"label":"商业板块","value":"商业板块","children":[{"label":"宝瑞商管","value":"宝瑞商管"}]},{"label":"合作方财务公司","value":"合作方财务公司","children":[{"label":"共享财务中心","value":"共享财务中心"}]}]}]`),
        causeOptions:JSON.parse(`[{"label":"人格权纠纷","value":"人格权纠纷","children":[{"label":"名誉权纠纷","value":"名誉权纠纷"},{"label":"其他人格权纠纷","value":"其他人格权纠纷"}]},{"label":"物权纠纷","value":"物权纠纷","children":[{"label":"物权确认纠纷","value":"物权确认纠纷"},{"label":"排除妨害纠纷","value":"排除妨害纠纷"},{"label":"恢复原状纠纷","value":"恢复原状纠纷"},{"label":"返还原物纠纷","value":"返还原物纠纷"},{"label":"业主知情权纠纷","value":"业主知情权纠纷"},{"label":"相邻关系纠纷","value":"相邻关系纠纷"},{"label":"业主共有权纠纷","value":"业主共有权纠纷"},{"label":"建设用地使用权纠纷","value":"建设用地使用权纠纷"},{"label":"抵押权纠纷","value":"抵押权纠纷"}]},{"label":"合同纠纷、准合同纠纷","value":"合同纠纷、准合同纠纷","children":[{"label":"确认合同效力纠纷","value":"确认合同效力纠纷"},{"label":"房屋买卖合同纠纷","value":"房屋买卖合同纠纷"},{"label":"其他买卖合同纠纷","value":"其他买卖合同纠纷"},{"label":"租赁合同纠纷","value":"租赁合同纠纷"},{"label":"建设工程合同纠纷","value":"建设工程合同纠纷"},{"label":"物业服务合同纠纷-公共收益返还","value":"物业服务合同纠纷-公共收益返还"},{"label":"物业服务合同纠纷-返水纠纷","value":"物业服务合同纠纷-返水纠纷"},{"label":"物业服务合同纠纷-进退场纠纷","value":"物业服务合同纠纷-进退场纠纷"},{"label":"物业服务合同纠纷-物业服务费纠纷","value":"物业服务合同纠纷-物业服务费纠纷"},{"label":"物业服务合同纠纷-其他","value":"物业服务合同纠纷-其他"},{"label":"中介合同纠纷","value":"中介合同纠纷"},{"label":"劳务合同纠纷","value":"劳务合同纠纷"},{"label":"无因管理、不当得利纠纷","value":"无因管理、不当得利纠纷"},{"label":"追偿权纠纷","value":"追偿权纠纷"},{"label":"其他合同纠纷","value":"其他合同纠纷"},{"label":"缔约过失责任纠纷","value":"缔约过失责任纠纷"},{"label":"预约合同纠纷","value":"预约合同纠纷"},{"label":"建设用地使用权合同纠纷","value":"建设用地使用权合同纠纷"},{"label":"股权合作合同纠纷","value":"股权合作合同纠纷"},{"label":"委托开发合同纠纷","value":"委托开发合同纠纷"},{"label":"其他投资合同纠纷","value":"其他投资合同纠纷"},{"label":"商品房预约合同纠纷","value":"商品房预约合同纠纷"},{"label":"商品房销/预售合同纠纷-逾期交房纠纷","value":"商品房销/预售合同纠纷-逾期交房纠纷"},{"label":"商品房销/预售合同纠纷-逾期整改纠纷","value":"商品房销/预售合同纠纷-逾期整改纠纷"},{"label":"商品房销/预售合同纠纷-逾期办证纠纷","value":"商品房销/预售合同纠纷-逾期办证纠纷"},{"label":"商品房销/预售合同纠纷-退房纠纷","value":"商品房销/预售合同纠纷-退房纠纷"},{"label":"商品房销/预售合同纠纷-交付不符纠纷","value":"商品房销/预售合同纠纷-交付不符纠纷"},{"label":"商品房销/预售合同纠纷-房屋质量纠纷","value":"商品房销/预售合同纠纷-房屋质量纠纷"},{"label":"商品房销/预售合同纠纷-分包销合同纠纷","value":"商品房销/预售合同纠纷-分包销合同纠纷"},{"label":"商品房销/预售合同纠纷-用益物权纠纷（使用权转让）","value":"商品房销/预售合同纠纷-用益物权纠纷（使用权转让）"},{"label":"商品房销/预售合同纠纷-断供纠纷","value":"商品房销/预售合同纠纷-断供纠纷"},{"label":"商品房销/预售合同纠纷-其他纠纷","value":"商品房销/预售合同纠纷-其他纠纷"},{"label":"销售代理（中介)合同纠纷","value":"销售代理（中介)合同纠纷"},{"label":"营销广告合同纠纷","value":"营销广告合同纠纷"},{"label":"借款（民间借贷）/金融贷款合同纠纷","value":"借款（民间借贷）/金融贷款合同纠纷"},{"label":"建设工程合同纠纷-工程质量纠纷","value":"建设工程合同纠纷-工程质量纠纷"},{"label":"建设工程合同纠纷-欠付工程款纠纷","value":"建设工程合同纠纷-欠付工程款纠纷"},{"label":"建设工程合同纠纷-工程结算纠纷","value":"建设工程合同纠纷-工程结算纠纷"},{"label":"建设工程合同纠纷-质保金纠纷","value":"建设工程合同纠纷-质保金纠纷"},{"label":"建设工程合同纠纷-其他纠纷","value":"建设工程合同纠纷-其他纠纷"},{"label":"演出合同纠纷","value":"演出合同纠纷"},{"label":"无因管理纠纷","value":"无因管理纠纷"},{"label":"不当得利纠纷","value":"不当得利纠纷"}]},{"label":"劳动争议","value":"劳动争议","children":[{"label":"解除劳动合同纠纷","value":"解除劳动合同纠纷"},{"label":"确认劳动关系纠纷","value":"确认劳动关系纠纷"},{"label":"追索劳动报酬纠纷","value":"追索劳动报酬纠纷"},{"label":"竞业限制纠纷","value":"竞业限制纠纷"},{"label":"社会保险纠纷","value":"社会保险纠纷"},{"label":"工伤工亡纠纷","value":"工伤工亡纠纷"},{"label":"劳务派遣合同纠纷","value":"劳务派遣合同纠纷"},{"label":"其他劳动争议","value":"其他劳动争议"}]},{"label":"与公司、证券、保险、票据等有关的民事纠纷","value":"与公司、证券、保险、票据等有关的民事纠纷","children":[{"label":"请求变更公司登记纠纷","value":"请求变更公司登记纠纷"},{"label":"股权转让纠纷","value":"股权转让纠纷"},{"label":"股东知情权纠纷","value":"股东知情权纠纷"},{"label":"公司决议纠纷","value":"公司决议纠纷"},{"label":"公司盈余分配纠纷","value":"公司盈余分配纠纷"},{"label":"损害股东利益责任纠纷","value":"损害股东利益责任纠纷"},{"label":"损害公司利益责任纠纷","value":"损害公司利益责任纠纷"},{"label":"股东出资纠纷","value":"股东出资纠纷"},{"label":"股权激励纠纷","value":"股权激励纠纷"},{"label":"公司解散纠纷","value":"公司解散纠纷"},{"label":"其他与公司有关的纠纷","value":"其他与公司有关的纠纷"},{"label":"证券纠纷","value":"证券纠纷"},{"label":"保险合同纠纷","value":"保险合同纠纷"},{"label":"保险人代位求偿权纠纷","value":"保险人代位求偿权纠纷"}]},{"label":"著作权侵权纠纷","value":"著作权侵权纠纷","children":[{"label":"著作权侵权纠纷","value":"著作权侵权纠纷"}]},{"label":"侵权责任纠纷","value":"侵权责任纠纷","children":[{"label":"提供劳务致侵权纠纷","value":"提供劳务致侵权纠纷"},{"label":"网络侵权责任纠纷","value":"网络侵权责任纠纷"},{"label":"违反安全保障义务责任纠纷","value":"违反安全保障义务责任纠纷"},{"label":"生命权、身体权、健康权纠纷","value":"生命权、身体权、健康权纠纷"},{"label":"高空抛物、坠物致人身或财产损害责任纠纷","value":"高空抛物、坠物致人身或财产损害责任纠纷"},{"label":"其他致人或致财物损害的侵权责任纠纷","value":"其他致人或致财物损害的侵权责任纠纷"}]},{"label":"知识产权与竞争纠纷","value":"知识产权与竞争纠纷","children":[{"label":"知识产权与竞争纠纷","value":"知识产权与竞争纠纷"}]},{"label":"非讼程序案件案由","value":"非讼程序案件案由","children":[{"label":"公司清算案件","value":"公司清算案件"},{"label":"第三人撤销之诉","value":"第三人撤销之诉"},{"label":"执行程序中的异议之诉","value":"执行程序中的异议之诉"}]}]`),
      },
      legal:{
        id :'', // varchar(36) not null comment '系统编号' primary key,
        title :'', // varchar(64) not null comment '流程标题',
        xid :'', // varchar(36) default '' not null comment '更新ID',
        create_time: dayjs().format('YYYY-MM-DD'), // timestamp    default CURRENT_TIMESTAMP not null comment '填报日期',
        create_by :'', // varchar(32)  default '' not null comment '填报人员',
        legalType :'一般案件', // varchar(36)  default '一般案件' not null comment '案件类别 100 一般案件 200 重大案件',
        plate :'地产板块', // varchar(32)  default '' not null comment '所属板块',
        firm :'', // varchar(128) default '' not null comment '公司名称',
        legalTname:'', // comment '案件类型 起诉/应诉',
        zone :'', // varchar(128) default '' not null comment '所属区域',
        zoneProject :'', // varchar(128) default '' not null comment '区域项目名称',
        caseID :'', // varchar(64)  default '' not null comment '案件编号',
        caseType :'', // varchar(64)  default '' not null comment '一级案由',
        caseSType :'', // varchar(64)  default '' not null comment '二级案由',
        stage :'一审阶段', // varchar(64)  default '' not null comment '程序阶段',
        receiveTime: '', // timestamp    default CURRENT_TIMESTAMP not null comment '业务部门接收时间',
        lawRTime: '', // timestamp    default CURRENT_TIMESTAMP not null comment '法律部门接收时间',
        accuser :'', // varchar(64)  default '' not null comment '诉讼发起人(原告/上诉人)',
        defendant :'', // varchar(64)  default '' not null comment '应诉人(被告/被上诉人)',
        thirdParty :'', // varchar(64)  default '' not null comment '第三人 third_party',
        handledTime :'', // varchar(32)  default '' not null comment '法院受理时间',
        externalFlag :'', // varchar(2)   default 'N' not null comment '是否聘用外部律所',
        lawOffice :'', // varchar(64)  default '' not null comment '外聘律师',
        lawOfficeTime :'', // varchar(16)  default '' not null comment '外聘律所委托时间',
        lawyer :'', // varchar(64)  default '' not null comment '外聘律师',
        lawyerMobile :'', // varchar(16)  default '' not null comment '律师联系电话',
        claims :'' , // text not null comment '诉讼请求',
        claimsCapital :'', // varchar(32)  default '' not null comment '诉讼本金',
        claimsDedit :'', // varchar(32)  default '' not null comment '诉讼违约金',
        claimsBidSum :'', // varchar(32)  default '' not null comment '诉讼标的额',
        court :'', // varchar(64)  default '' not null comment '受理法院',
        judge :'', // varchar(64)  default '' not null comment '承办法官',
        judgeMobile :'', // varchar(16)  default '' not null comment '承办法官联系方式',
        inHouseLawyers :'', // varchar(64)  default '' not null comment '承办人员 内部律师',
        outHouseLawyers :'', // varchar(64)  default '' not null comment '承办人员 外部律师',
        disclosure :'', // text not null comment '诉讼中重大事项披露',
        lawcase :'' ,// text not null comment '案件进展',
        lastTime :'' , // timestamp default CURRENT_TIMESTAMP not null comment '最后修改时间',
        lastModifier :'', // varchar(32)  default '' not null comment '最后修改人员',
        legalStatus :'', // varchar(32)  default '' not null comment '案件状态 ',

        fstEvidence :'', // varchar(64)  default '' not null comment '一审举证期限',
        fstCourtDate :'', // varchar(32)  default '' not null comment '一审开庭时间',
        fstPlan :'', // varchar(256) default '' not null comment '一审诉讼预案',
        fstReason :'', // varchar(256) default '' not null comment '一审未填写原因',
        fstConform :'', // varchar(2)   default 'Y' not null comment '一审与预案是否相符',
        fstUnConformReasom :'', // varchar(256) default '' not null comment '一审不符原因',
        fstDetractionSum :'', // varchar(32)  default '' not null comment '一审减损金额',
        fstValid :'', // varchar(2) default 'Y' not null comment '一审是否生效',
        fstAppeal :'', // varchar(2) default 'N' not null comment '一审是否上诉',
        fstAppealTime :'', // varchar(32) default '' not null comment '一审上诉期',

        secEvidence :'', // varchar(64) default '' not null comment '二审举证期限',
        secCourtDate :'', // varchar(32) default '' not null comment '二审开庭时间',
        secPlan :'', // varchar(256) default '' not null comment '二审诉讼预案',
        secReason :'', // varchar(256) default '' not null comment '二审未填写原因',
        secConform :'', // varchar(2)   default 'Y' not null comment '二审与预案是否相符',
        secUnConformReasom:'', // varchar(256) default '' not null comment '二审不符原因',
        secDetractionSum:'', // varchar(32)  default '' not null comment '二审减损金额',
        secValid :'', // varchar(2)   default 'Y' not null comment '二审是否生效',
        secAppeal :'', // varchar(2)   default 'N' not null comment '二审是否上诉',
        secAppealTime :'', // varchar(32)  default '' not null comment '二审上诉期',

        reviewEvidence :'', // varchar(64)  default '' not null comment '再审举证期限',
        reviewCourtDate:'', // varchar(32)  default '' not null comment '再审开庭时间',
        reviewPlan :'', // varchar(256) default '' not null comment '再审诉讼预案',
        reviewReason :'', // varchar(256) default '' not null comment '再审未填写原因',
        reviewConform :'', // varchar(2)   default 'Y' not null comment '再审与预案是否相符',
        reviewUnConformReasom:'', // varchar(256) default '' not null comment '再审不符原因',
        reviewDetractionSum:'',// varchar(32)  default '' not null comment '再审减损金额',
        reviewValid :'', // varchar(2)   default 'Y' not null comment '再审是否生效',
        reviewAppeal :'', // varchar(2)   default 'N' not null comment '再审是否上诉',
        reviewAppealTime:'', // varchar(32)  default '' not null comment '再审上诉期',

        closeDate :'', // varchar(32)  default '' not null comment '结案日期',
        archiveDate :'', // varchar(32)  default '' not null comment '归档日期',
        progress :'', // text not null comment '办理进展'
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
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'案件管控',path:'/legal/workspace'},{icon:'form',text:'案件发起',path:''}],
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
      async onDelete(){
        console.log('delete');
      },
      // 执行页面跳转
      async redirectView(path) {
          Betools.tools.isNull(path) ? null: this.$router.push(path);
      },
      // 文件update事件
      async onUpdate(records){

      },
      // Excel文件解析成功
      async onSuccess(data, file, ratio = 0.00, zone = '', project = '' , regexp = /[\ |‘|’|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g){
        
      },
      // 文件change事件
      async onChange(event) {
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
        this.legal.files = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 获取处理日志
      async queryProcessLog(){
        const id = Betools.tools.getUrlParam('id');
        try {
          this.processLogList = await workflow.queryPRLogHistoryByDataID(id);
          this.processLogList.map(item => { legal.create_time = dayjs(legal.create_time).format('YYYY-MM-DD HH:mm') });
          this.processLogList.sort();
        } catch (error) {
          console.log(error);
        }
      },
      // 删除处理日志
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
          return legal.id == id && legal.pid == pid;
        });
        if(tlist.length > 0){
          //同时删除本条待办记录当前(印章管理员)
          await workflow.deleteViewProcessLog(tlist);
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
      //用户选择知会人员
      async queryNotifyMan(){
        //获取盖章人信息
        const user_admin_name = this.legal.hr_name;
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
                  this.legal.hr_name = user[0].lastname;
                  //当前盖印人编号
                  this.legal.hr_id = this.userid = user[0].loginid;
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
                  this.userList.push({id:user.loginid , name:user.lastname , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.legal.dealMail, isDefault: !this.userList.length });
                  //获取盖印人姓名
                  this.legal.hr_name = user.lastname;
                  //当前盖印人编号
                  this.legal.hr_id = this.userid = user.loginid;
                } catch (error) {
                  console.log(error);
                }
              }
              //遍历去重
              try {
                this.userList = this.userList.filter((item,index) => {
                  legal.isDefault = index == 0 ? true : false;
                  let findex = this.userList.findIndex((subitem,index) => { return sublegal.id == legal.id });
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
        const user = this.userList.find((item,index) => {return this.legal.hr_id == legal.id});
        this.legal.hr_name = user.name;
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
                  this.release_userlist.push({id:user.loginid , name:user.lastname , mobile:elem.mobile, tel:mobile , zone: temp.zone , project: temp.project , address: company + "||" + user.textfield1.split('||')[1] , company: temp.company , department: temp.department , mail: this.legal.dealMail, isDefault: !this.release_userlist.length }); //将用户数据推送至对方数组
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
                  legal.isDefault = index == 0 ? true : false;
                  let findex = this.release_userlist.findIndex((subitem,index) => { return sublegal.id == legal.id });
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
            const user = this.release_userlist.find((item,index) => {return this.release_userid == legal.id}); //获取员工基本信息
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
                  this.approve_userlist.push({id:user.loginid , name:user.lastname , mobile:elem.mobile, tel:mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.legal.dealMail, isDefault: !this.release_userlist.length });

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
                  legal.isDefault = index == 0 ? true : false;
                  let findex = this.approve_userlist.findIndex((subitem,index) => { return sublegal.id == legal.id });
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
        const user = this.approve_userlist.find((item,index) => {return this.approve_userid == legal.id});
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

      // 查询基础信息
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
          const legal = Betools.storage.getStore(`system_${this.tablename}_item#${this.legal.type}#@${userinfo.realname}`); //获取缓存信息
          const id = this.id = Betools.tools.getUrlParam('id');
          if(!Betools.tools.isNull(id)){
            return this.legal = await this.handleList(this.tablename , id);
          } else {
            try {
              if(legal){ //自动回显刚才填写的用户基础信息
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
            } catch (error) {
              console.log(error);
            }
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
