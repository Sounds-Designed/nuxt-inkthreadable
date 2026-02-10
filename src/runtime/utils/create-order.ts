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
  data: unknown,
  options?: Partial<GetInkthreadableOrderCountOptions>,
) => {
  const _defaults = { baseURL: "https://inkthreadable.co.uk", debug: false };

  const { baseURL, debug } = options ? Object.assign({}, _defaults, options) : _defaults;

  if (debug) console.log("Getting Order Count");

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

  const body = JSON.stringify(data);
  const signature = sha1
    .create()
    .update(body + secretKey)
    .hex();

  const url = `https://www.inkthreadable.co.uk/api/orders.php?AppId=${appId}&Signature=${signature}`;

  return $fetch(url, {
    body: body,
    mode: "cors",
    method: "POST",
    ignoreResponseError: true,
  });
};
