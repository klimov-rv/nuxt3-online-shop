<script setup>
definePageMeta({ layout: "page", title: "Страница товара" });
const message = useMessage();
const loadingBar = useLoadingBar();
const route = useRoute();
const productsStore = useProductsStore();
const cart = useCart();

loadingBar.start();
const isFetching = ref(await productsStore.loadSingleProduct(parseInt(route.params.id)));
if (!isFetching.value) {
  loadingBar.finish();
};
   
const product = computed(() => productsStore.getProdState); 

function addEventHandler(id) {
  cart.add(id);
  message.info("Товар добавлен в корзину");
}
</script>

<template> 
  <p v-if="isFetching">
    <div class="row"> 
      <NSkeleton height="370px" width="30%" /> 
    </div> 
  </p>
  <div v-else class="row">
		<h1>{{ product.title }}</h1>
    <div class="col col-sm-4 mb-3 mt-3"> 
      <div class='card-img card-img-thumbnail'>
        <img :src="product.images[0]" />
      </div>   
    </div>   
		<div class="alert alert-success">
			Цена {{ product.price }}
		</div> 
    <button v-if="cart.isAdded(product.id)" @click="cart.remove(product.id)" type="button" class="btn btn-danger">
      Удалить из корзины
    </button>
    <button v-else @click="addEventHandler(product.id)" type="button" class="btn btn-success">
      Добавить в корзину
    </button>
	</div>
</template>
