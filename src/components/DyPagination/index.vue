<!--分页组件-->
<template>
  <el-pagination
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagination.currentPage"
    :page-sizes="pagination.pageSizes"
    :page-size="pagination.pageSize"
    :total="pagination.totalCount"
    :small="pagination.small"
    :hide-on-single-page="pagination.hideOnSinglePage">

  </el-pagination>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pagination'],
    methods:{
      /**
       * 显示条数发生变更
       */
      handleSizeChange(val){
        this.pagination.pageSize = val;
        this.$emit('loadData')
      },
      /**
       * 页码发生改变
       */
      handleCurrentChange(val){
        this.pagination.currentPage = val;
        this.$emit('loadData')
      }
    }
  }
</script>

<style scoped>

</style>
