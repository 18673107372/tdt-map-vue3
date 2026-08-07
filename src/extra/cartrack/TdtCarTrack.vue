<script setup lang="ts">
import { onBeforeMount, onUnmounted, watch } from "vue";
import { useMapRoot } from "../../use/mapRoot";
import { EVENTS, PROPS, useInit } from "./use";

const props = defineProps(PROPS);
const emit = defineEmits(EVENTS);

let tdtComponent: any | null = null;

onBeforeMount(async () => {
  const tdtMap = await useMapRoot();

  watch(
    () => props.Datas,
    val => {
      tdtComponent?.clear();
      tdtComponent = null;
      if (!val.length) return;
      tdtComponent = useInit(props, emit, tdtMap);
      emit("init", tdtComponent);
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  tdtComponent?.clear();
});

function start() {
  tdtComponent?.start();
}

function pause() {
  tdtComponent?.pause();
}

function stop() {
  tdtComponent?.stop();
}

function clear() {
  tdtComponent?.clear();
}

defineExpose({ start, pause, stop, clear });
</script>

<template><slot /></template>
