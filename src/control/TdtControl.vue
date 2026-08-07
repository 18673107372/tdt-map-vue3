<template>
  <div class="tdt-control-custom">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useEvent } from "../use/event";
import { useMapRoot } from "../use/mapRoot";
import { EVENTS, NATIVE_EVENTS, PROPS, useInit, useWatch } from "./use";

const props = defineProps(PROPS);
const emit = defineEmits(EVENTS);

const controlRef = ref<HTMLElement>();

let tdtComponent: T.Control;
let tdtMap: T.Map;

onMounted(async () => {
  tdtMap = await useMapRoot();
  tdtComponent = useInit(props);
  tdtComponent.onAdd = () => controlRef.value as HTMLElement;
  tdtComponent.onRemove = () => {};
  tdtMap.addControl(tdtComponent);
  useEvent({ events: NATIVE_EVENTS, emit, instance: tdtComponent });
  useWatch({ props, instance: tdtComponent });
  emit("init", tdtComponent);
});

onUnmounted(() => tdtComponent && tdtMap?.removeControl(tdtComponent));
</script>
