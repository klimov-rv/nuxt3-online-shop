<script setup>
definePageMeta({ layout: "page" });

import { useMessage, useLoadingBar } from "naive-ui";

// loadingBar.start();
// loadingBar.finish();
// loadingBar.error();

onMounted(() => {
  const message = useMessage();
  const loadingBar = useLoadingBar();

  loadingBar.start();
  setTimeout(() => {
    loadingBar.finish();
    message.info("userForm.value.mess");
  }, 3000);
});
</script>

<template>
  <div class="container">
    <h1>Start Nuxt3 pack</h1>
    <NInput />
    <NDatePicker />
  </div>
</template>
