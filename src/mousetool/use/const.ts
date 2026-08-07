import type { DefineEmits, DefineProps } from "~/utils/types";

export const PROPS = {
  /** 是否可见 */
  visible: { type: Boolean, default: true }
};

export const EVENTS = {
  init: () => true
};

export type Props = DefineProps<typeof PROPS>;
export type Emit = DefineEmits<typeof EVENTS>;
