export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: { public: { inkthreadable: { apiEnabled: true, debug: true } } },
  compatibilityDate: '2026-02-10',
  inkthreadable: {
    debug: true,
  },
})
