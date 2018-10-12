<template>
  <div>
    <!--头部-->
    <div class="hot_head">
      <router-link to="/manager/hotDetail">
        <el-button size="small" style="color:#fff;background-color:#ed6f00;padding:10px 20px;font-size:14px;border-radius:30px;">+ 新增活动</el-button>
      </router-link>
      <el-input
        style="width:240px;"
        size="small"
        class="hot_search"
        placeholder="搜索品牌、商品名称"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchBanner">
      </el-input>
    </div>
    <div class="hot_choose">
      <div class="hot_choose_city" style="margin-top:0">
        <span style="padding-right:20px;color:#000000">展示城市: </span>
        <el-radio-group v-model="city" @change="chooseCity">
          <el-radio v-for="items in cities" :label="items" :key="items">{{items}}</el-radio>
        </el-radio-group>
      </div>
      <div class="hot_choose_city">
        <span style="padding-right:20px;color:#000000">时间: </span>
        <el-radio-group v-model="time" @change="chooseTimeAll" style="padding-right:20px;">
          <el-radio :label="1">全部</el-radio>
        </el-radio-group>
        <el-date-picker
          size="small"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="chooseDate">
        </el-date-picker>
      </div>
      <div class="hot_choose_city">
        <span style="padding-right:20px;color:#000000">时段: </span>
        <el-radio-group v-model="timeAround" @change="chooseTime">
          <el-radio v-for="time in times" :label="time" :key="time">{{time}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      class="hot_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        prop="name"
        align="center"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="img"
        align="center"
        label="海报">
      </el-table-column>
      <el-table-column
        prop="url"
        align="center"
        label="文章链接">
      </el-table-column>
      <el-table-column
        prop="city"
        align="center"
        label="展示城市">
      </el-table-column>
      <el-table-column
        prop="date"
        align="center"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="time"
        align="center"
        label="时段">
      </el-table-column>
      <el-table-column
        prop="detail"
        align="center"
        label="详情">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data () {
      return {
        pickerOptions:{
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        search:'',
        city:[],
        cities:['全部','上海', '北京', '广州', '深圳'],
        time:'',
        date:'',
        timeAround:[],
        times:['全部','全天','0:00-12:00','12:00-18:00','18:00-24:00'],
        data:[{
          name:'aa',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          detail:'关联了三个菜品',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'bb',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          detail:'关联了三个菜品',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'cc',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          detail:'关联了三个菜品',
          date:'2018-2019',
          time:'00:00-06:00'
        },{
          name:'dd',
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          url:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          city:'武汉',
          detail:'关联了三个菜品',
          date:'2018-2019',
          time:'00:00-06:00'
        }]
      }
    },
    methods:{
      //搜索
      searchBanner(){
        this.$stamp(null,this.search)
      },
      //选城市
      chooseCity(val){
        this.$stamp(null,val)
      },
      //选时间
      chooseTimeAll(val){
        this.$stamp(null,val)
      },
      //选日期
      chooseDate(val){
        this.$stamp(null,val)
      },
      //选时段
      chooseTime(val){
        this.$stamp(null,val)
      }
    },
    computed: {
      
    },
    components: {
      
    },
    created(){
      
    }
}
</script>

<style>
  .hot_head{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .hot_choose{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;   
    box-sizing: border-box;
    border-radius:5px;
    padding:15px;
    margin-top:20px;
    background-color:#ffffff;
  }
  .hot_choose_city{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-top:20px;
  }
  .hot_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .hot_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .hot_table thead tr th:nth-child(8){
    border-radius:0 5px 0 0;
  }
  .hot_search input{
    border:0;
    border-radius:30px;
  }
  .hot_choose_city .el-radio{
    color:#000000;
    display: flex;
    align-items: center;
  }
  .hot_choose_city .el-radio-group{
    display: flex;
    align-items: center;
  }
  .hot_choose_city .el-range-editor--small.el-input__inner{
    border:0;
  }
  .hot_choose_city .el-radio__inner{
    border-color:#000000;
  }
  .hot_choose_city .el-radio__input.is-checked .el-radio__inner{
    border-color: #000000;
    background: #000000;
  }
  .hot_choose_city .el-radio__input.is-checked+.el-radio__label{
    color:#000000;
  }
</style>
