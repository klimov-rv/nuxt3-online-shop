<script setup>
const productsStore = useProductsStore();
const label = ref("Все"),
  value = ref("all"),
  filter_option = [
    {
      id: 1,
      label: "Все",
      value: "all",
    },
    {
      id: 2,
      label: "РАСПРЕДЕЛИТЕЛЬНЫЕ ЩИТЫ",
      value: "raspredelitelnye-shhity",
    },
    {
      id: 3,
      label: "УСТРОЙСТВА АВТОМАТИЧЕСКОГО ВВОДА РЕЗЕРВА",
      value: "shhit-avtomaticheskogo-vklyucheniya-rezerva",
    },
  ];
function handleUpdateValue(value, option) {
  label.value = option.label;
  productsStore.setFilter(option.value);
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
