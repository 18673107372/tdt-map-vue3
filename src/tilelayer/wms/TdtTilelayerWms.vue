<template><slot /></template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted, useAttrs } from "vue";
import { useMapRoot } from "../../use/mapRoot";
import { useEvent } from "../../use/event";
import { EVENTS, NATIVE_EVENTS, PROPS, useInit, useWatch } from "./use";

const props = defineProps(PROPS);
const emit = defineEmits(EVENTS);
const attrs = useAttrs();

let tdtComponent: T.TileLayer.WMS;
let tdtMap: T.Map;

onBeforeMount(async () => {
  tdtMap = await useMapRoot();
  tdtComponent = useInit(props, attrs);
  tdtMap.addLayer(tdtComponent);
  useEvent({ events: NATIVE_EVENTS, emit, instance: tdtComponent });
  useWatch({ props, instance: tdtComponent });
  emit("init", tdtComponent);
});

onUnmounted(() => tdtComponent && tdtMap?.removeLayer(tdtComponent));
</script>
