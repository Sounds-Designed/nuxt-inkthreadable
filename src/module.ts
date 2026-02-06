import { addPlugin, addServerHandler, createResolver, defineNuxtModule } from "@nuxt/kit";
import { defu } from "defu";
import type { ModuleOptions } from "nuxt/schema";

// Module options TypeScript interface definition
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InkthreadableOptions extends ModuleOptions {
  appId: string;
  debug?: boolean;
  enabled?: boolean;
  secretKey: string;
}

export default defineNuxtModule<InkthreadableOptions>({
  meta: { name: "@sounds-designed/nuxt-inkthreadable", configKey: "inkthreadable" },
  // Default configuration options of the Nuxt module
  defaults: { appId: "", debug: false, enabled: true, secretKey: "" },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    if (_options.enabled) {
      _nuxt.options.runtimeConfig.inkthreadable = defu(_nuxt.options.runtimeConfig.inkthreadable, {
        appId: _options.appId,
        secretKey: _options.secretKey,
      });

      _nuxt.options.runtimeConfig.public.inkthreadable = defu(_nuxt.options.runtimeConfig.public.inkthreadable, {
        debug: _options.debug,
        enabled: _options.enabled,
      });

      // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
      addPlugin(resolver.resolve("./runtime/plugin"));

    }
  },
});
