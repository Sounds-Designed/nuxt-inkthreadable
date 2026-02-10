<script setup lang="ts">
const route = useRoute()

const { id } = route.params

const serverUrl = `/api/_inkthreadable/order/${id}`

const { data: order, pending } = await useAsyncData(`order-${id}`, async () => {
  return await $fetch(serverUrl)
})

const deleting = ref(false)
const deleteOrder = async () => {
  deleting.value = true

  await $fetch('/api/_inkthreadable/orders', { method: 'DELETE', body: { id } })

  deleting.value = false
}
</script>

<template>
  <div>
    <h1>Order</h1>

    <button
      :disabled="deleting"
      @click="deleteOrder"
    >
      Delete Order
    </button>

    <pre v-if="!pending">
      <code>
{{ order }}
      </code>
    </pre>
  </div>
</template>
