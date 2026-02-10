import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  if (config.public.inkthreadable.debug) {
    console.log('Inkthreadable plugin initialized successfully: \n%o', {
      appId: config.inkthreadable?.appId,
      secretKey: config.inkthreadable?.secretKey,
      debug: config.public.inkthreadable?.debug,
      enabled: config.public.inkthreadable?.enabled,
    })
  }
})
