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

    fetch("/api/_inkthreadable/orders", { method: "POST" });
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
