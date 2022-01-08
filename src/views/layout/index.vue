<template>
  <div class="container-fulled">
    <Header />
    <section class="content">
      <NavSide />
      <main class="main">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './Header.vue'
import NavSide from './NavSide.vue'

export default defineComponent({
  name: 'layout',
  components: { Header, NavSide },
  // beforeRouteEnter (to, from, next) {
  //   console.log('beforeRouteEnter')
  //   next()
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('beforeRouteUpdate')
  //   next()
  // },
  setup () {
    // return {};
  }
})
</script>
<style lang="scss" scoped>
.container-fulled {
  display: flex;
  flex-direction: column;
  background-color: $bg-light;
  min-width: 1420px;
  min-height: 100vh;
  .content {
    position: relative;
    width: 100%;
    flex: auto;
    overflow: hidden;
    display: flex;
    .main {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
