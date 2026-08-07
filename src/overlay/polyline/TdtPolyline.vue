<script setup lang="ts">
import { onBeforeMount, onUnmounted } from "vue";
import { useMapRoot } from "../../use/mapRoot";
import { useEvent } from "../../use/event";
import { NATIVE_EVENTS, PROPS, useInit, useWatch } from "./use";

const props = defineProps(PROPS as any);
const emit = defineEmits([
  "init",
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mouseout",
  "mouseover",
  "remove"
] as const);

onBeforeMount(async () => {
  onUnmounted(() => tdtComponent && tdtMap?.removeOverLay(tdtComponent));

  const tdtMap = await useMapRoot();
  const tdtComponent = useInit(props as any);
  tdtMap.addOverLay(tdtComponent);
  useEvent({ events: NATIVE_EVENTS, emit, instance: tdtComponent, extData: props.extData });
  useWatch({ props: props as any, instance: tdtComponent });
  emit("init", tdtComponent);
});
</script>

<template><slot /></template>
