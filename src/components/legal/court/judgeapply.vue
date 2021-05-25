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
                    <span @click="redirectView(elem.path)" >{{ elem.text }}</span>
                  </a-breadcrumb-item>
                </template>
              </a-breadcrumb>
            </div>
            
            <!-- 案件申请 -->
            <div style="background-color:#f0f0f0;">

              <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 2.5rem; margin-right: 2.5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

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

                <div v-if="isNull(id)" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
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
                      <a-select mode="multiple" v-model="legal.tags" default-value="一般案件" @blur="validFieldToast('tags')"  placeholder="请选择业务标签！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
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

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>入库时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.in_time" :default-value="options.in_time" placeholder="请输入此律所入库时间！" @blur="validFieldToast('receiveTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>成立时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.establish_time" :default-value="options.establish_time" placeholder="请输入此律所成立时间！" @blur="validFieldToast('lawRTime')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律所地址</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.address" :default-value="options.address" placeholder="请输入此律师事务所地址信息！" @blur="validFieldToast('address')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>联系电话</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.phone" :default-value="options.phone" placeholder="请输入此律所联系电话！" @blur="validFieldToast('phone')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律所规模</span>
                    </a-col>
                    <a-col :span="8">
                      <a-select  v-model="legal.scale" default-value="1000" @blur="validFieldToast('scale')"  placeholder="请输入此律师事务所人员规模！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                        <a-select-option value="1-10人">
                          1-10人
                        </a-select-option>
                        <a-select-option value="10-100人">
                          10-100人
                        </a-select-option>
                        <a-select-option value="100-500人">
                          100-500人
                        </a-select-option>
                        <a-select-option value="500-1000人">
                          500-1000人
                        </a-select-option>
                        <a-select-option value="1000-5000人">
                          1000-5000人
                        </a-select-option>
                        <a-select-option value="5000-10000人">
                          5000-10000人
                        </a-select-option>
                        <a-select-option value="10000人以上">
                          10000人以上
                        </a-select-option>
                      </a-select>
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>服务团队人数</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.firm_count"  placeholder="请输入此律所服务团队人数！" @blur="validFieldToast('firm_count')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      合作情况
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>是否已合作</span>
                    </a-col>
                    <a-col :span="8">
                      <a-radio-group v-model="legal.coop_flag" placeholder="请选择是否已合作！" @blur="validFieldToast('coop_flag')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 0px solid #f0f0f0;">
                        <a-radio-button value="未合作">
                          未合作
                        </a-radio-button>
                        <a-radio-button value="已合作">
                          已合作
                        </a-radio-button>
                      </a-radio-group>
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>是否出库</span>
                    </a-col>
                    <a-col :span="8">
                      <a-radio-group  v-model="legal.out_flag" placeholder="请选择此律所是否出库！" @blur="validFieldToast('out_flag')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 0px solid #f0f0f0;">
                        <a-radio-button value="未出库">
                          未出库
                        </a-radio-button>
                        <a-radio-button value="已出库">
                          已出库
                        </a-radio-button>
                      </a-radio-group>
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>开始合作时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.start_time" :default-value="options.start_time" placeholder="请输入此律所开始合作时间！" @blur="validFieldToast('start_time')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>最近合作期间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="legal.coop_stime" :default-value="options.coop_time"  @blur="validFieldToast('coop_stime')" style="width:40%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                       <span style="margin-left:10px;margin-right:10px;">至</span> 
                      <a-date-picker v-model="legal.coop_etime" :default-value="options.coop_time"  @blur="validFieldToast('coop_etime')" style="width:40%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      费用信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>常务法律费用</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.fee" placeholder="请输入此律所常务法律费用报价！" @blur="validFieldToast('fee')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>重大诉讼费用</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.major_fee" placeholder="请输入此律所重大诉讼费用报价！" @blur="validFieldToast('major_fee')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>一般诉讼费用</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.common_fee" placeholder="请输入此律所一般诉讼费用报价！" @blur="validFieldToast('common_fee')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>尽调专项费用</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.diligence_fee" placeholder="请输入此律所尽调专项费用报价！" @blur="validFieldToast('diligence_fee')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>发函专项费用</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.notice_fee" placeholder="请输入此律所发函专项费用报价！" @blur="validFieldToast('common_fee')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>刑事专项费用</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="legal.penal_fee" placeholder="请输入此律所刑事专项费用报价！" @blur="validFieldToast('penal_fee')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      律所简介
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律所简介</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="legal.brief"
                        placeholder="请输入此律所简要介绍！"
                        :auto-size="{ minRows: 10, maxRows: 100 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>团队简介</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="legal.team_brief"
                        placeholder="请输入此律所的服务团队介绍！"
                        :auto-size="{ minRows: 10, maxRows: 100 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
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

                <div v-show="role != 'view' && !isNull(id)  " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
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
      tablename:'bs_law_firm',
      size: 0,
      options:{
        create_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        in_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        establish_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        start_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        coop_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
      },
      id:'',
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
        tags:'常年法律顾问',
        plate:'地产板块',
        establish_time:'', // varchar(32)  default ''  not null comment '成立时间',
        address:'', // varchar(64)  default ''  not null comment '地址',
        phone:'', // varchar(16)  default ''  not null comment '电话',
        scale:'1-10人', // varchar(16)  default ''  not null comment '律所规模（人数）',
        brief:'', // varchar(256) default ''  not null comment '律所简要介绍',
        firm_count:'N人', // varchar(16)  default ''  not null comment '服务团队人数',
        team_brief:'', // varchar(256) default ''  not null comment '团队介绍',
        fee:'￥N万/年', // varchar(64)  default ''  not null comment '费用',
        major_fee:'一事一议', // varchar(64)  default ''  not null comment '重大诉讼费用',
        common_fee: '商品房纠纷案件：￥N/件', // varchar(64)  default ''  not null comment '一般诉讼费用',
        diligence_fee:'￥N万/项目', // varchar(64)  default ''  not null comment '尽调专项费用',
        notice_fee: '￥N万/年', // varchar(64)  default ''  not null comment '发函专项费用',
        penal_fee: '一事一议', // varchar(64)  default ''  not null comment '刑事专项费用',
        coop_flag:'已合作', // varchar(1)   default 'Y' not null comment '是否已合作',
        start_time:'', // varchar(32)  default ''  not null comment '开始合作时间',
        coop_time:'', // varchar(32)  default ''  not null comment '最近合作期间',
        coop_stime:'', // varchar(32)  default ''  not null comment '最近合作期间(开始时间)',
        coop_etime:'', // varchar(32)  default ''  not null comment '最近合作期间(结束时间)',
        out_flag:'未出库', // varchar(32)  default 'N' not null comment '是否出库',
      },
      columns: workconfig.columns.reward.items,
      wfcolumns: workconfig.columns.reward.wfcolumns,
      firmlist:[],
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
      collection: [{ }],
      userinfo: '',
      usertitle:'',
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'律所管理',path:'/legal/workspace'},{icon:'form',text:'律所录入',path:''}],
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
     
      // 查询基础信息
      async queryInfo() {
        try {
          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          this.userinfo = await this.weworkLogin(); //查询当前登录用户
          this.back = Betools.tools.getUrlParam('back') || '/legal/workspace'; //查询上一页
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

      // 查询不同状态的律所数据
      async handleList(tableName , id){
        let list = await Betools.manage.queryTableData(tableName , `_where=(id,eq,${id})&_sort=-id&_p=0&_size=1`);
        list.map((item)=>{ 
          try {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD'); 
            item.establish_time = dayjs(item.establish_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.establish_time).format('YYYY-MM-DD');
            item.firm_count = parseInt(item.firm_count);
            item.coop_flag = 'YN'.includes(item.coop_flag) ? {'Y':'已合作','N':'未合作'}[item.coop_flag] : item.coop_flag;
            item.out_flag = 'YN'.includes(item.out_flag) ? {'Y':'已出库','N':'未出库'}[item.out_flag] : item.out_flag;
            item.tags = JSON.parse(item.tags);
          } catch (error) {
            console.log(`error:`, error);
          }
        });
        return list && list.length > 0 ? list[0] : {};
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
        this.legal.create_time = dayjs().format('YYYY-MM-DD');
        this.legal.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');

        // 验证数据是否已经填写
        const keys = Object.keys({ title: '' , brief:'', team_brief:'' })

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
            content: "是否确认保存此律所录入申请单?",
            onOk: async() => {
                  const { legal } = this;
                  legal.id = id;
                  legal.tags = JSON.stringify(legal.tags); //进行序列化
                  const result = await Betools.manage.postTableData(this.tablename , this.legal); // 向表单提交form对象数据
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }
                  legal.tags = JSON.parse(legal.tags); //进行解析
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `律所录入申请发起成功！`, }); //  this.$toast.success('律所录入申请发起成功！');
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
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：请输入[${invalidKey}]信息！`,
          });
          return false;
        }

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认修改此律所的信息?",
            onOk: async() => {
                  const { legal } = this;
                  legal.tags = JSON.stringify(legal.tags); //进行序列化
                  const result = await Betools.manage.patchTableData(this.tablename , id , this.legal); // 向表单提交form对象数据
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }
                  legal.tags = JSON.parse(legal.tags); //进行解析
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `律所修改申请提交成功！`, }); // this.$toast.success('律所修改申请提交成功！');
                  await this.handleList(this.tablename , id);
               }
          });
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
</style>
