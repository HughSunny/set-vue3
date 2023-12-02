<template>
  <div>
    <div>{{ `GridPanel'${props.name || nameValue}'页面,敬请期待...` }}</div>
    <a-button type="primary" v-has:systemButton001 @click="handleClick">添加001</a-button>
    <a-button v-has:systemButton002>编辑003</a-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'GridPanel',
});
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();
const props = defineProps({
  name: String,
});
const nameValue = route.params.name;
const emit = defineEmits(['']);

const title = computed(() => route.meta?.title);
const handleClick = () => {
  router.push('/grid-panel1/111');
};
</script>

<style lang="less" scoped></style>
