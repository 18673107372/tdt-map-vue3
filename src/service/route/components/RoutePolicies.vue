<template>
  <div class="route-policies">
    <!-- 驾车策略 -->
    <template v-if="state.routeType === 0">
      <div
        v-for="[key, value] in drivingPoliciesEntries"
        :key="key"
        class="route-policies-item"
        :class="{ active: state.drivingPolicy == key }"
        @click="state.drivingPolicy = key"
      >
        {{ value }}
      </div>
    </template>
    <!-- 公交策略 -->
    <template v-if="state.routeType === 1">
      <div
        v-for="[key, value] in transitPoliciesEntries"
        :key="key"
        class="route-policies-item"
        :class="{ active: state.transitPolicy == key }"
        @click="state.transitPolicy = key"
      >
        {{ value }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useState } from "../use";
import "../styles/route-policies.scss";

const state = useState();
const drivingPolicies = { 0: "最少时间", 1: "最短距离", 2: "避开高速" };
const transitPolicies = { 1: "最少时间", 2: "最少换乘", 4: "最少步行", 8: "不乘地铁" };

const drivingPoliciesEntries = computed(() =>
  Object.entries(drivingPolicies).map(([k, v]) => [Number(k), v] as [number, string])
);
const transitPoliciesEntries = computed(() =>
  Object.entries(transitPolicies).map(([k, v]) => [Number(k), v] as [number, string])
);
</script>
