<template>
  <span>
    <!-- 起点 -->
    <TdtMarker
      v-if="state.startMarker?.length"
      :position="state.startMarker"
      :icon="{
        iconUrl: startPng,
        iconSize: [44, 34],
        iconAnchor: [12, 31]
      }"
    />
    <!-- 终点 -->
    <TdtMarker
      v-if="state.endMarker?.length"
      :position="state.endMarker"
      :icon="{
        iconUrl: endPng,
        iconSize: [44, 34],
        iconAnchor: [12, 31]
      }"
    />
    <!-- 驾车线 -->
    <TdtPolyline
      v-for="(path, idx) in state.drivingLines"
      :key="'driving-' + idx"
      :path="path"
      color="#2C64A7"
      line-style="solid"
      :weight="5"
      :opacity="1"
    />
    <!-- 步行及换乘线 -->
    <TdtPolyline
      v-for="(path, idx) in state.walkLines"
      :key="'walk-' + idx"
      :path="path"
      color="#2E9531"
      line-style="dashed"
      :weight="4"
      :opacity="1"
    />
    <!-- 公交及地铁线 -->
    <TdtPolyline
      v-for="(path, idx) in state.busLines"
      :key="'bus-' + idx"
      :path="path"
      color="#2C64A7"
      line-style="solid"
      :weight="4"
      :opacity="1"
    />
    <!-- 公交站点 -->
    <TdtMarker
      v-for="(position, idx) in state.busMarkers"
      :key="'bus-marker-' + idx"
      :position="position"
      :icon="{
        iconUrl: mapBusPng,
        iconSize: [23, 23],
        iconAnchor: [12, 12]
      }"
    />
    <!-- 地铁站点 -->
    <TdtMarker
      v-for="(position, idx) in state.metroMarkers"
      :key="'metro-marker-' + idx"
      :position="position"
      :icon="{
        iconUrl: mapMetroPng,
        iconSize: [23, 23],
        iconAnchor: [12, 12]
      }"
    />
  </span>
</template>

<script setup lang="ts">
import { TdtMarker } from "~/overlay/marker";
import { TdtPolyline } from "~/overlay/polyline";
import { useState } from "../use";
import startPng from "../styles/start.png";
import endPng from "../styles/end.png";
import mapBusPng from "../styles/map_bus.png";
import mapMetroPng from "../styles/map_metro.png";

const state = useState();
</script>
