import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createOrder, deleteOrder, getOrderCount, getOrders } from './utils'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  if (!(config && config.inkthreadable)) return

  const { appId, secretKey } = config.inkthreadable
  const { inkthreadable } = config.public

  return {
    provide: {
      createOrder: (data: unknown) => createOrder(appId, secretKey, data, inkthreadable),
      deleteOrder: (orderId: string | number) => deleteOrder(appId, secretKey, orderId, inkthreadable),
      getOrderCount: () => getOrderCount(appId, secretKey, inkthreadable),
      getOrders: () => getOrders(appId, secretKey),
    },
  }
})
