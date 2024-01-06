<template>
  <div class="container cnfg-area">
    <span class="row d-flex flex-end">
      калькулятор поможет вам точно рассчитать стоимость услуги
    </span>
    <span class="row d-flex flex-end">
      <router-link to="/result">
        <n-button type="info">
          Результат
        </n-button>
      </router-link>
      <router-link to="/options">
        <n-button type="info">
          Настройки
        </n-button>
      </router-link>
    </span>

    <CalcRightSideTop
      :currStepForStepper="currStep"
      @curStepChange="updateCurrStep"
    />
    <div class="CalcBody row">
      <div class="LeftSide cell-3 cell-3-el cell-12-lg row flex-top">
        <CalcLeftSide :priceTotal="priceTotal" />
      </div>
      <div class="RightSide cell-9 cell-9-el cell-12-lg">
        <CalcRightSide :currStepForSlide="currStepForSlide" />
        <div class="row">
          <div class="cell-12">
            <n-collapse>
              <n-collapse-item title="data" name="2">
                <div>
                  <pre>{{ JSON.stringify(calcOptions, null, 2) }}</pre>
                  <!-- <pre>{{ JSON.stringify(calcOptions, null, 2) }}</pre> -->
                </div>
              </n-collapse-item>
            </n-collapse>
          </div>
        </div>
      </div>
    </div>
    <NHr />
    <CalcCalculatePanel
      :priceTotal="priceTotal"
      :priceAccessory="priceAccessory"
      :priceProject="priceProject"
      :priceAssembly="priceAssembly"
      :currStepForPanel="currStep"
      @next="quizNext"
      @prev="quizPrev"
    />
  </div>
</template>
<script>
import fileConfigData from "@/static/configuratorData.json";
import ConfiguratorPrices from "@/static/configuratorPrices.json";

import { useCalcStore } from "@/store/calcStore";

export default {
  setup() {
    const { initCalcData } = useCalcStore();
    return {
      currStep: ref(initCalcData.currentQuizStep),
    };
  },
  data() {
    return {
      steps: 5,

      // pmsk_config_data: fileConfigData,
      stationarOptions: {},
      calcPrices: ConfiguratorPrices,
      calcOptions: fileConfigData,

      priceTotal: 0,
      priceAccessory: 0,
      priceProject: 0,
      priceAssembly: 0,
    };
  },
  methods: {
    updateCurrStep(e) {
      this.currStep = e.step;
    },
    quizNext() {
      if (this.currStep > this.steps) this.currStep = 1;
      else if (this.currStep < 1) {
        this.currStep = 1;
      } else this.currStep++;
    },
    quizPrev() {
      if (this.currStep > this.steps) this.currStep = 1;
      else if (this.currStep < 2) {
        this.currStep = 1;
      } else this.currStep--;
    },
  },

  computed: {
    // ...mapState(["currentQuizStep", "calcOptions", "calcDetails"]),
    currStepForSlide() {
      return this.currStep - 1;
    },
  },
  watch: {
    calcOptions: {
      deep: true,
      handler(newPmskConfigData) {
        const getTotal = this.$store.getters.getTotal;
        this.priceTotal = getTotal.priceTotal;
        this.priceAccessory = getTotal.priceAccessory;
        this.priceProject = getTotal.priceProject;
        this.priceAssembly = getTotal.priceAssembly;
      },
    },
    pmsk_config_data: {
      deep: true,
      handler(newPmskConfigData) {
        console.log("записть в localstorage, новые данные:");
        localStorage.pmsk_config_data = JSON.parse(
          JSON.stringify(newPmskConfigData).replace(/"\s+|\s+"/g, '"')
        );
        console.log(this.pmsk_config_data);
      },
    },
  },
  mounted() {
    // this.stationarOptions = this.cachedCalcOptions;
    // if (localStorage.pmsk_config_data) {
    //   const badJson = localStorage.pmsk_config_data;
    //   this.pmsk_config_data = JSON.parse(
    //     JSON.stringify(badJson).replace(/"\s+|\s+"/g, '"')
    //   );
    //   // console.log(this.pmsk_config_data);
    //   // this.newname = this.pmsk_config_data.title;
    // }
    // TEST: service name
    // if (localStorage.notes) {
    //   const badJson = localStorage.notes;
    //   this.newname = JSON.parse(
    //     JSON.stringify(badJson).replace(/"\s+|\s+"/g, '"')
    //   );
    // } else {
    // }
  },
};
</script>
<style></style>
