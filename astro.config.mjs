import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: "https://apps.akai.org.pl",
  experimental: {
    env: {
      schema: {
        GH_API_TOKEN: envField.string({
          context: "server",
          access: "secret",
        }),
      },
    },
  },
});
