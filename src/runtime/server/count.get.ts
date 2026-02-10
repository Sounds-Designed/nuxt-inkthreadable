import { useRuntimeConfig } from "#imports";
import { sha1 } from "js-sha1";

export default defineEventHandler(async () => {
  /**
   * Get runtime config for App ID, Secret Key & debug flag
   */
  const config = useRuntimeConfig();

  /**
   * Destructure the debug flag as it's used many times
   */
  const { debug } = config.public.inkthreadable;

  if (debug) console.log("Getting Order Count");

  /**
   * Create the URL body
   */
  const body = "AppId=" + config.inkthreadable.appId;

  /**
   * Create a SHA-1 instance
   */
  const hash = sha1.create();

  /**
   * Uppdate the hasher with the contents of our request body + our secret key
   */
  hash.update(body + config.inkthreadable.secretKey);

  /**
   * Create the signature by reading our hashers value as a string
   */
  const signature = hash.toString();

  try {
    /**
     * Fetch count from server.  Currently returns a 500 response but also contains
     * the count, so we need to ignore response errors for this request.
     */
    const count = await $fetch(`https://inkthreadable.co.uk/api/orders/count.php?` + body + `&Signature=${signature}`, {
      ignoreResponseError: true,
    });

    /**
     * If we're debug logging, return the order count
     */
    if (debug) console.log("Order Count: %o", count);

    /**
     * Return count
     */
    return count;
  } catch (err) {
    if (debug) console.error(err);
    /**
     * If we somehow have an error, return a count of 0
     */
    return { count: 0 };
  }
});
