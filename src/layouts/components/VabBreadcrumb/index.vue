<template>
  <div class="breadcrumb-container">
    <el-row type="flex">
      <div v-if="'horizontal' === layout" class="text-crumb" style="font-size: 12px">
        <span>当前位置：</span>
      </div>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" :style="{'font-size': 'horizontal' === layout ? '12px' : ''}">
          <el-breadcrumb-item v-for="item in list" :key="item.path">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'VabBreadcrumb',
    data() {
      return {
        list: this.getBreadcrumb(),
      }
    },
    computed:{
      ...mapGetters({
        layout: 'settings/layout',
      }),
    },
    watch: {
      $route() {
        this.list = this.getBreadcrumb()
      },
    },
    methods: {
      getBreadcrumb() {
        return this.$route.matched.filter(
          (item) => item.name && item.meta.title
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .breadcrumb-container {
    height: 18px;//$base-nav-bar-height;
    font-size: $base-font-size-default;
    //line-height: $base-nav-bar-height;
    .text-crumb{
      margin-left: 10px;
      color: #1890ff;
      font-weight: 600;
    }
    ::v-deep {
      .el-breadcrumb {
        // 默认样式行高 1， 使用unset属性取消行高
        line-height: unset;
      }
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          a {
            display: flex;
            float: left;
            font-weight: normal;
            color: #515a6e;

            i {
              margin-right: 3px;
            }
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            a {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
