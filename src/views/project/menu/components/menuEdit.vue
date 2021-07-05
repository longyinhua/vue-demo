<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="650px" @close="close">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="24">
          <el-form-item label="菜单类型" label-width="100px" prop="menutype">
            <el-radio-group v-model="form.menutype">
              <el-radio-button label="菜单"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="菜单图标" label-width="100px" prop="ico" >
            <el-input
              v-model.trim="form.ico"
              type="text"
              placeholder="点击选择图标"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
            <el-form-item label="外链菜单" label-width="100px" prop="outside">
                <el-radio-group v-model="form.outside" size="mini">
                  <el-radio-button label="是"></el-radio-button>
                  <el-radio-button label="否"></el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-form-item label="菜单缓存" label-width="100px" prop="cache">
          <el-radio-group v-model="form.cache" size="mini">
            <el-radio-button label="是"></el-radio-button>
            <el-radio-button label="否"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
        <el-col :span="8">
          <el-form-item label="菜单可见" label-width="100px" prop="look">
            <el-radio-group v-model="form.look" size="mini">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单标题" label-width="100px" prop="name">
            <el-input
              v-model.trim="form.name"
              type="text"
              placeholder="菜单标题"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限标识" label-width="100px" prop="power">
            <el-input
              v-model.trim="form.power"
              type="text"
              placeholder="权限标识"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="路由地址" label-width="100px" prop="router">
            <el-input
              v-model.trim="form.router"
              type="text"
              placeholder="路由地址"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单排序" label-width="100px"  prop="sort">
            <el-input-number  v-model.trim="form.sort"  style="width: 190px"  controls-position="right" :min="0" :max="999" ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="组件名称" label-width="100px" prop="compentName">
            <el-input
              v-model.trim="form.compentName"
              type="text"
              placeholder="匹配组件内Name字段"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件路径" label-width="100px" prop="compentrouter">
            <el-input
              v-model.trim="form.compentrouter"
              type="text"
              placeholder="组件路径"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级目录" label-width="100px" prop="parentId">
            <el-cascader v-model="form.parentId" :options="parentmenuData"  collapse-tags style="width: 100%"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
name: "menuEdit",
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
        id:'',
        menutype:'菜单',
        ico:'',
        outside:'否',
        cache:'否',
        name:'',
        power:'',
        router:'',
        look:'否',
        sort:'',
        compentName:'',
        compentrouter:'',
      },
      rules:{
        name:[
          { required: true, trigger: 'blur', message: '请输入菜单标题'}
        ],
        router: [
          { required: true, trigger: 'blur', message: '请输入路由地址'}
        ]
      },
      userDept:[],
      userRole:[],
      dialogFormVisible:false,
      props:{ "show-word-limit" : true },
      parentmenuData:[
        {
          value: 1,
          label: '系统管理',
          children: [{
            value: 11,
            label: '用户管理',
            children: [
              { value: 111, label: '用户新增' },
              { value: 112, label: '用户编辑' },
              { value: 113, label: '用户删除' }
            ]
          }, {
            value:12,
            label: '角色管理',
            children: [
              { value: 121, label: '角色新增' },
              { value: 122, label: '角色修改' },
              { value: 123, label: '角色删除' }
            ]
          }, {
            value: 13,
            label: '菜单管理',
            children: [
              { value: 131, label: '菜单新增' },
              { value: 132, label: '菜单修改' },
              { value: 133, label: '菜单删除' }
            ]
          }]
        }, {
          value: 2,
          label: '系统监控',
          children: [{
            value: 21,
            label: '在线用户',
          }, {
            value: 22,
            label: '操作日志',
          }, {
            value: 23,
            label: '异常日志',
          }, {
            value: 24,
            label: '服务监控',
          }, {
            value: 25,
            label: 'SQL监控',
          }]
        }],
      selectValue:'',
    }
  },
  methods:{
    showEdit(row){
      if(row===''){
        this.title = '添加';
      }else{
        this.title = '编辑';
        // 浅拷贝数据
        this.form = Object.assign({}, row);
      }
      this.title = row==='' ? '添加' : '编辑';
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
      this.$refs['form'].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style scoped>

</style>
