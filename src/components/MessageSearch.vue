<template>
  <div class="message-search">
    <div class="search-input-wrapper">
      <input
        type="text"
        class="search-input"
        v-model="searchKeyword"
        placeholder="搜索历史消息..."
        @input="handleSearch"
      />
      <span
        class="clear-btn"
        v-if="searchKeyword"
        @click="clearSearch"
      >×</span>
      <span class="search-icon">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="#9e9e9e"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </span>
    </div>
    <div class="search-results-info" v-if="searchKeyword && filteredMessages.length > 0">
      找到 {{ filteredMessages.length }} 条匹配消息
    </div>
    <div class="search-results-info" v-if="searchKeyword && filteredMessages.length === 0">
      未找到匹配消息
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageSearch",
  props: {
    messageList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchKeyword: "",
      filteredMessages: [],
      debounceTimer: null
    };
  },
  methods: {
    handleSearch() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.performSearch();
      }, 300);
    },
    performSearch() {
      if (!this.searchKeyword.trim()) {
        this.filteredMessages = [];
        this.$emit("searchResult", { messages: [], keyword: "" });
        return;
      }
      const keyword = this.searchKeyword.trim().toLowerCase();
      this.filteredMessages = this.messageList.filter(item => {
        if (item.chatType === 0 && typeof item.msg === "string") {
          return item.msg.toLowerCase().includes(keyword);
        }
        return false;
      });
      this.$emit("searchResult", {
        messages: this.filteredMessages,
        keyword: this.searchKeyword.trim()
      });
    },
    clearSearch() {
      this.searchKeyword = "";
      this.filteredMessages = [];
      this.$emit("searchResult", { messages: [], keyword: "" });
    },
    highlightKeyword(text, keyword) {
      if (!keyword || !text) return text;
      const regex = new RegExp(`(${this.escapeRegExp(keyword)})`, "gi");
      return text.replace(regex, '<mark class="highlight">$1</mark>');
    },
    escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  }
};
</script>

<style lang="scss" scoped>
.message-search {
  width: 100%;
  margin-bottom: 15px;

  .search-input-wrapper {
    position: relative;
    width: 100%;

    .search-input {
      width: 100%;
      height: 40px;
      background-color: rgb(66, 70, 86);
      border: 2px solid rgb(34, 135, 225);
      border-radius: 20px;
      padding: 0 40px 0 15px;
      box-sizing: border-box;
      font-size: 14px;
      color: #fff;
      transition: 0.2s;

      &::placeholder {
        color: #9e9e9e;
      }

      &:focus {
        outline: none;
        border-color: #1d90f5;
        box-shadow: 0 0 8px rgba(29, 144, 245, 0.5);
      }
    }

    .clear-btn {
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      color: #9e9e9e;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: #1d90f5;
      }
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .search-results-info {
    margin-top: 8px;
    padding: 0 10px;
    font-size: 12px;
    color: #9e9e9e;
  }
}
</style>
