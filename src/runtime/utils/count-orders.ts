import { sha1 } from 'js-sha1'
import logger from './logger'

interface GetInkthreadableOrderCountOptions {
  baseURL: string
  debug: boolean
}

enum InkthreadableStatusType {
  RECEIVED = 'received',
  IN_PROGRESS = 'in progress',
  PAID = 'paid',
  REFUNDED = 'refunded',
  STOCK_ALLOCATION = 'stock allocation',
  PRINTING = 'printing',
  QUALITY_CONTROL = 'quality control',
  INTERNAL_ORDER_QUERY = 'internal order query',
}

export default async (appId: string, secretKey: string, options?: Partial<GetInkthreadableOrderCountOptions>) => {
  const _defaults = { baseURL: 'https://www.inkthreadable.co.uk', debug: false }

  const { baseURL, debug } = options ? Object.assign({}, _defaults, options) : _defaults

  if (debug) logger.start('Getting Order Count')

  /**
   * Create the URL body
   */
  const body = 'AppId=' + appId + '&status=' + InkthreadableStatusType.REFUNDED

  if (debug) logger.info('Query String: %s', body)

  /**
   * Create a SHA-1 instance
   */
  const signature = sha1(body + secretKey)

  if (debug) logger.info('Signature: %s', signature)

  return await $fetch(`/api/orders/count.php`, {
    baseURL,
    query: { AppId: appId, Signature: signature, status: InkthreadableStatusType.REFUNDED },
    ignoreResponseError: true,
  })
    .then((res) => {
      if (debug) logger.success('Order Count: %o', res)

      return res
    })
    .catch((error) => {
      throw createError(error)
    })
}
