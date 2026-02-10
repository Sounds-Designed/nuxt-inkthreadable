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
  options?: Partial<GetInkthreadableOrderCountOptions>,
) => {
  const _defaults = { baseURL: "https://inkthreadable.co.uk", debug: false };

  const { baseURL, debug } = options ? Object.assign({}, _defaults, options) : _defaults;

  if (debug) console.log("Getting Order Count");

  /**
   * Create the URL body
   */
  const body = "AppId=" + appId + "&status=" + InkthreadableStatusType.REFUNDED;
  console.log(body)
  /**
   * Create a SHA-1 instance
   */
  const hash = sha1.create();

  /**
   * Uppdate the hasher with the contents of our request body + our secret key
   */
  hash.update(body + secretKey);

  /**
   * Create the signature by reading our hashers value as a string
   */
  const signature = hash.toString();

  try {
    /**
     * Fetch count from server.  Currently returns a 500 response but also contains
     * the count, so we need to ignore response errors for this request.
     */
    const count = await $fetch(`${baseURL}/api/orders/count.php?` + body + `&Signature=${signature}`, {
      ignoreResponseError: true,
    });

    /**
     * If we're debug logging, return the order count
     */
    if (debug) console.log("Order Count: %o", count);

    /**
     * Return count
     */
    return count
  } catch (err) {
    if (debug) console.error(err);
    /**
     * If we somehow have an error, return a count of 0
     */
    return { count: 0 };
  }
};
