<script setup>
const route = useRoute();
</script>
<template>
  <div class="header">
    <div class="container">
      <hr />
      <div class="row">
        <div class="col col-sm-9">
          <h1>{{ route.meta.title }}</h1>
        </div>
        <div class="col col-sm-3">
          <CartBage />
        </div>
      </div>
      <hr />
    </div>
  </div>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col col-sm-3 menu">
          <LeftsideMenu />
        </div>
        <div class="col col-sm-9">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
