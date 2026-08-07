<template>
  <div class="route-plans">
    <!-- 驾车方案 -->
    <template v-if="state.drivingPlans.length">
      <div v-for="(plan, planIndex) in state.drivingPlans" :key="'driving-' + planIndex">
        <details @click="state.drivingPlanIndex = planIndex">
          <summary>方案{{ planIndex + 1 }}: {{ plan.duration }} 秒 | {{ plan.distance }} 公里</summary>
          <div v-for="(item, itemIndex) in plan.routes.item" :key="itemIndex">
            {{ itemIndex + 1 }}.{{ item.strguide }}
          </div>
        </details>
      </div>
    </template>
    <!-- 公交方案 -->
    <template v-if="state.transitPlans.length">
      <div v-for="(plan, planIndex) in state.transitPlans" :key="'transit-' + planIndex">
        <details @click="state.transitPlanIndex = planIndex" style="background-color: #fff">
          <summary>方案{{ planIndex + 1 }}: {{ plan.lineName }}</summary>
          {{ transitPlanText(plan) }}
        </details>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useState } from "../use";
import "../styles/route-plans.scss";

const state = useState();

function transitPlanText(plan: any): string {
  return (
    plan.segments
      .map((segment: any) => {
        const segmentLine = segment.segmentLine[0];

        // 经过的公交或地铁的站数
        const stationCount = segmentLine.segmentStationCount ? "，经过" + segmentLine.segmentStationCount + "站" : "";

        switch (segment.segmentType) {
          case 1:
            return "步行约" + segmentLine.segmentDistance + "米，到达" + segment.stationEnd.name;
          case 2:
          case 3:
            return "乘坐" + segmentLine.direction + stationCount + "，到达" + segment.stationEnd.name;
          case 4:
            return "站内换乘";
          default:
            return "";
        }
      })
      .join("，") + "终点"
  );
}
</script>
