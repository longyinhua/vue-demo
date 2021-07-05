<template>
  <div class="menu-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary"  @click="handleEdit('')">新增顶级部门</el-button>
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-table
      :data="tableData"
      style="width: 100%;"
      row-key="id"
      highlight-current-row
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        width="180px"
        align="center"
        label="菜单标题">
      </el-table-column>
      <el-table-column
        prop="ico"
        width="150px"
        align="center"
        label="图标">
      </el-table-column>
      <el-table-column
        prop="sort"
        width="130px"
        align="center"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="power"
        width="300px"
        align="center"
        label="权限标识">
      </el-table-column>
      <el-table-column
        prop="router"
        width="400px"
        align="center"
        label="组件路径">
      </el-table-column>
      <el-table-column
        prop="outside"
        width="80px"
        align="center"
        label="外链">
      </el-table-column>
      <el-table-column
        prop="cache"
        width="80px"
        align="center"
        label="缓存">
      </el-table-column>
      <el-table-column
        prop="look"
        width="80px"
        align="center"
        label="可见">
      </el-table-column>
      <el-table-column
        prop="creattime"
        width="150px"
        align="center"
        label="创建日期">
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="操作">
        <template #default="{ row }">
          <el-button  type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
          <el-button  type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <dia-log-form ref="edit" @fetch-data="fetchData"></dia-log-form>
  </div>
</template>

