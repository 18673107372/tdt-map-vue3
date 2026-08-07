import type { DefineEmits, DefineProps } from "~/utils/types";
import type { ToolInstances } from "../types";

export const PROPS = {
  /** 是否可见 */
  visible: { type: Boolean, default: true }
};

export const EVENTS = {
  init: (_instances: ToolInstances) => true
};

export type Props = DefineProps<typeof PROPS>;
export type Emit = DefineEmits<typeof EVENTS>;
