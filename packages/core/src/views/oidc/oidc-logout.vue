<template>
  <div></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@core/store/user'
defineOptions({
  name: 'oidcLogout'
})

const router = useRouter()
const userStore = useUserStore()
onMounted(async () => {
   await userStore.logoutAndJump(false)
  // 自动跳转到登录
  // router.push('/login')
})
</script>