<script>
import diaLogForm from './components/menuEdit'
  export default {
    name: 'Menu',
    components: {
      diaLogForm,
    },
    data() {
      return {
        tableData: [{
          id: 1,
          menutype:'菜单',
          name: '系统管理',
          ico:'',
          sort:'1',
          power:'',
          router:'',
          compentrouter:'',
          outside:'否',
          cache:'否',
          look:'是',
          creattime:'2021-04-15 11:17:00',
          parentId:'',
          children:[{
            id: 11,
            parentId:'1',
            menutype:'菜单',
            name: '用户管理',
            ico:'',
            sort:'2',
            compentrouter:'',
            power:'user.list',
            router:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',
            children:[{
              id: 111,
              parentId:'11',
              menutype:'菜单',
              name: '用户新增',
              ico:'',
              sort:'2',
              compentrouter:'',
              power:'user.add',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00',},{
              id: 112,
              parentId:'11',
              menutype:'菜单',
              name: '用户编辑',
              ico:'',
              sort:'3',
              compentrouter:'',
              power:'user.edit',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00',},{
              id: 113,
              parentId:'11',
              menutype:'菜单',
              name: '用户删除',
              ico:'',
              sort:'4',
              compentrouter:'',
              power:'user.del',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00',}]
          },{
            id: 12,
            parentId:'1',
            menutype:'菜单',
            name: '角色管理',
            ico:'',
            sort:'3',
            power:'',
            router:'',
            compentrouter:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',},{
            id: 13,
            parentId:'1',
            menutype:'菜单',
            name: '菜单管理',
            ico:'',
            sort:'4',
            compentrouter:'',
            power:'menu.list',
            router:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',
            children: [{
              id: 131,
              parentId:'13',
              menutype:'菜单',
              name: '菜单新增',
              ico:'',
              sort:'2',
              compentrouter:'',
              power:'menu.add',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00'},{
              id: 132,
              parentId:'13',
              menutype:'菜单',
              name: '菜单编辑',
              ico:'',
              sort:'3',
              compentrouter:'',
              power:'menu.edit',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00'},{
              id: 133,
              parentId:'13',
              menutype:'菜单',
              name: '菜单删除',
              ico:'',
              sort:'4',
              compentrouter:'',
              power:'menu.del',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00'}]
          },{
            id: 14,
            parentId:'1',
            menutype:'菜单',
            name: '部门管理',
            ico:'',
            sort:'5',
            power:'',
            router:'',
            compentrouter:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',}]

        }, {
          id: 2,
          parentId:'',
          menutype:'菜单',
          name: '系统监控',
          ico:'',
          sort:'2',
          power:'',
          router:'',
          compentrouter:'',
          outside:'否',
          cache:'否',
          look:'是',
          creattime:'2021-04-15 11:17:00',
          children: [{
            id: 21,
            parentId:'2',
            menutype:'菜单',
            name: '在线用户',
            ico:'',
            sort:'2',
            compentrouter:'',
            power:'',
            router:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',},{
            id: 22,
            parentId:'2',
            menutype:'菜单',
            name: '操作日志',
            ico:'',
            sort:'3',
            power:'',
            compentrouter:'',
            router:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',},{
            id: 23,
            parentId:'2',
            menutype:'菜单',
            name: '异常日志',
            ico:'',
            sort:'4',
            power:'',
            compentrouter:'',
            router:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',},{
            id: 24,
            parentId:'2',
            menutype:'菜单',
            name: '服务监控',
            ico:'',
            sort:'5',
            power:'',
            compentrouter:'',
            router:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',},{
            id: 25,
            parentId:'2',
            menutype:'菜单',
            name: 'SQL监控',
            ico:'',
            sort:'6',
            power:'',
            compentrouter:'',
            router:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',}]
        }, {
          id: 3,
          parentId:'3',
          menutype:'菜单',
          name: '运维管理',
          ico:'',
          sort:'3',
          power:'',
          router:'',
          compentrouter:'',
          outside:'否',
          cache:'否',
          look:'是',
          creattime:'2021-04-15 11:17:00',
          children: [{
            id: 31,
            parentId:'3',
            menutype:'菜单',
            name: '服务器',
            ico:'',
            sort:'2',
            power:'serverDeploy:list',
            router:'',
            compentrouter:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',
            children: [{
              id: 311,
              parentId:'31',
              menutype:'菜单',
              name: '服务器新增',
              ico:'',
              sort:'2',
              compentrouter:'',
              power:'serverDeploy:add',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00',}, {
              id: 312,
              parentId:'31',
              menutype:'菜单',
              name: '服务器编辑',
              ico:'',
              sort:'3',
              compentrouter:'',
              power:'serverDeploy:edit',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00',}, {
              id: 313,
              parentId:'31',
              menutype:'菜单',
              name: '服务器删除',
              ico:'',
              sort:'3',
              compentrouter:'',
              power:'serverDeploy:del',
              router:'',
              outside:'否',
              cache:'否',
              look:'是',
              creattime:'2021-04-15 11:17:00',}]
          }, {
            id: 32,
            parentId:'3',
            menutype:'菜单',
            name: '应用管理',
            ico:'',
            sort:'3',
            power:'',
            router:'',
            compentrouter:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',
          }, {
            id: 33,
            parentId:'3',
            menutype:'菜单',
            name: '部署管理',
            ico:'',
            sort:'4',
            power:'',
            router:'',
            compentrouter:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',
          }, {
            id: 34,
            parentId:'3',
            menutype:'菜单',
            name: '部署备份',
            ico:'',
            sort:'5',
            power:'',
            router:'',
            compentrouter:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',
          }, {
            id: 35,
            parentId:'3',
            menutype:'菜单',
            name: '数据库管理',
            ico:'',
            sort:'6',
            power:'',
            router:'',
            compentrouter:'',
            outside:'否',
            cache:'否',
            look:'是',
            creattime:'2021-04-15 11:17:00',
          }]
        }],
      }
    },
    created() {},
    mounted() {},
    methods: {
      fetchData(){
        this.listLoading = true;
        setTimeout(function () {
          this.listLoading = false
        },300)
      },
      //编辑
      handleEdit(row){
        this.$refs['edit'].showEdit(row);
      },
      // 删除某一项
      handleDelete(row){
        this.$baseConfirm('你确定要删除当前项吗？',null,async () => {
          // todo 调取删除接口
          this.$baseMessage('删除成功！','success')
          // todo 重新刷新当前页面数据
        })

      },
    },
  }
</script>
<style lang="scss" scoped>
.menu-container{

}
</style>
