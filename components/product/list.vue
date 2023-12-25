<script setup>
import { useMessage, useLoadingBar } from "naive-ui";
const message = useMessage();
const loadingBar = useLoadingBar();
// loadingBar.start();
// loadingBar.finish();
// loadingBar.error();
const route = useRoute();
console.log(route);

const productsStore = useProductsStore();

loadingBar.start();
const isFetching = ref(await productsStore.loadProducts());
if (!isFetching.value) {
  loadingBar.finish();
}
</script>
<template>
  <div> 
    <p v-if="isFetching">loading...</p>
    <div v-else class="row">
      <div class="col col-sm-4 mb-3 mt-3" v-for="pr in productsStore.getProducts" :key="pr.id">
				<div class="card">
					<div class="card-body">
						<h3>{{ pr.title }}</h3>
            <div class='card-img card-img-thumbnail'>
              <img :src="pr.thumbnail" />
            </div> 
						<div>Бренд: {{ pr.brand }}</div>
						<div>Цена: <b>{{ pr.price }} руб</b></div>
						<NuxtLink :to="`/product/${pr.id}`">Детали</NuxtLink>
						<hr>
						<button type="button" class="btn btn-danger">
							Remove
						</button>
						<button type="button" class="btn btn-success">
							Add to cart
						</button>
					</div>
				</div>
			</div>
    </div>  
  </div>
</template>
<style>
.card-img-thumbnail img {
  width: 100%;
}
</style>