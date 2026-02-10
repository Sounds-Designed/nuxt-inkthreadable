<script setup lang="ts">
  const order = ref({});

  const getOrder = () => {
    console.log("Getting Orders");

    const route = useRoute();

    fetch(`/api/_inkthreadable/order/${route.params.id}`).then(async res => {
      order.value = await res.json();
    });
  };

  const route = useRoute();

  const deleteOrder = async (orderId: string | number) => {
    console.log("Deleting Order: %s", orderId);
    await fetch(`/api/_inkthreadable/orders`, { method: "DELETE", body: JSON.stringify({ orderId: route.params.id }) });

    navigateTo({ name: "orders" });
  };

  onMounted(() => {
    getOrder();
  });
</script>

<template>
  <div>
    <h1>Order</h1>

    <div>
      <div :key="order.id">
        <button @click="() => getOrder(order.id)">Get Order</button>
        <button @click="() => deleteOrder(order.id)">Delete Order</button>
      </div>
    </div>
  </div>
</template>
