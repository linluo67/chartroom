<template>
  <div class="chat-window" @contextmenu.prevent.stop>
    <div class="top">
      <div class="head-pic">
        <HeadPortrait :imgUrl="frinedInfo.headImg"></HeadPortrait>
      </div>
      <div class="info-detail">
        <div class="name">{{ frinedInfo.name }}</div>
        <div class="detail">{{ frinedInfo.detail }}</div>
      </div>
      <div class="other-fun">
        <span class="iconfont icon-shipin" @click="video"> </span>
        <span class="iconfont icon-gf-telephone" @click="telephone"></span>
        <label for="docFile">
          <span class="iconfont icon-wenjian"></span>
        </label>
        <label for="imgFile">
          <span class="iconfont icon-tupian"></span>
        </label>
        <input
          type="file"
          name=""
          id="imgFile"
          @change="sendImg"
          accept="image/*"
        />
        <input
          type="file"
          name=""
          id="docFile"
          @change="sendFile"
          accept="application/*,text/*"
        />
      </div>
    </div>
    <div class="botoom">
      <div class="chat-content" ref="chatContent">
        <div 
          class="chat-wrapper" 
          v-for="item in chatList" 
          :key="item.id"
          :ref="'msg_' + item.id"
          @contextmenu.prevent.stop="handleRightClick($event, item)"
        >
          <div class="chat-friend" v-if="item.uid !== '1001'">
            <div class="chat-text" v-if="item.chatType == 0">
              <div class="quote-box" v-if="item.quoteMessage" @click.stop="jumpToMessage(item.quoteMessage.msgId)">
                <div class="quote-indicator"></div>
                <div class="quote-content-inner">
                  <span class="quote-name">{{ item.quoteMessage.senderName }}</span>
                  <span class="quote-preview">{{ item.quoteMessage.contentSummary }}</span>
                </div>
              </div>
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType == 1">
              <div class="quote-box" v-if="item.quoteMessage" @click.stop="jumpToMessage(item.quoteMessage.msgId)">
                <div class="quote-indicator"></div>
                <div class="quote-content-inner">
                  <span class="quote-name">{{ item.quoteMessage.senderName }}</span>
                  <span class="quote-preview">{{ item.quoteMessage.contentSummary }}</span>
                </div>
              </div>
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend && item.extend.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image :src="item.msg" :preview-src-list="srcImgList" v-else>
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="quote-box" v-if="item.quoteMessage" @click.stop="jumpToMessage(item.quoteMessage.msgId)">
                <div class="quote-indicator"></div>
                <div class="quote-content-inner">
                  <span class="quote-name">{{ item.quoteMessage.senderName }}</span>
                  <span class="quote-preview">{{ item.quoteMessage.contentSummary }}</span>
                </div>
              </div>
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
              </div>
            </div>
            <div class="info-time">
              <img :src="item.headImg" alt="" />
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="chat-text" v-if="item.chatType == 0">
              <div class="quote-box" v-if="item.quoteMessage" @click.stop="jumpToMessage(item.quoteMessage.msgId)">
                <div class="quote-indicator"></div>
                <div class="quote-content-inner">
                  <span class="quote-name">{{ item.quoteMessage.senderName }}</span>
                  <span class="quote-preview">{{ item.quoteMessage.contentSummary }}</span>
                </div>
              </div>
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType == 1">
              <div class="quote-box" v-if="item.quoteMessage" @click.stop="jumpToMessage(item.quoteMessage.msgId)">
                <div class="quote-indicator"></div>
                <div class="quote-content-inner">
                  <span class="quote-name">{{ item.quoteMessage.senderName }}</span>
                  <span class="quote-preview">{{ item.quoteMessage.contentSummary }}</span>
                </div>
              </div>
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend && item.extend.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image
                style="max-width: 300px; border-radius: 10px"
                :src="item.msg"
                :preview-src-list="srcImgList"
                v-else
              >
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="quote-box" v-if="item.quoteMessage" @click.stop="jumpToMessage(item.quoteMessage.msgId)">
                <div class="quote-indicator"></div>
                <div class="quote-content-inner">
                  <span class="quote-name">{{ item.quoteMessage.senderName }}</span>
                  <span class="quote-preview">{{ item.quoteMessage.contentSummary }}</span>
                </div>
              </div>
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
              </div>
            </div>
            <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
              <img :src="item.headImg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <QuoteMessage
          v-if="currentQuote"
          :quoteData="currentQuote"
          @close="clearQuote"
          @jump="jumpToMessage"
        />
        <div class="input-wrapper">
          <div class="emoji boxinput" @click="clickEmoji">
            <img src="@/assets/img/emoji/smiling-face.png" alt="" />
          </div>
          <div class="emoji-content">
            <Emoji
              v-show="showEmoji"
              @sendEmoji="sendEmoji"
              @closeEmoji="clickEmoji"
            ></Emoji>
          </div>
          <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
          <div class="send boxinput" @click="sendText">
            <img src="@/assets/img/emoji/rocket.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div 
      class="context-menu" 
      v-if="showContextMenu" 
      :style="contextMenuStyle"
      @click.stop
    >
      <div class="menu-item" @click="handleQuoteReply">
        <span class="quote-icon">💬</span>
        <span>引用回复</span>
      </div>
    </div>
  </div>
