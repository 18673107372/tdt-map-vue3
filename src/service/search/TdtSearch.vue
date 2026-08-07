<template>
  <div class="tdt-search" @mousewheel.stop @click="onClick" @mousemove="onMousemove">
    <!-- 路线模式 -->
    <template v-if="state.showRoute">
      <TdtRoute />
      <i class="tdt-search-route__close" @click="state.showRoute = false">
        <IconClose />
      </i>
    </template>
    <!-- 搜索模式 -->
    <template v-else>
      <SearchBox v-model="state.keyword" :placeholder="placeholder" @search="onSearch(1, $event)">
        <button v-if="searchBtn" class="tdt-search-box__btn" @click="onSearch(1)">
          <IconSearch />
        </button>
        <button v-if="routeBtn" class="tdt-search-box__btn" @click="state.showRoute = true">
          <IconRoute />
        </button>
      </SearchBox>
      <SearchSuggests :suggests="state.suggests || []" @suggest-click="onSuggestClick" />
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
      <SearchMapView
        :pois="state.pois || []"
        v-model:target="state.target"
        :content="state.content"
        @poi-click="onPoiClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useMapRoot } from "~/use/mapRoot";
import { useMethods, useState } from "./use";
import { IconClose, IconRoute, IconSearch } from "./components/icons";
import SearchBox from "./components/SearchBox.vue";
import SearchSuggests from "./components/SearchSuggests.vue";
import SearchPois from "./components/SearchPois.vue";
import SearchMapView from "./components/SearchMapView.vue";
import TdtRoute from "../route/TdtRoute.vue";
import "./styles/tdt-search.scss";
import "../../styles/tdt-icon.scss";

withDefaults(
  defineProps<{
    placeholder?: string;
    searchBtn?: boolean;
    routeBtn?: boolean;
  }>(),
  {
    placeholder: "输入关键字搜索",
    searchBtn: true,
    routeBtn: true
  }
);

const emit = defineEmits<{
  "poi-click": [poi: T.LocalSearchPoi];
  "suggest-click": [suggest: T.LocalSearchSuggest];
  "search-complete": [result: T.LocalSearchResult];
}>();

const state = useState();
const { onSearchComplete, onPoiClick, onSuggestClick, onSearch, onPageChange } = useMethods(state, emit);

onBeforeMount(async () => {
  state.tdtMap = await useMapRoot();
  state.localSearch = new T.LocalSearch(state.tdtMap, {
    pageCapacity: 10,
    onSearchComplete
  });
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
