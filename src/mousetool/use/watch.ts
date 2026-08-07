import { watch } from "vue";
import type { Props } from "./";
import type { ToolInstances } from "../types";

export function useWatch({ props, instances }: { props: Props; instances: ToolInstances }) {
  watch(
    () => props.visible,
    val => {
      Object.values(instances).forEach(tool => {
        if (tool) {
          if (val) {
            tool.open();
          } else {
            tool.close();
          }
        }
      });
    },
    { immediate: true }
  );
}
