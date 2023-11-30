<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="transitionName" appear>
      <multi-tab-store-consumer>
        <component v-if="Component" :is="Component" :key="route.path"></component>
        <slot v-else />
      </multi-tab-store-consumer>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CustomRouterView'
})
import { computed } from 'vue'
import { injectMenuState } from 'lead-lib/hooks/useMenuState'
import { MultiTabStoreConsumer } from 'lead-lib/home/multi-tab'

const menuState = injectMenuState()
const transitionName = computed(() => menuState.transitionName.value)
</script>
