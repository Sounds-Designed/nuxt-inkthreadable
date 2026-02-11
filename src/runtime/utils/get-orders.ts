import sha1 from 'js-sha1'

interface GetInkthreadableOrderCountOptions {
  baseURL: string
  debug: boolean
}

export default async (
  appId: string,
  secretKey: string,
  options?: Partial<GetInkthreadableOrderCountOptions>,
) => {
  const _defaults = { baseURL: 'https://www.inkthreadable.co.uk', debug: false }

  const { baseURL, debug } = options ? Object.assign({}, _defaults, options) : _defaults

  if (debug) console.log('Getting Orders')

  const body = 'limit=200&since_id=2046940&AppId=' + appId

  const signature = sha1.sha1(body + secretKey)

  let orders: unknown[] = []

  const ordersReceived = async (response: unknown[]) => {
    console.log(response)
    orders = response.filter(order => !order.deleted)
  }

  const url = `${baseURL}/api/orders.php`
  const query = body + `&Signature=${signature}`
  const finalUrl = `${url}?${query}`

  await $fetch(finalUrl).then((res) => {
    console.log(res.orders)
    ordersReceived(res.orders.map(order => order.order))

    return Promise.resolve(res.orders)
  }).catch((err) => {
    console.log(err)
  })

  console.log(orders.length)

  return orders
}
