import { useRuntimeConfig } from '#imports'
import getOrder from '../utils/get-order'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  /**
   * Get runtime config for App ID, Secret Key & debug flag
   */
  const config = useRuntimeConfig(event)

  const { appId, secretKey } = config.inkthreadable
  const { inkthreadable } = config.public

  return getOrder(appId, secretKey, id, inkthreadable)
})
