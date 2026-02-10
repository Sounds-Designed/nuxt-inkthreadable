import { sha1 } from 'js-sha1'
import logger from "../../utils/logger"

interface GetInkthreadableOrderCountOptions {
  baseURL: string
  debug: boolean
}

export default async (
  appId: string,
  secretKey: string,
  orderId: string | number,
  options?: Partial<GetInkthreadableOrderCountOptions>,
) => {
  const _defaults = { baseURL: 'https://www.inkthreadable.co.uk', debug: false }

  const { baseURL, debug } = options ? Object.assign({}, _defaults, options) : _defaults

  if (debug) logger.start('Getting Order')

  const body = `AppId=${appId}&id=${orderId}`

  const hash = sha1.create().update(body + secretKey)

  const signature = hash.hex()

  if (debug) logger.info('Signature: %s', signature)

  const url = `${baseURL}/api/order.php`
  const query = body + `&Signature=${signature}`
  const finalUrl = `${url}?${query}`

  return $fetch(finalUrl)
}
