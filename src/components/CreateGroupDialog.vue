<template>
  <el-dialog
    title="创建群组"
    :visible.sync="dialogVisible"
    width="450px"
    :close-on-click-modal="false"
    custom-class="create-group-dialog"
    :modal-append-to-body="true"
    :append-to-body="true"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="群组名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入群组名称"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="群组简介" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="2"
          placeholder="请输入群组简介（选填）"
          maxlength="100"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="选择成员" prop="members">
        <div class="member-select">
          <el-checkbox-group v-model="form.members" size="small">
            <el-checkbox-button 
              v-for="member in memberList" 
              :label="member.key" 
              :key="member.key"
            >
              {{ member.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="member-tip">已选择 {{ form.members.length }} 人</div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel" size="small">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading" size="small">创 建</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateGroupDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      form: {
        name: '',
        description: '',
        members: []
      },
      rules: {
        name: [
          { required: true, message: '请输入群组名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        members: [
          { required: true, message: '请至少选择一名成员', trigger: 'change', type: 'array' }
        ]
      },
      memberList: [
        { key: '1002', label: '大毛' },
        { key: '1003', label: '小毛' },
        { key: '1004', label: '小王' },
        { key: '1005', label: '张三' },
        { key: '1006', label: '李四' },
        { key: '1007', label: '王五' },
        { key: '1008', label: '赵六' },
        { key: '1009', label: '钱七' }
      ]
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.dialogVisible = val
      },
      immediate: true
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
      if (!val) {
        this.resetForm()
      }
    }
  },
  methods: {
    handleCancel() {
      this.dialogVisible = false
    },
    resetForm() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.form = {
        name: '',
        description: '',
        members: []
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const selectedMembers = this.memberList.filter(
            item => this.form.members.includes(item.key)
          )
          const groupData = {
            name: this.form.name,
            description: this.form.description,
            members: selectedMembers,
            memberCount: selectedMembers.length + 1
          }
          setTimeout(() => {
            this.loading = false
            this.$emit('create', groupData)
            this.dialogVisible = false
            this.$message.success('群组创建成功！')
          }, 300)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.create-group-dialog {
  .el-dialog__header {
    background-color: rgb(50, 54, 68);
    padding: 15px 20px;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__body {
    background-color: rgb(39, 42, 55);
    padding: 20px;
    .el-form-item__label {
      color: #fff;
    }
    .el-input__inner,
    .el-textarea__inner {
      background-color: rgb(50, 54, 68);
      border-color: rgb(50, 54, 68);
      color: #fff;
    }
    .member-select {
      max-height: 120px;
      overflow-y: auto;
      padding: 5px;
      background-color: rgb(50, 54, 68);
      border-radius: 4px;
      .el-checkbox-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .el-checkbox-button__inner {
        background-color: rgb(39, 42, 55);
        border-color: rgb(29, 144, 245);
        color: #fff;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        background-color: #1d90f5;
        border-color: #1d90f5;
        box-shadow: -1px 0 0 0 #1d90f5;
      }
    }
    .member-tip {
      color: #5c6675;
      font-size: 12px;
      margin-top: 8px;
    }
  }
  .el-dialog__footer {
    background-color: rgb(50, 54, 68);
    padding: 15px 20px;
    .el-button {
      background-color: rgb(39, 42, 55);
      border-color: rgb(39, 42, 55);
      color: #fff;
    }
    .el-button--primary {
      background-color: #1d90f5;
      border-color: #1d90f5;
    }
  }
}
</style>
