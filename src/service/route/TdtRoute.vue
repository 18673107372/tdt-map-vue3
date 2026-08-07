<template>
  <div class="tdt-route" @mousewheel.stop @click="onClick" @mousemove="onMousemove">
    <RouteTypes />
    <RouteSearch />
    <RoutePolicies />
    <RoutePlans />
    <RouteMapView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, provide } from "vue";
import { useInit, useState, useWatch } from "./use";
import RouteMapView from "./components/RouteMapView.vue";
import RoutePlans from "./components/RoutePlans.vue";
import RoutePolicies from "./components/RoutePolicies.vue";
import RouteSearch from "./components/RouteSearch.vue";
import RouteTypes from "./components/RouteTypes.vue";
import "../../styles/tdt-icon.scss";
import "./styles/tdt-route.scss";

const state = useState();
provide("routeState", state);

onBeforeMount(async () => {
  await useInit(state);
  useWatch(state);
});

// 解决地图的滚动冒泡和点击及双击冒泡
function onClick(e: Event) {
  e.stopPropagation();
  if (state.tdtMap?.isDoubleClickZoom()) {
    state.tdtMap?.disableDoubleClickZoom();
    setTimeout(() => state.tdtMap?.enableDoubleClickZoom(), 300);
  }
}

function onMousemove(e: Event) {
  e.stopPropagation();
  if (state.tdtMap?.isDrag()) {
    state.tdtMap?.disableDrag();
    setTimeout(() => state.tdtMap?.enableDrag(), 300);
  }
}
</script>
