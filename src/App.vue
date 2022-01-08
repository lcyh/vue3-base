<template>
  <div id="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
@import './assets/iconfont/iconfont.css';
@import './assets/styles/common.scss';

#app-container {
  width: 100%;
  min-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
