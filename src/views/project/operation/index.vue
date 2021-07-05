<template>
  <div class="operation-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="请输入用户姓名" clearable />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="value1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
      <vab-query-form-left-panel :span="24">
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          清空
        </el-button>
        <el-button icon="el-icon-download" type="warning">导出</el-button>
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="请求方法">
              <span>{{ props.row.method }}</span>
            </el-form-item>
            <el-form-item label="请求参数">
              <span>{{ props.row.data }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="IP" prop="ip"></el-table-column>
      <el-table-column label="IP来源" prop="ipsource"></el-table-column>
      <el-table-column label="描述" prop="describe"></el-table-column>
      <el-table-column label="浏览器" prop="browser"></el-table-column>
      <el-table-column label="请求耗时">
        <template slot-scope="props">
          <template>
            <span class="iptime">{{ props.row.time }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" prop="creattime"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'Operation',
    components: {},
    data() {
      return {
        value1: '',
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            },
          ],
        },
        tableData: [
          {
            name: 'admin',
            ip: '115.60.179.68',
            ipsource: '中国|浙江省|宁波市|移动',
            describe: '支付宝PC网页支付',
            browser: 'Chrome 8',
            time: '4ms',
            creattime: '2021-04-16 10:07:37',
            method:
              'me.zhengjie.modules.mnt.rest.ServerDeployController.testConnect()',
            data:
              '{"ip":"192.168.1.0","updateTime":1618514631000,"password":"11","createBy":"admin","port":22,"createTime":1618514631000,"name":"1","id":3738,"account":"root"}',
          },
          {
            name: 'admin',
            ip: '183.6.159.41',
            ipsource: '中国|浙江省|宁波市|移动',
            describe: '执行定时任务',
            browser: 'Chrome 8',
            time: '5ms',
            creattime: '2021-04-16 10:07:37',
            method: 'me.zhengjie.modules.system.rest.MenuController.create()',
            data:
              '{"cache":false,"hidden":false,"roles":[],"updateTime":1618538747643,"title":"qwe","type":0,"subCount":0,"path":"qwe","createBy":"admin","updateBy":"admin","createTime":1618538747643,"iFrame":false,"id":121,"menuSort":999}',
          },
          {
            name: 'admin',
            ip: '115.60.179.68',
            ipsource: '中国|广东省|广州市|电信',
            describe: '新增菜单',
            browser: 'Chrome 8',
            time: '10ms',
            creattime: '2021-04-16 10:07:37',
            method:
              'me.zhengjie.modules.quartz.rest.QuartzJobController.execution()',
            data: '',
          },
          {
            name: 'admin',
            ip: '113.246.83.96',
            ipsource: '中国|河南省|郑州市|联通',
            describe: '测试连接服务器',
            browser: 'Chrome 8',
            time: '2ms',
            creattime: '2021-04-16 10:07:37',
            method:
              'me.zhengjie.modules.quartz.rest.QuartzJobController.execution()',
            data: '',
          },
        ],
      }
    },
    created() {},
    mounted() {},
    methods: {
      // 批量删除
      handleDelete() {
        this.$baseConfirm('确定清空所有操作日志吗？', null, async () => {
          // todo 调取删除接口
          this.$baseMessage('清空成功！', 'success')
          // todo 重新刷新当前页面数据
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .operation-container {
    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }

    .iptime {
      border: 1px solid #d1e9ff;
      color: #1890ff;
      background-color: #e8f4ff;
      border-width: 1px;
      border-radius: 4px;
      font-size: 12px;
      box-sizing: border-box;
      white-space: nowrap;
      padding: 0 8px;
      line-height: 22px;
    }
  }
</style>
