import { defineEventHandler, readBody, useRuntimeConfig } from '#imports'
import { deleteOrder } from '../utils'

export default defineEventHandler(async (event) => {
  const body = JSON.parse(await readBody(event))

  const config = useRuntimeConfig()

  const { inkthreadable } = config.public
  const { appId, secretKey } = config.inkthreadable

  if (inkthreadable.debug) console.log('Deleting order with ID: %s', body)

  return deleteOrder(appId, secretKey, body.orderId, inkthreadable)
})
