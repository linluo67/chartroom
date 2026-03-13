<template>
  <div class="quote-message-preview" v-if="quoteData">
    <div class="quote-content">
      <div class="quote-indicator"></div>
      <div class="quote-info">
        <div class="quote-sender">{{ quoteData.senderName }}</div>
        <div class="quote-text" v-if="quoteData.msgType === 0">
          {{ quoteData.contentSummary }}
        </div>
        <div class="quote-img" v-else-if="quoteData.msgType === 1">
          <img :src="quoteData.contentSummary" alt="引用图片" />
          <span class="quote-type-label">[图片]</span>
        </div>
        <div class="quote-file" v-else-if="quoteData.msgType === 2">
          <span class="file-icon">📄</span>
          <span class="file-name">{{ quoteData.contentSummary }}</span>
        </div>
      </div>
    </div>
    <div class="quote-actions">
      <span class="jump-btn" @click="handleJump" title="跳转到原消息">↗</span>
      <span class="close-btn" @click="handleClose" title="取消引用">×</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuoteMessage',
  props: {
    quoteData: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleJump() {
      this.$emit('jump', this.quoteData.msgId);
    }
  }
};
</script>

<style lang="scss" scoped>
.quote-message-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(56, 60, 75);
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 10px;
  max-width: 90%;
  
  .quote-content {
    display: flex;
    align-items: flex-start;
    flex: 1;
    overflow: hidden;
    
    .quote-indicator {
      width: 3px;
      background-color: rgb(29, 144, 245);
      border-radius: 2px;
      margin-right: 10px;
      align-self: stretch;
      min-height: 40px;
    }
    
    .quote-info {
      flex: 1;
      overflow: hidden;
      
      .quote-sender {
        color: rgb(29, 144, 245);
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 4px;
      }
      
      .quote-text {
        color: rgb(180, 180, 180);
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      
      .quote-img {
        display: flex;
        align-items: center;
        
        img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 5px;
          margin-right: 8px;
        }
        
        .quote-type-label {
          color: rgb(180, 180, 180);
          font-size: 13px;
        }
      }
      
      .quote-file {
        display: flex;
        align-items: center;
        
        .file-icon {
          font-size: 20px;
          margin-right: 8px;
        }
        
        .file-name {
          color: rgb(180, 180, 180);
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 200px;
        }
      }
    }
  }
  
  .quote-actions {
    display: flex;
    align-items: center;
    margin-left: 10px;
    
    .jump-btn,
    .close-btn {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      color: rgb(180, 180, 180);
      font-size: 16px;
      transition: all 0.2s;
      
      &:hover {
        background-color: rgb(66, 70, 86);
        color: #fff;
      }
    }
    
    .jump-btn {
      margin-right: 5px;
    }
  }
}
</style>
