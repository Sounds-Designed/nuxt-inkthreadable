import { sha1 } from 'js-sha1'

interface GetInkthreadableOrderCountOptions {
  baseURL: string
  debug: boolean
}

export default async (
  appId: string,
  secretKey: string,
  options?: Partial<GetInkthreadableOrderCountOptions>,
) => {
  const _defaults = { baseURL: 'https://inkthreadable.co.uk', debug: false }

  const { baseURL, debug } = options ? Object.assign({}, _defaults, options) : _defaults

  if (debug) console.log('Getting Orders')

  const body = 'AppId=' + appId

  const hash = sha1.create().update(body + secretKey)

  const signature = hash.hex()

  let orders: unknown[] = []

  const ordersReceived = async (response: unknown) => {
    orders = response.orders.filter(order => !order.order.deleted)
  }

  const url = `${baseURL}/api/orders.php`
  const query = body + `&Signature=${signature}`
  const finalUrl = `${url}?${query}`

  await $fetch(finalUrl).then((res) => {
    ordersReceived(res)
  }).catch((err) => {
    console.log(err)
  })

  return orders
}
