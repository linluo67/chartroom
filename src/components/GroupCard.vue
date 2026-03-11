<template>
  <div class="group-card" :class="{ activeCard: groupInfo.id == current }">
    <div class="info">
      <div class="group-avatar">
        <i class="el-icon-s-custom"></i>
      </div>
      <div class="info-detail">
        <div class="name">{{ groupInfo.name }}</div>
        <div class="detail">{{ groupInfo.lastMsg }}</div>
      </div>
    </div>
    <div class="member-count">
      <span>{{ groupInfo.memberCount }}人</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupCard',
  props: {
    groupInfo: {
      type: Object,
      default: () => ({})
    },
    gcCurrent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      current: ''
    }
  },
  watch: {
    gcCurrent: function() {
      this.isActive()
    }
  },
  methods: {
    isActive() {
      this.current = this.gcCurrent
    }
  }
}
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
    width: 80%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    align-items: center;
    .group-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid rgb(255, 255, 255);
      background-color: rgb(29, 144, 245);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      i {
        font-size: 24px;
        color: #fff;
      }
    }
    .info-detail {
      margin-top: 5px;
      margin-left: 20px;
      flex: 1;
      overflow: hidden;
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
  }
  .member-count {
    position: absolute;
    right: 15px;
    bottom: 10px;
    font-size: 12px;
    color: #5c6675;
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
    }
    .member-count {
      color: #fff;
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
    }
    .member-count {
      color: #fff;
    }
}
</style>
