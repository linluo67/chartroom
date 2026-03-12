<template>
  <div class="message-search">
    <div class="search-input-wrapper">
      <i class="el-icon-search search-icon"></i>
      <input
        type="text"
        v-model="searchKeyword"
        @input="handleSearch"
        placeholder="搜索消息内容..."
        class="search-input"
      />
      <i
        v-if="searchKeyword"
        class="el-icon-circle-close clear-icon"
        @click="clearSearch"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageSearch",
  data() {
    return {
      searchKeyword: "",
      debounceTimer: null,
    };
  },
  methods: {
    handleSearch() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.$emit("search", this.searchKeyword);
      }, 300);
    },
    clearSearch() {
      this.searchKeyword = "";
      this.$emit("search", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.message-search {
  width: 100%;
  margin-bottom: 15px;

  .search-input-wrapper {
    position: relative;
    width: 100%;

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #9e9e9e;
      z-index: 1;
    }

    .search-input {
      width: 100%;
      height: 36px;
      padding: 0 35px 0 35px;
      box-sizing: border-box;
      border-radius: 8px;
      border: 1px solid rgb(66, 70, 86);
      background-color: rgb(50, 54, 68);
      color: #fff;
      font-size: 14px;
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: #1d90f5;
        box-shadow: 0 0 0 2px rgba(29, 144, 245, 0.2);
      }

      &::placeholder {
        color: #9e9e9e;
      }
    }

    .clear-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #9e9e9e;
      cursor: pointer;
      font-size: 16px;
      transition: color 0.3s;

      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
