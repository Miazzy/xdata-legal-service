<template>
  <div id="reward-message">
    <div>
      <a-row :gutter="24">
        <keep-alive>
          <a-col :xl="1" :lg="24" :md="24" :sm="24" :xs="24">
            <van-sidebar v-model="activeTabKey">
              <van-sidebar-item title="消息" :to="`/legal/message`" />
              <van-sidebar-item title="云文档" :to="`/legal/netdisk`" />
              <van-sidebar-item title="联系人" :to="`/legal/contact`" />
              <van-sidebar-item title="工作台" :to="`/legal/workspace`" />
              <van-sidebar-item title="收藏" :to="`/legal/collect`" />
              <van-sidebar-item title="设置" :to="`/legal/setup`" />
            </van-sidebar>
          </a-col>
        </keep-alive>
        <keep-alive>
          <a-col :xl="6" :lg="24" :md="24" :sm="24" :xs="24">

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
                  @click="menuCardClick(item.id);"
                  :style="item.css"
                >
                  <a-card-meta>
                    <div slot="title" class="card-title pane-flow-card-meta" @click="item.click">
                      <div class="pane-flow-card-meta-icon">
                        <a-avatar size="large" :src="item.avatar" />
                      </div>
                      <div class="pane-flow-card-meta-title">
                        <a class="pane-flow-card-meta-tname">{{ item.name }}</a>
                        <div class="pane-flow-card-meta-description">{{ item.description }}</div>
                      </div>
                    </div>
                  </a-card-meta>
                </a-card-grid>
              </template>
            </a-card>
          </a-col>
        </keep-alive>
        <keep-alive>
          <a-col style="padding: 0 12px 0 0" :xl="17" :lg="24" :md="24" :sm="24" :xs="24">
            <template v-for=" paneflow in paneflows ">

              <a-card
                :key="paneflow.name"
                v-show=" panename == paneflow.ename "
                style="margin-top: 0px"
                :bordered="false"
                :title="paneflow.name">

                <div slot="extra">
                  <a-radio-group v-model="year" style="margin-right:20px;">
                    <a-radio-button value="all">所有</a-radio-button>
                    <a-radio-button value="half">半年</a-radio-button>
                    <a-radio-button value="year">全年</a-radio-button>
                  </a-radio-group>
                  <a-radio-group v-model="status">
                    <a-radio-button value="all">{{ paneflow.tabs[0]}}</a-radio-button>
                    <a-radio-button value="processing">{{ paneflow.tabs[1] }}</a-radio-button>
                    <a-radio-button value="waiting">{{ paneflow.tabs[2] }}</a-radio-button>
                  </a-radio-group>
                  <a-input-search style="margin-left: 16px; width: 272px;" />
                </div>

                <div style="background:#fefefe;margin:10px 10px;pading:10px 10px;">
                  <a-list-item :key="index" v-for="(item, index) in paneflow.dataSource" style="background:#fefefe;margin:10px 10px;pading:10px 10px;border-bottom:1px solid #f0f0f0;">
                    <a-list-item-meta :description="item.description">
                      <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
                      <a slot="title">{{ item.title }}</a>
                    </a-list-item-meta>
                    <div slot="actions">
                      <a @click="edit(item)">查看</a>
                    </div>
                    <div class="list-content">
                      <div class="list-content-item">
                        <span>流程发起</span>
                        <p>{{ item.owner }}</p>
                      </div>
                      <div class="list-content-item">
                        <span>开始时间</span>
                        <p>{{ item.startAt }}</p>
                      </div>
                      <div class="list-content-item">
                        <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
                      </div>
                    </div>
                  </a-list-item>
                </div>
              </a-card>
            </template>

          </a-col>
        </keep-alive>
      </a-row>
    </div>
  </div>
</template>
<script>
import * as workconfig from "@/request/workconfig";

export default {
  mixins: [window.mixin],
  data() {
    return {
      activeTabKey: 4,
      pageName: "联系人",
      momentNewMsg: true,
      paneflowcard: "",
      paneflowcardGrid: "",
      searchwords: "",
      panename:'mytodolist', // todo done
      constpaneflows: workconfig.getPaneflows(this),
      paneflows: workconfig.getPaneflows(this),
      status: 'all',
      year:'all',
    };
  },
  activated() {
    this.init();
    this.changeStyle();
    this.displayFoot();
  },
  mounted() {
    this.init();
    this.changeStyle();
    this.displayFoot();
  },
  methods: {
    async init() {
      this.activeTabKey = 4;
      this.constpaneflows = JSON.parse(JSON.stringify(this.paneflows));
    },
    async changeStyle(winHeight) {
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
      }
      this.paneflowcard = `height:${winHeight}px; overflow-y: scroll;`;
    },
    async displayFoot() {},
    async userLogin() {},
    async clearLoginInfo() {},
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
    async menuCardClick(id) {
      this.paneflows.map((item) => {
        if (item.id === id) {
          item.css = "background:#f9f9f9;";
        } else {
          item.css = "";
        }
      });
    },
  },
};
</script>
<style scoped >
@import "../../assets/css/reward.home.css";
@import "../../assets/css/reward.message.css";
</style>
