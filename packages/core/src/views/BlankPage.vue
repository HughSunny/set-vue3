<template>
  <div>{{ `'${title}'页面,敬请期待...` }}</div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BlankPage'
})
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
const props = defineProps({
  foo: String
})
const emit = defineEmits([''])

const router = useRouter()
const route = useRoute()
const title = computed(() => route.meta?.title)
</script>

<style lang="less" scoped></style>
