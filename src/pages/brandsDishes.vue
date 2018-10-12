<template>
  <div>
    <!--头部-->
    <div class="brandsDishes_head">
      <div style="display:flex;justify-content:flex-start;align-items:center;">
        <router-link to="/manager/brandsDishesDetail"><div class="brandsDishes_addDishes"><i class="el-icon-plus"></i>&nbsp;添加菜品</div></router-link>
        <div style="margin-right:20px;">菜品数量&nbsp;<span style="color:#ed6f00">23</span></div>
        <div class="brandsDishes_chooseBrands">选择品牌</div>
        <el-select v-model="brands" class="brandsDishes_options" style="width:120px;" placeholder="请选择品牌" @change="chooseBrands">
          <el-option
            v-for="item in brandsList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-input
        style="width:240px;margin-left:20px;"
        size="medium"
        class="brandsDishes_search"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchDishes">
      </el-input>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      class="brandsDishes_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        :width="100"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="dishesName"
        align="center"
        label="菜品名称">
      </el-table-column>
      <el-table-column
        prop="brandsType"
        align="center"
        label="品牌类别">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <router-link :to="{name:'brandsDishesDetail',params:{data:scope.row}}"><el-button style="background-color:#FF9800;color:#fff;padding:7px 20px;">编辑</el-button></router-link>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
  </div>
</template>

<script>
import pages from './../components/pages.vue'
export default {
    data () {
      return {
        data:[{
          dishesName:'摇滚迷离',
          brandsType:'炒饭'
        },{
          dishesName:'摇滚迷离',
          brandsType:'炒饭'
        },{
          dishesName:'摇滚迷离',
          brandsType:'炒饭'
        },{
          dishesName:'摇滚迷离',
          brandsType:'炒饭'
        },{
          dishesName:'摇滚迷离',
          brandsType:'炒饭'
        },{
          dishesName:'摇滚迷离',
          brandsType:'炒饭'
        }],
        totalPages:10,
        pageSize:1,
        currentPage:1,
        search:'',
        brands:'选项2',
        brandsList:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    },
    methods:{
      //算出每条的数字
      indexMethod(index) {
        return index+1 + 10*(this.currentPage-1)
      },
      //选择品牌
      chooseBrands(){
        this.$stamp(null,this.brands)
      },
      // 搜索菜品
      searchDishes(){
        this.$stamp(null,this.search)
      },
      //编辑按钮
      edit(val){
        this.$stamp(null,val)
      },
      //添加菜品
      addDishes(){
        this.dishesBox = true
      },
      //获取当前页数
      getCurrentPage(val){
        this.currentPage = val
      }
    },
    computed: {
      
    },
    components: {
      pages
    },
    created(){
      
    }
}
</script>

<style>
  .brandsDishes_head{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .brandsDishes_chooseBrands{
    border-radius:5px 0 0 5px;
    background-color:#fff;
    color:#000;
    box-sizing:border-box;
    padding:9px;
  }
  .brandsDishes_options .el-input__inner{
    border:0;
    height:39px;
    line-height:39px;
    border-radius:0 5px 5px 0;
  }
  .brandsDishes_options .el-select__caret{
    color:#000!important;
  }
  .brandsDishes_addDishes{
    background-color:#ed6f00;
    color:#fff;
    box-sizing:border-box;
    padding:7px 14px;
    border-radius:30px;
    cursor:pointer;
    margin-right:20px;
  }
  .brandsDishes_search input{
    border:0;
    border-radius:30px;
  }
  .brandsDishes_search .el-input__inner{
    height:33px;
  }
  .brandsDishes_search .el-input__suffix{
    color:#FF9800;
  }
  .brandsDishes_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .brandsDishes_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .brandsDishes_table thead tr th:nth-child(4){
    border-radius:0 5px 0 0;
  }
</style>
