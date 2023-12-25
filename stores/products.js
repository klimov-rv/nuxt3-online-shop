export const useProductsStore = defineStore('productsStore', () => {

    const products = ref({}); 

    async function loadProducts() {
        const { data, pending } = await useLazyFetch("/api/products");
        products.value = data.value;
        return pending;
    };

    const getProducts = computed(() => {
        console.log(process);
        return products.value.products;
    });


    return { loadProducts, getProducts }
})
