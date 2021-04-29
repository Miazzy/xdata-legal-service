<template>

<keep-alive>
  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header" class="header-menu" v-show="!searchFlag" style="overflow-x: hidden;" >
        <div class="center" style="position:relative;">
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>员工管理</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 55px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 0px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 42px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >
              </van-dropdown-item>
            </van-dropdown-menu>
        </div>
    </header>

    <header id="wx-header" class="header-search" v-show="!!searchFlag" style="padding:0px 0px 1px 0px; border-bottom:1px solid #cecece;">
       <div>
          <van-search  v-model="searchWord"  show-action placeholder="请输入搜索关键词" >
            <template #action>
              <div @click="headMenuSearch();" >搜索</div>
            </template>
          </van-search>
        </div>
    </header>

    <section>
      <div class="weui-cells" style="margin-top: 0px;">
        <template>
            <vue-excel-editor v-model="initContractList" ref="grid" width="100%" filter-row autocomplete @delete="onDelete" @update="onUpdate" >
                <vue-excel-column field="id"         label="序号"             width="80px" />
                <vue-excel-column field="userid"     label="企微信号"          width="100px" />
                <vue-excel-column field="loginid"    label="OA账号"           width="100px" />
                <vue-excel-column field="name"       label="用户"             width="100px" />
                <vue-excel-column field="position"   label="岗位名称"          width="100px" />
                <vue-excel-column field="mobile"     label="手机"             width="100px" />
                <vue-excel-column field="gender"     label="性别"             width="60px" type="map" :options="genderType" />
                <vue-excel-column field="seclevel"   label="安全"             width="60px"/>
                <vue-excel-column field="cert"       label="身份证号"          width="180px" />
                <vue-excel-column field="departname" label="部门名称"          width="100px"/>
                <vue-excel-column field="topname"    label="上级部门"          width="120px"/>
                <vue-excel-column field="company"    label="公司信息"          width="180px"/>
                <vue-excel-column field="cname"      label="公司"             width="100px"/>
            </vue-excel-editor>
        </template>
      </div>
    </section>

  </div>
</keep-alive>

</template>

<script>
import * as workconfig from '@/request/workconfig';
export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "员工管理",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initContractList:[],
            sealContractList:[],
            receiveContractList:[],
            frontContractList:[],
            doneContractList:[],
            failContractList:[],
            hContractID:'',
            tabmap:{
              '1': 'initContractList',
              '2': 'sealContractList',
              '3': 'receiveContractList',
              '4': 'frontContractList',
              '5': 'doneContractList',
              '6': 'failContractList',
            },
            json_data: [],
            sealType:'',
            searchWord:'',
            totalpages:5,
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '搜索', value: 3 , icon: 'search' },
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
              { text: '导出', value: 7 , icon: 'description' },
            ],
            menuCssValue:'',
            isLoading:false,
            loading:false,
            currentPage: 1,
            archiveTypeColumns: workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
            approveColumns: workconfig.compcolumns.approveColumns,
            sealStatusColumns: workconfig.compcolumns.sealStatusColumns,
            tableName: 'v_hrmresource',
            genderType:{'1':'男','2':'女','0':'未知'},
            statusType:{'COMMON_AUTH_ADMIN':'权限管理员','COMMON_RECEIVE_BORROW':'物品管理员','SEAL_ADMIN':'印章_用印管理员','COMMON_FRONT_ADMIN':'前台管理员','COMMON_REWARD_HR_ADMIN':'薪资管理员','JOB_EXEC_ADMIN':'入职_行政管理员','JOB_FRONT_ADMIN':'入职_前台管理员','JOB_HR_ADMIN':'入职_HR管理员','JOB_MEAL_ADMIN':'入职_食堂管理员','SEAL_ARCHIVE_ADMIN':'印章_归档管理员','SEAL_FINANCE_ADMIN':'印章_财务管理员','SEAL_FRONT_SERVICE':'印章_前台管理员','SEAL_ARCHIVE_EXPORT':'印章_导出管理员'},
        }
    },
    activated() {
      this.queryInfo();
    },
    mounted() {
      this.queryInfo();
    },
    watch: {
      $route(to, from) {

      },
      tabname(){
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        },500);
      }
    },
    methods: {
      exportAsExcel () {
        this.$refs.grid.exportTable('xlsx', true, '员工数据表单');
      },
      async onAdd(){
        return this.$toast.fail('管理员您好，数据由OA同步过来，添加数据请到OA用户管理处修改！');
      },
      async onDelete(records){
        console.log('delete');
      },
      async onUpdate(records){
        const temp = this.$refs.grid.$options.propsData.value;
        if(records.length > 1){
          return this.$toast.fail('管理员您好，一次只能更新一条数据！');
        } else {
          return this.$toast.fail('管理员您好，数据由OA同步过来，修改数据请到OA用户管理处修改！');
        }
      },
      async userStatus(){
        try {
          let info = await Betools.storage.getStore('system_userinfo');
        } catch (error) {
          console.log(error);
        }
      },
      encodeURI(value){
        return window.encodeURIComponent(value);
      },
      //刷新页面
      async queryFresh(){
        //刷新相应表单
        this.queryTabList(this.tabname , this.currentPage - 1);
        //等待一下
        await Betools.tools.sleep(300);
        //显示刷新消息
        vant.Toast('刷新成功');
        //设置加载状态
        this.isLoading = false;
      },
      //点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },
      //点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          //刷新相应表单
          this.queryTabList(this.tabname);
          //显示搜索状态
          vant.Toast('搜索...');
          //等待一下
          await Betools.tools.sleep(300);
        }
        //显示刷新消息
        this.searchFlag = false;
      },
      //点击右侧菜单
      async headDropMenu(value){
        const val = this.dropMenuValue;
        switch (val) {
          case 0:
            break;
          case 2: //刷新数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.queryFresh();
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue;
            this.searchFlag = true;
            break;
          case 4: //重置数据
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.sealType = '';
            this.searchFlag = false;
            this.searchWord = '';
            await this.queryFresh();
            break;
          case 5: //返回应用
            this.$router.push(`/app`);
            break;
          case 6: //返回首页
            this.$router.push(`/explore`);
            break;
          case 7: //导出表单
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.exportAsExcel();
            break;
          case 1:
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.onAdd();
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },
      //点击Tab栏
      async queryTabList(tabname , page = 0){
        // 设置当前页为第一页
        this.currentPage = page + 1;
        const whereSQL = `_sort=-id&_p=${page}&_size=10000`;
        this.initContractList = await Betools.manage.queryTableData(this.tableName , whereSQL);
        this.totalpages = await Betools.manage.queryTableDataCount(this.tableName , whereSQL);
        this.initContractList.map((item , index) => {
          item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        });
        this.initContractList.sort();
      },
      async queryInfo(){
        //查询列表数据
        this.queryTabList(this.tabname , 0);
      },
      async changePage(){
        const page = this.currentPage;
        await this.queryTabList( this.tabname , page - 1 );
      },
    }
}
</script>
<style>
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
</style>
