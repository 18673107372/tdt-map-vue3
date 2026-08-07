<template><slot /></template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted } from "vue";
import type { ToolInstances } from "./types";
import { useMapRoot } from "../use/mapRoot";
import { EVENTS, PROPS, useEvent, useInit, useWatch } from "./use";

const props = defineProps(PROPS);
const emit = defineEmits(EVENTS);

let tdtComponent: ToolInstances;
let tdtMap: T.Map;

function open(toolName: keyof ToolInstances) {
  tdtComponent[toolName]?.open();
}

function close(toolName: keyof ToolInstances) {
  tdtComponent[toolName]?.close();
}

function clear(toolName: keyof ToolInstances) {
  try {
    tdtComponent[toolName]?.clear();
  } catch (e) {
    // 当图层中没有该类型的图形时会报错，可忽略
    console.error(e);
  }
}

function clearAll() {
  Object.keys(tdtComponent).forEach(toolName => {
    close(toolName as keyof ToolInstances);
    clear(toolName as keyof ToolInstances);
  });
}

defineExpose({ open, close, clear, clearAll });

onBeforeMount(async () => {
  tdtMap = await useMapRoot();
  tdtComponent = useInit(props, tdtMap);
  useEvent({ emit: emit as any, instances: tdtComponent });
  useWatch({ props, instances: tdtComponent });
  emit("init", tdtComponent);
});

onUnmounted(() => clearAll());
</script>
