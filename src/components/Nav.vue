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
          <i v-if="item.elIcon" :class="item.icon"></i>
          <span v-else class="iconfont" :class="item.icon"></span>
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
        { icon: "icon-xinxi", route: "ChatHome", elIcon: false },
        { icon: "el-icon-s-custom", route: "GroupChat", elIcon: true },
        { icon: "icon-shu", route: "", elIcon: false },
        { icon: "icon-shandian", route: "", elIcon: false },
        { icon: "icon-shezhi", route: "", elIcon: false },
      ],
      current: 0,
      imgUrl: require('@/assets/img/head_portrait.jpg')
    };
  },
  methods: {
    changeMenu(index) {
      const menuItem = this.menuList[index];
      if (menuItem.route) {
        this.$router.push({
          name: menuItem.route,
        }, () => {});
      } else {
        this.$message("该功能还没有开发哦，敬请期待一下吧~🥳");
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
        i {
          font-size: 20px;
          color: #fff;
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
</style>