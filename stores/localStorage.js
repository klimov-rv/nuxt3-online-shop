// export const useStorage = defineStore('siteStorage', () => {
//     const siteStorage = useLocalStorage('siteStorage', {});
//     const initialized = ref(false);

//     async function initialize() {
//         if (initialized.value) return;
//         initialized.value = true;
//     }
//     return {
//         initialize,
//         siteStorage
//     }
// })