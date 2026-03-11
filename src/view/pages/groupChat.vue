<template>
  <div class="groupChat">
    <div class="chatLeft">
      <div class="title">
        <h1>我的群组</h1>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="showCreateDialog = true">创建群组</el-button>
      </div>
      <div class="online-person">
        <span class="onlin-text">群组列表</span>
        <div class="group-cards-wrapper">
          <div
            class="groupList"
            v-for="groupInfo in groupList"
            :key="groupInfo.id"
            @click="clickGroup(groupInfo)"
          >
            <GroupCard
              :groupInfo="groupInfo"
              :gcCurrent="gcCurrent"
            ></GroupCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <div v-if="showChatWindow">
        <ChatWindow
          :frinedInfo="chatWindowInfo"
        ></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
      </div>
    </div>
    <CreateGroupDialog
      :visible.sync="showCreateDialog"
      @createGroup="handleCreateGroup"
    ></CreateGroupDialog>
  </div>
</template>

<script>
import GroupCard from "@/components/GroupCard.vue";
import ChatWindow from "./chatHome/chatwindow.vue";
import CreateGroupDialog from "@/components/CreateGroupDialog.vue";

import { getGroupList } from "@/api/getData";

export default {
  name: "GroupChat",
  components: {
    GroupCard,
    ChatWindow,
    CreateGroupDialog
  },
  data() {
    return {
      gcCurrent: "",
      groupList: [],
      showChatWindow: false,
      chatWindowInfo: {},
      showCreateDialog: false
    };
  },
  mounted() {
    getGroupList().then((res) => {
      this.groupList = res;
    });
  },
  methods: {
    clickGroup(info) {
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      this.gcCurrent = info.id;
    },
    handleCreateGroup(groupData) {
      this.$message.success("群组创建成功！");
      getGroupList().then((res) => {
        this.groupList = res;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.groupChat {
  display: flex;
  .chatLeft {
    width: 280px;
    .title {
      color: #fff;
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 10px;
    }
    .online-person {
      margin-top: 100px;
      .onlin-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .group-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
      }
    }
  }
  .chatRight {
    flex: 1;
    padding-right: 30px;
    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      left: calc(50% - 50px);
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
      }
    }
  }
}
</style>
