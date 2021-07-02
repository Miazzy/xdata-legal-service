<template>
  
  <div id="reward-home" style="">
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
                <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 0.55rem; margin-right: 2.5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >
                <div style="width:100%;margin-left:0px;margin-right:0px;background:#fbf9fe;position:absolute;">

                    <div style="position:relative; height:160px; display:block;">
                      <div class="reward-top-button" style="margin-top:10px;margin-bottom:10px; margin-left:-5.75rem;transform:scale(0.85)">
                          
                          <div v-if="getUrlParam('stage') == '全部' " style="display:inline;margin-left:0px;font-size:14px;margin-right:10px;">
                            <span>案件阶段</span>
                            <a-select  v-model="legal.stage" default-value="一审阶段" placeholder="选择案件程序阶段" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
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
                              <a-select-option value="归档闭单">
                                归档闭单
                              </a-select-option>
                            </a-select>
                          </div>

                          <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                            <span>案件类别</span>
                            <a-select  v-model="legal.caseSType" default-value="起诉案件" placeholder="请选择案件类别！" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
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
                            <a-select  v-model="legal.legalType" default-value="一般案件"  placeholder="请选择案件类别" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
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

                          <a-input-search v-model="legal.value" placeholder="输入搜索关键字、案件名称、相关信息等" style="width:350px;" enter-button @search="execSearch('view')" />

                          <a-button type="primary" @click="execSearch('view')" >查询</a-button>
                          <a-button type="primary" @click="execFresh" style="display:none;">刷新</a-button>
                          <a-button type="primary" @click="execApply" style="display:none;">新增</a-button>
                          <a-button type="primary" @click="execExport" >导出</a-button>
                      </div>

                      <div class="reward-top-button" style="margin-top:10px;margin-bottom:10px; margin-left:-5.75rem;transform:scale(0.85)">
                        <div style="display:inline;margin-left:0px;font-size:14px;margin-right:10px;">
                          <span>案件范围</span>
                          <a-select  v-model="legal.scope" default-value="本部门" placeholder="请选择案件范围！" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                            <a-select-option value="全集团">
                              全集团
                            </a-select-option>
                            <a-select-option value="本部门">
                              本部门
                            </a-select-option>
                          </a-select>
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>业务板块</span>
                          <a-select  v-model="legal.plate" default-value="地产板块" placeholder="请选择业务板块！" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                            <a-select-option value="">
                              所有板块
                            </a-select-option>
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
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>项目名称</span>
                          <a-input v-model="legal.zoneProject" placeholder="请输入项目名称" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>填报人员</span>
                          <a-input v-model="legal.create_by" placeholder="请输入填报人员" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        
                      </div>

                      <div class="reward-top-button" style="margin-top:10px;margin-bottom:10px; margin-left:-5.75rem;transform:scale(0.85)">
                        <div style="display:inline;margin-left:0px;font-size:14px;margin-right:10px;">
                          <span>所属区域</span>
                          <a-input v-model="legal.zone" placeholder="请选择所属区域" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>法院名称</span>
                          <a-input v-model="legal.court" placeholder="请输入法院关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>原告名称</span>
                          <a-input v-model="legal.accuser" placeholder="请输入原告关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>被告名称</span>
                          <a-input v-model="legal.defendant" placeholder="请输入被告关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        
                      </div>

                      <div class="reward-top-button" style="margin-top:10px;margin-bottom:10px; margin-left:-5.75rem;transform:scale(0.85)">
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>案由信息</span>
                          <a-input v-model="legal.caseType" placeholder="请输入案由关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:0px;font-size:14px;margin-right:10px;">
                          <span>律所名称</span>
                          <a-input v-model="legal.lawOffice" placeholder="请选择所属区域" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>律师名称</span>
                          <a-input v-model="legal.lawyer" placeholder="请输入法院关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>法官名称</span>
                          <a-input v-model="legal.judge" placeholder="请输入原告关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                      </div>

                      <div class="reward-top-button" style="margin-top:10px;margin-bottom:10px; margin-left:-5.75rem;transform:scale(0.85);display:none;">
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>案件进展</span>
                          <a-input v-model="legal.progress" placeholder="请输入案件进展关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>诉讼请求</span>
                          <a-input v-model="legal.claims" placeholder="请输入被告关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                        <div style="display:inline;margin-left:5px;font-size:14px;margin-right:10px;">
                          <span>事项披露</span>
                          <a-input v-model="legal.disclosure" placeholder="请输入案由关键字" style="width:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                        </div>
                      </div>
                    </div>

                    <div v-show="data && data.length > 0" >
                      <a-tabs default-active-key="1" @change="callback" style="position:relative; top: 10px ; margin-left:1.750rem; transform:scale(0.85); transform-origin: 0 0;">
                        <a-tab-pane key="1" tab="列表">
                          <a-empty v-if="data.length == 0" style="margin-top:10%;height:800px;"/>
                          <div v-if="data.length > 0" class="reward-content-table" style="margin-left:0px; width:98%; height:100%; margin-bottom:20px;"> 
                              <a-list item-layout="horizontal" :data-source="data">
                                <a-list-item v-show=" item.status != '已删除' && item.status != '已作废' " slot="renderItem" slot-scope="item, index" style="position:relative;">
                                  
                                  <a-dropdown slot="actions" >
                                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                      操作<a-icon type="down" />
                                    </a>
                                    <a-menu slot="overlay" >
                                      <a-menu-item v-if=" item.stage != '归档闭单'" key="201" @click="execPatch(item)">
                                        修改案件
                                      </a-menu-item>
                                      <a-menu-item key="300" @click="execNotify(item)">
                                        发起知会
                                      </a-menu-item>
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
                                      <a-menu-item key="100" @click="execHear(item , '归档闭单')">
                                        归档闭单
                                      </a-menu-item>
                                    </a-menu>
                                  </a-dropdown>

                                  <a-list-item-meta :index="index" :description="`${item.caseID} 法院：${item.court}，法官：${item.judge}，程序：${item.stage}`" @click="execView(item)" >
                                    <a slot="title" >{{ `序号: ${item.serialID} ${item.caseID} 程序：${item.stage} ，案由：${ item.caseType } ，原告：${item.accuser}，被告：${item.defendant.slice(0,15) + (item.defendant.length>15?'...':'') }` }}</a>
                                  </a-list-item-meta>

                                  <a-badge style="float:left;z-index:1000000;right:-10px;position:absolute;top:35px;">
                                    <a-icon slot="count" :type="item.stage == '归档闭单' ? 'check-circle' : item.stage == '一审阶段' ? 'question-circle':'clock-circle'" :style="item.stage == '归档闭单' ? `color:DodgerBlue;`: item.stage == '一审阶段' ? `color:Chocolate;`:`color: #f5222d;`" />
                                  </a-badge>
                                </a-list-item>
                                <a-divider type="horizontal" />
                                <a-pagination v-model="search.page" show-size-changer :default-current="1" :showQuickJumper="true" :total="search.total" @showSizeChange="paginationView" @change="paginationView" :pageSizeOptions="['10', '20', '30', '40', '50', '100', '1000', '10000']" > 
                                  <template slot="buildOptionText" slot-scope="props">
                                    <span >{{ props.value }}条/页</span>
                                  </template>
                                </a-pagination>
                              </a-list>
                          </div>
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="表单">
                          <a-empty v-if="data.length == 0" style="margin-top:10%;height:580px;"/>
                          <vue-excel-editor v-if="data.length > 0" v-model="data" ref="grid" width="100%" autocomplete >
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
      options:{
        zoneOptions:JSON.parse(`[{"label":"融量集团","value":"融量集团","children":[{"label":"融量集团总部","value":"融量集团总部"},{"label":"地产板块","value":"地产板块","children":[{"label":"领地集团总部","value":"领地集团总部"},{"label":"成渝区域","value":"成渝区域"},{"label":"两湖区域","value":"两湖区域"},{"label":"川北区域","value":"川北区域"},{"label":"成渝区域","value":"成渝区域"},{"label":"川南区域","value":"川南区域"},{"label":"中原区域","value":"中原区域"},{"label":"攀西区域","value":"攀西区域"},{"label":"新疆区域","value":"新疆区域"},{"label":"大湾区域","value":"大湾区域"},{"label":"北京区域","value":"北京区域"},{"label":"园林公司","value":"园林公司"}]},{"label":"金融板块","value":"金融板块","children":[{"label":"量石投资","value":"量石投资"}]},{"label":"物业板块","value":"物业板块","children":[{"label":"领悦集团总部","value":"领悦集团总部"},{"label":"川南区域","value":"川南区域"},{"label":"商写事业部","value":"商写事业部"},{"label":"川北区域","value":"川北区域"},{"label":"新疆区域","value":"新疆区域"},{"label":"攀西区域","value":"攀西区域"},{"label":"长春区域","value":"长春区域"},{"label":"大湾区域","value":"大湾区域"},{"label":"郑州荆州区域","value":"郑州荆州区域"},{"label":"贵阳区域","value":"贵阳区域"},{"label":"佳美物业公司","value":"佳美物业公司"}]},{"label":"医疗健康板块","value":"医疗健康板块","children":[{"label":"健康事业部","value":"健康事业部"},{"label":"至诚和爱健管中心","value":"至诚和爱健管中心"},{"label":"高康国际医院","value":"高康国际医院"}]},{"label":"商业板块","value":"商业板块","children":[{"label":"宝瑞商管","value":"宝瑞商管"}]},{"label":"合作方财务公司","value":"合作方财务公司","children":[{"label":"共享财务中心","value":"共享财务中心"}]}]}]`),
        causeOptions:JSON.parse(`[{"label":"人格权纠纷","value":"人格权纠纷","children":[{"label":"名誉权纠纷","value":"名誉权纠纷"},{"label":"其他人格权纠纷","value":"其他人格权纠纷"}]},{"label":"物权纠纷","value":"物权纠纷","children":[{"label":"物权确认纠纷","value":"物权确认纠纷"},{"label":"排除妨害纠纷","value":"排除妨害纠纷"},{"label":"恢复原状纠纷","value":"恢复原状纠纷"},{"label":"返还原物纠纷","value":"返还原物纠纷"},{"label":"业主知情权纠纷","value":"业主知情权纠纷"},{"label":"相邻关系纠纷","value":"相邻关系纠纷"},{"label":"业主共有权纠纷","value":"业主共有权纠纷"},{"label":"建设用地使用权纠纷","value":"建设用地使用权纠纷"},{"label":"抵押权纠纷","value":"抵押权纠纷"}]},{"label":"合同纠纷、准合同纠纷","value":"合同纠纷、准合同纠纷","children":[{"label":"保证合同纠纷","value":"保证合同纠纷"},{"label":"确认合同效力纠纷","value":"确认合同效力纠纷"},{"label":"房屋买卖合同纠纷","value":"房屋买卖合同纠纷"},{"label":"其他买卖合同纠纷","value":"其他买卖合同纠纷"},{"label":"租赁合同纠纷","value":"租赁合同纠纷"},{"label":"建设工程合同纠纷","value":"建设工程合同纠纷"},{"label":"物业服务合同纠纷-公共收益返还","value":"物业服务合同纠纷-公共收益返还"},{"label":"物业服务合同纠纷-返水纠纷","value":"物业服务合同纠纷-返水纠纷"},{"label":"物业服务合同纠纷-进退场纠纷","value":"物业服务合同纠纷-进退场纠纷"},{"label":"物业服务合同纠纷-物业服务费纠纷","value":"物业服务合同纠纷-物业服务费纠纷"},{"label":"物业服务合同纠纷-其他","value":"物业服务合同纠纷-其他"},{"label":"中介合同纠纷","value":"中介合同纠纷"},{"label":"劳务合同纠纷","value":"劳务合同纠纷"},{"label":"无因管理、不当得利纠纷","value":"无因管理、不当得利纠纷"},{"label":"追偿权纠纷","value":"追偿权纠纷"},{"label":"其他合同纠纷","value":"其他合同纠纷"},{"label":"缔约过失责任纠纷","value":"缔约过失责任纠纷"},{"label":"预约合同纠纷","value":"预约合同纠纷"},{"label":"建设用地使用权合同纠纷","value":"建设用地使用权合同纠纷"},{"label":"股权合作合同纠纷","value":"股权合作合同纠纷"},{"label":"委托开发合同纠纷","value":"委托开发合同纠纷"},{"label":"其他投资合同纠纷","value":"其他投资合同纠纷"},{"label":"商品房预约合同纠纷","value":"商品房预约合同纠纷"},{"label":"商品房销/预售合同纠纷-逾期交房纠纷","value":"商品房销/预售合同纠纷-逾期交房纠纷"},{"label":"商品房销/预售合同纠纷-逾期整改纠纷","value":"商品房销/预售合同纠纷-逾期整改纠纷"},{"label":"商品房销/预售合同纠纷-逾期办证纠纷","value":"商品房销/预售合同纠纷-逾期办证纠纷"},{"label":"商品房销/预售合同纠纷-退房纠纷","value":"商品房销/预售合同纠纷-退房纠纷"},{"label":"商品房销/预售合同纠纷-交付不符纠纷","value":"商品房销/预售合同纠纷-交付不符纠纷"},{"label":"商品房销/预售合同纠纷-房屋质量纠纷","value":"商品房销/预售合同纠纷-房屋质量纠纷"},{"label":"商品房销/预售合同纠纷-分包销合同纠纷","value":"商品房销/预售合同纠纷-分包销合同纠纷"},{"label":"商品房销/预售合同纠纷-用益物权纠纷（使用权转让）","value":"商品房销/预售合同纠纷-用益物权纠纷（使用权转让）"},{"label":"商品房销/预售合同纠纷-断供纠纷","value":"商品房销/预售合同纠纷-断供纠纷"},{"label":"商品房销/预售合同纠纷-其他纠纷","value":"商品房销/预售合同纠纷-其他纠纷"},{"label":"销售代理（中介)合同纠纷","value":"销售代理（中介)合同纠纷"},{"label":"营销广告合同纠纷","value":"营销广告合同纠纷"},{"label":"借款（民间借贷）/金融贷款合同纠纷","value":"借款（民间借贷）/金融贷款合同纠纷"},{"label":"建设工程合同纠纷-工程质量纠纷","value":"建设工程合同纠纷-工程质量纠纷"},{"label":"建设工程合同纠纷-欠付工程款纠纷","value":"建设工程合同纠纷-欠付工程款纠纷"},{"label":"建设工程合同纠纷-工程结算纠纷","value":"建设工程合同纠纷-工程结算纠纷"},{"label":"建设工程合同纠纷-质保金纠纷","value":"建设工程合同纠纷-质保金纠纷"},{"label":"建设工程合同纠纷-其他纠纷","value":"建设工程合同纠纷-其他纠纷"},{"label":"演出合同纠纷","value":"演出合同纠纷"},{"label":"无因管理纠纷","value":"无因管理纠纷"},{"label":"不当得利纠纷","value":"不当得利纠纷"}]},{"label":"劳动争议","value":"劳动争议","children":[{"label":"解除劳动合同纠纷","value":"解除劳动合同纠纷"},{"label":"确认劳动关系纠纷","value":"确认劳动关系纠纷"},{"label":"追索劳动报酬纠纷","value":"追索劳动报酬纠纷"},{"label":"竞业限制纠纷","value":"竞业限制纠纷"},{"label":"社会保险纠纷","value":"社会保险纠纷"},{"label":"工伤工亡纠纷","value":"工伤工亡纠纷"},{"label":"劳务派遣合同纠纷","value":"劳务派遣合同纠纷"},{"label":"其他劳动争议","value":"其他劳动争议"}]},{"label":"与公司、证券、保险、票据等有关的民事纠纷","value":"与公司、证券、保险、票据等有关的民事纠纷","children":[{"label":"请求变更公司登记纠纷","value":"请求变更公司登记纠纷"},{"label":"股权转让纠纷","value":"股权转让纠纷"},{"label":"股东知情权纠纷","value":"股东知情权纠纷"},{"label":"公司决议纠纷","value":"公司决议纠纷"},{"label":"公司盈余分配纠纷","value":"公司盈余分配纠纷"},{"label":"损害股东利益责任纠纷","value":"损害股东利益责任纠纷"},{"label":"损害公司利益责任纠纷","value":"损害公司利益责任纠纷"},{"label":"股东出资纠纷","value":"股东出资纠纷"},{"label":"股权激励纠纷","value":"股权激励纠纷"},{"label":"公司解散纠纷","value":"公司解散纠纷"},{"label":"其他与公司有关的纠纷","value":"其他与公司有关的纠纷"},{"label":"证券纠纷","value":"证券纠纷"},{"label":"保险合同纠纷","value":"保险合同纠纷"},{"label":"保险人代位求偿权纠纷","value":"保险人代位求偿权纠纷"}]},{"label":"著作权侵权纠纷","value":"著作权侵权纠纷","children":[{"label":"著作权侵权纠纷","value":"著作权侵权纠纷"}]},{"label":"侵权责任纠纷","value":"侵权责任纠纷","children":[{"label":"提供劳务致侵权纠纷","value":"提供劳务致侵权纠纷"},{"label":"网络侵权责任纠纷","value":"网络侵权责任纠纷"},{"label":"违反安全保障义务责任纠纷","value":"违反安全保障义务责任纠纷"},{"label":"生命权、身体权、健康权纠纷","value":"生命权、身体权、健康权纠纷"},{"label":"高空抛物、坠物致人身或财产损害责任纠纷","value":"高空抛物、坠物致人身或财产损害责任纠纷"},{"label":"其他致人或致财物损害的侵权责任纠纷","value":"其他致人或致财物损害的侵权责任纠纷"}]},{"label":"知识产权与竞争纠纷","value":"知识产权与竞争纠纷","children":[{"label":"知识产权与竞争纠纷","value":"知识产权与竞争纠纷"}]},{"label":"非讼程序案件案由","value":"非讼程序案件案由","children":[{"label":"公司清算案件","value":"公司清算案件"},{"label":"第三人撤销之诉","value":"第三人撤销之诉"},{"label":"执行程序中的异议之诉","value":"执行程序中的异议之诉"}]}]`),
      },
      legal:{
        value:'',
        scope:'全集团',
        plate:'',
        zoneProject:'',
        create_by:'',
        progress:'',
        zone:'',
        court:'',
        accuser:'',
        defendant:'',
        caseType:'',
        lawOffice:'',
        lawyer:'',
        judge:'',
        claims:'',
        disclosure:'',
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
        { title: '案件状态', dataIndex: 'legalStatus', key: 'legalStatus', }, 
      ],
      search:{
        page:1,
        total:'500',
        startEtime:'',
        endEtime:'',
      },
      data:[],
      rowSelection:[],
      stageVal:{
        '一审阶段': 1,
        '二审阶段': 2,
        '执行阶段': 2,
        '再审阶段': 2,
        '归档闭单': 100,
      },
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'案件管控',path:'/legal/workspace'},{icon:'form',text:'案件管理',path:''}],
      statusType:{'valid':'有效','invalid':'删除'},
      zoneType:{'领地集团总部':'领地集团总部','成渝区域':'成渝区域','两湖区域':'两湖区域','川北区域':'川北区域','成渝区域':'成渝区域','乐眉区域':'乐眉区域','中原区域':'中原区域','攀西区域':'攀西区域','新疆区域':'新疆区域','大湾区域':'大湾区域','北京区域':'北京区域'},
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
        const userinfo = await Betools.storage.getStore('system_userinfo');
        // this.legal.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
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
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          this.userinfo = await this.weworkLogin(); //查询当前登录用户
          this.back = Betools.tools.getUrlParam('back') || '/legal/workspace'; //查询上一页
          this.legal.stage = Betools.tools.getUrlParam('stage') || '全部';
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
        const condition = `_where=(status,in,${status})${searchSql}&_fields=id,create_time,receiveTime,lawRTime,handledTime,legalStatus,caseType,court,caseID,judge,stage,serialID,caseType,accuser,defendant&_sort=-id&_p=${page}&_size=${size}`;
        let list = await Betools.manage.queryTableData(tableName , condition);
        this.search.total = await Betools.manage.queryTableDataCount(tableName, condition);
        list.map((element)=>{ 
            const item = JSON.parse(JSON.stringify(element));
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD'); 
            item.receiveTime = dayjs(item.receiveTime).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.receiveTime).format('YYYY-MM-DD');
            item.lawRTime = dayjs(item.lawRTime).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.lawRTime).format('YYYY-MM-DD');
            item.handledTime = dayjs(item.handledTime).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.handledTime).format('YYYY-MM-DD');
            item.legalStatus = Betools.tools.isNull(item.legalStatus) ? '开庭举证' : item.legalStatus;
            try {
              item.caseType = JSON.parse(item.caseType);
            } catch (error) {
              console.error(error);
            }
            try {
              item.court = JSON.parse(item.court);
              Betools.tools.isNull(item.court[item.court.length-1]) ? item.court = item.court.slice(0,item.court.length-1) : null;
              item.court = Betools.tools.deNull(item.court[item.court.length-1],'') ;
            } catch (error) {
              console.error(error);
            }
        });
        return list;
      },

      // 案件发起录入申请
      async execApply(){
          const { $router } = this;
          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 只有法务部门的同事及管理员具有查看权限 // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
            $router.push(`/legal/case/legalapply?type=1&tname=案件录入&apply=new&role=new`);
          } else {
            vant.Dialog.alert({  title: '温馨提示',  message: `您好，您没有案件录入权限！`, }); 
          }
      },

      // 案件记录修改申请
      async execPatch(elem){
          const { $router } = this;
          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', elem.apply_username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
            $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件修改&apply=edit&role=edit`);
          } else {
            const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
            const response = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
            const permission = (response && response.length > 0 && (JSON.stringify(response).includes('领地集团总部')||JSON.stringify(response).includes('所有权限')));
            if(!permission){
              return vant.Dialog.alert({  title: '温馨提示',  message: `您好，案件只能由同部门的同事进行修改操作！`, }); 
            } else {
              $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件修改&apply=edit&role=edit`);
            }
          }
      },

      // 案件记录追加进展
      async execProcess(elem){
          const { $router } = this;
          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', elem.apply_username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
            $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件进展&apply=process&role=process`);
          } else {
            const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
            const response = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
            const permission = (response && response.length > 0 && (JSON.stringify(response).includes('领地集团总部')||JSON.stringify(response).includes('所有权限')));
            if(!permission){
              return vant.Dialog.alert({  title: '温馨提示',  message: `您好，案件只能由同部门的同事进行案件进展追加操作！`, }); 
            } else {
              $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件进展&apply=process&role=process`);
            }
          }
      },

      // 案件记录查看申请
      async execView(elem){
          const { $router } = this;
          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 只有法务部门的同事及管理员具有查看权限 // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
            $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件详情&apply=view&role=view`);
          } else {
            vant.Dialog.alert({  title: '温馨提示',  message: `您好，您没有案件详情查看权限！`, }); 
          }
      },

      // 案件记录发起知会
      async execNotify(elem){
          const { $router } = this;
          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', elem.apply_username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
            $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件详情&apply=view&role=notify`);
          } else {
            const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
            const response = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
            const permission = (response && response.length > 0 && (JSON.stringify(response).includes('领地集团总部')||JSON.stringify(response).includes('所有权限')));
            if(!permission){
              return vant.Dialog.alert({  title: '温馨提示',  message: `您好，案件只能由同部门的同事进行知会操作！`, }); 
            } else {
              $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件详情&apply=view&role=notify`);
            }
          }
      },

      // 案件评价管理
      async execEvaluate(elem , status){
          const { $router } = this;
          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', elem.apply_username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
            $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件评价&stage=evaluate&apply=case&role=${status}`);
          } else {
            const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
            const response = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
            const permission = (response && response.length > 0 && (JSON.stringify(response).includes('领地集团总部')||JSON.stringify(response).includes('所有权限')));
            if(!permission){
              return vant.Dialog.alert({  title: '温馨提示',  message: `您好，案件只能由同部门的同事进行评价操作！`, }); 
            } else {
              $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&tname=案件评价&stage=evaluate&apply=case&role=${status}`);
            }
          }
      },

      // 案件记录导出功能
      async execExport(){
          const { $router } = this;
          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
            this.$refs.grid.exportTable('xlsx', false, '案件台账数据');
          } else {
            vant.Dialog.alert({  title: '温馨提示',  message: `您好，您没有案件台账导出权限！`, }); 
          }
      },

      // 案件记录删除信息
      async execDelete(elem){
          const { $router , data , tablename , execFresh } = this;
          const that = this;

          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', elem.apply_username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
          } else {
            return vant.Dialog.alert({  title: '温馨提示',  message: `您好，此案件只能由同部门同事操作，您没有操作权限！`, });
          }

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

          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', elem.apply_username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
          } else {
            return vant.Dialog.alert({  title: '温馨提示',  message: `您好，此案件只能由同部门同事操作，您没有操作权限！`, });
          }

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

          vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', elem.apply_username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
          vant.Toast.clear();
          if (resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username)) {
            this.role += ',LEGAL_OPERATE_ADMIN';
          } else {
            const response = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
            const permission = (response && response.length > 0 && (JSON.stringify(response).includes('领地集团总部')||JSON.stringify(response).includes('所有权限')));
            if (!permission) {
              return vant.Dialog.alert({  title: '温馨提示',  message: `您好，此案件只能由同部门同事操作，您没有操作权限！`, });
            }
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
                    // await execFresh('view'); // vant.Dialog.alert({  title: '温馨提示',  message: `已完成进入${stage}操作！`, });  // 获取到本地缓存数据，然后将缓存数据的列表中的此数据的状态改为stage
                    this.data.map(item => { 
                      (item.id == elem.id) ? item.stage = stage : null; 
                      (item.id == elem.id) ? Betools.query.cacheTableDataByID(tablename, item.id , item) : null ;
                    });
                    $router.push(`/legal/case/legalapply?id=${elem.id}&type=1&stage=${stage}&tname=${stage}&apply=stage&role=stage`);
                }
            });
      },

      // 案件列表执行刷新操作45
      async execFresh(value = ''){
        await this.execSearch(value);
      },

      // 执行分页查询
      async paginationView(page = 0, size = 10){
        this.search.page = page;
        this.execSearch('view', page -1 , size);
      },

      // 案件列表执行搜索功能
      async execSearch(value = '' , page = 0 , size = 10){
        console.log(`exec search ...` , dayjs().format('HH:mm:ss'));
        const tableName = this.viewname;
        const cacheRandomKey = value == 'view' ? ',' + Math.random().toString().slice(2,6) : '';
        const toast = value == 'view' ? vant.Toast.loading({ duration: 5000,  forbidClick: false,  message: '刷新中...', }):null;
        const { legal } = this;
        const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
        const resp = await Betools.query.queryRoleGroupList('LEGAL_OPERATE_ADMIN', userinfo.username); // 如果是修改或者追加或者是知会，需要检查是否是同部门，如果是同部门，则可以进行修改或追加或者知会操作
        let permissionSQL = (resp && resp.length > 0 && (JSON.stringify(resp).includes('领地集团总部')||JSON.stringify(resp).includes('ALL_PERMISSION'))) ? '':``;
        let scopeSQL = this.legal.scope.includes('全集团') ? '':`~and(apply_username,in,${resp[0].userlist})`;
        let searchSql = typeof legal.value == 'string' ? `~and((title,like,~${legal.value}~)~or(create_by,like,~${legal.value}~)~or(fstPlan,like,~${legal.value}~)~or(legalType,like,~${legal.value}~)~or(plate,like,~${legal.value}~)~or(firm,like,~${legal.value}~)~or(legalTname,like,~${legal.value}~)~or(zone,like,~${legal.value}~)~or(zoneProject,like,~${legal.value}~)~or(caseID,like,~${legal.value}~)~or(caseType,like,~${legal.value}~)~or(caseSType,like,~${legal.value}~)~or(stage,like,~${legal.value}~)~or(accuser,like,~${legal.value}~)~or(defendant,like,~${legal.value}~)~or(court,like,~${legal.value}~)~or(judge,like,~${legal.value}~)~or(judgeMobile,like,~${legal.value}~)~or(inHouseLawyers,like,~${legal.value}~)~or(disclosure,like,~${legal.value}~)~or(lawcase,like,~${legal.value}~)~or(thirdParty,like,~${legal.value}~)~or(lawOffice,like,~${legal.value}~)~or(lawyer,like,~${legal.value}~)~or(lawyerMobile,like,~${legal.value}~)~or(claims,like,~${legal.value}~))` : '';
        let stageSql = Betools.tools.isNull(legal.stage) || legal.stage == '全部' ? '' : `~and(stage,in,${legal.stage})`;
        let caseSTypeSQL = Betools.tools.isNull(legal.caseSType) || legal.caseSType == '全部' ? '':`~and(caseSType,eq,${legal.caseSType})`;
        let legalTypeSQL = Betools.tools.isNull(legal.legalType) || legal.legalType == '全部' ? '':`~and(legalType,eq,${legal.legalType})`;
        let zoneSQL = Betools.tools.isNull(legal.zone) ? '':`~and(zone,like,~${legal.zone}~)`;
        let courtSQL = Betools.tools.isNull(legal.court) ? '':`~and(court,like,~${legal.court}~)`;
        let accuserSQL = Betools.tools.isNull(legal.accuser) ? '':`~and(accuser,like,~${legal.accuser}~)`;
        let defendantSQL = Betools.tools.isNull(legal.defendant) ? '':`~and(defendant,like,~${legal.defendant}~)`;
        let caseTypeSQL = Betools.tools.isNull(legal.caseType) ? '':`~and(caseType,like,~${legal.caseType}~)`;
        let lawOfficeSQL = Betools.tools.isNull(legal.lawOffice) ? '':`~and(lawOffice,like,~${legal.lawOffice}~)`;
        let lawyerSQL = Betools.tools.isNull(legal.lawyer) ? '':`~and(lawyer,like,~${legal.lawyer}~)`;
        let judgeSQL = Betools.tools.isNull(legal.judge) ? '':`~and(judge,like,~${legal.judge}~)`;
        let claimsSQL = Betools.tools.isNull(legal.claims) ? '':`~and(claims,like,~${legal.claims}~)`;
        let disclosureSQL = Betools.tools.isNull(legal.disclosure) ? '':`~and(claims,like,~${legal.disclosure}~)`;
        let plateSQL = Betools.tools.isNull(legal.plate) ? '': `~and(plate,like,~${legal.plate}~)`;
        let zoneProjectSQL = Betools.tools.isNull(legal.zoneProject) ? '': `~and(zoneProject,like,~${legal.zoneProject}~)`;
        let createbySQL = Betools.tools.isNull(legal.create_by) ? '': `~and(create_by,like,~${legal.create_by}~)`;
        let progressSQL = Betools.tools.isNull(legal.progress) ? '': `~and(progress,like,~${legal.progress}~)`;
        searchSql = plateSQL + zoneProjectSQL + createbySQL + progressSQL + scopeSQL + zoneSQL + courtSQL + accuserSQL + defendantSQL + caseTypeSQL + lawOfficeSQL + lawyerSQL + judgeSQL + claimsSQL + disclosureSQL + searchSql;
        this.data = [];
        
        (async()=>{
          const data = await this.handleList(tableName , `待处理,处理中,审批中,已完成,已结案,已驳回${cacheRandomKey}`, userinfo, stageSql + permissionSQL + caseSTypeSQL + legalTypeSQL + searchSql , page , size);
          value == 'view' && data && data.length > 0 && this.data.length == 0 ? (this.data = data) : null ;
          vant.Toast.clear();
        })();

        (async()=>{
          const data = await this.handleList(tableName , `待处理,处理中,审批中,已完成,已结案,已驳回${cacheRandomKey}`, userinfo, stageSql + permissionSQL + caseSTypeSQL + legalTypeSQL + searchSql , page , size);
          value == 'view' && data && data.length > 0 && this.data.length == 0 ? (this.data = data) : null ;
          vant.Toast.clear();
        })();

        return this.data; 
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
</style>
