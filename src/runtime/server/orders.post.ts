import { readBody, useRuntimeConfig } from "#imports";
import { sha1 } from "js-sha1";

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();

  const requestBody = JSON.parse(await readBody(event));

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

  const body = JSON.stringify(requestBody);
  const signature = sha1
    .create()
    .update(body + config.inkthreadable.secretKey)
    .hex();

  const url = `https://www.inkthreadable.co.uk/api/orders.php?AppId=${config.inkthreadable.appId}&Signature=${signature}`;

  return $fetch(url, {
    body: body,
    mode: "cors",
    method: "POST",
    ignoreResponseError: true,
  });
});
