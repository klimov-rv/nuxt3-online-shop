export const useCalcSegmentsStore = defineStore('calculateSegments', () => {

    const accessory = ref(0);
    const project = ref(0);
    const assembly = ref(0);

    const getSummAccessory = computed(() => {
        return accessory.value;
    });

    const getSummProject = computed(() => {
        return project.value;
    });

    const getSummAssembly = computed(() => {
        return assembly.value;
    });

    return { getSummAccessory, getSummProject, getSummAssembly }
})
