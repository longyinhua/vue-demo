<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="650px" @close="close">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户姓名" label-width="120px" prop="userRealName">
            <el-input
              v-model.trim="form.userRealName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户账号" label-width="120px" prop="userAccount">
            <el-input
              v-model.trim="form.userAccount"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户密码" label-width="120px" prop="password">
            <el-input
             v-model.trim="form.password"
             type="password"
             autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" label-width="120px" prop="userMobile">
            <el-input v-model.trim="form.userMobile" type="text" maxLength="11" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="部门" label-width="120px" prop="userDept">
        <el-cascader v-model="userDept" :options="cascaderData" :props="props" collapse-tags style="width: 100%"></el-cascader>
      </el-form-item>
      <el-form-item label="角色" label-width="120px" prop="userRole">
        <el-select v-model="userRole" multiple collapse-tags clearable placeholder="请选择" style="width: 100%">
          <el-option v-for="item in selectData"
            :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
      name: "userManagerEdit",
      data(){
        let validateDept = (rule, value ,callback) => {
          if(this.userDept.length === 0){
            callback(new Error('请选择部门！'))
          }else {
            callback()
          }
        };
        let validateRole = (rule, value ,callback) => {
          if(this.userRole.length === 0){
            callback(new Error('请选择角色！'))
          }else {
            callback()
          }
        };
        return{
          title:'',
          form:{
            userRealName:'',
            password:'123456',
            userAccount:'',
            userMobile:'',
            userDept:[],
            userRole:[]
          },
          rules:{
            userRealName:[
              { required: true, trigger: 'blur', message: '请输入用户姓名'}
            ],
            password: [
              { required: true, trigger: 'blur', message: '请输入密码'}
            ],
            userAccount: [
              { required: true, trigger: 'blur', message: '请输入用户账号'}
            ],
            userMobile: [
              { required: true, trigger: 'blur', message: '请输入手机号码'},
            ],
            userDept: [
              { required: true, trigger: 'change', validator:validateDept }
            ],
            userRole: [
              { required: true, trigger: 'change', validator:validateRole }
            ]
          },
          userDept:[],
          userRole:[],
          dialogFormVisible:false,
          props:{ multiple: true },
          cascaderData:[
            {
            value: 1,
            label: '人事部',
            children: [{
              value: 2,
              label: '人事主管',
              children: [
                { value: 3, label: '王林' },
                { value: 4, label: '刘丽' },
                { value: 5, label: '罗长春' }
              ]
            }, {
              value: 7,
              label: '前台',
              children: [
                { value: 8, label: '刘文涛' },
                { value: 9, label: '李大利' },
                { value: 10, label: '郭金飞' }
              ]
            }, {
              value: 12,
              label: '人事助理',
              children: [
                { value: 13, label: '余杭' },
                { value: 14, label: '余波' },
                { value: 15, label: '车梅' }
              ]
            }]
          }, {
            value: 17,
            label: '技术部',
            children: [{
              value: 18,
              label: '移动端',
              children: [
                { value: 19, label: '谭飞' },
                { value: 20, label: '唐晨' }
              ]
            }, {
              value: 21,
              label: '前端',
              children: [
                { value: 22, label: '龙五' },
                { value: 23, label: '周舒' }
              ]
            }]
          }],
          selectValue:'',
          selectData:[{
            value: '选项1',
            label: '管理员'
          }, {
            value: '选项2',
            label: '测试'
          }]
        }
      },
      methods:{
        showEdit(row){
          if(!row){
            this.title = '添加';
          }else{
            this.title = '编辑';
            // 浅拷贝数据
            this.form = Object.assign({}, row);
          }
          this.dialogFormVisible = true
        },
        save(){
          this.$refs['form'].validate(async (valid) => {
            if(valid){
              // todo 调用保存成功接口
              this.$baseMessage('保存成功！','success');
              // todo 触发父页面获取数据方法
              this.$emit('fetch-data');
              this.close();
            }
          })
        },
        close(){
          // form 表单重置
          this.$refs['form'].resetFields();
          // 初始化data数据，需要包含自定义property时才有用
          this.form = this.$options.data().form;
          this.dialogFormVisible = false;
        }
      }
  }
</script>

<style scoped>

</style>
