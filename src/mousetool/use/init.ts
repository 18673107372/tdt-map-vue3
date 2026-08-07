import type { Props } from "./";
import type { ToolInstances } from "../types";

export function useInit(props: Props, tdtMap: T.Map): ToolInstances {
  const { visible } = props;
  const tools: ToolInstances = {
    markTool: new T.MarkTool(tdtMap),
    polygonTool: new T.PolygonTool(tdtMap),
    polylineTool: new T.PolylineTool(tdtMap),
    rectangleTool: new T.RectangleTool(tdtMap),
    circleTool: new T.CircleTool(tdtMap),
    paintBrushTool: new T.PaintBrushTool(tdtMap)
  };

  Object.values(tools).forEach(tool => {
    if (tool) {
      if (!visible) tool.close();
    }
  });

  return tools;
}
