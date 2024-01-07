export const useCalcTotal = defineStore('calcTotal', () => {
    const segmentsStore = useCalcSegmentsStore();
    const TOTAL = ref(0);

    function calcTotal() {
        const accessory = segmentsStore.getSummAccessory();
        const project = segmentsStore.getSummProject();
        const assembly = segmentsStore.getSummAssembly();
        TOTAL.value = assembly + project + accessory;
    }

    return { TOTAL, calcTotal }
})
