<script setup>
const cart = useCart();
</script>

<template>
  <NuxtLink to="/cart" class="alert alert-default">
    <div v-if="cart.COUNT">В корзине: {{ cart.COUNT }}</div>
    <div v-else>Корзина</div>
  </NuxtLink>
</template>
