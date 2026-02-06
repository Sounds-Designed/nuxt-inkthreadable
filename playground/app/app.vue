<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-around; margin-bottom: 2rem">
      <NuxtLink :to="{ name: 'index' }">Home</NuxtLink>
      <NuxtLink :to="{ name: 'orders' }">Orders</NuxtLink>
    </div>

    <NuxtPage />
  </div>
</template>
