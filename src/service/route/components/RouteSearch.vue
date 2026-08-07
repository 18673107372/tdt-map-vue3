<template>
  <div class="route-search">
    <!-- 起点搜索框 -->
    <SearchBox
      v-model="state.startKeyword"
      placeholder="请输入起点"
      @focus="state.poiType = 'start'"
      @search="onSearch(1, $event, 'start')"
    />
    <!-- 终点搜索框 -->
    <SearchBox
      v-model="state.endKeyword"
      placeholder="请输入终点"
      @focus="state.poiType = 'end'"
      @search="onSearch(1, $event, 'end')"
    />
    <!-- 搜索点 -->
    <SearchPois
      :pois="state.pois || []"
      :page="{
        current: state.current,
        size: 10,
        total: state.total
      }"
      @poi-click="onPoiClick"
      @update:page="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import SearchBox from "~/service/search/components/SearchBox.vue";
import SearchPois from "~/service/search/components/SearchPois.vue";
import { useMethods, useState } from "../use";

const state = useState();
const { onSearch, onPoiClick, onPageChange } = useMethods(state);
</script>
