<template>
  <div class="group-card" :class="{ activeCard: groupInfo.id == current }">
    <div class="info">
      <HeadPortrait :imgUrl="groupInfo.headImg"></HeadPortrait>
      <div class="info-detail">
        <div class="name">{{ groupInfo.name }}</div>
        <div class="detail">{{ groupInfo.lastMsg }}</div>
      </div>
      <div class="member-count">
        <span class="iconfont icon-ren"></span>
        <span>{{ groupInfo.memberCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import HeadPortrait from "./HeadPortrait.vue";

export default {
  props: {
    groupInfo: {
      type: Object,
      default: () => ({})
    },
    pcCurrent: {
      type: String,
      default: ''
    }
  },
  components: {
    HeadPortrait,
  },
  data() {
    return {
      current: '',
    }
  },
  watch: {
    pcCurrent: function() {
      this.isActive()
    }
  },
  methods: {
    isActive() {
      this.current = this.pcCurrent
    }
  }
};
</script>

<style lang="scss" scoped>
.group-card {
  width: 250px;
  height: 80px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    align-items: center;
    .info-detail {
      margin-left: 15px;
      flex: 1;
      min-width: 0;
      .name {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .detail {
        color: #5c6675;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    }
    .member-count {
      display: flex;
      align-items: center;
      color: #5c6675;
      font-size: 12px;
      margin-left: 10px;
      span {
        margin-left: 3px;
      }
    }
  }
  &:hover {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
      .member-count {
        color: #fff;
      }
    }
  }
}
.activeCard {
  background-color: #1d90f5;
  transition: 0.3s;
  box-shadow: 3px 2px 10px 0px rgba(0, 136, 255);
  .info {
    .info-detail {
      .detail {
        color: #fff;
      }
    }
    .member-count {
      color: #fff;
    }
  }
}
</style>
