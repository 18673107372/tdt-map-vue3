import type { LngLat } from "~/utils/types";

export interface SearchState {
  tdtMap: T.Map | null;
  localSearch: T.LocalSearch | null;
  startKeyword: string;
  startMarker: LngLat | null;
  endKeyword: string;
  endMarker: LngLat | null;
  routeType: number;
  poiType: "start" | "end";
  pois: T.LocalSearchPoi[];
  current: number;
  total: number;
}

export interface DrivingState {
  drivingRoute: T.DrivingRoute | null;
  drivingLines: LngLat[][];
  drivingPolicy: number;
  drivingPlans: any[];
  drivingPlanIndex: number;
}

export interface TransitState {
  transitRoute: T.TransitRoute | null;
  transitPlans: any[];
  transitPlanIndex: number;
  transitPolicy: number;
  walkLines: LngLat[][];
  busLines: LngLat[][];
  busMarkers: LngLat[];
  metroMarkers: LngLat[];
}

export type RouteState = SearchState & DrivingState & TransitState;
