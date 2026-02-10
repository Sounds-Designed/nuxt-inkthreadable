import { sha1 } from 'js-sha1'
import logger from '../../utils/logger'

interface GetInkthreadableOrderCountOptions {
  baseURL: string
  debug: boolean
}

export default async (
  appId: string,
  secretKey: string,
  data: unknown,
  options?: Partial<GetInkthreadableOrderCountOptions>,
) => {
  const _defaults = { baseURL: 'https://www.inkthreadable.co.uk', debug: false }

  const { baseURL, debug } = options ? Object.assign({}, _defaults, options) : _defaults

  if (debug) logger.start('Creating Order')
  if (debug) logger.start('App ID: %s', appId)

  // Test data
  // const data = {
  //   brandName: "Inkthreadable",
  //   packing_slip: "https:\/\/drive.google.com\/uc?id=1eeZROApBIwfzRw89mVG_KuZa2coJS2BJ",
  //   comment: "Test order.",
  //   shipping_address: {
  //     firstName: "Alex",
  //     lastName: "Cunliffe",
  //     company: "Inkthreadable",
  //     address1: "Unit 501a",
  //     address2: "Glenfield Park Two",
  //     city: "Blackburn",
  //     county: "Lancashire",
  //     postcode: "BB1 5QH",
  //     country: "United Kingdom",
  //     phone1: "+44 (0)1254 777070",
  //   },
  //   shipping: { shippingMethod: "courier" },
  //   items: [
  //     {
  //       pn: "JH001-JBK-L",
  //       quantity: 4,
  //       retailPrice: 20,
  //       description: "",
  //       designs: {
  //         front:
  //           "https:\/\/www.inkthreadable.co.uk\/images\/pictures\/00-2023\/2023-assets\/core-images\/creator-(product).png?v=365913d1",
  //         back: "https:\/\/www.inkthreadable.co.uk\/images\/pictures\/00-2023\/2023-assets\/core-images\/creator-(product).png?v=365913d1",
  //       },
  //     },
  //   ],
  // };

  const body = JSON.stringify(data)

  if (debug) logger.info('Order Data:\n%o', data)

  const signature = sha1
    .create()
    .update(body + secretKey)
    .hex()

  if (debug) logger.info('Signature: %s', signature)

  return $fetch(`/api/orders.php`, {
    body: body,
    query: { AppId: appId, Signature: signature },
    baseURL: baseURL,
    mode: 'cors',
    method: 'POST',
    ignoreResponseError: true,
  }).then((res) => {
    if (debug) logger.success('Order Created')

    return res
  }).catch((error) => {
    logger.error(error)

    throw error
  })
}
