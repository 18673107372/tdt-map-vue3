<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useMapRoot } from "../../use/mapRoot";
import { useEvent } from "../../use/event";
import { NATIVE_EVENTS, PROPS, useInit, useWatch } from "./use";

const props = defineProps(PROPS as any);
const emit = defineEmits(["init", "close", "open", "clickclose", "update:target"] as const);

const contentEl = ref<HTMLElement | null>(null);

onMounted(async () => {
  onUnmounted(() => tdtMap?.closeInfoWindow());

  const content = contentEl.value || undefined;
  const tdtMap = await useMapRoot();
  const tdtComponent = useInit(props as any, content);
  useEvent({
    events: NATIVE_EVENTS,
    emit,
    instance: tdtComponent,
    emitted(event: string) {
      if (event === "close") {
        emit("update:target", null);
      }
    }
  });
  useWatch({ props: props as any, instance: tdtComponent, map: tdtMap });
  emit("init", tdtComponent);
});
</script>

<template>
  <div
    ref="contentEl"
    class="tdt-infowindow-custom"
    :style="{
      minWidth: props.minWidth + 'px',
      maxWidth: props.maxWidth + 'px',
      maxHeight: props.maxHeight ? props.maxHeight + 'px' : undefined,
      display: props.target ? 'block' : 'none'
    }"
  >
    <slot />
  </div>
</template>
