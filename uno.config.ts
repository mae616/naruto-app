import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerAttributifyJsx,
} from "unocss";

export default defineConfig({
  shortcuts: {
    container: "w-full",
  },
  presets: [presetAttributify(), presetUno()],
  transformers: [transformerAttributifyJsx()],
});
