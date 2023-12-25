<script setup>
var hardcodeRoutes = ref([
  {
    title: "Главная",
    path: "/",
  },
  {
    title: "Контакты",
    path: "/contacts",
  },
]);
</script>

<template>
  <ul class="list-group">
    <li v-for="link in hardcodeRoutes" class="list-group-item">
      <NuxtLink :to="link.path">
        {{ link.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
