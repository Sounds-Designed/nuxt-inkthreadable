import { sha1 } from 'js-sha1'
import logger from '../../utils/logger'

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

  try {
    /**
     * Fetch count from server.  Currently returns a 500 response but also contains
     * the count, so we need to ignore response errors for this request.
     */
    const count = await $fetch(`/api/orders/count.php`, {
      baseURL,
      query: { AppId: appId, Signature: signature, status: InkthreadableStatusType.REFUNDED },
      ignoreResponseError: true,
    })

    /**
     * If we're debug logging, return the order count
     */
    if (debug) logger.success('Order Count: %o', count)

    /**
     * Return count
     */
    return count
  }
  catch (err) {
    if (debug) logger.error(err)
    /**
     * If we somehow have an error, return a count of 0
     */
    return { count: 0 }
  }
}
