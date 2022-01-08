<template>
  <aside class="aside-wrapper">
    <div :class="{ 'nav-aside': true, collapse: collapsed }">
      <el-menu
        class="menu-vertical"
        background-color="#fff"
        text-color="#101010"
        active-text-color="#437BEE"
        :default-active="selectedMenu"
        :collapse-transition="false"
        :collapse="collapsed"
        @select="handleClickMenuItem"
      >
        <template v-for="item in menuList">
          <el-sub-menu
            class="sub-menu"
            v-if="item.children && item.children.length > 0"
            :index="item.componentName"
            :key="item.menuId"
          >
            <template #title>
              <i :class="['iconfont', 'sub-menu-icon', item.meta.icon]"> </i>
              <span class="sub-title">{{ item.menuName }}</span>
            </template>
            <el-menu-item v-for="el in item.children" :index="el.componentName" :key="el.menuId" class="menu-item">
              <i :class="['iconfont', el.icon]"></i>
              <template #title>{{ el.menuName }}</template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item class="menu-item" v-else :index="item.componentName" :key="item.menuId">
            <i :class="['iconfont', item.icon]"></i>
            <template class="nav-text" #title>{{ item.menuName }}</template>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="nav-foot">
        <div @click="toggleCollapse">
          <i :class="['iconfont', collapsed ? 'iconicon_expand' : 'iconicon_collapse']"></i>
        </div>
      </div>
    </div>
  </aside>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from 'vuex'
import { defineComponent, computed, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const store = useStore()
    const router = useRouter()
    const collapsed = ref(false)
    const reactiveData: any = reactive({
      route: useRoute()
    })
    const menuList = computed(() => store.state.appModule.menuList)
    const defaultActivedMenu = computed(() => {
      const firstChlid = menuList.value[0]?.children[0]?.componentName
      return firstChlid || '/'
    })
    const selectedMenu = computed(() => {
      const { route } = reactiveData
      return route.name || defaultActivedMenu
    })
    const toggleCollapse = () => {
      collapsed.value = !collapsed.value
    }
    const handleClickMenuItem = (name: string) => {
      router.push({ name })
    }
    return {
      selectedMenu,
      collapsed,
      toggleCollapse,
      menuList,
      handleClickMenuItem
    }
  }
})
</script>
<style lang="scss" scoped>
.aside-wrapper {
  flex-shrink: 0;
  overflow: hidden;
  .nav-aside {
    position: relative;
    height: 100%;
    width: 200px;
    padding-bottom: 40px;
    transition: width 0.2s ease-in-out;
    &.collapse {
      width: 64px;
      .menu-vertical .iconfont {
        font-size: 22px;
      }
      .game-text {
        font-size: 16px;
        .game-logo {
          width: 40px;
          height: 40px;
          border-radius: 5px;
          background-color: $fc-default;
          border: 1px $bg-info solid;
        }
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
    .select-wrap {
      width: 100%;
      height: 50px;
      padding: 5px 0;
      background-color: $aside-bg-color;
      ::v-deep(.el-input__inner) {
        .el-input__inner {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: $fc-default;
          padding-left: 40px;
          background-color: $aside-bg-color;
          border: none;
        }
        .game-icon {
          width: 30px;
          height: 30px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px $bg-info solid;
          background-color: $fc-default;
          vertical-align: middle;
        }
      }
    }
    .game-text {
      height: 50px;
      padding: 5px;
      line-height: 40px;
      color: $fc-light;
      font-weight: bold;
      background-color: $aside-foot-hover;
      text-align: center;
    }
  }
  .menu-vertical {
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
    border-right: none;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    ::v-deep(.el-submenu__title) {
      .el-submenu__title {
        background-color: $aside-first-menu !important;
        color: #101010 !important;
        font-size: 16px;
      }
    }
    .sub-menu-icon {
      color: $color-theme;
    }
    .iconoperation {
      font-size: 20px !important;
    }
    .menu-item:hover {
      background-color: $bg-white !important;
    }
    .menu-item.is-active {
      background-color: $aside-second-menu !important;
    }
    .nav-text {
      font-size: 15px;
    }
    .iconfont {
      display: inline-block;
      line-height: 1;
      margin-right: 5px;
      width: 24px;
      font-size: 18px;
      text-align: center;
      vertical-align: middle;
    }
  }
  .nav-foot {
    width: 100%;
    height: 40px;
    text-align: right;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid $aside-border-color;
    background-color: $aside-bg-color;
    .iconfont {
      text-align: center;
      width: 64px;
      height: 40px;
      padding: 3px 10px;
      color: $fc-collapse;
      cursor: pointer;
      font-size: 22px;
      vertical-align: middle;
      display: inline-block;
      &:hover {
        background-color: $aside-foot-hover;
      }
    }
  }
}
.select-dropdown {
  .el-select-dropdown__item {
    height: 42px;
    line-height: 42px;
    padding: 3px 10px;
  }
  .select-icon {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 3px;
    vertical-align: middle;
    background-color: $placeholder;
  }
  .select-label {
    display: inline-block;
    padding-left: 10px;
    vertical-align: middle;
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
