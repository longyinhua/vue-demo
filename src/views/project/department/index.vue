<template>
  <div class="deparment-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit('','add')">新增顶级部门</el-button>
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
        label="部门管理"
        style="font-size: 12px;white-space: normal;word-break: break-all;font-weight: inherit;"
        width="1000px">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row,'edit')">编辑</el-button>
          <el-button type="text" @click="handleEdit(row,'add')">新增子部门</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dia-log-form ref="edit" @fetch-data="fetchData"></dia-log-form>
  </div>
</template>

<script>
import diaLogForm from './components/departmentEdit'
export default {
  name: "index",
  components:{
    diaLogForm
  },
  data() {
    return {
      tableData: [{
        id: 1,
        name: '阿里巴巴',
        sort:'1',
      }, {
        id: 2,
        name: '技术部',
      }, {
        id: 3,
        name: '运营部',
        children: [{
          id: 31,
          name: '开发部',
          children: [{id: 311, name: '公文组'}, {id: '312', name: '齐哥组'}]
        }, {
          id: 32,
          name: '管理',
        }, {
          id: 33,
          name: '交付部',
        }, {
          id: 34,
          name: '顶壹',
        }, {
          id: 35,
          name: '测试',
        }]
      }],
    }
  },
  methods: {
    fetchData(){
      this.listLoading = true;
      setTimeout(function () {
        this.listLoading = false
      },300)
    },
    // 删除某一项
    handleDelete(row){
        this.$baseConfirm('你确定要删除当前项吗？',null,async () => {
          // todo 调取删除接口
          this.$baseMessage('删除成功！','success')
          // todo 重新刷新当前页面数据
        })

    },
    //编辑
    handleEdit(row,type){
      this.$nextTick(() => {
          this.$refs['edit'].showEdit(row,type);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.deparment-container {
  &__active {
    color: #0366d6;
  }
}
</style>

