export const DEFAULT_CONFIG = {
  v: "4.0",
  tk: "",
  plugins: [],
  plusDomain: "https://lbs.tianditu.gov.cn"
};

export const PLUGINS_URL = {
  D3: ["https://cdn.bootcss.com/d3/3.5.17/d3.min.js", "/api/js4.0/opensource/openlibrary/D3SvgOverlay.js"],
  CarTrack: [
    "https://cdn.bootcss.com/d3/3.5.17/d3.js",
    "/api/js4.0/opensource/openlibrary/D3SvgOverlay.js",
    "/api/js4.0/opensource/openlibrary/CarTrack.js"
  ],
  HeatmapOverlay: ["/api/js4.0/opensource/openlibrary/HeatmapOverlay.min.js"],
  BufferTool: ["https://cdn.bootcss.com/Turf.js/3.0.14/turf.js", "/api/js4.0/opensource/openlibrary/BufferTool.min.js"],
  ImageOverLayer: ["/api/js4.0/opensource/openlibrary/ImageOverlay.min.js"]
};

export interface LoadConfig {
  v?: string;
  tk?: string;
  plugins?: (keyof typeof PLUGINS_URL)[];
}

let isLoading = false;
export async function useApiLoader(config: LoadConfig = {}) {
  if (isLoading) {
    return new Promise(resolve => {
      setTimeout(() => resolve(useApiLoader(config)));
    });
  } else if (globalThis.T) {
    return;
  } else {
    isLoading = true;
    const { v, tk, plugins, plusDomain } = { ...DEFAULT_CONFIG, ...config };
    await loadScript(`https://api.tianditu.gov.cn/api?v=${v}&tk=${tk}`);
    await Promise.all(
      plugins
        .map((name: keyof typeof PLUGINS_URL) => PLUGINS_URL[name])
        .flat()
        .map(url => {
          //url是否完整
          if (url.indexOf("http") < 0) url = plusDomain + url;
          loadScript(url);
        })
    );
    isLoading = false;
  }
}

function loadScript(url: string) {
  return new Promise<void>(resolve => {
    const script = globalThis.document?.createElement("script");
    if (!script) resolve();
    script.src = url;
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    globalThis.document?.body.appendChild(script);
  });
}
