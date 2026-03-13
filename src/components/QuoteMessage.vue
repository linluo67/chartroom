<template>
  <div class="quote-message">
    <div class="quote-content" @click="handleClick">
      <div class="quote-line"></div>
      <div class="quote-info">
        <div class="quote-sender">{{ quoteData.name }}</div>
        <div class="quote-text" v-if="quoteData.chatType === 0">
          {{ quoteData.msg }}
        </div>
        <div class="quote-img" v-else-if="quoteData.chatType === 1">
          <img :src="quoteData.msg" alt="图片" />
          <span>[图片]</span>
        </div>
        <div class="quote-file" v-else-if="quoteData.chatType === 2">
          <i class="iconfont icon-wenjian"></i>
          <span>{{ quoteData.msg.name || '文件' }}</span>
        </div>
      </div>
    </div>
    <div class="quote-close" @click="handleClose">
      <span class="close-icon">×</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteMessage',
  props: {
    quoteData: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        name: '',
        msg: '',
        chatType: 0,
        uid: ''
      })
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleClick() {
      this.$emit('jump', this.quoteData.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.quote-message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(66, 70, 86);
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;

  .quote-content {
    display: flex;
    align-items: flex-start;
    flex: 1;
    cursor: pointer;
    overflow: hidden;

    .quote-line {
      width: 3px;
      min-width: 3px;
      height: 40px;
      background-color: rgb(29, 144, 245);
      border-radius: 2px;
      margin-right: 10px;
    }

    .quote-info {
      flex: 1;
      overflow: hidden;

      .quote-sender {
        font-size: 14px;
        color: rgb(29, 144, 245);
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .quote-text {
        font-size: 13px;
        color: rgb(176, 178, 189);
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .quote-img {
        display: flex;
        align-items: center;
        gap: 8px;

        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
        }

        span {
          font-size: 13px;
          color: rgb(176, 178, 189);
        }
      }

      .quote-file {
        display: flex;
        align-items: center;
        gap: 8px;

        i {
          font-size: 20px;
          color: rgb(176, 178, 189);
        }

        span {
          font-size: 13px;
          color: rgb(176, 178, 189);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .quote-close {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 50%;
    transition: background-color 0.2s;
    flex-shrink: 0;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .close-icon {
      font-size: 18px;
      color: rgb(176, 178, 189);
      line-height: 1;
    }
  }
}
</style>
