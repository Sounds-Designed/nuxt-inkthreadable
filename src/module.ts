import { addPlugin, addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ModuleOptions } from 'nuxt/schema'

// Module options TypeScript interface definition

export interface InkthreadableOptions extends ModuleOptions {
  apiEnabled?: boolean
  apiPrefix?: string
  appId?: string
  baseURL?: string
  debug?: boolean
  enabled?: boolean
  secretKey: string
}

export default defineNuxtModule<InkthreadableOptions>({
  meta: { name: '@sounds-designed/nuxt-inkthreadable', configKey: 'inkthreadable' },
  // Default configuration options of the Nuxt module
  defaults: {
    apiEnabled: false,
    apiPrefix: '_inkthreadable',
    appId: '',
    baseURL: 'https://www.inkthreadable.co.uk',
    debug: false,
    enabled: true,
    secretKey: '',
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    if (_options.enabled) {
      _nuxt.options.runtimeConfig.inkthreadable = defu(_nuxt.options.runtimeConfig.inkthreadable, {
        appId: _options.appId,
        secretKey: _options.secretKey,
      })

      _nuxt.options.runtimeConfig.public.inkthreadable = defu(_nuxt.options.runtimeConfig.public.inkthreadable, {
        apiEnabled: _options.apiEnabled,
        apiPrefix: _options.apiPrefix,
        baseURL: _options.baseURL,
        debug: _options.debug,
        enabled: _options.enabled,
      })

      // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
      addPlugin(resolver.resolve('./runtime/plugin'))

      const _apiPrefix = _nuxt.options.runtimeConfig.public.inkthreadable.apiPrefix ? _nuxt.options.runtimeConfig.public.inkthreadable.apiPrefix + '/' : ''

      if (_nuxt.options.runtimeConfig.public.inkthreadable.apiEnabled) {
        console.log('API Enabled')
        addServerHandler({
          route: `/api/${_apiPrefix}orders/count`,
          handler: resolver.resolve('./runtime/server/count.get'),
        })

        addServerHandler({
          route: `/api/${_apiPrefix}orders`,
          method: 'get',
          handler: resolver.resolve('./runtime/server/orders.get'),
        })

        addServerHandler({
          route: `/api/${_apiPrefix}orders`,
          method: 'delete',
          handler: resolver.resolve('./runtime/server/orders.delete'),
        })

        addServerHandler({
          route: `/api/${_apiPrefix}orders`,
          method: 'post',
          handler: resolver.resolve('./runtime/server/orders.post'),
        })
      }
    }
  },
})
