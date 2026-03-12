<template>
  <div class="message-search">
    <div class="search-input-wrapper">
      <i class="iconfont icon-sousuo search-icon"></i>
      <input
        v-model="searchKeyword"
        type="text"
        class="search-input"
        placeholder="搜索消息内容..."
        @input="handleInput"
      />
      <i
        v-show="searchKeyword"
        class="iconfont icon-guanbi clear-icon"
        @click="clearSearch"
      ></i>
    </div>
    <div v-if="searchKeyword" class="search-result-count">
      找到 {{ filteredCount }} 条相关消息
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageSearch",
  props: {
    messageList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      searchKeyword: "",
      debounceTimer: null,
    };
  },
  computed: {
    filteredCount() {
      if (!this.searchKeyword.trim()) return 0;
      return this.messageList.filter((item) => {
        if (item.chatType !== 0) return false;
        return item.msg.toLowerCase().includes(this.searchKeyword.toLowerCase());
      }).length;
    },
  },
  methods: {
    handleInput() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.$emit("search", this.searchKeyword.trim());
      }, 300);
    },
    clearSearch() {
      this.searchKeyword = "";
      this.$emit("search", "");
    },
  },
  beforeDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  },
};
</script>

<style lang="scss" scoped>
.message-search {
  padding: 10px 0;
  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    .search-icon {
      position: absolute;
      left: 12px;
      color: rgb(150, 154, 165);
      font-size: 16px;
    }
    .search-input {
      width: 100%;
      height: 36px;
      background-color: rgb(50, 54, 68);
      border: 1px solid rgb(80, 85, 103);
      border-radius: 18px;
      padding: 0 36px;
      box-sizing: border-box;
      font-size: 14px;
      color: #fff;
      transition: all 0.3s;
      &::placeholder {
        color: rgb(150, 154, 165);
      }
      &:focus {
        outline: none;
        border-color: #1d90f5;
        background-color: rgb(56, 60, 75);
      }
    }
    .clear-icon {
      position: absolute;
      right: 12px;
      color: rgb(150, 154, 165);
      font-size: 14px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #fff;
      }
    }
  }
  .search-result-count {
    margin-top: 8px;
    font-size: 12px;
    color: #1d90f5;
    text-align: center;
  }
}
</style>
