<template>
  <el-dialog
    title="创建群组"
    :visible.sync="dialogVisible"
    width="500px"
    :before-close="handleClose"
    custom-class="create-group-dialog"
  >
    <el-form :model="groupForm" :rules="rules" ref="groupFormRef" label-width="80px">
      <el-form-item label="群组名称" prop="name">
        <el-input v-model="groupForm.name" placeholder="请输入群组名称" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="选择成员" prop="members">
        <el-select
          v-model="groupForm.members"
          multiple
          filterable
          placeholder="请选择群组成员"
          style="width: 100%"
        >
          <el-option
            v-for="item in friendList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <div class="member-option">
              <img :src="item.headImg" class="member-avatar" />
              <span>{{ item.name }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleCreate">创 建</el-button>
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
    },
    friendList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      groupForm: {
        name: '',
        members: []
      },
      rules: {
        name: [
          { required: true, message: '请输入群组名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        members: [
          { required: true, message: '请至少选择一名成员', trigger: 'change' },
          { type: 'array', min: 1, message: '请至少选择一名成员', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      this.resetForm()
    },
    resetForm() {
      this.groupForm = {
        name: '',
        members: []
      }
      if (this.$refs.groupFormRef) {
        this.$refs.groupFormRef.resetFields()
      }
    },
    handleCreate() {
      this.$refs.groupFormRef.validate((valid) => {
        if (valid) {
          const selectedMembers = this.friendList.filter(f => 
            this.groupForm.members.includes(f.id)
          )
          const groupData = {
            name: this.groupForm.name,
            members: this.groupForm.members,
            memberCount: this.groupForm.members.length + 1,
            memberDetails: selectedMembers
          }
          this.$emit('create', groupData)
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.create-group-dialog {
  background-color: rgb(50, 54, 68);
  border-radius: 10px;
  .el-dialog__header {
    border-bottom: 1px solid rgb(80, 84, 98);
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #5c6675;
      &:hover {
        color: #1d90f5;
      }
    }
  }
  .el-dialog__body {
    padding: 20px 30px;
    .el-form-item__label {
      color: #fff;
    }
    .el-input__inner {
      background-color: rgb(40, 44, 58);
      border-color: rgb(80, 84, 98);
      color: #fff;
      &:focus {
        border-color: #1d90f5;
      }
    }
    .el-select .el-tag {
      background-color: #1d90f5;
      color: #fff;
    }
  }
  .el-dialog__footer {
    border-top: 1px solid rgb(80, 84, 98);
    .el-button--default {
      background-color: rgb(60, 64, 78);
      border-color: rgb(80, 84, 98);
      color: #fff;
      &:hover {
        background-color: rgb(70, 74, 88);
      }
    }
  }
  .member-option {
    display: flex;
    align-items: center;
    .member-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
