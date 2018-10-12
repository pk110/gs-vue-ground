<template>
  <div>
    <!--顶部切换标签-->
    <div class="dishes_top_container">
      <el-tabs v-model="dishesStatus" @tab-click="handleClick" class="dishes_topTages">
        <el-tab-pane label="全部商品" name="0"></el-tab-pane>
        <el-tab-pane label="库存不足 (2)" name="1"></el-tab-pane>
        <el-tab-pane label="已下架 (2)" name="2"></el-tab-pane>
        <el-tab-pane label="已售完 (2)" name="3"></el-tab-pane>
        <el-tab-pane label="无标签 (2)" name="4"></el-tab-pane>
        <el-tab-pane label="无图片" name="5"></el-tab-pane>
      </el-tabs>
      <el-input
        style="width:140px;margin-left:13px;margin-right:120px;"
        class="dishes_search"
        size="small"
        placeholder="输入菜品名称"
        suffix-icon="el-icon-search"
        v-model="dishesSearch">
      </el-input>
    </div>
    <!--底部-->
    <div class="dishes_bottom">
      <!--底部左侧标签切换-->
      <div class="dishes_bottom_left">
        <ul>
          <li v-for="(items,index) in dishesType" :key="index" :style="chooseTag == index?chooseTagColor:''" @click="dishesTags(items.name,index)">
            <div>
              <i v-if="chooseTag == index" class="el-icon-sort"></i>
              <el-input
                v-model="items.name"
                v-focus
                placeholder="新建名称"
                size="small"
                style="width:100px;"
                @blur="blurTag(index,items)"
                v-if="!items.bool">
              </el-input>
              <span v-if="items.bool">{{items.name}}</span>
            </div>
            <div>
              <span>{{items.number}}</span>
              <i v-if="chooseTag == index" class="el-icon-edit-outline" @click="editTag(index,items)"></i>
            </div>
          </li>
          <el-button @click="addTag" v-dbClick size="mini" style="margin-left:42px;background-color:#FF9800;color:#fff;">新建分类</el-button>
        </ul>
      </div>
      <!--底部右侧内容-->
      <div class="dishes_bottom_right">
        <div class="dishes_bottom_right_top">
          <el-button size="small">批量上架</el-button>
          <el-button size="small">批量下架</el-button>
          <el-button size="small">批量改库存</el-button>
          <el-button size="small">沽清</el-button>
          <el-button size="small">置满</el-button>
        </div>
        <!--v-loading="true"-->
        <el-table
          ref="multipleTable"
          :data="dishesData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            align="center"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            align="center"
            label="商品"
            width='380'>
            <template slot-scope="scope">
              <div class="dishes_message">
                <div class="dishes_img">
                  <div v-loading="scope.row.loading">
                    <img :src='scope.row.img' />
                  </div>
                  <el-upload
                    action=''
                    :auto-upload="false"
                    class="upload-demo"
                    :limit="1"
                    :show-file-list="false"
                    :on-change="getDishesImg"
                    :file-list="fileList">
                    <i class="el-icon-edit" @click="uploadImg(scope.$index)"></i>
                  </el-upload>
                </div>
                <div class="dishes_detail">
                  <p class="dishes_detail_title">米单纯 (单纯但不简单的炒饭)...</p>
                  <p>晶莹透亮秘制醉鱼，下饭佐酒，回味悠长</p>
                  <div>
                    <span>月售：961</span>
                    |
                    <span>好评：99%</span>
                  </div>
                  <div class="dishes_tags">
                    <ul>
                      <li>主食</li>
                      <li>家常菜</li>
                      <li>甜品</li>
                    </ul>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="价格（自提/外卖）">
            <template slot-scope="scope">
            8.8/10.8
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="库存">
            <template slot-scope="scope">
              <div class="dishes_count">
                <el-input
                  v-model="scope.row.num"
                  v-focus
                  @blur="startReviseCount(scope.$index)"
                  v-if="!scope.row.bool">
                </el-input>
                <span style="color:#000" v-if="scope.row.bool">{{scope.row.num}}</span>
                <i class="el-icon-edit" @click="reviseCount(scope.$index,scope.row)"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="餐盒费">
            <template slot-scope="scope">
              1
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-row class="dishes_topBottom">
                <el-button type="danger">下架</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        dishesSearch:'',
        dishesStatus:'0',
        chooseTag:'',
        chooseTagColor:'color:#FF9800',
        dishesType:[{
          name:'全部商品',
          number:64,
          bool:true
        },{
          name:'摇滚米粒',
          number:10,
          bool:true
        },{
          name:'嗨FUN5.8',
          number:9,
          bool:true
        },{
          name:'吃鸡套餐',
          number:7,
          bool:true
        },{
          name:'下饭联盟',
          number:4,
          bool:true
        },{
          name:'吃鸡套餐',
          number:6,
          bool:true
        },{
          name:'下饭联盟',
          number:7,
          bool:true
        }],
        dishesData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:12,
          bool:true,
          loading:true,
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          num:12,
          bool:true,
          loading:false,
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          num:12,
          bool:true,
          loading:false,
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          num:12,
          bool:true,
          loading:false,
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          num:120,
          bool:true,
          loading:false,
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          num:212,
          bool:true,
          loading:false,
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1'
        }],
        fileList:[],
        dishesImgIndex:0,
        oldName:0,
        oldCount:0
      }
    },
    methods:{
      //编辑侧边标签
      editTag(index,data){
        this.oldName = data.name
        this.$set(this.dishesType,index,{name:data.name,number:data.number,bool:false})
      },
      //修改侧边标签
      blurTag(index,data){
        const oldName = data.name
        if(data.name == ''){
          if(index == this.dishesType.length-1){
            this.$delete(this.dishesType,index)
            this.$message({
                type: 'info',
                message: '已取消添加分类名称'
              }); 
          }else{
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$delete(this.dishesType,index)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.dishesType[index].name = this.oldName
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }
        }else{
          if(this.oldName == data.name){
            this.$set(this.dishesType,index,{name:data.name,number:data.number,bool:true})
          }else{
            console.log('真的去修改')
            this.$set(this.dishesType,index,{name:data.name,number:data.number,bool:true})
          }
        }
      },
      //添加侧边标签
      addTag(){
        this.$set(this.dishesType,this.dishesType.length,{name:'',number:'',bool:false})
      },
      // 顶部标签切换状态
      handleClick(tab, event) {
        console.log(tab.name);
      },
      //底部标签切换状态
      dishesTags(name,index){
        this.$stamp(null,name)
        this.$stamp(null,index)
        this.chooseTag = index
      },
      // 多选按钮
      handleSelectionChange(val) {
        this.$stamp(null,val)
        this.multipleSelection = val;
      },
      //修改库存
      reviseCount(val,data){
        this.oldCount = data.num
        this.$set(this.dishesData,val,{
          date: data.date,
          name: data.name,
          address: data.address,
          num:data.num,
          loading:true,
          bool:false
        })  
      },
      //开始修改库存
      startReviseCount(val){
        this.$stamp(null,this.dishesData[val].num)
        if(this.oldCount == this.dishesData[val].num){
          this.$set(this.dishesData,val,{
            date: this.dishesData[val].date,
            name: this.dishesData[val].name,
            address: this.dishesData[val].address,
            num:this.dishesData[val].num,
            bool:true
          })
        }else if(!/^[+]{0,1}(\d+)$/.test(this.dishesData[val].num)){
          this.dishesData[val].num = this.oldCount
          this.$message.error('请输入大于0以上的正整数!!')
        }else{
          this.$set(this.dishesData,val,{
            date: this.dishesData[val].date,
            name: this.dishesData[val].name,
            address: this.dishesData[val].address,
            num:this.dishesData[val].num,
            bool:true
          })
        }
      },
      //拿到获取的菜品图片
      getDishesImg(val){
        this.fileList.push(val)
        this.$stamp(null,this.fileList)
        this.$stamp(null,this.dishesImgIndex)
        this.$set(this.dishesData,this.dishesImgIndex,{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          num:12,
          bool:true,
          img:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1362208881,3931895225&fm=202'
        })
        this.fileList = []
      },
      // 上传菜品图片当前的索引
      uploadImg(val){
        this.dishesImgIndex = val
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
  .dishes_topTages .is-active{
    background-color:#fff!important;
    color:#FF9800!important;
  }
  .dishes_topTages .el-tabs__nav-wrap::after{
    height:0;
  }
  .dishes_topTages .el-tabs__item:hover{
    color:#FF9800;
  }
  .dishes_topTages .el-tabs__active-bar{
    height:0;
  }
  .dishes_topTages .el-tabs__header{
    margin:0 0 1px;
  }
  .dishes_topTages .el-tabs__nav{
    width:800px;
    display:flex;
    justify-content:space-between;
  }
  .dishes_search:focus{
    border-color:#cccccc;
  }
  .dishes_search .el-input__suffix,.dishes_search input::-webkit-input-placeholder,.dishes_search input{
    color:#000;
  }
  .dishes_top_container{
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding:0 40px;
    border-bottom:1px solid #cccccc;
    margin-bottom:5px;
  }
  .dishes_bottom{
    display:flex;
  }
  .dishes_bottom_left{
    width:236px;
    box-sizing:border-box;
    padding: 0 20px;
  }
  .dishes_bottom_left ul li{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:20px 0;
    cursor:pointer;
  }
  .dishes_bottom_left ul li:hover{
    color:#FF9800;
  }
  .dishes_bottom_right{
    width:100%;
    min-width:970px;
    border:1px solid #cccccc;
    box-sizing:border-box;
    padding: 0 0 20px 20px;
    overflow-y:auto;
    max-height:815px;
  }
  .dishes_bottom_right_top{
    margin:20px 0 20px 0px;
  }
  .dishes_message{
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .dishes_img{
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    color:#FF9800;
  }
  .dishes_img img{
    width:100px;
    height:100px;
  }
  .dishes_img i{
    margin-top:3px;
    cursor:pointer;
  }
  .dishes_img .el-loading-mask{
    z-index:0;
  }
  .dishes_tags ul{
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .dishes_detail{
    text-align:left;
    margin-left:7px;
    color:#959292;
  }
  .dishes_detail .dishes_detail_title{
    color:#000;
  }
  .dishes_tags ul li{
    box-sizing:border-box;
    padding:2px 5px;
    border-radius:8px;
    color:#fff;
    background-color:#009688;
    margin-right:5px;
  }
  .dishes_count{
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FF9800;
  }
  .dishes_count .el-input__inner{
    border:0;
    background-color:#fff!important;
    width:50px;
    padding:0;
    text-align:center;
  }
  .dishes_count .el-input{
    width:auto;
  }
  .dishes_count i{
    margin-left:5px;
    cursor:pointer;
  }
  .dishes_topBottom button{
    padding:7px 20px;
  }
</style>
