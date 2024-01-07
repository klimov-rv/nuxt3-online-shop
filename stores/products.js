export const useProductsStore = defineStore('productsStore', () => {

    const products = ref({});
    const product = ref({});
    const products_filtered = ref({});
    const filter = ref({});

    async function loadProducts() {
        const { data, pending, error } = await useLazyFetch("/api/products");
        products_filtered.value = products.value = data.value.products;
        if (error.value) {
            throw createError({
                ...error.value,
                statusMessage: `Ошибка загрузки списка продуктов`
            })
        }
        return pending;
    };

    async function loadSingleProduct(id) {
        const { data, pending, error } = await useFetch(`/api/products/${id}`);
        product.value = data.value;
        if (error.value) {
            throw createError({
                ...error.value,
                statusMessage: `Ошибка загрузки продукта ${id}`
            })
        }
        return pending;
    };

    function filterProducts(filter_code) { 
        if (filter_code === "all") {
            return products.value;
        } else {
            return products.value.filter((item) => (filter_code === item.category));
        }
    }

    function setFilter(filter_value) {
        filter.value = filter_value;
        products_filtered.value = filterProducts(filter.value);
    }

    const getProducts = computed(() => {
        return products_filtered.value;
    });

    function getProductById(id) { return products.value.find((item) => (id === item.id)) };

    const getProdState = computed(() => {
        return product.value;
    });

    return { loadProducts, loadSingleProduct, getProductById, setFilter, getProducts, getProdState }
})
