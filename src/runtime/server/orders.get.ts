import { useRuntimeConfig } from "#imports";
import { sha1 } from 'js-sha1';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const body = "AppId=" + config.inkthreadable.appId

  var hash = sha1.create().update(body + config.inkthreadable.secretKey);

  const signature = hash.hex()

  let orders: any[] = []

  const ordersReceived = async (response: Response) => {
    orders =  response.orders.filter(order => !order.order.deleted)
  }

  const url = "https://www.inkthreadable.co.uk/api/orders.php";
  const query = body + `&Signature=${signature}`
  const finalUrl = `${url}?${query}`

  await $fetch(finalUrl).then(res => {
    ordersReceived(res)
  }).catch(err => {
    console.log(err)
  })

  return orders
});
