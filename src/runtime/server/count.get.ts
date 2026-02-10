import { useRuntimeConfig } from '#imports'
import { getOrderCount } from '../utils'

export default defineEventHandler(async (event) => {
  /**
   * Get runtime config for App ID, Secret Key & debug flag
   */
  const config = useRuntimeConfig(event)

  const { appId, secretKey } = config.inkthreadable
  const { inkthreadable } = config.public

  return getOrderCount(appId, secretKey, inkthreadable)
})
