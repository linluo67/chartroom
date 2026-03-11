<template>
  <div class="group-chat">
    <div class="chatLeft">
      <div class="title">
        <h1>群组聊天</h1>
      </div>
      <div class="create-btn-wrapper">
        <el-button type="primary" @click="showCreateDialog = true">
          <i class="el-icon-plus"></i> 创建群组
        </el-button>
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
              :gcCurrent="gcCurrent"
            ></GroupCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <div v-if="showChatWindow" class="chat-window-container">
        <div class="chat-header">
          <div class="group-info">
            <span class="group-name">{{ currentGroup.name }}</span>
            <span class="member-count">({{ currentGroup.memberCount }}人)</span>
          </div>
          <div class="group-actions">
            <el-button type="text" @click="showMemberDialog = true">
              <i class="el-icon-user"></i> 成员管理
            </el-button>
          </div>
        </div>
        <div class="chat-content">
          <div class="message-list">
            <div 
              v-for="(msg, index) in groupMessages" 
              :key="index" 
              class="message-item"
              :class="{ 'self-message': msg.uid === '1001' }"
            >
              <img :src="msg.headImg" class="msg-avatar" />
              <div class="msg-content">
                <div class="msg-header">
                  <span class="msg-name">{{ msg.name }}</span>
                  <span class="msg-time">{{ msg.time }}</span>
                </div>
                <div class="msg-text">{{ msg.msg }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <el-input
            v-model="inputMsg"
            placeholder="请输入消息..."
            @keyup.enter.native="sendMessage"
          >
            <el-button slot="append" @click="sendMessage">发送</el-button>
          </el-input>
        </div>
      </div>
      <div class="showIcon" v-else>
        <i class="el-icon-s-custom group-icon"></i>
        <p class="tip-text">选择一个群组开始聊天</p>
      </div>
    </div>
    
    <CreateGroupDialog
      :visible.sync="showCreateDialog"
      :friendList="friendList"
      @create="handleCreateGroup"
    ></CreateGroupDialog>
    
    <el-dialog
      title="成员管理"
      :visible.sync="showMemberDialog"
      width="400px"
      custom-class="member-dialog"
    >
      <div class="member-list">
        <div v-for="member in currentGroupMembers" :key="member.id" class="member-item">
          <img :src="member.headImg" class="member-avatar" />
          <span class="member-name">{{ member.name }}</span>
          <el-button 
            v-if="member.id !== '1001'" 
            type="text" 
            size="small"
            @click="removeMember(member)"
          >
            移除
          </el-button>
        </div>
      </div>
      <div class="add-member-section">
        <el-select v-model="newMemberId" placeholder="添加新成员" size="small">
          <el-option
            v-for="item in availableFriends"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <img :src="item.headImg" style="width: 25px; height: 25px; border-radius: 50%; margin-right: 8px;" />
            <span>{{ item.name }}</span>
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click="addMember">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import GroupCard from '@/components/GroupCard.vue'
import CreateGroupDialog from '@/components/CreateGroupDialog.vue'
import { getGroupList, getGroupMsg, getFriend } from '@/api/getData'

export default {
  name: 'GroupChat',
  components: {
    GroupCard,
    CreateGroupDialog
  },
  data() {
    return {
      gcCurrent: '',
      groupList: [],
      friendList: [],
      showChatWindow: false,
      currentGroup: {},
      groupMessages: [],
      inputMsg: '',
      showCreateDialog: false,
      showMemberDialog: false,
      newMemberId: '',
      currentGroupMembers: []
    }
  },
  computed: {
    availableFriends() {
      const memberIds = this.currentGroupMembers.map(m => m.id)
      return this.friendList.filter(f => !memberIds.includes(f.id))
    }
  },
  mounted() {
    this.loadGroupList()
    this.loadFriendList()
  },
  methods: {
    loadGroupList() {
      getGroupList().then(res => {
        this.groupList = res
      })
    },
    loadFriendList() {
      getFriend().then(res => {
        this.friendList = res
      })
    },
    clickGroup(info) {
      this.showChatWindow = true
      this.currentGroup = info
      this.gcCurrent = info.id
      this.currentGroupMembers = info.members || []
      this.loadGroupMessages(info.id)
    },
    loadGroupMessages(groupId) {
      getGroupMsg({ groupId }).then(res => {
        this.groupMessages = res
      })
    },
    sendMessage() {
      if (!this.inputMsg.trim()) return
      const newMsg = {
        headImg: require('@/assets/img/head_portrait.jpg'),
        name: '大毛是小白',
        time: this.getCurrentTime(),
        msg: this.inputMsg,
        chatType: 0,
        uid: '1001'
      }
      this.groupMessages.push(newMsg)
      this.inputMsg = ''
    },
    getCurrentTime() {
      const now = new Date()
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12
      return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`
    },
    handleCreateGroup(groupData) {
      const newGroup = {
        id: Date.now().toString(),
        name: groupData.name,
        memberCount: groupData.memberCount,
        lastMsg: '群组已创建',
        headImg: require('@/assets/img/head_portrait.jpg'),
        members: [
          { id: '1001', name: '大毛是小白', headImg: require('@/assets/img/head_portrait.jpg') },
          ...groupData.memberDetails
        ]
      }
      this.groupList.unshift(newGroup)
      this.$message.success('群组创建成功')
    },
    removeMember(member) {
      const index = this.currentGroupMembers.findIndex(m => m.id === member.id)
      if (index > -1) {
        this.currentGroupMembers.splice(index, 1)
        this.currentGroup.memberCount = this.currentGroupMembers.length
        this.$message.success(`已移除 ${member.name}`)
      }
    },
    addMember() {
      if (!this.newMemberId) {
        this.$message.warning('请选择要添加的成员')
        return
      }
      const friend = this.friendList.find(f => f.id === this.newMemberId)
      if (friend) {
        this.currentGroupMembers.push({
          id: friend.id,
          name: friend.name,
          headImg: friend.headImg
        })
        this.currentGroup.memberCount = this.currentGroupMembers.length
        this.newMemberId = ''
        this.$message.success(`已添加 ${friend.name}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.group-chat {
  display: flex;
  .chatLeft {
    width: 280px;
    .title {
      color: #fff;
      padding-left: 10px;
    }
    .create-btn-wrapper {
      padding: 20px 10px;
      .el-button {
        width: 100%;
        background-color: #1d90f5;
        border-color: #1d90f5;
        &:hover {
          background-color: #4da8f7;
          border-color: #4da8f7;
        }
      }
    }
    .online-group {
      margin-top: 20px;
      .onlin-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .group-cards-wrapper {
        padding-left: 10px;
        height: 55vh;
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
    .chat-window-container {
      height: 90vh;
      display: flex;
      flex-direction: column;
      .chat-header {
        padding: 15px 20px;
        background-color: rgb(50, 54, 68);
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .group-info {
          .group-name {
            color: #fff;
            font-size: 18px;
            font-weight: bold;
          }
          .member-count {
            color: #5c6675;
            margin-left: 10px;
          }
        }
        .group-actions {
          .el-button {
            color: #1d90f5;
            &:hover {
              color: #4da8f7;
            }
          }
        }
      }
      .chat-content {
        flex: 1;
        margin: 15px 0;
        background-color: rgb(40, 44, 58);
        border-radius: 10px;
        overflow-y: auto;
        padding: 15px;
        .message-list {
          .message-item {
            display: flex;
            margin-bottom: 20px;
            .msg-avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
            }
            .msg-content {
              flex: 1;
              .msg-header {
                margin-bottom: 5px;
                .msg-name {
                  color: #fff;
                  font-size: 14px;
                  margin-right: 10px;
                }
                .msg-time {
                  color: #5c6675;
                  font-size: 12px;
                }
              }
              .msg-text {
                color: #d0d0d0;
                background-color: rgb(60, 64, 78);
                padding: 10px 15px;
                border-radius: 8px;
                display: inline-block;
              }
            }
            &.self-message {
              flex-direction: row-reverse;
              .msg-avatar {
                margin-right: 0;
                margin-left: 10px;
              }
              .msg-content {
                text-align: right;
                .msg-text {
                  background-color: #1d90f5;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .chat-input {
        .el-input {
          ::v-deep .el-input__inner {
            background-color: rgb(50, 54, 68);
            border-color: rgb(80, 84, 98);
            color: #fff;
            &:focus {
              border-color: #1d90f5;
            }
          }
          ::v-deep .el-input-group__append {
            background-color: #1d90f5;
            border-color: #1d90f5;
            .el-button {
              color: #fff;
            }
          }
        }
      }
    }
    .showIcon {
      position: absolute;
      top: calc(50% - 100px);
      left: calc(50% - 50px);
      text-align: center;
      .group-icon {
        font-size: 150px;
        color: rgb(80, 84, 98);
      }
      .tip-text {
        color: #5c6675;
        margin-top: 20px;
      }
    }
  }
}
.member-dialog {
  background-color: rgb(50, 54, 68);
  border-radius: 10px;
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid rgb(80, 84, 98);
    .el-dialog__title {
      color: #fff;
    }
  }
  ::v-deep .el-dialog__body {
    .member-list {
      max-height: 300px;
      overflow-y: auto;
      .member-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid rgb(80, 84, 98);
        .member-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .member-name {
          flex: 1;
          color: #fff;
        }
        .el-button {
          color: #f56c6c;
        }
      }
    }
    .add-member-section {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      ::v-deep .el-select {
        flex: 1;
        .el-input__inner {
          background-color: rgb(40, 44, 58);
          border-color: rgb(80, 84, 98);
          color: #fff;
        }
      }
    }
  }
}
</style>
