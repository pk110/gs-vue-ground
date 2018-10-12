<template>
  <div>
    <div class="brandsList_head">
      <div class="brandsList_head_left">
        <el-button style="color:#fff;background-color:#ed6f00;padding:10px 18px;border-radius:30px;" @click="addBrands">
        <i class="el-icon-plus"></i>
        添加品牌</el-button>
        <div class="brandsNub">已添加品牌&nbsp;<span style="color:#ed6f00">50</span>&nbsp;个</div>
      </div>
      <el-input
        style="width:240px;"
        size="small"
        class="brandsList_search"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search"
        @blur="searchBands">
      </el-input>
    </div>
    <!--身体表格-->
    <el-table
      :data="data"
      class="brandsList_table"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        :width="100"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="品牌名">
      </el-table-column>
      <el-table-column
        prop="Logo"
        align="center"
        label="Logo">
      </el-table-column>
      <el-table-column
        prop="headImg"
        align="center"
        label="头图">
      </el-table-column>
      <el-table-column
        prop="detail"
        align="center"
        label="文字描述">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button style="background-color:#ed6f00;border-radius:30px;color:#fff;padding:7px 20px;" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pages :pageSize="pageSize" :totalPages="totalPages" @changeCurrentPage="getCurrentPage" />
    <!--弹窗-->
    <el-dialog title="品牌编辑" :visible.sync="brandBox" width="40%" center>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="brandsList_Box">
        <el-form-item label="输入品牌" prop="name">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logo">
          <imgs :files="form.logo" class="brandsList_logo" :limitImg="1" @imgFiles="getLogoImg" />
        </el-form-item>
        <el-form-item label="品牌头图" prop="headImg">
          <imgs :files="form.headImg" class="brandsList_head" :limitImg="1" @imgFiles="getHeadImg" />
        </el-form-item>
        <el-form-item label="品牌文字描述" prop="brandsDetail">
          <el-input
            v-model="form.brandsDetail"
            type="textarea"
            placeholder="请输入品牌文字描述">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="background-color:#ff3b21;color:#fff;padding:7px 20px;border-radius:30px;border-color:#ff3b21;" type="primary" @click="submit('ruleForm')">确 定</el-button>
        <el-button style="background-color:#000000;color:#fff;padding:7px 20px;border-radius:30px;" @click="resetForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pages from './../components/pages.vue'
import imgs from './../components/img.vue'

export default {
    data () {
      return {
        totalPages:10,
        pageSize:1,
        currentPage:1,
        form:{
          name:'',
          logo:[],
          headImg:[],
          brandsDetail:''
        },
        rules: {
          name: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          logo: [
            { required: true, message: '请添加品牌logo图片', trigger: 'blur' }
          ],
          headImg:[
            { required: true, message: '请添加品牌头图图片', trigger: 'blur' }
          ],
          brandsDetail:[
            { required: true, message: '请输入品牌文字描述', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ]
        },
        brandBox:false,
        data:[{
          name:'aa',
          Logo:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          headImg:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          detail:'武汉',
        },{
          name:'bb',
          Logo:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          headImg:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          detail:'武汉',
        },{
          name:'cc',
          Logo:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          headImg:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          detail:'武汉',
        },{
          name:'dd',
          Logo:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          headImg:'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=229445282,848378121&fm=202&mola=new&crop=v1',
          detail:'武汉',
        }],
        search:''
      }
    },
    methods:{
      //算出每条的数字
      indexMethod(index) {
        return index+1 + 10*(this.currentPage-1)
      },
      //搜索
      searchBands(){
        this.$stamp(null,this.search)
      },
      //获取当前页数
      getCurrentPage(val){
        this.$stamp(null,`获取的当前页数${val}`)
        this.currentPage = val
      },
      //获得品牌logo图片
      getLogoImg(img){
        this.$stamp(null,img)
        this.form.logo = img
      },
      //获得品牌头图图片
      getHeadImg(img){
        this.$stamp(null,img)
        this.form.headImg = img
      },
      //添加品牌
      addBrands(){
        this.brandBox = true
        this.form.name = ''
        this.form.logo = []
        this.form.headImg = []
        this.form.brandsDetail = ''
      },
      // 编辑按钮
      edit(val){
        this.$stamp(null,val)
        this.addBrands()
        this.form.name = val.name
        this.form.logo.push({
          url:val.Logo
        })
        this.form.headImg.push({
          url:val.headImg
        })
        this.form.brandsDetail = val.detail
      },
      //提交表单
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
          } else {
            this.$message.error('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(ruleForm){
        this.$refs[ruleForm].resetFields();
      }
    },
    computed: {
      
    },
    components: {
      pages,
      imgs
    },
    created(){
      
    }
}
</script>

<style>
  .brandsList_head{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .brandsList_head_left{
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .brandsList_search input{
    border:0;
    border-radius:30px;
  }
  .brandsNub{
    margin:0 20px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
  }
  .brandsList_search .el-input__inner{
    height:32px;
  }
  .brandsList_search .el-input__suffix{
    color:#FF9800;
  }
  .brandsList_table thead tr th{
	  background-color: #494949;
    color:#ffffff;
  }
  .brandsList_table thead tr th:nth-child(1){
    border-radius:5px 0 0 0;
  }
  .brandsList_table thead tr th:nth-child(6){
    border-radius:0 5px 0 0;
  }
  .brandsList_Box .el-input__inner{
    width:30%;
  }
  .brandsList_Box .el-textarea__inner{
    width:50%;
  }
  .brandsList_logo li,.brandsList_logo .el-upload-list,.brandsList_head .el-upload-list{
    width:100px!important;
    height:100px!important;
    line-height: 1;
  }
  .brandsList_logo .el-upload--picture-card,.brandsList_head .el-upload--picture-card{
    width:100px!important;
    height:100px!important;
    line-height:100px;
  }
  .brandsList_head li{
    width:300px!important;
    height:100px!important;
  }
</style>
