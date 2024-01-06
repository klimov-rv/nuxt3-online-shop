export const useCart = defineStore('cartStore', () => {
    const prodStore = useProductsStore();
    const items = ref([]);

    function cartAdapter(prod) {
        return {
            id: prod.id,
            title: prod.title,
            price: prod.price,
            cnt: 1,
        }
    }

    function add(id) {
        const prod = prodStore.getProductById(id);
        items.value.push(cartAdapter(prod));
    };

    function remove(id) {
        items.value = items.value.filter(item => item.id != id);
    };

    const isAdded = (id) => (items.value.some(item => item.id === id));
    const COUNT = computed(() => items.value.length);

    const getItems = computed(() => {
        return items.value;
    });

    function setCnt({ id, cnt }) {
        let item = items.value.find(item => item.id === id);
        item.cnt = Math.abs(cnt);
    }

    return { add, remove, isAdded, COUNT, getItems, setCnt }
})
