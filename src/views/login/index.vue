<!--
 * @Author: changluo
 * @Description:登录
-->
<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          ref="userNameRef"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <el-input
          :key="passwordType"
          ref="passwordRef"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter="handleLogin"
        />
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defineComponent,
  onMounted,
  reactive,
  watch,
  ref,
  nextTick,
  toRefs
} from 'vue'
import { useRoute, LocationQuery, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { isValidUsername } from '@/utils/shared'

export default defineComponent({
  components: {},
  setup () {
    const userNameRef = ref(null)
    const passwordRef = ref(null)
    const loginFormRef = ref(null)
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ validator: userNameRef, trigger: 'blur' }],
        password: [{ validator: passwordRef, trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      redirect: '',
      otherQuery: {}
    })

    const methods = reactive({
      validateUsername: (
        rule: any,
        value: string,
        callback: (p?: any) => void
      ) => {
        if (!isValidUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      },
      validatePassword: (
        rule: any,
        value: string,
        callback: (p?: any) => void
      ) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      },
      showPwd: () => {
        if (state.passwordType === 'password') {
          state.passwordType = ''
        } else {
          state.passwordType = 'password'
        }
        nextTick(() => {
          (passwordRef.value as any).focus()
        })
      },
      handleLogin: () => {
        (loginFormRef.value as any).validate(async (valid: boolean) => {
          if (valid) {
            state.loading = true
            await store.dispatch('appModule/setLogin', state.loginForm)
            router
              .push({
                path: state.redirect || '/',
                query: state.otherQuery
              })
              .catch((err) => {
                console.warn(err)
              })
            // Just to simulate the time of the request
            setTimeout(() => {
              state.loading = false
            }, 0.5 * 1000)
          } else {
            return false
          }
        })
      }
    })

    function getOtherQuery (query: LocationQuery) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {} as LocationQuery)
    }

    watch(
      () => route.query,
      (query) => {
        if (query) {
          state.redirect = query.redirect?.toString() ?? ''
          state.otherQuery = getOtherQuery(query)
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      if (state.loginForm.username === '') {
        (userNameRef.value as any).focus()
      } else if (state.loginForm.password === '') {
        (passwordRef.value as any).focus()
      }
    })

    return {
      userNameRef,
      passwordRef,
      loginFormRef,
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
// @supports是CSS3新引入的规则之一，主要用于检测当前浏览器是否支持某个CSS属性并加载具体样式.
// 改变输入框 光标颜色
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
