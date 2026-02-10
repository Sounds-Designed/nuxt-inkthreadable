export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2026-02-10',
  inkthreadable: {
    apiEnabled: true,
    debug: true,
  },
  runtimeConfig: { public: { inkthreadable: { debug: true } } },
})
