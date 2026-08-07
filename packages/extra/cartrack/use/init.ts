import { toLngLats } from "~/utils/converter";
import type { Emit, Props } from ".";

export function useInit(props: Props, emit: Emit, map: T.Map) {
  const {
    interval,
    speed,
    dynamicLine,
    Datas,
    carstyle,
    polylinestyle,
    arrowStyle,
    passedLineColor,
    notPassedLineColor,
    loop
  } = props;
  return new (window as any).T.CarTrack(map, {
    interval,
    speed,
    dynamicLine,
    Datas: toLngLats(Datas),
    carstyle,
    polylinestyle,
    arrowStyle,
    passedLineColor,
    notPassedLineColor,
    loop,
    passOneNode: (lnglat: any, index: any, length: any) => {
      emit("passOneNode", [lnglat.lng, lnglat.lat], index, length);
    }
  });
}
