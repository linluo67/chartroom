<template>
  <el-dialog
    title="创建群组"
    :visible.sync="dialogVisible"
    width="500px"
    :modal-append-to-body="false"
    @close="handleClose"
  >
    <el-form ref="groupForm" :model="groupForm" label-width="80px">
      <el-form-item label="群组名称" prop="name">
        <el-input v-model="groupForm.name" placeholder="请输入群组名称"></el-input>
      </el-form-item>
      <el-form-item label="选择成员" prop="members">
        <el-select
          v-model="groupForm.members"
          multiple
          filterable
          placeholder="请选择成员"
          style="width: 100%"
        >
          <el-option
            v-for="friend in friendList"
            :key="friend.id"
            :label="friend.name"
            :value="friend.id"
          >
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
import { getFriend } from "@/api/getData";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      groupForm: {
        name: "",
        members: []
      },
      friendList: []
    };
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
      if (val) {
        this.resetForm();
        this.loadFriendList();
      }
    },
    dialogVisible(val) {
      this.$emit('update:visible', val);
    }
  },
  methods: {
    loadFriendList() {
      getFriend().then((res) => {
        this.friendList = res;
      });
    },
    resetForm() {
      this.groupForm = {
        name: "",
        members: []
      };
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleCreate() {
      if (!this.groupForm.name.trim()) {
        this.$message.warning("请输入群组名称");
        return;
      }
      if (this.groupForm.members.length === 0) {
        this.$message.warning("请选择至少一个成员");
        return;
      }
      this.$emit("createGroup", {
        name: this.groupForm.name,
        members: this.groupForm.members
      });
      this.dialogVisible = false;
    }
  }
};
</script>
