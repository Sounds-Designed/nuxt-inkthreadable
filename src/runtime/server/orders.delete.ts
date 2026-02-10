import { defineEventHandler, readBody, useRuntimeConfig } from "#imports";
import { deleteOrder } from "../utils";

export default defineEventHandler(async event => {
  const body = JSON.parse(await readBody(event));

  const config = useRuntimeConfig();

  const { inkthreadable } = config.public;
  const { appId, secretKey } = config.inkthreadable;

  if (inkthreadable.debug) console.log("Delting order with ID: %s", body.orderId);

  return deleteOrder(appId, secretKey, body.orderId, inkthreadable);
});
