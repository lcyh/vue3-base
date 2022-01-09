<template>
  <div class="application">应用列表</div>
  <p>{{count}}</p>
  <el-button type="primary" size="small" @click="handleClick">添加</el-button>
  <el-icon :size='30'><add-location /></el-icon>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AddLocation } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'application',
  components: { AddLocation },
  setup () {
    const count = ref(0)
    const handleClick = () => {
      count.value++
    }
    return { handleClick, count }
  }
})
</script>
