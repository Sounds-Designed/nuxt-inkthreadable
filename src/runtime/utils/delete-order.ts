import sha1 from 'js-sha1'

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

  if (debug) console.log('Deleting order with ID: %s', orderId)

  const params = `AppId=${appId}&id=${orderId}`

  const signature = sha1.sha1(params + secretKey)

  const url = `${baseURL}/api/orders.php`
  const query = `AppId=${appId}&Signature=${signature}&id=${orderId}`
  const finalUrl = `${url}?${query}`

  const requestOptions: { [key: string]: unknown } = { method: 'DELETE' }

  if (debug) {
    requestOptions.onRequest = (request: unknown) => {
      console.log('Request: %o', request)
    }
    requestOptions.onResponsse = (response: unknown) => {
      console.log('Response: %o', response)
    }
    requestOptions.onRequestError = (request: unknown) => {
      console.log('Request Error: %o', request)
    }
    requestOptions.onResponsseError = (response: unknown) => {
      console.log('Response Error: %o', response)
    }
  }

  return await $fetch(finalUrl, requestOptions)
}
