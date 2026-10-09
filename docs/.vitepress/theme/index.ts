import type { Theme } from "vitepress";
import defaultTheme from "vitepress/theme";
import { install } from "~/install";
import components from "../components";
import "./custom.css";

export default {
  extends: defaultTheme,
  enhanceApp({ app }) {
    app.use(install, {
      v: "4.0",
      tk: "821dea15026e59e7a206977b250bdae1",
      plugins: ["D3", "CarTrack"]
    });
    app.use(components);
  }
} satisfies Theme;
