<script setup lang="ts">
  const getOrder = (orderId: string | number) => {
    console.log("Getting Order: %s", orderId);
  };

  const getOrderCount = () => {
    console.log("Getting Order Count");

    fetch("/api/_inkthreadable/orders/count");
  };

  const getOrders = () => {
    console.log("Getting Orders");

    fetch("/api/_inkthreadable/orders");
  };

  const submitOrder = () => {
    console.log("Submitting Order");

    fetch("/api/_inkthreadable/orders", {
      method: "POST",
      body: JSON.stringify({
        brandName: "Sounds Designed",
        comment: "Test order.",
        shipping_address: {
          firstName: "Alex",
          lastName: "Scott",
          company: "Sounds Designed",
          address1: "37 Slatey Road",
          address2: "",
          city: "Oxton",
          county: "Merseyside",
          postcode: "CH43 4UE",
          country: "United Kingdom",
          phone2: "+44 (0)7368 113827",
        },
        shipping: { shippingMethod: "courier" },
        items: [
          {
            pn: "JH001",
            quantity: 1,
            retailPrice: 50,
            description: "Please print as large as posible",
            label: { type: "printed", name: "system-1 top gal" },
            designs: {
              front: "http://animalfair.com/wp-content/uploads/2014/06/little_cute_cat_1920x1080.jpg",
              back: "http://data3.whicdn.com/images/168204223/large.jpg",
            },
          },
        ],
      }),
    });
  };

  const deleteOrder = (orderId: string | number) => {
    console.log("Deleting Order: %s", orderId);
  };

  const orders = Array.from(new Array(5), (item, idx) => {
    return { id: idx + 1 };
  });
</script>

<template>
  <div>
    <h1>Orders</h1>

    <button @click="getOrderCount">Get Order Count</button>
    <button @click="getOrders">Get Orders</button>
    <button @click="submitOrder">Submit Order</button>

    <div>
      <div
        v-for="order in orders"
        :key="order.id">
        <pre>
          <code>
{{ order }}
          </code>
        </pre>
        <NuxtLink :to="{ name: `order-id`, params: { id: order.id } }">View Order</NuxtLink>
        <button @click="() => getOrder(order.id)">Get Order</button>
        <button @click="() => deleteOrder(order.id)">Delete Order</button>
      </div>
    </div>
  </div>
</template>
