<template>
  <el-dialog :title="title" width="650px" :visible.sync="dialogVisible" :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="角色名称" label-width="120px" prop="roleName">
        <el-input v-model.trim="form.roleName" type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="120px" prop="roleDescribe">
        <el-input v-model.trim="form.roleDescribe" type="textarea" autocomplete="off"></el-input>
      </el-form-item>
      <!--<el-form-item label="分配菜单" label-width="120px" prop="roleMenuIds">
        <el-cascader v-model="form.roleMenuIds" :options="cascaderData" :props="props" collapse-tags style="width: 100%"></el-cascader>
      </el-form-item>-->
      <el-form-item label="是否管理员" label-width="120px" prop="manager">
        <el-radio v-model="form.leaderFLag" label="0">是</el-radio>
        <el-radio v-model="form.leaderFLag" label="1">否</el-radio>
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
    name: "roleManagerEdit",
    data(){
      return{
        title:'',
        form:{
          roleMenuIds:'',
          leaderFLag: '0',
          roleName:''
        },
        rules:{
          roleName:[
            { required: true, trigger: 'blur', message: '请输入角色名称'}
          ],
        },
        props:{ multiple: true },
        cascaderData:[
          {
            value: 1,
            label: '系统',
            children: [{
              value: 2,
              label: '用户管理',
            }, {
              value: 7,
              label: '角色管理',
            }, {
              value: 12,
              label: '设置',
            }]
          }],
        dialogVisible:false
      }
    },
    methods:{
      showEdit(row){
        if(!row){
          this.title = '新增角色';
        }else {
          this.title = '编辑角色';
          this.form = Object.assign({},row)
        }
        this.dialogVisible = true;
      },
      close(){
        this.$refs['form'].resetFields();
        this.form = this.$options.data().form;
        this.dialogVisible = false;
      },
      save(){
        this.$refs['form'].validate(async (valid) => {
          if(valid){
            this.$baseMessage('保存成功！', 'success')
            this.close()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
