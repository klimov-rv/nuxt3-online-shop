import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  routeRules: {
    "/": { prerender: true },
    "/products/**": { swr: 3600 },
    "/cart/**": { ssr: false },
    "/contacts/**": { ssr: true },
  },
  app: {
    head: {
      title: process.env.npm_package_name,
      htmlAttrs: {
        lang: "ru",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: process.env.npm_package_description,
        },
      ],
      link: [
        // { rel: "stylesheet", type: "text/css", href: "/css/vendor.min.css" },
        // { rel: "stylesheet", type: "text/css", href: "/css/app.min.css" },
        // { rel: "stylesheet", type: "text/css", href: "/css/layout-grid.css" },
        // { rel: "stylesheet", type: "text/css", href: "/css/editor.css" },
        // { rel: "stylesheet", type: "text/css", href: "/css/patch.css" },
      ],
      script: [
        // {
        //   src: "/js/vendor.min.js",
        //   type: "text/javascript",
        //   body: true,
        //   defer: true,
        // },
        // {
        //   src: "/js/app.min.js",
        //   type: "text/javascript",
        //   body: true,
        //   defer: true,
        // },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: process.env.NODE_ENV === "development" ? ["naive-ui"] : [],
    },
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? ["naive-ui", "vueuc", "@css-render/vue3-ssr"]
        : [],
  },
});
