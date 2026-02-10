import { defineEventHandler, useRuntimeConfig } from "#imports";
import { sha1 } from 'js-sha1';
import { getOrders } from "../utils";

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();

  const { inkthreadable } = config.public;
  const { appId, secretKey } = config.inkthreadable;

  return getOrders(appId, secretKey, inkthreadable)
});
