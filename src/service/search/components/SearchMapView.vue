<template>
  <div>
    <TdtMarker
      v-for="(marker, idx) in markers"
      :key="idx"
      :position="marker.position"
      @click="emit('poi-click', marker.extData)"
    />
    <TdtInfowindow
      :target="target"
      :content="content"
      :offset="[0, -30]"
      :min-width="150"
      @update:target="emit('update-target', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, watch } from "vue";
import { TdtMarker } from "~/overlay/marker";
import { TdtInfowindow } from "~/overlay/infowindow";
import { toLngLats, toLonLatNumberArray } from "~/utils/converter";
import { useMapRoot } from "~/use/mapRoot";
import type { LngLat } from "~/utils/types";

const props = withDefaults(
  defineProps<{
    /** 显示在地图上的点数组 */
    pois?: T.LocalSearchPoi[];
    /** 显示信息窗口的坐标 */
    target?: LngLat | null;
    /** 信息窗口的内容 */
    content?: string;
  }>(),
  {
    pois: () => [],
    target: null,
    content: ""
  }
);

const emit = defineEmits<{
  /** 点击地图上的标点触发 */
  "poi-click": [e: T.LocalSearchPoi];
  "update-target": [e: LngLat | null];
}>();

const markers = computed(() => {
  return props.pois.map(poi => ({
    position: toLonLatNumberArray(poi.lonlat),
    extData: poi
  }));
});

onBeforeMount(async () => {
  const tdtMap = await useMapRoot();

  watch(markers, () => {
    tdtMap?.setViewport(toLngLats(markers.value.map(e => e.position)));
  });
});
</script>
