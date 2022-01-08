/*
 * @Author: changluo
 * @Description:模板文件
 */
// template.ts
module.exports = {
  vueTemplate: (compoenntName) => `<template>
  <div class="${compoenntName}">${compoenntName}组件</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '${compoenntName}',
  components: {},
  setup() {}
})
</script>
<style lang="scss" scoped>
.${compoenntName} {}
</style>
`,
  entryTemplate: `import Main from './main.vue'
export default Main`
}
