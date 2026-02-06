<template>
  <div>
    Nuxt Inkthreadable playground!

    <button @click="getOrderCount">Get Order Count</button>
    <button @click="getOrders">Get Orders</button>
    <button @click="submitOrder">Submit Order</button>

    <div>
      <div v-for="order in orders" :key="order.id">
        <pre>
          <code>
{{ order }}
          </code>
        </pre>
        <button @click="() => getOrder(order.id)">Get Order</button>
        <button @click="() => deleteOrder(order.id)">Delete Order</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const getOrder = (orderId: string | number) => {
  console.log("Getting Order: %s", orderId)
}

const getOrderCount = () => {
  console.log("Getting Order Count")
}

const getOrders = () => {
  console.log("Getting Orders")
}

const submitOrder = () => {
  console.log("Submitting Order")
}

const deleteOrder = (orderId: string | number) => {
  console.log("Deleting Order: %s", orderId)
}

const orders = Array.from(new Array(5), (item, idx) => {
  return {
    id: idx + 1
  }
})
</script>
