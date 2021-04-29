<template>

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

</template>

<script>
  export default {
    name: 'MenuList',
    props: {
      searchwords:{
        type: String,
        required: false
      },
      paneflowcard:{
        type: String,
        required: false
      },
      paneflows:{
        type: Array,
        required: true
      }
    },
    data(){
      return {
        searchwords:this.searchwords,
        paneflowcard:'',
        paneflows:[],
      }
    },
    watch:{

    },
    methods:{
      searchWordChange() {
        this.$emit('change', this.searchwords);
      },
      menuCardClick(id){
        this.$emit('click', id);
      },
    },
    model: {
      prop: 'paneflows',
      event: 'change'
    }
  }
</script>
