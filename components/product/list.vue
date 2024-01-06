<script setup> 
const message = useMessage();
const loadingBar = useLoadingBar(); 

const productsStore = useProductsStore();
const cart = useCart();

loadingBar.start();
const isFetching = ref(await productsStore.loadProducts());
if (!isFetching.value) {
  loadingBar.finish();
} 
function addEventHandler(params) {
  cart.add(params);
  message.info("Товар добавлен в корзину");
}
</script>
<template>
  <div> 
    <p v-if="isFetching">
      <div class="row">
        <div class="col col-sm-4 mb-3 mt-3"><NSkeleton height="370px" width="100%" /></div> 
        <div class="col col-sm-4 mb-3 mt-3"><NSkeleton height="370px" width="100%" /></div> 
        <div class="col col-sm-4 mb-3 mt-3"><NSkeleton height="370px" width="100%" /></div> 
      </div> 
    </p>
    <div v-else class="row">
      <div class="col col-sm-4 mb-3 mt-3" v-for="pr in productsStore.getProducts" :key="pr.id">
				<div class="card">
					<div class="card-body">
						<NuxtLink :to="`/product/${pr.id}`">
              <h3>{{ pr.title }}</h3>
              <div class='card-img card-img-thumbnail'>
                <img :src="pr.thumbnail" />
              </div>  
            </NuxtLink>
            
						<!-- <div>Бренд: {{ pr.brand }}</div>
						<div>Цена: <b>{{ pr.price }} руб</b></div>
						<hr> -->
            
						<!-- <button v-if="cart.isAdded(pr.id)" @click="cart.remove(pr.id)" type="button" class="btn btn-danger">
							Удалить из корзины
						</button>
						<button v-else @click="addEventHandler(pr.id)" type="button" class="btn btn-success">
							Добавить в корзину
						</button> -->
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