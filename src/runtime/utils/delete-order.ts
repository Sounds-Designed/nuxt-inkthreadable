import { sha1 } from "js-sha1";

interface GetInkthreadableOrderCountOptions {
  baseURL: string;
  debug: boolean;
}

enum InkthreadableStatusType {
  RECEIVED = "received",
  IN_PROGRESS = "in progress",
  PAID = "paid",
  REFUNDED = "refunded",
  STOCK_ALLOCATION = "stock allocation",
  PRINTING = "printing",
  QUALITY_CONTROL = "quality control",
  INTERNAL_ORDER_QUERY = "internal order query",
}

export default async (
  appId: string,
  secretKey: string,
  orderId: string | number,
  options?: Partial<GetInkthreadableOrderCountOptions>,
) => {
  const _defaults = { baseURL: "https://inkthreadable.co.uk", debug: false };

  const { baseURL, debug } = options ? Object.assign({}, _defaults, options) : _defaults;

  if (debug) console.log("Deleting order with ID: %s", orderId);

  const params = `AppId=${appId}&id=${orderId}`;

  const hash = sha1.create().update(params + secretKey);

  const signature = hash.hex();

  const url = `${baseURL}/api/orders.php`;
  const query = `AppId=${appId}&Signature=${signature}&id=${orderId}`;
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

  return await $fetch(finalUrl, requestOptions);
};
