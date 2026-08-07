import type { ToolEvents } from "../types";

/** 为天地图鼠标工具组件实例添加事件监听 */
export function useEvent({
  emit,
  instances
}: {
  emit: (event: keyof ToolEvents, ...args: any[]) => void;
  instances: Record<string, any>;
}) {
  Object.values(instances).forEach((instance: any) => {
    if (instance && typeof instance.addEventListener === "function") {
      const toolType = Object.keys(instances).find(k => instances[k] === instance);
      const eventMap: Record<string, string[]> = {
        markTool: ["mouseup"],
        polygonTool: ["draw", "addpoint"],
        polylineTool: ["draw", "addpoint"],
        rectangleTool: ["draw"],
        circleTool: ["draw", "drawend"],
        paintBrushTool: []
      };
      const events = toolType ? eventMap[toolType] || [] : [];
      events.forEach((event: string) => {
        instance.addEventListener(event, (e: any) => {
          let eventName: keyof ToolEvents = event as keyof ToolEvents;
          if (toolType === "markTool") {
            eventName = "mark-mouseup";
          } else if (toolType === "polygonTool") {
            eventName = event === "draw" ? "polygon-draw" : "polygon-addpoint";
          } else if (toolType === "polylineTool") {
            eventName = event === "draw" ? "polyline-draw" : "polyline-addpoint";
          } else if (toolType === "rectangleTool") {
            eventName = "rectangle-draw";
          } else if (toolType === "circleTool") {
            eventName = event === "drawend" ? "circle-drawend" : "circle-draw";
          }
          emit(eventName, e);
        });
      });
    }
  });
}
