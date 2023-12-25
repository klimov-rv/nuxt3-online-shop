<script lang="ts" setup>
import { type GlobalThemeOverrides, ruRU, dateRuRU } from "naive-ui";
const themeOverrides: GlobalThemeOverrides = {

  common: {
    // названия полей смотреть в NThemeEditor (редактор темы справа-внизу страницы)
    primaryColor: "#333333",
    primaryColorHover: "#202020",
    primaryColorPressed: "#313131",
    primaryColorSuppl: "#6890F2",

    successColor: "#202020",
    successColorHover: "#333333",
    successColorPressed: "#202020",
    successColorSuppl: "#6890F2",

  },

};
</script>

<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :locale="ruRU"
    :date-locale="dateRuRU"
  >
    <NMessageProvider>
      <NNotificationProvider>
        <NLoadingBarProvider>
          <NDialogProvider>
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </NDialogProvider>
        </NLoadingBarProvider>
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style>
body {
  padding: 0;
  margin: 0;
}
.n-input {
  margin-bottom: 15px;
}
</style>
