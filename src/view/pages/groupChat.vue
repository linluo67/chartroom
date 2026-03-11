<template>
  <div class="group-chat">
    <div class="chatLeft">
      <div class="title">
        <h1>群组聊天</h1>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          class="create-btn"
          @click="showCreateDialog = true"
        >创建群组</el-button>
      </div>
      <div class="online-group">
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
              :pcCurrent="pcCurrent"
            ></GroupCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <div v-if="showChatWindow">
        <div class="chat-window">
          <div class="chat-header">
            <HeadPortrait :imgUrl="chatWindowInfo.headImg"></HeadPortrait>
            <div class="header-info">
              <div class="name">{{ chatWindowInfo.name }}</div>
              <div class="member-count">
                <span class="iconfont icon-ren"></span>
                <span>{{ chatWindowInfo.memberCount }}人</span>
              </div>
            </div>
            <div class="header-actions">
              <el-button
                type="text"
                icon="el-icon-setting"
                @click="handleManageGroup"
              >管理</el-button>
            </div>
          </div>
          <div class="chat-content" ref="chatContent">
            <div class="message-list">
              <div
                v-for="(msg, index) in chatMessageList"
                :key="index"
                class="message-item"
                :class="{ 'self-message': msg.uid === '1001' }"
              >
                <div class="message-avatar">
                  <HeadPortrait :imgUrl="msg.headImg" :size="40"></HeadPortrait>
                </div>
                <div class="message-body">
                  <div class="message-header">
                    <span class="message-name">{{ msg.name }}</span>
                    <span class="message-time">{{ msg.time }}</span>
                  </div>
                  <div class="message-content">
                    <div v-if="msg.chatType === 0" class="text-msg">{{ msg.msg }}</div>
                    <div v-else-if="msg.chatType === 1" class="image-msg">
                      <img :src="msg.msg" alt="表情" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chat-input-area">
            <div class="input-toolbar">
              <span class="iconfont icon-biaoqing" @click="showEmoji = !showEmoji"></span>
              <span class="iconfont icon-wenjian"></span>
              <span class="iconfont icon-tupian"></span>
            </div>
            <div class="input-box">
              <textarea
                v-model="messageText"
                placeholder="请输入消息..."
                @keyup.enter="sendMessage"
              ></textarea>
            </div>
            <div class="send-btn-wrapper">
              <el-button type="primary" size="small" @click="sendMessage">发送</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
        <p class="tip-text">选择一个群组开始聊天</p>
      </div>
    </div>
    <CreateGroupDialog
      :visible.sync="showCreateDialog"
      @create="handleGroupCreated"
    ></CreateGroupDialog>
  </div>
</template>

<script>
import GroupCard from "@/components/GroupCard.vue";
import HeadPortrait from "@/components/HeadPortrait.vue";
import CreateGroupDialog from "@/components/CreateGroupDialog.vue";
import { getGroupList, getGroupChatMsg } from "@/api/getData";

