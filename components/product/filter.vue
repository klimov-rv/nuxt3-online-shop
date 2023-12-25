<script setup> 
const productsStore = useProductsStore();
const label = ref("Все бренды"),
  value = ref("all"),
  filter_option = [
    {
      id: 1,
      label: "Все бренды",
      value: "all",
    },
    {
      id: 2,
      label: "Apple",
      value: "apple",
    },
    {
      id: 3,
      label: "Samsung",
      value: "samsung",
    },
    {
      id: 4,
      label: "Huawei",
      value: "huawei",
    },
    {
      id: 5,
      label: "OPPO",
      value: "oppo",
    },
    {
      id: 6,
      label: "Microsoft Surface",
      value: "microsoft_surface",
    },
    {
      id: 7,
      label: "Infinix",
      value: "infinix",
    },
  ];
function handleUpdateValue(value, option) {
  label.value = option.label;
  productsStore.setFilter(option.label);
} 
</script>

<template>
  <NSpace>
    <NPopselect
      v-model:value="value"
      :options="filter_option"
      size="large"
      @update:value="handleUpdateValue"
    >
      <NButton>{{ label || "Popselect" }}</NButton>
    </NPopselect>
  </NSpace> 
</template>