</template>

<script>
import { animation } from "@/util/util";
import { getChatMsg } from "@/api/getData";

import HeadPortrait from "@/components/HeadPortrait";
import Emoji from "@/components/Emoji";
import FileCard from "@/components/FileCard.vue";
import QuoteMessage from "@/components/QuoteMessage.vue";

export default {
  components: {
    HeadPortrait,
    Emoji,
    FileCard,
    QuoteMessage,
  },
  props: {
    frinedInfo: Object,
    default() {
      return {};
    },
  },
  watch: {
    frinedInfo() {
      this.getFriendChatMsg();
    },
  },
  data() {
    return {
      chatList: [],
      inputMsg: "",
      showEmoji: false,
      friendInfo: {},
      srcImgList: [],
      showContextMenu: false,
      contextMenuStyle: {},
      selectedMessage: null,
      currentQuote: null,
      messageIdCounter: 10000,
    };
  },
  mounted() {
    this.getFriendChatMsg();
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('contextmenu', this.handleDocumentContextMenu);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('contextmenu', this.handleDocumentContextMenu);
  },
  methods: {
    getFriendChatMsg() {
      let params = {
        frinedId: this.frinedInfo.id,
      };
      getChatMsg(params).then((res) => {
        this.chatList = res;
        this.chatList.forEach((item) => {
          if (item.chatType == 2 && item.extend && item.extend.imgType == 2) {
            this.srcImgList.push(item.msg);
          }
        });
        this.scrollBottom();
      });
    },
    sendMsg(msgList) {
      this.chatList.push(msgList);
      this.scrollBottom();
    },
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    generateMessageId() {
      this.messageIdCounter++;
      return 'msg_' + Date.now() + '_' + this.messageIdCounter;
    },
    getContentSummary(message) {
      if (message.chatType === 0) {
        return message.msg;
      } else if (message.chatType === 1) {
        return '[图片]';
      } else if (message.chatType === 2) {
        return message.msg ? message.msg.name || '[文件]' : '[文件]';
      }
      return '[消息]';
    },
    sendText() {
      if (this.inputMsg) {
        let chatMsg = {
          id: this.generateMessageId(),
          headImg: require("@/assets/img/head_portrait.jpg"),
          name: "大毛是小白",
          time: "09：12 AM",
          msg: this.inputMsg,
          chatType: 0,
          uid: "1001",
        };
        if (this.currentQuote) {
          chatMsg.quoteMessage = { ...this.currentQuote };
        }
        this.sendMsg(chatMsg);
        this.$emit('personCardSort', this.frinedInfo.id);
        this.inputMsg = "";
        this.clearQuote();
      } else {
        this.$message({
          message: "消息不能为空哦~",
          type: "warning",
        });
      }
    },
    sendEmoji(msg) {
      let chatMsg = {
        id: this.generateMessageId(),
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "大毛是小白",
        time: "09：12 AM",
        msg: msg,
        chatType: 1,
        extend: {
          imgType: 1,
        },
        uid: "1001",
      };
      if (this.currentQuote) {
        chatMsg.quoteMessage = { ...this.currentQuote };
      }
      this.sendMsg(chatMsg);
      this.clickEmoji();
      this.clearQuote();
    },
    sendImg(e) {
      let _this = this;
      let chatMsg = {
        id: this.generateMessageId(),
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "大毛是小白",
        time: "09：12 AM",
        msg: "",
        chatType: 1,
        extend: {
          imgType: 2,
        },
        uid: "1001",
      };
      if (this.currentQuote) {
        chatMsg.quoteMessage = { ...this.currentQuote };
      }
      let files = e.target.files[0];
      if (!e || !window.FileReader) return;
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onloadend = function() {
        chatMsg.msg = this.result;
        _this.srcImgList.push(chatMsg.msg);
      };
      this.sendMsg(chatMsg);
      e.target.files = null;
      this.clearQuote();
    },
    sendFile(e) {
      let chatMsg = {
        id: this.generateMessageId(),
        headImg: require("@/assets/img/head_portrait.jpg"),
        name: "大毛是小白",
        time: "09：12 AM",
        msg: "",
        chatType: 2,
        extend: {
          fileType: "",
        },
        uid: "1001",
      };
      if (this.currentQuote) {
        chatMsg.quoteMessage = { ...this.currentQuote };
      }
      let files = e.target.files[0];
      chatMsg.msg = files;
      if (files) {
        switch (files.type) {
          case "application/msword":
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            chatMsg.extend.fileType = 1;
            break;
          case "application/vnd.ms-excel":
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            chatMsg.extend.fileType = 2;
            break;
          case "application/vnd.ms-powerpoint":
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            chatMsg.extend.fileType = 3;
            break;
          case "application/pdf":
            chatMsg.extend.fileType = 4;
            break;
          case "application/zip":
          case "application/x-zip-compressed":
            chatMsg.extend.fileType = 5;
            break;
          case "text/plain":
            chatMsg.extend.fileType = 6;
            break;
          default:
            chatMsg.extend.fileType = 0;
        }
        this.sendMsg(chatMsg);
        e.target.files = null;
        this.clearQuote();
      }
    },
    telephone() {
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
    },
    video() {
      this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
    },
    handleRightClick(event, message) {
      this.selectedMessage = message;
      this.showContextMenu = true;
      const menuWidth = 140;
      const menuHeight = 50;
      let left = event.clientX;
      let top = event.clientY;
      if (left + menuWidth > window.innerWidth) {
        left = window.innerWidth - menuWidth - 10;
      }
      if (top + menuHeight > window.innerHeight) {
        top = window.innerHeight - menuHeight - 10;
      }
      this.contextMenuStyle = {
        left: left + 'px',
        top: top + 'px',
      };
    },
    handleDocumentClick(event) {
      if (this.showContextMenu) {
        this.showContextMenu = false;
      }
    },
    handleDocumentContextMenu(event) {
      if (this.showContextMenu) {
        this.showContextMenu = false;
      }
    },
    handleQuoteReply() {
      if (!this.selectedMessage) return;
      this.currentQuote = {
        msgId: this.selectedMessage.id,
        senderName: this.selectedMessage.name,
        contentSummary: this.getContentSummary(this.selectedMessage),
        msgType: this.selectedMessage.chatType,
      };
      this.showContextMenu = false;
      this.$message({
        message: "已引用消息，请输入回复内容",
        type: "success",
      });
    },
    clearQuote() {
      this.currentQuote = null;
    },
    jumpToMessage(msgId) {
      if (!msgId) return;
      const messageElements = this.$refs['msg_' + msgId];
      if (messageElements && messageElements.length > 0) {
        const targetElement = messageElements[0];
        const chatContent = this.$refs.chatContent;
        const targetOffset = targetElement.offsetTop - chatContent.offsetTop;
        animation(chatContent, targetOffset - 20);
        targetElement.classList.add('highlight-message');
        setTimeout(() => {
          targetElement.classList.remove('highlight-message');
        }, 2000);
      } else {
        this.$message({
          message: "原消息不在当前聊天记录中",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;

  .top {
    margin-bottom: 50px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .head-pic {
      float: left;
    }
    .info-detail {
      float: left;
      margin: 5px 20px 0;
      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }
      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    .other-fun {
      float: right;
      margin-top: 20px;
      span {
        margin-left: 30px;
        cursor: pointer;
      }
      input {
        display: none;
      }
    }
  }
  .botoom {
    width: 100%;
    height: 70vh;
    background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }
      .chat-wrapper {
        position: relative;
        word-break: break-all;
        transition: background-color 0.3s;
        border-radius: 10px;
        padding: 5px;
        margin: -5px;
        margin-bottom: 15px;
        cursor: default;
        &.highlight-message {
          background-color: rgba(29, 144, 245, 0.2);
          animation: highlight-fade 2s ease-out;
        }
        @keyframes highlight-fade {
          0% {
            background-color: rgba(29, 144, 245, 0.4);
          }
          100% {
            background-color: rgba(29, 144, 245, 0.1);
          }
        }
        .chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .chat-text {
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 20px 5px;
            background-color: rgb(56, 60, 75);
            color: #fff;
            &:hover {
              background-color: rgb(39, 42, 55);
            }
            .quote-box {
              background-color: rgba(0, 0, 0, 0.2);
              border-radius: 8px;
              padding: 8px 12px;
              margin-bottom: 10px;
              display: flex;
              align-items: flex-start;
              cursor: pointer;
              transition: background-color 0.2s;
              &:hover {
                background-color: rgba(0, 0, 0, 0.3);
              }
              .quote-indicator {
                width: 3px;
                background-color: rgb(29, 144, 245);
                border-radius: 2px;
                margin-right: 10px;
                align-self: stretch;
                min-height: 30px;
              }
              .quote-content-inner {
                flex: 1;
                overflow: hidden;
                .quote-name {
                  display: block;
                  color: rgb(29, 144, 245);
                  font-size: 12px;
                  font-weight: 500;
                  margin-bottom: 4px;
                }
                .quote-preview {
                  display: block;
                  color: rgb(180, 180, 180);
                  font-size: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  max-width: 250px;
                }
              }
            }
          }
          .chat-img {
            img {
              width: 100px;
              height: 100px;
            }
            .quote-box {
              background-color: rgba(0, 0, 0, 0.2);
              border-radius: 8px;
              padding: 8px 12px;
              margin-bottom: 10px;
              display: flex;
              align-items: flex-start;
              cursor: pointer;
              transition: background-color 0.2s;
              max-width: 300px;
              &:hover {
                background-color: rgba(0, 0, 0, 0.3);
              }
              .quote-indicator {
                width: 3px;
                background-color: rgb(29, 144, 245);
                border-radius: 2px;
                margin-right: 10px;
                align-self: stretch;
                min-height: 30px;
              }
              .quote-content-inner {
                flex: 1;
                overflow: hidden;
                .quote-name {
                  display: block;
                  color: rgb(29, 144, 245);
                  font-size: 12px;
                  font-weight: 500;
                  margin-bottom: 4px;
                }
                .quote-preview {
                  display: block;
                  color: rgb(180, 180, 180);
                  font-size: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  max-width: 250px;
                }
              }
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }
            span:last-child {
              color: rgb(101, 104, 115);
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 5px 20px;
            background-color: rgb(29, 144, 245);
            color: #fff;
            &:hover {
              background-color: rgb(26, 129, 219);
            }
            .quote-box {
              background-color: rgba(0, 0, 0, 0.15);
              border-radius: 8px;
              padding: 8px 12px;
              margin-bottom: 10px;
              display: flex;
              align-items: flex-start;
              cursor: pointer;
              transition: background-color 0.2s;
              &:hover {
                background-color: rgba(0, 0, 0, 0.25);
              }
              .quote-indicator {
                width: 3px;
                background-color: #fff;
                border-radius: 2px;
                margin-right: 10px;
                align-self: stretch;
                min-height: 30px;
              }
              .quote-content-inner {
                flex: 1;
                overflow: hidden;
                .quote-name {
                  display: block;
                  color: rgba(255, 255, 255, 0.9);
                  font-size: 12px;
                  font-weight: 500;
                  margin-bottom: 4px;
                }
                .quote-preview {
                  display: block;
                  color: rgba(255, 255, 255, 0.7);
                  font-size: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  max-width: 250px;
                }
              }
            }
          }
          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
            .quote-box {
              background-color: rgba(0, 0, 0, 0.15);
              border-radius: 8px;
              padding: 8px 12px;
              margin-bottom: 10px;
              display: flex;
              align-items: flex-start;
              cursor: pointer;
              transition: background-color 0.2s;
              max-width: 300px;
              &:hover {
                background-color: rgba(0, 0, 0, 0.25);
              }
              .quote-indicator {
                width: 3px;
                background-color: #fff;
                border-radius: 2px;
                margin-right: 10px;
                align-self: stretch;
                min-height: 30px;
              }
              .quote-content-inner {
                flex: 1;
                overflow: hidden;
                .quote-name {
                  display: block;
                  color: rgba(255, 255, 255, 0.9);
                  font-size: 12px;
                  font-weight: 500;
                  margin-bottom: 4px;
                }
                .quote-preview {
                  display: block;
                  color: rgba(255, 255, 255, 0.7);
                  font-size: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  max-width: 250px;
                }
              }
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      flex-direction: column;
      
      .input-wrapper {
        display: flex;
        width: 100%;
      }
      
      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .emoji {
        transition: 0.3s;
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
      }

      .inputs {
        width: 90%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;
        &:focus {
          outline: none;
        }
      }
      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }
    }
  }
  
  .context-menu {
    position: fixed;
    background-color: rgb(45, 48, 63);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    padding: 8px 0;
    z-index: 9999;
    min-width: 140px;
    
    .menu-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      cursor: pointer;
      color: #fff;
      font-size: 14px;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: rgb(29, 144, 245);
        border-radius: 4px;
      }
      
      .quote-icon {
        margin-right: 10px;
        font-size: 18px;
      }
    }
  }
}
</style>
