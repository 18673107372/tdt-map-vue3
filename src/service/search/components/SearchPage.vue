<template>
  <div class="tdt-search-page">
    <span class="tdt-search-page__btn first-page" @click="pageCurrent = 1">«</span>
    <span class="tdt-search-page__btn prev-page" @click="pageCurrent--">‹</span>
    <span>{{ pageCurrent }}</span>
    <span> / </span>
    <span>{{ pageCount }}</span>
    <span class="tdt-search-page__btn next-page" @click="pageCurrent++">›</span>
    <span class="tdt-search-page__btn last-page" @click="pageCurrent = pageCount">»</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "../styles/search-page.scss";

const props = withDefaults(
  defineProps<{
    /** 当前页码 */
    current?: number;
    /** 每页条数 */
    size?: number;
    /** 总条数 */
    total?: number;
  }>(),
  {
    current: 1,
    size: 10,
    total: 0
  }
);

const emit = defineEmits<{
  "update:current": [e: number];
}>();

// 总页数
const pageCount = computed(() => {
  return Math.ceil(Number(props.total) / Number(props.size));
});

const pageCurrent = computed({
  get() {
    return props.current;
  },
  set(val: number) {
    let current = val;
    if (val < 1) current = 1;
    if (val > pageCount.value) current = pageCount.value;
    emit("update:current", current);
  }
});
</script>
