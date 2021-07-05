<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="650px" @close="close">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="24">
          <el-form-item label="部门机构" label-width="120px" prop="name">
            <el-input
              v-model.trim="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="排序" label-width="120px" prop="sort">
            <el-input
              v-model.trim="form.sort"
              type="password"
              autocomplete="off"></el-input>
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
  name: "departmentEdit",
  data() {
    return {
      title: '',
      form: {
        name: '',
        sort: '',
      },
      rules: {
        name: [
          {required: true, trigger: 'blur', message: '请输入机构名称'}
        ]
      },
      dialogFormVisible: false,
    }
  },
  methods: {
    showEdit(row, type) {
      this.title = type === 'add' ? '添加' : '编辑';
      // 浅拷贝数据
      this.form = type === 'edit' ? Object.assign({}, row) : {name: '',sort: '',};
      this.dialogFormVisible = true
    },
    save() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          // todo 调用保存成功接口
          this.$baseMessage('保存成功！', 'success');
          // todo 触发父页面获取数据方法
          this.$emit('fetch-data');
          this.close();
        }
      })
    },
    close() {
      this.$refs['form'].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    }
  }

}
</script>

<style scoped>

</style>
