import { defineEventHandler, readBody, useRuntimeConfig } from "#imports";
import { sha1 } from "js-sha1";

export default defineEventHandler(async event => {
  const body = JSON.parse(await readBody(event));

  const config = useRuntimeConfig();

  const { debug } = config.public.inkthreadable;

  if (debug) console.log("Delting order with ID: %s", body.orderId);

  const params = `AppId=${config.inkthreadable.appId}&id=${body.orderId}`;

  const hash = sha1.create().update(params + config.inkthreadable.secretKey);

  const signature = hash.hex();

  const url = `https://www.inkthreadable.co.uk/api/orders.php`;
  const query = `AppId=${config.inkthreadable.appId}&Signature=${signature}&id=${body.orderId}`;
  const finalUrl = `${url}?${query}`;

  const requestOptions: { [key: string]: any } = { method: "DELETE" };

  if (debug) {
    requestOptions.onRequest = (request: unknown) => {
      console.log("Request: %o", request);
    };
    requestOptions.onResponsse = (response: unknown) => {
      console.log("Response: %o", response);
    };
    requestOptions.onRequestError = (request: unknown) => {
      console.log("Request Error: %o", request);
    };
    requestOptions.onResponsseError = (response: unknown) => {
      console.log("Response Error: %o", response);
    };
  }

  return await $fetch(finalUrl, requestOptions).catch(err => {
    const response = new Response("Couldn't delete order", { status: 400 });

    event.respondWith(response);
  });
});
