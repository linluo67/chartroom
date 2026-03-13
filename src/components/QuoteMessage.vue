<template>
  <div class="quote-message" @click="handleJump">
    <div class="quote-content">
      <div class="quote-header">
        <span class="quote-sender">{{ message.name }}</span>
      </div>
      <div class="quote-body">
        <div v-if="message.chatType === 0" class="quote-text">
          {{ message.msg }}
        </div>
        <div v-else-if="message.chatType === 1" class="quote-img">
          <img :src="message.msg" alt="图片" class="thumbnail" />
          <span class="quote-type-label">图片</span>
        </div>
        <div v-else-if="message.chatType === 2" class="quote-file">
          <img :src="getFileIcon(message.extend?.fileType)" alt="文件" class="file-icon" />
          <span class="file-name">{{ message.msg.name || '未知文件' }}</span>
        </div>
      </div>
    </div>
    <div v-if="showClose" class="close-btn" @click.stop="handleClose">
×
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getFileIcon(fileType) {
      const iconMap = {
        0: require("@/assets/img/fileImg/unknowfile.png"),
        1: require("@/assets/img/fileImg/word.png"),
        2: require("@/assets/img/fileImg/excel.png"),
        3: require("@/assets/img/fileImg/ppt.png"),
        4: require("@/assets/img/fileImg/pdf.png"),
        5: require("@/assets/img/fileImg/zpi.png"),
        6: require("@/assets/img/fileImg/txt.png")
      };
      return iconMap[fileType] || iconMap[0];
    },
    handleClose() {
      this.$emit('close');
    },
    handleJump() {
      this.$emit('jump', this.message);
    }
  }
};
</script>

<style lang="scss" scoped>
.quote-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(60, 64, 79);
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 10px;
  border-left: 3px solid rgb(29, 144, 245);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(50, 54, 69);
  }

  .quote-content {
    flex: 1;
    overflow: hidden;

    .quote-header {
      margin-bottom: 4px;

      .quote-sender {
        font-size: 12px;
        color: rgb(160, 165, 180);
        font-weight: 500;
      }
    }

    .quote-body {
      .quote-text {
        font-size: 13px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.4;
      }

      .quote-img {
        display: flex;
        align-items: center;

        .thumbnail {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          object-fit: cover;
          margin-right: 8px;
        }

        .quote-type-label {
          font-size: 13px;
          color: #fff;
        }
      }

      .quote-file {
        display: flex;
        align-items: center;

        .file-icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }

        .file-name {
          font-size: 13px;
          color: #fff;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 200px;
        }
      }
    }
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: rgb(160, 165, 180);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: rgb(80, 85, 103);
      color: #fff;
    }
  }
}
</style>
