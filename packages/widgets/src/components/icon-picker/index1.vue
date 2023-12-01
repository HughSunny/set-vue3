<template>
  <a-popover v-model:open="visible" :trigger="trigger">
    <template #title>
      <a-input-search
        v-model:value="searchValue"
        :placeholder="$t('sys.action.canInputKeywordSearch')"
        @change="filterIcon"
      />
    </template>

    <template #content>
      <div class="icon-box">
        <div
          v-for="(item, index) in iconArr"
          :key="index"
          class="icon-content"
          :style="{ background: icon === item ? '#268961' : '' }"
          @click="handleClick(item)"
        >
          <component :is="$antIcons[item]" />
        </div>
      </div>
    </template>
    <div v-if="icon" class="IconSelectLayout">
      <component :is="$antIcons[icon]" style="font-size: 20px" />
      <span style="font-size: 12px">{{ icon }}</span>
      <button style="border: 0; cursor: pointer" @click="handleDelete">
        <DeleteOutlined />
      </button>
    </div>
    <slot v-else name="iconSelect">
      <div class="IconSelectLayout"></div>
    </slot>
  </a-popover>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'IconPicker',
});
import { ref, watch } from 'vue';
import aIcons from './antd-icons.json';
const props = defineProps({
  icon: {},
  //自定义触发方式
  trigger: {
    type: String,
    default: 'click',
    validator: function (value) {
      return ['click', 'hover', 'focus'].indexOf(value) !== -1;
    },
  },
});
const emit = defineEmits(['update:icon', 'change']);
const iconArr = ref<string[]>(aIcons);
const visible = ref<boolean>(false);
const searchValue = ref('');

const handleClick = icon => {
  emit('update:icon', icon);
  emit('change', icon);
  visible.value = false;
};
const handleDelete = () => {
  emit('update:icon', null);
  emit('change', null);
  visible.value = false;
};

/**
 * 进行搜索过滤
 */
const filterIcon = () => {
  if (searchValue.value) {
    iconArr.value = aIcons.filter(item =>
      item.toLowerCase().includes(searchValue.value.toLowerCase()),
    );
  } else {
    iconArr.value = aIcons;
  }
};

watch(visible, () => {
  searchValue.value = '';
  iconArr.value = aIcons;
});
</script>

<style scoped>
.icon-box {
  overflow: auto;
  font-size: 20px;
  width: 450px;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  justify-content: center;
}

.icon-content {
  width: 45px;
  height: 40px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.icon-content:hover {
  background: #1890ff;
}

.IconSelectLayout {
  cursor: pointer;
  height: 40px;
  padding: 4px 11px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
