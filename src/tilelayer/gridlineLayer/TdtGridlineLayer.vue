<template><slot /></template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted } from "vue";
import { useMapRoot } from "../../use/mapRoot";
import { useEvent } from "../../use/event";
import { EVENTS, NATIVE_EVENTS, PROPS, useInit, useWatch } from "./use";

const props = defineProps(PROPS);
const emit = defineEmits(EVENTS);

let tdtComponent: T.GridlineLayer;
let tdtMap: T.Map;

onBeforeMount(async () => {
  tdtMap = await useMapRoot();
  tdtComponent = useInit(props);
  tdtMap.addLayer(tdtComponent);
  useEvent({ events: NATIVE_EVENTS, emit, instance: tdtComponent });
  useWatch({ props, instance: tdtComponent });
  emit("init", tdtComponent);
});

onUnmounted(() => tdtComponent && tdtMap?.removeLayer(tdtComponent));
</script>
