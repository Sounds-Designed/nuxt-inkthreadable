import { defineEventHandler, useRuntimeConfig } from '#imports'
import { getOrders } from '../utils'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const { inkthreadable } = config.public
  const { appId, secretKey } = config.inkthreadable

  return getOrders(appId, secretKey, inkthreadable)
})
