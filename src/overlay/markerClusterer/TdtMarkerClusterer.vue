<script setup lang="ts">
import { onBeforeMount, onUnmounted } from "vue";
import { useMapRoot } from "../../use/mapRoot";
import { useEvent } from "../../use/event";
import { NATIVE_EVENTS, PROPS, useInit, useWatch } from "./use";

const props = defineProps(PROPS as any);
const emit = defineEmits([
  "init",
  "click",
  "clusterclick",
  "dblclick",
  "mousedown",
  "mouseup",
  "mouseout",
  "mouseover",
  "dragstart",
  "drag",
  "dragend",
  "remove"
] as const);

onBeforeMount(async () => {
  onUnmounted(() => tdtComponent?.clearMarkers());

  const tdtMap = await useMapRoot();
  const tdtComponent = useInit(props as any, tdtMap);
  useEvent({ events: NATIVE_EVENTS, emit, instance: tdtComponent });
  useWatch({ props: props as any, instance: tdtComponent });
  emit("init", tdtComponent);
});
</script>

<template><slot /></template>
