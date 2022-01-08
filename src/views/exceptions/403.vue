<template>
  <div class="container">
    <div class="wrapper">
      <div class="error">
        <img class="forbid-img" src="@/assets/images/403.png" alt="" />
      </div>
      <div class="forbid-box">
        <p class="forbid-tips">抱歉，你无权访问该页面</p>
        <el-button type="primary" @click="onClick">返回登录</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Redirect from '@/utils/redirect'

export default defineComponent({
  setup () {
    const onClick = () => {
      window.location.href = Redirect.loginUrl
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
      .forbid-img {
        width: 500px;
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
