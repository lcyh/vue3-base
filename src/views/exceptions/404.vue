<template>
  <div class="container">
    <div class="wrapper">
      <div class="error">
        <img class="error-img" src="@/assets/images/404.svg" alt="" />
      </div>
      <div class="forbid-box">
        <h1 class="forbid-title">404</h1>
        <p class="forbid-tips">抱歉，你访问的页面不存在</p>
        <el-button type="primary" @click="onClick">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()
    const onClick = () => {
      router.go(-1)
    }
    return {
      onClick
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  .wrapper {
    text-align: center;
    padding-top: 10%;
    margin: 0 auto;
    .error {
      display: inline-block;
      vertical-align: middle;
      .error-img {
        width: 400px;
      }
    }
    .forbid-box {
      margin-left: 30px;
      text-align: left;
      display: inline-block;
      vertical-align: middle;
    }
    .forbid-title {
      margin-bottom: 24px;
      color: #515a6e;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }
    .forbid-tips {
      margin-bottom: 16px;
      color: #808695;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
