<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="{ activeNav: index == current }"
          @click="changeMenu(index)"
        >
          <div class="block"></div>
          <span v-if="item.type === 'iconfont'" class="iconfont" :class="item.class"></span>
          <i v-else class="el-icon" :class="item.class"></i>
        </li>
      </ul>
    </div>
    <div class="own-pic">
        <HeadPortrait :imgUrl="imgUrl"></HeadPortrait>
    </div>
  </div>
</template>

<script>
import HeadPortrait from "./HeadPortrait.vue";

export default {
  components: {
    HeadPortrait,
  },
  data() {
    return {
      menuList: [
        { type: 'iconfont', class: 'icon-xinxi' },
        { type: 'el-icon', class: 'el-icon-chat-dot-round' },
        { type: 'iconfont', class: 'icon-shu' },
        { type: 'iconfont', class: 'icon-shandian' },
        { type: 'iconfont', class: 'icon-shezhi' },
      ],
      current: 0,
      imgUrl: require('@/assets/img/head_portrait.jpg')
    };
  },
  methods: {
    changeMenu(index) {
      switch (index) {
        case 0:
          this.$router.push({
            name: "ChatHome",
          }, () => {});
          break;
        case 1:
          this.$router.push({
            name: "GroupChat",
          }, () => {});
          break;
        case 2:
          this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        case 3:
          this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        case 4:
          this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
          break;
        default:
          this.$router.push({
            name: "ChatHome",
          });
      }

      this.current = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 90vh;
  position: relative;
  border-radius: 20px 0 0 20px;
  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);
    .menu-list {
      margin-left: 10px;

      li {
        margin: 40px 0 0 30px;
        list-style: none;
        cursor: pointer;
        position: relative;
        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          left: -40px;
          width: 6px;
          height: 25px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }
        &:hover {
          span, i {
            color: rgb(29, 144, 245);
          }
          .block {
            opacity: 1;
          }
        }
      }
    }
  }
  .own-pic {
    position: absolute;
    bottom: 10%;
    margin-left: 25px;
  }
}
.activeNav {
  span, i {
    color: rgb(29, 144, 245);
  }
  .block {
    opacity: 1 !important;
  }
}

.el-icon {
  font-size: 20px;
  color: #fff;
}
</style>