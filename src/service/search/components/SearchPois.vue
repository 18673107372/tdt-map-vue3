<template>
  <div class="tdt-search-pois" :style="{ display: pois.length ? 'block' : 'none' }">
    <!-- 点信息 -->
    <div v-for="item in pois" :key="item.name" class="search-pois-item" @click="emit('poi-click', item)">
      <strong class="search-pois-item__name">{{ item.name }}</strong>
      <br />
      <span class="search-pois-item__address">{{ item.address }}</span>
    </div>
    <!-- 分页 -->
    <SearchPage v-if="page" v-model:current="pageCurrent" :size="page.size" :total="page.total" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SearchPage from "./SearchPage.vue";
import "../styles/search-pois.scss";

export interface PageProps {
  current?: number;
  size?: number;
  total?: number;
}

const props = withDefaults(
  defineProps<{
    /** 搜索点数组 */
    pois?: T.LocalSearchPoi[];
    /** 分页配置 */
    page?: PageProps;
  }>(),
  {
    pois: () => []
  }
);

const emit = defineEmits<{
  /** 点击搜索结果项触发 */
  "poi-click": [e: T.LocalSearchPoi];
  "update:page": [e: PageProps];
}>();

const pageCurrent = computed({
  get() {
    return props.page?.current ?? 1;
  },
  set(val: number) {
    let current = val;
    const pageCount = Math.ceil(Number(props.page?.total ?? 0) / Number(props.page?.size ?? 10));
    if (val < 1) current = 1;
    if (val > pageCount) current = pageCount;
    emit("update:page", { ...(props.page || {}), current });
  }
});
</script>
