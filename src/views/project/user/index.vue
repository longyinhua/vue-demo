<template>
  <div class="user-container" v-loading="listLoading">
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="filter-tree">
          <el-card shadow="never" style="height: calc(100vh - 190px)">
          <el-input v-model="filterText" placeholder="请输入部门名称"></el-input>
          <el-tree
              class="user-container filter-tree__tree"
             :data="treeData"
             :props="defaultProps"
             default-expand-all
              :expand-on-click-node="false"
              highlight-current
              ref="tree"
              :filter-node-method="filterNode"
              @node-click="handleNode">
          </el-tree>
          </el-card>
        </div>

      </el-col>
      <el-col :span="20">
        <vab-query-form>
          <vab-query-form-left-panel :span="12">
            <el-button icon="el-icon-plus" type="primary" @click="handleEdit">添加</el-button>
            <el-button icon="el-icon-delete" type="danger" @click="handleDelete" :disabled="disabledDelete">批量删除</el-button>
          </vab-query-form-left-panel>
          <vab-query-form-right-panel :span="12">
            <el-form :inline="true">
              <el-form-item>
                <el-input
                  placeholder="请输入用户姓名、账号"
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" type="primary">
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </vab-query-form-right-panel>
        </vab-query-form>

        <el-table
          :data="tableData"
          style="width: 100%"
          height="calc(100vh - 242px)"
          highlight-current-row
          @selection-change="setSelectRows">
          <el-table-column show-overflow-tooltip type="selection"></el-table-column>
          <el-table-column prop="userRealName" label="姓名"></el-table-column>
          <el-table-column prop="userAccount" label="用户账号"></el-table-column>
          <el-table-column prop="userMobile" label="手机号码"></el-table-column>
          <el-table-column prop="userRole" label="角色"></el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :pagination="pagination"></pagination>
        <dia-log-form ref="edit" @fetch-data="fetchData"></dia-log-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import diaLogForm from './components/userManagerEdit';
  import pagination from '@/components/DyPagination/index'
  export default {
    name: 'User',
    components: {
      diaLogForm,
      pagination
    },
    watch: {
      // 监测输入框值发生改变
      filterText(val){
        this.$refs['tree'].filter(val);
      }
    },
    data() {
      return {
        tableData: [{
          userId:'1',
          userRealName: '王小虎',
          userAccount: 'wangxiaohu',
          userMobile:'13808934146',
          userRole:'admin'
        }, {
          userId:'2',
          userRealName: '刘丽',
          userAccount: 'liuli',
          userMobile:'15674812635',
          userRole:'editor'
        }, {
          userId:'3',
          userRealName: '马谡',
          userAccount: 'masu',
          userMobile:'18870365421',
          userRole:'editor'
        }, {
          userId:'4',
          userRealName: '陈晨',
          userAccount: 'chenchen',
          userMobile:'18974185252',
          userRole:'test'
        }],
        /**树形菜单属性 start*/
        filterText:'',
        treeData:[{
          id: 1,
          label: '阿里巴巴',
          children: [{
            id: 4,
            label: '人事部',
            children: [{
              id: 9,
              label: '前台'
            }, {
              id: 10,
              label: '行政'
            }]
          }]
        }, {
          id: 2,
          label: '技术部',
          children: [{
            id: 5,
            label: '移动开发'
          }, {
            id: 6,
            label: '大数据开发'
          }]
        }, {
          id: 3,
          label: '运营部',
          children: [{
            id: 7,
            label: '运营主管'
          }, {
            id: 8,
            label: '公关'
          }]
        },{
          id: 4,
          label: '交付部',
          children: [{
            id: 9,
            label: '项目管理'
          }, {
            id: 10,
            label: '合同管理'
          }]
        }],
        defaultProps:{
          children: 'children',
          label: 'label'
        },
        /**树形菜单属性 end*/
        selectRows:'',
        disabledDelete: true,
        listLoading:true,
        pagination:{
          currentPage: 1,
          pageSizes: [10, 50, 100, 200],
          pageSize: 10,
          totalCount: 100
        }
      }
    },
    created() {
      this.fetchData();
    },
    mounted() {},
    methods: {
      // 树菜单过滤获取过滤值
      filterNode(value,data){
        if(!value){
          return true
        }
        return data.label.indexOf(value) !== -1;
      },
      // 树节点选择
      handleNode(val){
        console.log(val)
      },
      fetchData(){
        // this.listLoading = true;
        // setTimeout(function () {
          this.listLoading = false
        // },1000)
      },
      // 表格选中行
      setSelectRows(val){
        this.disabledDelete = val.length > 0 ? false : true;
        this.selectRows = val
      },

      handleEdit(row){
        if(row.userId){
          this.$refs['edit'].showEdit(row);
        }else {
          this.$refs['edit'].showEdit()
        }
      },
      // 批量删除 or  删除某一项
      handleDelete(row){
        if(row.userId){
          this.$baseConfirm('你确定要删除当前项吗？',null,async () => {
            // todo 调取删除接口
            this.$baseMessage('删除成功！','success')
            // todo 重新刷新当前页面数据
          })
        }else if(this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item.userId).join();
          this.$baseConfirm('你确定要删除选中项吗？',null, async () => {
            // todo 调取删除接口
            this.$baseMessage('删除成功！','success')
            // todo 重新刷新当前页面数据
          })
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .user-container{
    .filter-tree{
      padding-top: 5px;

      &__tree{
        margin-top: 10px;
      }
    }
  }
</style>
