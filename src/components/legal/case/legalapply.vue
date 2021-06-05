<template>
  
  <div id="reward-home">

      <div style="background-color:#f0f0f0;">

      <a-menu v-if="userinfo" mode="horizontal">
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper" >
              <a-avatar :src="userinfo && userinfo.avatar ? userinfo.avatar : '' " style="margin-left:0.25rem; margin-right:0.55rem;" />
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
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件类别</span>
                    </a-col>
                    <a-col :span="8">
                      <a-select  v-model="legal.caseSType" default-value="起诉案件" @blur="validFieldToast('caseSType')"  placeholder="请选择案件类别！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                        <a-select-option value="起诉案件">
                          起诉案件
                        </a-select-option>
                        <a-select-option value="应诉案件">
                          应诉案件
                        </a-select-option>
                      </a-select>
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件级别</span>
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
                      <a-date-picker v-model="legal.handledTime" :default-value="options.datetime" placeholder="请输入法院受理时间！" @blur="validFieldToast('handledTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
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
                        :auto-size="{ minRows: 5, maxRows: 100 }"
                        style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼标的额</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.claimsBidSum" placeholder="请输入诉讼标的额！" @blur="validFieldToast('claimsBidSum')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>诉讼本金</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.claimsCapital" placeholder="请输入诉讼本金！" @blur="validFieldToast('claimsCapital')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
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
                      <a-select  v-model="legal.externalFlag" default-value="是" @blur="validFieldToast('externalFlag')"  placeholder="请选择是否聘用外部律所" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                      </a-select>
                    </a-col>
                  </a-row>
                </div>

                <div v-if="legal.externalFlag == '是' " class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师事务所</span>
                    </a-col>
                    <a-col :span="8">
                      <a-auto-complete :data-source="firmNamelist" v-model="legal.lawOffice" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width:100%; border-width: 0px 0px 1px; border-style: solid; border-color: rgb(254, 254, 254) rgb(254, 254, 254) rgb(240, 240, 240); border-image: initial;"  placeholder="请输入律所名称！" :filter-option="filterOption" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>委托时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.lawOfficeTime" :default-value="options.datetime" placeholder="请选择外聘律所委托时间！" @blur="validFieldToast('lawOfficeTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div v-if="legal.externalFlag == '是' " class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>外聘律师</span>
                    </a-col>
                    <a-col :span="8">
                      <a-auto-complete :data-source="lawyerNamelist" v-model="legal.lawyer" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width:100%; border-width: 0px 0px 1px; border-style: solid; border-color: rgb(254, 254, 254) rgb(254, 254, 254) rgb(240, 240, 240); border-image: initial;"  placeholder="请输入外聘律师！" :filter-option="filterOption" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师联系电话</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.lawyerMobile" placeholder="请输入外聘律师联系电话！" @blur="validFieldToast('lawyerMobile')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>内部律师</span>
                    </a-col>
                    <a-col :span="8">
                      <a-auto-complete :data-source="lawyerInNamelist" v-model="legal.inHouseLawyers" @blur="validFieldToast('inHouseLawyers')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width:100%; border-width: 0px 0px 1px; border-style: solid; border-color: rgb(254, 254, 254) rgb(254, 254, 254) rgb(240, 240, 240); border-image: initial;"  placeholder="请输入内部律师！" :filter-option="filterOption" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师联系电话</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.inHouseLawyersMobile"  placeholder="请输入内部律师联系电话！" @blur="validFieldToast('inHouseLawyersMobile')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
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

                <div id="legal-apply-content-court" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>受理法院</span>
                    </a-col>
                    <a-col :span="20">
                      <a-cascader id="legal-apply-content-court-cascader"  v-model="legal.court" :options="options.courtOptions" placeholder="请输入受理法院！" @blur="validFieldToast('court')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
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
                        :auto-size="{ minRows: 1, maxRows: 5 }"
                        style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>
                
                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      {{ stage == 'evaluate' ? '案件评价' : '案件周期'}}
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;padding-left:70px;" >
                      <a-tabs default-active-key="1" @change="callback">

                        <template v-if="stage != 'evaluate' ">
                        <a-tab-pane v-if="stage != 'evaluate' " key="1" tab="一审管理" style="margin-left:-35px;">

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px;margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>举证截止日</span>
                              </a-col>
                              <a-col :span="8">
                                <a-date-picker v-model="legal.fstEvidence" :default-value="options.datetime" placeholder="请输入举证截止日！" @blur="validFieldToast('receiveTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>开庭时间</span>
                              </a-col>
                              <a-col :span="8">
                                <a-date-picker v-model="legal.fstCourtDate" :default-value="options.datetime" placeholder="请输入开庭时间！" @blur="validFieldToast('lawRTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>诉讼预案</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.fstPlan" :options="options.zoneOptions" placeholder="请输入诉讼预案" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>未填写原因</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.fstReason" :readonly='false' placeholder="请输入未填写原因！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>与预案是否相符</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.fstConform" :options="options.zoneOptions" placeholder="请输入与预案是否相符！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>不符原因</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.fstUnConformReasom" :readonly='false' placeholder="请输入不符原因！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>减损金额</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.fstDetractionSum" :options="options.zoneOptions" placeholder="请输入减损金额！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>裁判生效</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.fstValid" :readonly='false' placeholder="请输入裁判生效情况！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>上诉</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.fstAppeal" :options="options.zoneOptions" placeholder="请输入上诉情况！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>上诉截止日</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.fstAppealTime" :readonly='false' placeholder="请输入上诉截止日！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>


                        </a-tab-pane>
                        <a-tab-pane v-if="stage != 'evaluate' " key="2" tab="二审管理">

                          <div v-show=" '|二审阶段|再审阶段|执行阶段|结案闭单|'.includes(legal.stage) ">
                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px;margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>举证截止日</span>
                              </a-col>
                              <a-col :span="8">
                                <a-date-picker v-model="legal.secEvidence" :default-value="options.datetime" placeholder="请输入举证截止日！" @blur="validFieldToast('receiveTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>开庭时间</span>
                              </a-col>
                              <a-col :span="8">
                                <a-date-picker v-model="legal.secCourtDate" :default-value="options.datetime" placeholder="请输入开庭时间！" @blur="validFieldToast('lawRTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>诉讼预案</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.secPlan" :options="options.zoneOptions" placeholder="请输入诉讼预案" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>未填写原因</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.secReason" :readonly='false' placeholder="请输入未填写原因！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>与预案是否相符</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.secConform" :options="options.zoneOptions" placeholder="请输入与预案是否相符！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>不符原因</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.secUnConformReasom" :readonly='false' placeholder="请输入不符原因！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>减损金额</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.secDetractionSum" :options="options.zoneOptions" placeholder="请输入减损金额！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>裁判生效</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.secValid" :readonly='false' placeholder="请输入裁判生效情况！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>上诉</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.secAppeal" :options="options.zoneOptions" placeholder="请输入上诉情况！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>上诉截止日</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.secAppealTime" :readonly='false' placeholder="请输入上诉截止日！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>
                          </div>

                        </a-tab-pane>
                        <a-tab-pane v-if="stage != 'evaluate' " key="3" tab="再审管理" >

                          <div v-show=" '|再审阶段|执行阶段|结案闭单|'.includes(legal.stage) ">
                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px;margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>举证期限</span>
                              </a-col>
                              <a-col :span="8">
                                <a-date-picker v-model="legal.reviewEvidence" :default-value="options.datetime" placeholder="请输入举证期限！" @blur="validFieldToast('receiveTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>开庭时间</span>
                              </a-col>
                              <a-col :span="8">
                                <a-date-picker v-model="legal.reviewCourtDate" :default-value="options.datetime" placeholder="请输入开庭时间！" @blur="validFieldToast('lawRTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>诉讼预案</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.reviewPlan" :options="options.zoneOptions" placeholder="请输入诉讼预案" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>未填写原因</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.reviewReason" :readonly='false' placeholder="请输入未填写原因！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>与预案是否相符</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.reviewConform" :options="options.zoneOptions" placeholder="请输入与预案是否相符！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>不符原因</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.reviewUnConformReasom" :readonly='false' placeholder="请输入不符原因！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>减损金额</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.reviewDetractionSum" :options="options.zoneOptions" placeholder="请输入减损金额！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>裁判生效</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.reviewValid" :readonly='false' placeholder="请输入裁判生效情况！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>
                          </div>
                        </a-tab-pane>
                        <a-tab-pane v-if="stage != 'evaluate' " key="4" tab="执行管理">

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>是否申请强制执行</span>
                              </a-col>
                              <a-col :span="8">
                                <a-select  v-model="legal.enforce" default-value="否" @blur="validFieldToast('enforce')"  placeholder="请输入是否申请强制执行！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                                  <a-select-option value="是">
                                    是
                                  </a-select-option>
                                  <a-select-option value="否">
                                    否
                                  </a-select-option>
                                </a-select>
                              </a-col>
                            </a-row>
                          </div>

                          <div v-show="legal.enforce == '是' "  class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请执行立案时间</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.enforce_time" :readonly='false' placeholder="请输入申请执行立案时间！" @blur="validFieldToast('zoneProject')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>执行立案金额</span>
                              </a-col>
                              <a-col :span="8">
                                <a-input v-model="legal.enforce_fee" :options="options.zoneOptions" placeholder="请输入执行立案金额！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                        </a-tab-pane>
                        <a-tab-pane v-if="stage != 'evaluate' " key="5" tab="结案管理">

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>是否结案</span>
                              </a-col>
                              <a-col :span="8">
                                <a-select  v-model="legal.close_flag" default-value="否" @blur="validFieldToast('close_flag')"  placeholder="请输入是否结案！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                                  <a-select-option value="是">
                                    是
                                  </a-select-option>
                                  <a-select-option value="否">
                                    否
                                  </a-select-option>
                                </a-select>
                              </a-col>
                              <a-col v-show="legal.close_flag == '是' " :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>结案日期</span>
                              </a-col>
                              <a-col v-show="legal.close_flag == '是' " :span="8">
                                <a-input  v-model="legal.closeDate" :options="options.zoneOptions" placeholder="请输入结案日期！" @blur="validFieldToast('zone')"  style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                              </a-col>
                            </a-row>
                          </div>

                        </a-tab-pane>
                        <a-tab-pane v-if="stage != 'evaluate' " key="100" tab="案件进展">

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

                        </a-tab-pane>
                        </template>

                        <template v-if="stage == 'evaluate' ">
                        <a-tab-pane v-if="stage == 'evaluate' " key="200" tab="案件评价">

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件评分</span>
                              </a-col>
                              <a-col :span="8">
                                <a-rate v-model="legal.case_score" :allow-clear="true" />
                              </a-col>
                            </a-row>
                          </div>


                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>案件评价</span>
                              </a-col>
                              <a-col :span="20">
                                <a-textarea
                                  v-model="legal.case_remark"
                                  placeholder="请输入本次办理案件的整体案件评价！"
                                  :auto-size="{ minRows: 5, maxRows: 50 }"
                                  style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                                />
                              </a-col>
                            </a-row>
                          </div>

                          <a-divider type="vertical" /><a-divider type="vertical" />

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师评分</span>
                              </a-col>
                              <a-col :span="8">
                                <a-rate v-model="legal.lawyer_score" :allow-clear="true" />
                              </a-col>
                            </a-row>
                          </div>

                          <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                            <a-row>
                              <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                                <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师评价</span>
                              </a-col>
                              <a-col :span="20">
                                <a-textarea
                                  v-model="legal.lawyer_remark"
                                  placeholder="请输入本此办理案件的律师评价！"
                                  :auto-size="{ minRows: 5, maxRows: 50 }"
                                  style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                                />
                              </a-col>
                            </a-row>
                          </div>

                        </a-tab-pane>
                        </template>

                      </a-tabs>
                </div>

                <div v-show="role != 'view' && isNull(id) " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
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

                <div v-show="role == 'edit' && !isNull(id)  " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="margin-left:100px;">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handlePatch();"  >
                        修改
                      </a-button>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                   </a-row>
                </div>

                <div v-show="role == 'stage' && !isNull(id)  " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="margin-left:100px;">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handlePatch();"  >
                        提交
                      </a-button>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                   </a-row>
                </div>

                <div v-show="role == 'process' && !isNull(id)  " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="margin-left:100px;">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleProcess();"  >
                        追加进展
                      </a-button>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                   </a-row>
                </div>

                <div v-show="role == 'evaluate' && !isNull(id)  " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="margin-left:100px;">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleEvaluate();"  >
                        提交评价
                      </a-button>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                   </a-row>
                </div>

                <div v-show="(role == 'view' || role == 'notify' ) && processLogList.length > 0 " class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      处理记录
                    </a-col>
                   </a-row>
                </div>

                <div v-show="(role == 'view' || role == 'notify' ) && processLogList.length > 0 " class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;margin-left:75px;">
                  <van-cell-group style="margin-top:0px;" v-show="processLogList.length > 0">
                    <div>
                      <van-steps direction="vertical" :active="processLogList.length - 1">
                        <template v-for="value in processLogList">
                          <van-step :key="value.id">
                            <h3>{{ deNull(value.employee,'') + ' ' + deNull(value.action,'') + ' ' + deNull(value.action_opinion,'') + ' ' + value.content.replace(/null/g,'') }}</h3>
                            <p>{{ value.create_time }}</p>
                          </van-step>
                        </template>
                      </van-steps>
                    </div>
                  </van-cell-group>
                </div>

                <div v-show="role == 'notify' && !isNull(id)  " class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      知会流程
                    </a-col>
                   </a-row>
                </div>

                <div v-show="role == 'notify' && !isNull(id) && apply == 'view' " class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>知会人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="release_userid"  placeholder="请输入知会人员！" @blur="validNotify()" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="12">
                      <div style="margin-left:50px;margin-top:-15px;">
                        <template v-for="(item , index) in release_userlist ">
                          <a-avatar size="large" :index="index" :key="item.avatar" :src="item.avatar"  style="margin:2px 4px 2px 2px;" />
                        </template>
                      </div>
                    </a-col>
                  </a-row>
                </div>    

                <div v-show="role == 'notify' && !isNull(id) && apply == 'view' " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="margin-left:100px;">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleNotify();"  >
                        知会
                      </a-button>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                   </a-row>
                </div>

                <div v-show="role == 'notify' && !isNull(id) && apply == 'evaluate' " class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>知会批注</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="remark"
                        placeholder="请输入本知会通知的批注内容！"
                        :auto-size="{ minRows: 5, maxRows: 100 }"
                        style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div v-show="role == 'notify' && !isNull(id) && apply == 'evaluate' " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="margin-left:100px;">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleRemark();"  >
                        批注
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
        courtOptions:[],
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
        caseSType :'起诉案件', // varchar(64)  default '' not null comment '二级案由',
        stage :'一审阶段', // varchar(64)  default '' not null comment '程序阶段',
        receiveTime: '', // timestamp    default CURRENT_TIMESTAMP not null comment '业务部门接收时间',
        lawRTime: '', // timestamp    default CURRENT_TIMESTAMP not null comment '法律部门接收时间',
        accuser :'', // varchar(64)  default '' not null comment '诉讼发起人(原告/上诉人)',
        defendant :'', // varchar(64)  default '' not null comment '应诉人(被告/被上诉人)',
        thirdParty :'', // varchar(64)  default '' not null comment '第三人 third_party',
        handledTime :'', // varchar(32)  default '' not null comment '法院受理时间',
        externalFlag :'否', // varchar(2)   default 'N' not null comment '是否聘用外部律所',
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
        inHouseLawyersMobile:'', 
        outHouseLawyers :'', // varchar(64)  default '' not null comment '承办人员 外部律师',
        outHouseLawyersMobile:'',
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

        enforce:'否',
        enforce_time:'',
        enforce_fee:'',

        close_flag:'否',
        closeDate :'', // varchar(32)  default '' not null comment '结案日期',
        archiveDate :'', // varchar(32)  default '' not null comment '归档日期',
        progress :'', // text not null comment '办理进展'

        case_score:0,
        lawyer_score:0,
        case_remark:'',
        lawyer_remark:'',
      },
      columns: workconfig.columns.reward.items,
      wfcolumns: workconfig.columns.reward.wfcolumns,
      data: [],
      readonly: false,
      userList:[],
      release_userid:'',
      release_userlist:[],
      approve_userid:'',
      approve_userlist:[],
      approve_executelist:[],
      role:'',
      stage:'',
      apply:'',
      remark:'',
      file:'',
      uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
      message: workconfig.compValidation.legalapply.message,
      valid: workconfig.compValidation.legalapply.valid,
      goodsborrowtype: workconfig.goodsborrowtype,
      diplomaType: workconfig.compcolumns.diplomaTypeColumns,
      acceptType: workconfig.compcolumns.acceptType,
      commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
      sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "Sheet1", data: [{}] }],
      collection: [{ }],
      userinfo: '',
      usertitle:'',
      firmlist:[],
      firmNamelist:[],
      lawyerlist:[],
      lawyerInnerList:[],
      lawyerNamelist:[],
      lawyerInNamelist:[],
      processLogList:[],
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'案件管控',path:'/legal/workspace'},{icon:'user',text:'案件管理',path:'/legal/case/legallist?type=99&status=all&legalTname=all'},{icon:'form',text:'案件发起',path:''}],
      statusType:{'valid':'有效','invalid':'删除'},
      zoneType:{'领地集团总部':'领地集团总部','重庆区域':'重庆区域','两湖区域':'两湖区域','川北区域':'川北区域','成都区域':'成都区域','乐眉区域':'乐眉区域','中原区域':'中原区域','攀西区域':'攀西区域','新疆区域':'新疆区域','大湾区域':'大湾区域','北京区域':'北京区域'},
    };
  },
  watch:{
    'legal.inHouseLawyers'(value,oldVal){ //此处监听obj属性a值变量 item1为新值，item2为旧值
      (async()=>{
        const element = this.lawyerInnerList.find(item => item.name == value);
        this.legal.inHouseLawyersMobile = element.mobile;
      })();
    },
    'legal.lawyer'(value,oldVal){ //此处监听obj属性a值变量 item1为新值，item2为旧值
      (async()=>{
        const element = this.lawyerlist.find(item => item.lawyer_name == value);
        this.legal.lawyerMobile = element.mobile;
      })();
    },
    deep:true,
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

      // 律所名称过滤
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        );
      },

      // 企业微信登录处理函数
      async  weworkLogin  (codeType = 'search', systemType = 'search')  {
        const userinfo_work = await Betools.query.queryWeworkUser(codeType, systemType,'v5');
          const userinfo = await Betools.storage.getStore('system_userinfo');
          this.legal.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
          this.usertitle = (userinfo && userinfo.parent_company && userinfo.parent_company.name ? userinfo.parent_company.name + ' > ' :'')  + (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
          return userinfo;
      },

      // 执行删除事件
      async onDelete(){
        console.log('delete');
      },

      // 执行页面跳转
      async redirectView(path) {
          Betools.tools.isNull(path) ? null: this.$router.push(path);
      },

      // 执行update事件
      async onUpdate(records){

      },

      // 执行complete事件
      async onComplete(){

      },

      // Excel文件解析成功
      async onSuccess(data, file, ratio = 0.00, zone = '', project = '' , regexp = /[\ |‘|’|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g){
        
      },

      // 执行change事件
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

      // 验证字段有效性
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

      // 验证字段有效性并提示错误信息
      validFieldToast(fieldName){
        const flag = !this.validField(fieldName);
        if(flag){
          this.$toast.fail(`${this.message[fieldName]}！` );
          return false;
        }
      },

      // 查询基础信息
      async queryInfo() {
        try {
          const id = this.id = Betools.tools.getUrlParam('id');
          this.legal.caseSType = (Betools.tools.getUrlParam('legalTname') || '起诉') + '案件';
          this.role = Betools.tools.getUrlParam('role');
          this.stage = Betools.tools.getUrlParam('stage');
          this.apply = Betools.tools.getUrlParam('apply') || 'view';
          this.back = Betools.tools.getUrlParam('back') || '/legal/workspace'; //查询上一页
          this.legal.legalTname = (Betools.tools.getUrlParam('type') || '0') == '0' ? '起诉' : '应诉';  //查询type
          
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          this.legal.apply_realname = userinfo && userinfo.realname ? userinfo.realname : '';
          this.legal.apply_username = userinfo && userinfo.username ? userinfo.username : '';

          if(!Betools.tools.isNull(id)){
            this.legal = await this.handleList(this.tablename , id);
            this.queryProcessLog();
          } 
          
          this.lawyerInnerList = await Betools.query.queryLawyerList();
          this.options.courtOptions = await workconfig.courtList();
          this.firmlist = await Betools.manage.queryTableData('bs_law_firm' , `_where=(status,ne,0)&_fields=id,firm_name&_sort=-id&_p=0&_size=10000`);
          this.firmNamelist = this.firmlist.map(item => { return item.firm_name });
          this.lawyerlist = await Betools.manage.queryTableData('bs_lawyer' , `_where=(status,ne,0)&_fields=id,lawyer_name,mobile&_sort=-id&_p=0&_size=10000`);
          this.lawyerNamelist = this.lawyerlist.map(item => { return item.lawyer_name });
          const lawyerInnerList = this.lawyerInnerList.map(item => {return item.name });
          this.lawyerInNamelist = [...new Set(lawyerInnerList)];
          
          if(Betools.tools.isNull(id)){ //自动回显刚才填写的用户基础信息
            try {
              const legal = Betools.storage.getStore(`system_${this.tablename}_item#${this.legal.type}#@${userinfo.realname}`); //获取缓存信息
              if(legal){
                this.legal.create_by = legal.create_by || this.legal.create_by;
                this.legal.remark = legal.remark || this.legal.remark;
                this.legal.status = legal.status || this.legal.status;
              }
              if(userinfo && userinfo.department && userinfo.department.name){
                this.legal.department = userinfo.department.name;
                this.legal.company = userinfo.parent_company.name;
              } else if(userinfo && userinfo.systemuserinfo && userinfo.systemuserinfo.textfield1){
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

      // 查询不同状态的律所数据
      async handleList(tableName , id){
        const nowdate = dayjs().format('YYYY-MM-DD')
        let elem = await Betools.query.queryTableData(tableName , id);
        let list = [elem];
        list.map((item)=>{ 
          try {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD'); 
            item.receiveTime = dayjs(item.receiveTime).format('YYYY-MM-DD') == 'Invalid Date' ? nowdate : dayjs(item.receiveTime).format('YYYY-MM-DD');
            item.lawRTime = dayjs(item.lawRTime).format('YYYY-MM-DD') == 'Invalid Date' ? nowdate : dayjs(item.lawRTime).format('YYYY-MM-DD');
            item.handledTime = dayjs(item.handledTime).format('YYYY-MM-DD') == 'Invalid Date' ? nowdate : dayjs(item.handledTime).format('YYYY-MM-DD');
            item.legalStatus = Betools.tools.isNull(item.legalStatus) ? '开庭举证' : item.legalStatus;
            try {
              item.caseType = JSON.parse(item.caseType),item.zone = JSON.parse(item.zone),item.court = JSON.parse(item.court);
            } catch (error) {
              item.zone = JSON.parse(item.zone),item.caseType = JSON.parse(item.caseType),item.court = JSON.parse(item.court);
            }
          } catch (error) {
            console.log(`error:`, error);
          }
        });
        return list && list.length > 0 ? list[0] : {};
      },

      // 计算案件涉案金额
      caculateSum(){
       
      },

      async validNotify(){
        const username = this.release_userid;
        let userlist = await Betools.manage.queryUserByNameVHRM(username);
        userlist = userlist.filter( (item , index) => { const findex = userlist.findIndex( elem => { return item.cert == elem.cert });  return findex == index;});
        userlist = this.release_userlist.concat(userlist);
        userlist = userlist.filter( (item , index) => { const findex = userlist.findIndex( elem => { return item.cert == elem.cert });  return findex == index;});
        this.release_userlist = userlist; 
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
              const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${curItemID}&pid=${node.id}&tname=bs_reward_apply&panename=mytodolist&typename=wflow_todo&bpm_status=2&proponents=${firstWflowUser}`);
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

      // 执行知会批注操作
      async handleRemark(){
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        try {
          this.$confirm({
              title: "确认操作",
              content: `您好，是否提交案件批注?`,
              onOk: async(result) => {
                  const { legal } = this;
                  const rem = Betools.tools.getUrlParam('rem');
                  this.handleLog(this.tablename , legal , '批注', '案件知会批注' , `${ Betools.tools.deNull((userinfo.realname || rem),'') } 批注：${this.remark}`);
                  vant.Dialog.alert({  title: '温馨提示',  message: `案件批注提交成功！`, });
              }});
        } catch (error) {
          console.log(error);
        }
      },

      // 执行知会操作
      async handleNotify(user_group_ids = '', user_group_names = ''){

        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息

        if(Betools.tools.isNull(this.release_userlist)){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: `请先选择知会人员！`,
          });
        }

        user_group_ids = this.release_userlist.map(item=>item.loginid);
        user_group_names = this.release_userlist.map(item=> item.name || item.realname);
        user_group_ids = Betools.tools.isNull(user_group_ids) ? '' : user_group_ids.toString();

        try {
          this.$confirm({
              title: "确认操作",
              content: `您好，是否确认向${user_group_names}推送案件知会通知?`,
              onOk: async(result) => {
                  const {legal} = this;
                  this.handleLog(this.tablename , legal , '知会', '案件知会流程' , `${userinfo.realname} 向${user_group_names}推送了知会流程，案号：${legal.caseID}`);
                  for await (const user of this.release_userlist){
                    const url = `${window.BECONFIG.domain.replace('www','legal')}/evaluate/${this.legal.id}/${user.loginid || item.name}/#/`;
                    await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${user.loginid}/您好，您有一份案件知会通知(${userinfo.realname})，案号:${this.legal.caseID}！?url=${url}`).set('accept', 'json');
                  }
                  vant.Dialog.alert({  title: '温馨提示',  message: `案件知会通知推送成功！`, });
              }});
        } catch (error) {
          console.log(error);
        }
      },

      // 记录操作日志
      async handleLog(tableName , element , action = '发起' , opinion , content){

          const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
          const prLogHisNode = {
            id: Betools.tools.queryUniqueID() , 
            table_name: tableName ,
            main_value: element.id , 
            proponents: userinfo.username , 
            business_data_id : element.id , 
            business_code  : '000000000' ,  
            process_name   : '案件流程审批' ,  
            employee       : userinfo.realname , 
            approve_user   : userinfo.username , 
            action         : action , 
            action_opinion : opinion , 
            operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss') , 
            functions_station : userinfo.position ,  
            process_station   : '案件审批[法务诉讼]' ,
            business_data     : JSON.stringify(this.item) ,  
            content           : content , 
            process_audit     : element.id , 
            create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss') , 
            relate_data       : '' , 
            origin_data       : JSON.stringify(element) , 
          }
          await Betools.workflow.approveViewProcessLog(prLogHisNode);
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

        // 校验字段完整性
        if(invalidKey != '' && invalidKey != null){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：请输入[${invalidKey}]信息！`,
          });
        }

        // 是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认保存此案件发起申请单?",
            onOk: async(result) => {

                  const { legal } = this;
                  legal.id = id;
                  legal.zone = JSON.stringify(legal.zone); //进行序列化
                  legal.caseType = JSON.stringify(legal.caseType); //进行序列化
                  legal.court = JSON.stringify(legal.court); //进行序列化
                  
                  try { // TRY CATCH 不要移除，如果报错可能导致异常
                    result = await Betools.manage.postTableData(this.tablename , legal); // 向表单提交form对象数据
                  } catch (error) {
                    console.error(error);
                  }

                  legal.zone = JSON.parse(legal.zone); //进行序列化
                  legal.caseType = JSON.parse(legal.caseType); //进行序列化
                  legal.court = JSON.parse(legal.court); //进行序列化
                  
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }
                  this.handleLog(this.tablename , legal , '发起', '案件流程审批' , `${userinfo.realname} 发起${legal.caseSType}流程，案号：${legal.caseID}`);
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `案件发起申请成功！`, }); //this.$toast.success('案件发起申请成功！');
               }
          });

      },

      // 修改用户数据但是不提交
      async handlePatch(){
        
        this.loading = true; // 显示加载状态
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const id = Betools.tools.getUrlParam('id'); // 表单ID

        // 验证数据是否已经填写
        const keys = Object.keys({ title: '' })
        const invalidKey =  keys.find(key => {
          const flag = this.validField(key);
          return !flag;
        });
        if(invalidKey != '' && invalidKey != null){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：请输入[${invalidKey}]信息！`,
          });
        }

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认修改此案件信息?",
            onOk: async(result) => {
                  const { legal } = this;

                  legal.zone = JSON.stringify(legal.zone); //进行序列化
                  legal.caseType = JSON.stringify(legal.caseType); //进行序列化
                  legal.court = JSON.stringify(legal.court); //进行序列化
                  
                  try {
                    result = await Betools.manage.patchTableData(this.tablename, id, legal); // 向表单提交form对象数据
                  } catch (error) {
                    console.error(error);
                  }

                  legal.zone = JSON.parse(legal.zone); //进行序列化
                  legal.caseType = JSON.parse(legal.caseType); //进行序列化
                  legal.court = JSON.parse(legal.court); //进行序列化

                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }

                  this.handleLog(this.tablename , legal , '执行' , '案件信息修改' , `${userinfo.realname} 修改了案号为：${legal.caseID}的案件信息。`);
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `案件信息修改成功！`, }); 
                  await this.handleList(this.tablename , id);
               }
          });
      },

      // 案件过程管理
      async handleStage(){
        
        this.loading = true; // 显示加载状态
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const id = Betools.tools.getUrlParam('id'); // 表单ID
        const stage = Betools.tools.getUrlParam('stage'); // 表单ID
        const { legal } = this;
        let content = null;

        // 验证数据是否已经填写
        const keys = Object.keys({ title: '' });
        const invalidKey =  keys.find(key => {
          const flag = this.validField(key);
          return !flag;
        });

        if(invalidKey != '' && invalidKey != null){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：请输入[${invalidKey}]信息！`,
          });
        }

        const fstLegal = {fstEvidence , fstCourtDate , fstPlan , fstReason , fstConform , fstUnConformReasom , fstDetractionSum , fstValid , fstAppeal , fstAppealTime ,} = legal;
        const secLegal = {secEvidence , secCourtDate , secPlan , secReason , secConform , secUnConformReasom , secDetractionSum , secValid , secAppeal ,secAppealTime ,} = legal;
        const reviewLegal = {reviewEvidence , reviewCourtDate , reviewPlan , reviewReason , reviewConform , reviewUnConformReasom , reviewDetractionSum , reviewValid , reviewAppeal , reviewAppealTime ,} = legal;
        const forceLegal = {enforce , enforce_time , enforce_fee , close_flag , closeDate, } = legal;

        if(stage == '一审阶段'){
          content = {...fstLegal};
        } else if(stage == '二审阶段'){
          content = {...fstLegal, ...secLegal};
        } else if(stage == '再审阶段'){
          content = {...fstLegal, ...secLegal, ...reviewLegal};
        } else if(stage == '执行阶段'){
          content = {...fstLegal, ...secLegal, ...reviewLegal, ...forceLegal};
        } else if(stage == '结案闭单'){
          content = {...fstLegal, ...secLegal, ...reviewLegal, ...forceLegal};
        }

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认修改此案件信息?",
            onOk: async(result) => {

                  legal.zone = JSON.stringify(legal.zone); //进行序列化
                  legal.caseType = JSON.stringify(legal.caseType); //进行序列化
                  legal.court = JSON.stringify(legal.court); //进行序列化
                  
                  try {
                    result = await Betools.manage.patchTableData(this.tablename, id, content); // 向表单提交form对象数据
                  } catch (error) {
                    console.error(error);
                  }

                  legal.zone = JSON.parse(legal.zone); //进行序列化
                  legal.caseType = JSON.parse(legal.caseType); //进行序列化
                  legal.court = JSON.parse(legal.court); //进行序列化

                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }

                  this.handleLog(this.tablename , legal , '执行' , '案件过程管理' , `${userinfo.realname} 进行了案号为：${legal.caseID}的案件过程管理，案件阶段：${stage}。`);
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `案件信息修改成功！`, }); 
                  await this.handleList(this.tablename , id);
               }
          });
      },

      // 执行案件评价
      async handleEvaluate(){
        this.loading = true; // 显示加载状态
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const id = Betools.tools.getUrlParam('id'); // 表单ID

        // 验证数据是否已经填写
        if(Betools.tools.isNull(this.legal.case_remark) || Betools.tools.isNull(this.legal.lawyer_remark)){
          return await vant.Dialog.alert({ title: '温馨提示', message: `请注意案件评价及律师评价信息不能为空，请填写后提交！`,});
        }
        const evaluate_flag = 'Y';
        const { case_score , lawyer_score, case_remark , lawyer_remark} = this.legal;

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否提交案件评价信息?",
            onOk: async() => {
                  const {legal} = this;
                  const result = await Betools.manage.patchTableData(this.tablename, id, { case_score , lawyer_score, case_remark , lawyer_remark, evaluate_flag}); // 向表单提交form对象数据
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }
                  this.handleLog(this.tablename , legal , '进行' , '案件评价操作' , `${userinfo.realname} 进行了案号为：${legal.caseID}的案件评价，案件评分：${case_score}，律师评分：${lawyer_score}。`);
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `已提交案件评价信息！`, }); 
                  await this.handleList(this.tablename , id);
               }
          });
      },

      // 追加案件进展信息
      async handleProcess(){
        this.loading = true; // 显示加载状态
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const id = Betools.tools.getUrlParam('id'); // 表单ID

        // 验证数据是否已经填写
        if(Betools.tools.isNull(this.legal.lawcase)){
          return await vant.Dialog.alert({ title: '温馨提示', message: `请注意案件进展信息不能为空，请填写后提交！`,});
        }

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认追加此案件进展信息?",
            onOk: async() => {
                  const {legal} = this;
                  const { lawcase } = this.legal;
                  const result = await Betools.manage.patchTableData(this.tablename, id, {lawcase}); // 向表单提交form对象数据
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }
                  this.handleLog(this.tablename , legal , '执行' , '案件进展管理' , `${userinfo.realname} 追加了案号为：${legal.caseID}的案件进展，内容：${lawcase}。`);
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `已提交案件进展信息！`, }); 
                  await this.handleList(this.tablename , id);
               }
          });
      },

      // 获取处理日志
      async queryProcessLog(){
        const id = Betools.tools.getUrlParam('id');
        try {
          this.processLogList = await Betools.workflow.queryPRLogHistoryByDataID(id);
          //如果查询出出来记录，则将处理记录排序
          if(this.processLogList && this.processLogList.length > 0){
            this.processLogList.map(item => { item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm'); item.unique = `${item.employee} ${item.action} ${item.action_opinion} ${item.create_time} ` ;  });
            this.processLogList =  this.processLogList.filter( (item , index) => { const findex = this.processLogList.findIndex( elem => { return item.unique == elem.unique });  return findex == index;});
            this.processLogList.sort();
          }
        } catch (error) {
          console.log(error);
        }
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
</style>
