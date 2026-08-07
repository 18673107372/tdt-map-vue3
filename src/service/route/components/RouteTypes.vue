<template>
  <div class="route-types">
    <div
      v-for="[key, value] in routeTypesEntries"
      :key="key"
      class="route-types-item"
      :class="{ active: state.routeType == key }"
      @click="state.routeType = key"
    >
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useState } from "../use";
import "../styles/route-types.scss";

const state = useState();
const routeTypes = { 0: "驾车", 1: "公交", 2: "步行" };
const routeTypesEntries = computed(() =>
  Object.entries(routeTypes).map(([k, v]) => [Number(k), v] as [number, string])
);
</script>
