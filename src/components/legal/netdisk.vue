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
          <a-col :xl="4" :lg="24" :md="24" :sm="24" :xs="24">
            <div style="background-color:#fefefe;width:101%;height:100%;">
              <div
                class="mod-logo"
                style="font-size: 1.30rem; margin-left: 0.9rem; padding-top: 0.7rem;"
              >
                <img
                  style="float:left;margin-left:0px;margin-right:10px;"
                  src="https://img.weiyun.com/vipstyle/nr/box/img/favicon.ico?max_age=31536000"
                />
                云文档
              </div>

              <a-input-search
                placeholder="搜索全部"
                style="width: 200px; margin-top: 15px; margin-left: 10px; margin-bottom: 0px;"
                @search="onSearch"
              />

              <a-menu
                style="width:101%;height:100%;margin-top:20px;"
                mode="vertical"
                @click="handleClick"
              >
                <a-menu-item key="1">
                  <a-icon type="mail" />最近
                </a-menu-item>
              </a-menu>

              <div style="margin: 0px 10px;">
                <van-divider style="padding: auto 10px;" />
              </div>

              <a-menu style="width:101%;height:100%;" mode="vertical" @click="handleClick">
                <a-menu-item key="1">
                  <a-icon type="mail" />全部
                </a-menu-item>
                <a-menu-item key="2">
                  <a-icon type="calendar" />文档
                </a-menu-item>
                <a-menu-item key="3">
                  <a-icon type="calendar" />图片
                </a-menu-item>
                <a-menu-item key="4">
                  <a-icon type="calendar" />视频
                </a-menu-item>
                <a-menu-item key="5">
                  <a-icon type="calendar" />音乐
                </a-menu-item>
              </a-menu>

              <div style="margin: 0px 10px;">
                <van-divider style="padding: auto 10px;" />
              </div>

              <a-menu style="width:101%;height:100%;" mode="vertical" @click="handleClick">
                <a-menu-item key="6">
                  <a-icon type="mail" />公共网盘
                </a-menu-item>
                <a-menu-item key="8">
                  <a-icon type="calendar" />保险箱
                </a-menu-item>
                <a-menu-item key="6">
                  <a-icon type="mail" />共享空间
                </a-menu-item>
                <a-menu-item key="7">
                  <a-icon type="calendar" />我的分享
                </a-menu-item>
                <a-menu-item key="8">
                  <a-icon type="calendar" />回收站
                </a-menu-item>
              </a-menu>

              <div style="margin: 0px 10px;">
                <van-divider style="padding: auto 10px;" />
              </div>

              <a-menu style="width:101%;height:100%;" mode="vertical" @click="handleClick">
                <a-menu-item key="8">
                  <a-icon type="calendar" />空间管理
                </a-menu-item>
                <a-menu-item key="6">
                  <a-icon type="mail" />设置
                </a-menu-item>
              </a-menu>

              <div style="margin: 50px 10px;">
                <van-divider style="padding: auto 10px;" />
              </div>
            </div>
          </a-col>
        </keep-alive>
        <keep-alive>
          <a-col style="padding: 0 12px 0 0" :xl="17" :lg="24" :md="24" :sm="24" :xs="24">

              <a-card
                :key=" 'paneflow-name' "
                style="margin-top: 0px"
                :bordered="false"
                :title=" '' "
              >

                <a-row style="margin-left: 13px;">
                  <a-button type="primary">
                    上传
                  </a-button>
                  <a-button>新建</a-button>
                  <a-button>下载</a-button>
                  <a-button>删除</a-button>
                </a-row>

                <a-row class="pan-file-row-header" >
                  <a-col :span="15">
                    <a-checkbox :checked="checkAll" @change="onCheckAllChange" >
                    </a-checkbox>
                    <span class="txt txt-name" style="">名称</span>
                  </a-col>
                  <a-col :span="5">
                    <span class="txt txt-time">上次修改时间</span>
                  </a-col>
                  <a-col :span="4">
                    <span class="txt txt-size">大小</span>
                  </a-col>
                </a-row>

                <template v-for=" item in files ">
                  <a-row :key="item.id" class="pan-file-row-element">
                    <a-col :span="2">
                      <a-checkbox class="checkbox" :checked="item.checked" @change="item.click(item)" >
                      </a-checkbox>
                      <i :class="item.css" ></i>
                    </a-col>
                    <a-col :span="13">
                      <span class="txt txt-name">{{ item.filename }}</span>
                    </a-col>
                    <a-col :span="5">
                      <span class="txt txt-time">{{ item.time}}</span>
                    </a-col>
                    <a-col :span="4">
                      <span class="txt txt-size">{{ item.size }}</span>
                    </a-col>
                  </a-row>
                </template>

              </a-card>

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
      activeTabKey: 1,
      pageName: "云文档",
      momentNewMsg: true,
      paneflowcard: "",
      paneflowcardGrid: "",
      searchwords: "",
      panename: "mytodolist", // todo done
      constpaneflows: workconfig.getPaneflows(this),
      paneflows: workconfig.getPaneflows(this),
      files:[
        {
          id:'',
          checked:false,
          css:'icon icon-m icon-file-m',//icon icon-m icon-ppt-m
          filename: '文档',
          time: '2020-09-22 16:24',
          size:'117.57 KB',
          click : (item) => {
            item.checked = !item.checked;
          },
        },{
          id:'',
          checked:false,
          css:'icon icon-m icon-xls-m',//icon icon-m icon-ppt-m
          filename: '附件下载相关JS文件1_wev8.xls',
          time: '2020-09-22 16:24',
          size:'117.57 KB',
          click : (item) => {
            item.checked = !item.checked;
          },
        },{
          id:'',
          checked:false,
          css:'icon icon-m icon-pdf-m',//icon icon-m icon-ppt-m
          filename: '附件下载预览PDF.pdf',
          time: '2020-09-22 16:24',
          size:'117.57 KB',
          click : (item) => {
            item.checked = !item.checked;
          },
        },{
          id:'',
          checked:false,
          css:'icon icon-m icon-pic-m',//icon icon-m icon-ppt-m
          filename: '附件下载预览PDF.jpg',
          time: '2020-09-22 16:24',
          size:'117.57 KB',
          click : (item) => {
            item.checked = !item.checked;
          },
        },{
          id:'',
          checked:false,
          css:'icon icon-m icon-nor-m',//icon icon-m icon-ppt-m
          filename: '附件下载预览PDF.nor',
          time: '2020-09-22 16:24',
          size:'117.57 KB',
          click : (item) => {
            item.checked = !item.checked;
          },
        },{
          id:'',
          checked:false,
          css:'icon icon-m icon-txt-m',//icon icon-m icon-ppt-m
          filename: '附件下载预览PDF.txt',
          time: '2020-09-22 16:24',
          size:'117.57 KB',
          click : (item) => {
            item.checked = !item.checked;
          },
        }
      ],
      status: "all",
      year: "all",
      checkAll:false,
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
      this.activeTabKey = 1;
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
    async onCheckAllChange(e){
      this.checkAll = !this.checkAll;
      console.log(`checked = ${e.target.checked}`);
    }
  },
};
</script>
<style scoped >
@import "../../assets/css/reward.home.css";
@import "../../assets/css/reward.message.css";
@import "../../assets/css/reward.netdisk.css";
</style>
