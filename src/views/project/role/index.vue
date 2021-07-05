<template>
  <div class="role-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加</el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete" :disabled="disableVisible">批量删除</el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input v-model.trim="queryForm.search" placeholder="请输入查询条件" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-row :gutter="10">
      <el-col :span="18">
        <el-table
          :data="tableData"
          @selection-change="setSelectRows"
          @current-change="handleCurrentChange"
          highlight-current-row
          style="width: 100%"
          height="calc(100vh - 242px)">
          <el-table-column show-overflow-tooltip type="selection"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column prop="roleDescribe" label="角色描述" width="500"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="最后编辑时间"></el-table-column>
          <el-table-column prop="creator" label="操作人"></el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="{ row }">
              <el-button type="text" @click="handleAdd(row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :pagination="pagination"></pagination>

      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div slot="header">
            <el-row type="flex" justify="space-between">
              <div class="role-container__span">
                菜单分配
              </div>
              <div>
                <el-tooltip :disabled="showButton" effect="dark" placement="left" content="请先选择指定角色分配菜单">
                  <el-link :underline="false" type="primary" :disabled="!showButton" @click="saveMenu">保存</el-link>
                </el-tooltip>
              </div>
            </el-row>
          </div>
          <el-tree
            ref="menuTree"
            :data="treeData"
            :props="props"
            show-checkbox
            node-key="id"
            :default-checked-keys="menuIds"
            @check="checkNodeChange">

          </el-tree>
        </el-card>
      </el-col>
    </el-row>
    <edit ref="edit"></edit>
  </div>
</template>

<script>
  import Edit from './components/roleManagerEdit';
  import pagination from  '@/components/DyPagination/index'
  export default {
    name: 'Role',
    components: {
      Edit,
      pagination
    },
    data() {
      return {
        queryForm:{

        },
        menuIds:[],
        checkNodeStr:'',
        currentRoleId:0,
        showButton:false,
        treeData:[
        {
          id: 1,
          label: '系统管理',
          children: [{
            id: 12,
            label: '用户管理',
          }, {
            id: 17,
            label: '角色管理',
          }, {
            id: 112,
            label: '设置',
          }]
        },
          {
            id: 2,
            label: '系统监控',
            children: [{
              id: 22,
              label: '操作日志',
            }, {
              id: 27,
              label: '在线用户',
            }]
          }],
        props:{
          label: 'label',
          children: 'children'
        },
        pagination:{
          currentPage: 1,
          pageSizes: [10, 50, 100, 200],
          pageSize: 10,
          totalCount: 100
        },
        tableData: [{
          roleId:'1',
          roleName: '管理员',
          roleDescribe: '--',
          createTime:'2021-04-13 15:30',
          updateTime:'2021-04-13 17:30',
          creator:'王小虎'
        }, {
          roleId:'2',
          roleName: '测试',
          roleDescribe: '--',
          createTime:'2021-04-13 15:30',
          updateTime:'2021-04-13 17:30',
          creator:'王小虎'
        }, {
          roleId:'3',
          roleName: '测试',
          roleDescribe: '--',
          createTime:'2021-04-13 15:30',
          updateTime:'2021-04-13 17:30',
          creator:'王小虎'
        }, {
          roleId:'4',
          roleName: '管理员',
          roleDescribe: '--',
          createTime:'2021-04-13 15:30',
          updateTime:'2021-04-13 17:30',
          creator:'王小虎'
        }],
        selectRows:[],
        disableVisible:true
      }
    },
    created() {},
    mounted() {},
    methods: {
      setSelectRows(val){
        this.disableVisible = val.length > 0 ? false : true;
        this.selectRows = val;
      },
      // 表格当前行发生改变
      handleCurrentChange(val){
        if(val){
          // 清空菜单选中
          // this.$refs['menuTree'].setCheckedKeys()
          this.currentRoleId = val.roleId
          this.showButton = true;
        }
      },
      handleAdd(row){
        if(row.roleId){
          this.$refs['edit'].showEdit(row);
        }else {
          this.$refs['edit'].showEdit();
        }
      },
      handleDelete(row){
        if(row.roleId){
          this.$baseConfirm('你确定要删除当前项？',null, async () => {
            // todo 调用删除接口
            this.$baseMessage('删除成功！','success');
            // todo 重新调用获取数据接口
          })
        }else {
          if(this.selectRows.length > 0){
            const ids = this.selectRows.map((item) => item.roleId).join();
            this.$baseConfirm('你确定要删除选中项吗？',null, async () => {
              // todo 调用删除接口
              this.$baseMessage('删除成功！','success')
              // todo 重新获取数据接口
            })
          }
        }
      },
      checkNodeChange(data, menu){
        this.menuIds = this.$refs['menuTree'].getCheckedKeys();
        let checkNodeArr = Array.from(new Set(this.menuIds));
        this.checkNodeStr = checkNodeArr.join(',')
      },
      saveMenu(){
        if(!this.checkNodeStr){
          return this.$baseMessage('未分配菜单','error')
        }
        const role = {
          id: this.currentRoleId,
          menu: this.checkNodeStr.split(',')
        }
        console.log(role)
      }
    },
  }
</script>
<style lang="scss" scoped>
  .role-container{
    &__span{
      font-weight: 700;
      font-size: 15px;
    }
  }
</style>