export default {
  name: "GroupChat",
  components: {
    GroupCard,
    HeadPortrait,
    CreateGroupDialog,
  },
  data() {
    return {
      pcCurrent: "",
      groupList: [],
      showChatWindow: false,
      chatWindowInfo: {},
      showCreateDialog: false,
      messageText: "",
      chatMessageList: [],
      showEmoji: false,
    };
  },
  mounted() {
    this.fetchGroupList();
  },
  methods: {
    fetchGroupList() {
      getGroupList().then((res) => {
        console.log(res);
        this.groupList = res;
      });
    },
    clickGroup(info) {
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      this.pcCurrent = info.id;
      this.fetchGroupChatMsg(info.id);
    },
    fetchGroupChatMsg(groupId) {
      getGroupChatMsg({ groupId }).then((res) => {
        this.chatMessageList = res || [];
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      });
    },
    handleGroupCreated(groupData) {
      const newGroup = {
        id: "group_" + Date.now(),
        name: groupData.name,
        headImg: require("@/assets/img/head_portrait.jpg"),
        lastMsg: "暂无消息",
        memberCount: groupData.memberCount,
        description: groupData.description,
      };
      this.groupList.unshift(newGroup);
    },
    handleManageGroup() {
      this.$message.info("群组管理功能开发中...");
    },
    sendMessage() {
      if (!this.messageText.trim()) {
        this.$message.warning("请输入消息内容");
        return;
      }
      
      const newMessage = {
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "大毛是小白",
        time: this.getCurrentTime(),
        msg: this.messageText.trim(),
        chatType: 0,
        uid: "1001",
      };
      
      this.chatMessageList.push(newMessage);
      
      // 更新群组列表的最后一条消息
      const groupIndex = this.groupList.findIndex(g => g.id === this.pcCurrent);
      if (groupIndex !== -1) {
        this.groupList[groupIndex].lastMsg = `大毛是小白：${this.messageText.trim()}`;
        // 将当前群组移到列表顶部
        const currentGroup = this.groupList.splice(groupIndex, 1)[0];
        this.groupList.unshift(currentGroup);
      }
      
      this.messageText = "";
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours > 12 ? hours - 12 : hours;
      return `${displayHours}：${minutes} ${period}`;
    },
    scrollToBottom() {
      const chatContent = this.$refs.chatContent;
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.group-chat {
  display: flex;
  height: 100%;
  .chatLeft {
    width: 280px;
    .title {
      color: #fff;
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 10px;
      .create-btn {
        background-color: #1d90f5;
        border-color: #1d90f5;
      }
    }
    .online-group {
      margin-top: 50px;
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
    position: relative;
    .chat-window {
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: rgb(39, 42, 55);
      border-radius: 10px;
      .chat-header {
        height: 60px;
        background-color: rgb(50, 54, 68);
        border-radius: 10px 10px 0 0;
        display: flex;
        align-items: center;
        padding: 0 20px;
        .header-info {
          margin-left: 15px;
          flex: 1;
          .name {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
          }
          .member-count {
            color: #5c6675;
            font-size: 12px;
            margin-top: 3px;
            span {
              margin-right: 5px;
            }
          }
        }
        .header-actions {
          .el-button {
            color: #1d90f5;
          }
        }
      }
      .chat-content {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        .message-list {
          .message-item {
            display: flex;
            margin-bottom: 20px;
            .message-avatar {
              margin-right: 10px;
              flex-shrink: 0;
            }
            .message-body {
              flex: 1;
              .message-header {
                margin-bottom: 5px;
                .message-name {
                  color: #1d90f5;
                  font-size: 14px;
                  margin-right: 10px;
                }
                .message-time {
                  color: #5c6675;
                  font-size: 12px;
                }
              }
              .message-content {
                .text-msg {
                  background-color: rgb(50, 54, 68);
                  color: #fff;
                  padding: 10px 15px;
                  border-radius: 8px;
                  display: inline-block;
                  max-width: 400px;
                  word-wrap: break-word;
                }
                .image-msg {
                  img {
                    max-width: 100px;
                    max-height: 100px;
                    border-radius: 8px;
                  }
                }
              }
            }
            &.self-message {
              flex-direction: row-reverse;
              .message-avatar {
                margin-right: 0;
                margin-left: 10px;
              }
              .message-body {
                .message-header {
                  text-align: right;
                }
                .message-content {
                  text-align: right;
                  .text-msg {
                    background-color: #1d90f5;
                    text-align: left;
                  }
                }
              }
            }
          }
        }
      }
      .chat-input-area {
        height: 150px;
        background-color: rgb(50, 54, 68);
        border-radius: 0 0 10px 10px;
        padding: 10px 20px;
        .input-toolbar {
          height: 30px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgb(39, 42, 55);
          span {
            color: #5c6675;
            font-size: 20px;
            margin-right: 15px;
            cursor: pointer;
            &:hover {
              color: #1d90f5;
            }
          }
        }
        .input-box {
          height: 70px;
          padding: 10px 0;
          textarea {
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: none;
            color: #fff;
            resize: none;
            outline: none;
            font-size: 14px;
            &::placeholder {
              color: #5c6675;
            }
          }
        }
        .send-btn-wrapper {
          display: flex;
          justify-content: flex-end;
          .el-button {
            background-color: #1d90f5;
            border-color: #1d90f5;
          }
        }
      }
    }
    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      left: calc(50% - 50px);
      text-align: center;
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
      }
      .tip-text {
        color: #5c6675;
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
}
</style>
