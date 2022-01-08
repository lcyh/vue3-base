<template>
  <header class="header">
    <div class="logo-wrap">
      <router-link class="link" to="/">
        <i class="iconfont iconbilibili"></i>
        <p class="logo-text">Vue3后台</p>
      </router-link>
    </div>
    <div class="header-right">
      <el-dropdown class="dropdown-wrap" @command="handleCommand">
        <span class="el-dropdown-link">
          <img
            class="user-avatar"
            src="@/assets/images/bili.png"
            alt=""
          />
          <span class="user-name">{{ userInfo.userName }}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userInfo = computed(() => store.state.appModule.userInfo)
    const handleCommand = (key: string) => {
      if (key === 'logout') {
        store.dispatch('appModule/setLogout')
        router.push(`/login?redirect=${route.fullPath}`).catch((err) => {
          console.warn(err)
        })
      }
    }
    return {
      handleCommand,
      userInfo
    }
  }
})
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  height: 60px;
  line-height: 40px;
  background-color: $header-bg-color;
  z-index: 1;
  .logo-wrap {
    float: left;
    padding: 10px;
    width: 200px;
    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $fc-dark;
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
    }
    .iconbilibili {
      font-size: 28px;
      font-weight: 300;
      color: $logo-color;
    }
    .logo-picture {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .logo-text {
      position: relative;
      padding-left: 10px;
      color: $fc-light;
    }
  }
  .header-right {
    float: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 15px;
    width: 200px;
    height: 100%;
    .dropdown-wrap {
      color: $fc-light;
      cursor: pointer;
      vertical-align: middle;
    }
    .user-avatar {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      border-radius: 50%;
    }
    .user-name {
      padding: 0 5px;
    }
    .dropdown-img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      vertical-align: middle;
    }
  }
}
</style>
