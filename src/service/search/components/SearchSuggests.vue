<template>
  <div class="tdt-search-suggests" :style="{ display: suggests.length ? 'block' : 'none' }">
    <div v-for="item in suggests" :key="item.name" class="search-suggests-item" @click="emit('suggest-click', item)">
      <span class="search-suggests-item__name">{{ item.name }}</span>
      <span class="search-suggests-item__address">{{ item.address }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../styles/search-suggests.scss";

withDefaults(
  defineProps<{
    /** 搜索建议数组 */
    suggests?: T.LocalSearchSuggest[];
  }>(),
  {
    suggests: () => []
  }
);

const emit = defineEmits<{
  /** 点击搜索建议项 */
  "suggest-click": [e: T.LocalSearchSuggest];
}>();
</script>
