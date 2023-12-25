<script setup>
definePageMeta({ layout: "page", title: "Страница товара" });
const route = useRoute();
</script>

<template>
  <div>Продукт ID {{ route.params.id }}</div>
</template>
