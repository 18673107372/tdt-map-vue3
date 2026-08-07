<template>
  <div class="map-container">
    <button @click="openTool('markTool')">标点</button>
    <button @click="showPlayTrack = true">插入轨迹</button>
    <button @click="playCarTrack()">播放</button>
    <TdtMap
      :center="state.center"
      :controls="['Zoom', 'MapType']"
      :load-config="{ tk: '821dea15026e59e7a206977b250bdae1', plugins: ['D3', 'CarTrack'] }"
      :zoom="state.zoom"
    >
      <TdtMarker
        v-for="marker in state.markers"
        :key="marker.name"
        :ext-data="marker.name"
        :position="marker.position"
        @click="openInfoWindow"
      ></TdtMarker>
      <TdtLabel :position="state.center" text="123"></TdtLabel>
      <TdtPolyline :path="state.polylinePath" ext-data="polyline" @click="openInfoWindow"></TdtPolyline>
      <TdtPolygon :path="state.polygonPath" ext-data="polygon" @click="openInfoWindow"></TdtPolygon>
      <TdtRectangle :bounds="state.bounds" ext-data="rectangle" @click="openInfoWindow"></TdtRectangle>
      <TdtCircle
        ref="circleRef"
        :center="state.center"
        :radius="1000"
        ext-data="circle"
        @click="openInfoWindow"
      ></TdtCircle>
      <TdtInfowindow
        v-model:target="state.infowindow.target"
        :close-on-click="true"
        :content="state.infowindow.content"
      ></TdtInfowindow>
      <TdtMousetool ref="mousetoolRef" :mark-tool="{ follow: true }"></TdtMousetool>
      <TdtControl position="topleft">
        <TdtSearch></TdtSearch>
      </TdtControl>
      <TdtCarTrack
        v-if="showPlayTrack"
        ref="carTrackRef"
        :interval="1000"
        :speed="100"
        :Datas="state.tracks"
      ></TdtCarTrack>
    </TdtMap>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  TdtCarTrack,
  TdtCircle,
  TdtControl,
  TdtInfowindow,
  TdtLabel,
  TdtMap,
  TdtMarker,
  TdtMousetool,
  TdtPolygon,
  TdtPolyline,
  TdtRectangle,
  TdtSearch
} from "~/index";
import type { LngLat, LngLats } from "~/utils/types";

export default defineComponent({
  components: {
    TdtMap,
    TdtMarker,
    TdtLabel,
    TdtPolyline,
    TdtPolygon,
    TdtRectangle,
    TdtCircle,
    TdtCarTrack,
    TdtInfowindow,
    TdtMousetool,
    TdtControl,
    TdtSearch
  },
  setup() {
    const state = reactive({
      center: [113.280637, 23.125178] as LngLat,
      zoom: 12,
      polylinePath: [
        [113.280637, 23.125178],
        [113.290637, 23.135178]
      ] as LngLats,
      polygonPath: [
        [113.280637, 23.125178],
        [113.290637, 23.125178],
        [113.290637, 23.115178],
        [113.280637, 23.115178]
      ] as LngLats,
      tracks: [
        [113.580637, 23.125178],
        [113.590637, 23.125178],
        [113.590637, 23.115178],
        [113.580637, 23.115178]
      ] as LngLats,
      bounds: [
        [113.280637, 23.125178],
        [113.270637, 23.115178]
      ],
      markers: [
        { name: "marker1", position: [113.280637, 23.125178] as LngLat },
        { name: "marker2", position: [113.290637, 23.125178] as LngLat },
        { name: "marker3", position: [113.290637, 23.115178] as LngLat },
        { name: "marker4", position: [113.280637, 23.115178] as LngLat }
      ],
      infowindow: {
        target: null as any,
        content: ""
      },
      keyword: ""
    });

    function openInfoWindow(e: any) {
      state.infowindow.target = e.target;
      state.infowindow.content = e.extData;
    }

    const mousetoolRef = ref();

    function openTool(toolName: string) {
      mousetoolRef.value?.open(toolName);
    }

    const carTrackRef = ref();
    const showPlayTrack = ref(false);

    function playCarTrack() {
      carTrackRef.value.start();
    }

    return {
      state,
      mousetoolRef,
      carTrackRef,
      showPlayTrack,
      openInfoWindow,
      openTool,
      playCarTrack
    };
  }
});
</script>

<style>
.map-container {
  width: 1920px;
  height: 1080px;
}
</style>
