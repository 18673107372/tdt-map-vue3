<template>
  <div class="tdt-map-container" style="width: 100%; height: 100%">
    <div ref="mapContainerRef" class="tdt-map" :id="mid" style="width: 100%; height: 100%" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import mitt from "mitt";
import { onMounted, provide, ref } from "vue";
import type { MapEvents } from "../utils/emitter";
import { useApiLoader } from "../use/apiLoader";
import { useEvent } from "../use/event";
import { EVENTS, NATIVE_EVENTS, PROPS, useControls, useInit, useWatch } from "./use";

const props = defineProps(PROPS);
const emit = defineEmits(EVENTS);

const tdtMap = ref<T.Map>();
const mapContainerRef = ref<HTMLElement>();
const mapEmitter = mitt<MapEvents>();
provide("mapRoot", tdtMap);
provide("mapEmitter", mapEmitter);

onMounted(async () => {
  await useApiLoader(props.loadConfig);
  tdtMap.value = useInit(props, mapContainerRef.value as HTMLElement);
  useEvent({ events: NATIVE_EVENTS, emit, instance: tdtMap.value });
  useWatch({ props, instance: tdtMap.value });
  useControls(props, tdtMap.value, emit);
  emit("init", tdtMap.value);
  mapEmitter.emit("mapInit", tdtMap.value);
});
</script>
