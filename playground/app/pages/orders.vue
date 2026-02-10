<script setup lang="ts">
// eslint-disable no-useless-escape
const getOrder = (orderId: string | number) => {
  console.log('Getting Order: %s', orderId)
}

const getOrderCount = () => {
  console.log('Getting Order Count')

  fetch('/api/_inkthreadable/orders/count')
}

const orders = ref([])

const getOrders = () => {
  console.log('Getting Orders')

  fetch('/api/_inkthreadable/orders').then(async (res) => {
    orders.value = (await res.json()).map(i => i.order)
  })
}

const submitOrder = () => {
  console.log('Submitting Order')

  fetch('/api/_inkthreadable/orders', {
    method: 'POST',
    body: JSON.stringify({
      brandName: 'Sounds Designed',
      comment: 'Test order.',
      packing_slip: 'https:\/\/drive.google.com\/uc?id=1eeZROApBIwfzRw89mVG_KuZa2coJS2BJ',
      shipping_address: {
        firstName: 'Alex',
        lastName: 'Scott',
        company: 'Sounds Designed',
        address1: '37 Slatey Road',
        address2: '',
        city: 'Oxton',
        county: 'Merseyside',
        postcode: 'CH43 4UE',
        country: 'United Kingdom',
        phone2: '+44 (0)7368 113827',
      },
      shipping: { shippingMethod: 'courier' },
      items: [
        {
          pn: 'JH003-AW/FN-M',
          quantity: 1,
          retailPrice: 50,
          description: 'Please print as large as posible',
          label: { type: 'printed', name: 'system-1 top gal' },
          designs: {
            front:
                'https:\/\/www.inkthreadable.co.uk\/images\/pictures\/00-2023\/2023-assets\/core-images\/creator-(product).png?v=365913d1',
            back: 'https:\/\/www.inkthreadable.co.uk\/images\/pictures\/00-2023\/2023-assets\/core-images\/creator-(product).png?v=365913d1',
          },
        },
      ],
    }),
  }).finally(() => {
    getOrders()
  })
}

const deleteOrder = async (orderId: string | number) => {
  console.log('Deleting Order: %s', orderId)
  await fetch('/api/_inkthreadable/orders', { method: 'DELETE', body: JSON.stringify({ orderId: orderId }) })

  getOrders()
}

onMounted(() => {
  getOrders()
})
</script>

<template>
  <div>
    <h1>Orders</h1>

    <button @click="getOrderCount">
      Get Order Count
    </button>
    <button @click="getOrders">
      Get Orders
    </button>
    <button @click="submitOrder">
      Submit Order
    </button>

    <div>
      <div
        v-for="order in orders"
        :key="order.id"
      >
        <NuxtLink :to="{ name: `order-id`, params: { id: order.id } }">View Order</NuxtLink>
        <button @click="() => getOrder(order.id)">
          Get Order
        </button>
        <button @click="() => deleteOrder(order.id)">
          Delete Order
        </button>
      </div>
    </div>
  </div>
</template>
