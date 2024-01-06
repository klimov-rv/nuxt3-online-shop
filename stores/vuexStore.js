
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            currentQuizStep: 1,
            finishStep: 6,

            boxModulesСapacityStep: 12, //                      Шаг добавления вместимости бокса
            boxModulesСapacityMax: 196, //                      Максмиальная вместимость бокса - 196, если больше - добавляем ещё объект          
            boxModulesСapacityMin: 12,

            priceTotal: 0,

            priceSegments: {
                accessory: 0,
                project: 0,
                assembly: 0,
            },

            calcData: {
                prices: {
                    modulePrice: 0,
                    boxPrice: 0,
                },
                boxes: [{
                    boxModulesСapacity: 24, //                      Потребуется бокс вместимостью 24 модуля(ей)       24 (даже если внутри 12 модулей)
                    modulesInside: 0,       //                      Занято модулей в щите                             22 
                }],
            },

            calcDetails: {
                lines: {
                    name: "Стоимость модуля",
                    value: 0,
                },
                lines: {
                    name: "Количество линий нагрузки",
                    value: 6,
                },
                lines1f: {
                    name: "в том числе однофазных",
                    value: 6,
                },
                lines3f: {
                    name: "в том числе трехфазных",
                    value: 0,
                },
                lines1fNonDisabled: {
                    name: "Однофазных неотключаемых линий",
                    value: 0,
                },
                lines3fNonDisabled: {
                    name: "Трехфазных неотключаемых линий",
                    value: 0,
                },
                modulesRequired: {
                    name: "Занято модулей в щите",
                    value: 12,
                },       // минимальное кол-во модулей которое точно потребуется (подогнать из 3phases конкретные точки)
            },
            calcOptions: fileStateConfiguratorData,
            cachedCalcOptions: null,
            prices: fileStateConfiguratorPrices
        }
    },
    mutations: {
        // обновляем стейт
        updateState(state, presetOptions) {
            state.calcOptions = presetOptions;
        },
        // обновляем цены
        recalcPrice(state) {

            let findedModuleType = "1faza";
            let arrSum = [];
            let modulesCount = 0;
            let flagCount = 0;

            for (const option in state.calcOptions) {
                if (state.calcOptions[option].trigger_flag) {
                    state.priceSegments.accessory = 0;
                    state.priceSegments.project = 0;
                    state.priceSegments.assembly = 0;
                    state.priceTotal = 0;
                    for (let levelOneKey in state.calcOptions) {
                        // фильтруем все задействованные опции, складываем базовую стоимость


                        if (state.calcOptions[levelOneKey].trigger_flag === true) {
                            flagCount++;
                            console.log(state.calcOptions[levelOneKey]);
                            let findInPrices = state.prices[levelOneKey];
                            // if count_flag 1 - ищем name и складываем его [accessory:1000, assembly:1000, project:1000] в arrSum
                            // if count_flag 2 - перемножаем на число и складываем в arrSum
                            // if count_flag 3 - ищем type и каждый элемент перемножаем на число этих элементов и складываем в arrSum
                            for (let levelTwoKey in findInPrices) {
                                const newOptionVal = state.calcOptions[levelOneKey].payload;
                                // count_flag === 1  
                                if (
                                    findInPrices[levelTwoKey].count_flag === 1 &&
                                    findInPrices[levelTwoKey].name === newOptionVal
                                ) {
                                    arrSum.push({
                                        accessory: findInPrices[levelTwoKey].accessory,
                                        assembly: findInPrices[levelTwoKey].assembly,
                                        project: findInPrices[levelTwoKey].project,
                                    });
                                }
                                // count_flag === 2
                                else if (findInPrices[levelTwoKey].count_flag === 2) {
                                    arrSum.push({
                                        accessory: findInPrices[levelTwoKey].accessory * newOptionVal,
                                        assembly: findInPrices[levelTwoKey].assembly * newOptionVal,
                                        project: findInPrices[levelTwoKey].project * newOptionVal,
                                    });
                                }
                                else if (findInPrices[levelTwoKey].count_flag === 5) {
                                    modulesCount += findInPrices[levelTwoKey].modules;
                                }
                            }
                        }
                    }
                    for (let key in arrSum) {
                        state.priceSegments.accessory += arrSum[key].accessory;
                        state.priceSegments.project += arrSum[key].project;
                        state.priceSegments.assembly += arrSum[key].assembly;
                    }
                }
                if (option === "phaseType") {
                    if (typeof state.calcOptions[option].payload === "object") {
                        findedModuleType = "1faza";
                        flagCount = 0;
                    } else {

                        findedModuleType = state.calcOptions[option].payload;
                    }
                }

            }
            state.priceTotal = state.priceSegments.accessory + state.priceSegments.project + state.priceSegments.assembly;

            // добавляем пересчёты на модули и боксы 
            // console.log(flagCount)
            // console.log("flagCount")
            if (flagCount > 0) {

                let findedModulePrice = state.prices.module.find(obj => obj.name === findedModuleType);
                console.log(findedModulePrice.accessory);
                state.calcDetails.modulesRequired.value = modulesCount;
                state.priceTotal += modulesCount * findedModulePrice.accessory;
            }

        }

    },
    actions: {
        // меняем пресет опций (ВХОД)
        updatePresetOptions({ state, dispatch }, newOption) {
            if (newOption.payload !== undefined) {
                let optionsPreset = { [newOption.name]: { payload: newOption.payload } };
                // ПРОМЕЖУТОЧНЫЕ ЦЕНЫ 

                // здесь считаем всё что влияет на стоимость бокса, модулей и комплектующих 
                // TODO - в отдельную мутацию
                if (newOption.name === "phaseType") {
                    //  от phaseType зависит стоимость 1 module
                    if (newOption.payload === "3faza") {
                        state.calcData.boxes.boxModulesСapacityMin = 24;
                        state.calcData.prices.modulePrice = 1500;
                    }
                    else if (newOption.payload === "1faza") {
                        state.calcData.boxes.boxModulesСapacityMin = 12;
                        state.calcData.prices.modulePrice = 500;
                    }
                }

                if (newOption.name === "elBoardFor") {

                    //  для квартиры
                    if (newOption.payload === "apartment") {
                        optionsPreset['inputPower'] = { payload: 21, visible: true };
                        optionsPreset['nominalPower'] = { payload: 100, visible: false };
                        optionsPreset['numLivingRooms'] = { payload: 3, visible: true };

                        optionsPreset['nonShutOffLines'] = { visible: true };
                        optionsPreset['protectionDegree'] = { payload: "ip31", visible: false };
                        optionsPreset['grounding'] = { payload: "TNC", visible: false };
                        optionsPreset['automaticinputreserve'] = { payload: "TNC", visible: false };
                        optionsPreset['avrIsOn'] = { payload: true };
                    }
                    //  для дома гаража мастерской
                    if (newOption.payload === "house") {
                        optionsPreset['inputPower'] = { payload: 21, visible: true };
                        optionsPreset['nominalPower'] = { payload: 100, visible: false };
                        optionsPreset['numLivingRooms'] = { payload: 1, visible: true };

                        optionsPreset['nonShutOffLines'] = { visible: true };
                        optionsPreset['protectionDegree'] = { payload: "ip31", visible: false };
                        optionsPreset['grounding'] = { payload: "TNC", visible: false };
                        optionsPreset['automaticinputreserve'] = { payload: "TNC", visible: false };
                        optionsPreset['avrIsOn'] = { payload: true };
                    }
                    //  для предприятия
                    if (newOption.payload === "enterprises") {
                        optionsPreset['inputPower'] = { payload: 100, visible: false };
                        optionsPreset['nominalPower'] = { payload: 100, visible: true };
                        optionsPreset['numLivingRooms'] = { payload: 10, visible: false };
                        optionsPreset['nonShutOffLines'] = { visible: false };
                        optionsPreset['protectionDegree'] = { payload: "ip31", visible: true };
                        optionsPreset['grounding'] = { payload: "TNC", visible: true };
                        optionsPreset['automaticinputreserve'] = { payload: "TNC", visible: true };
                        optionsPreset['avrIsOn'] = { payload: true };
                    }
                }


                if (newOption.name === "boxType") {
                    // зависимость установки
                    // hinged // навесной - комплектующие 0
                    // embedded // встраиваемый - комплектующие +2000

                }

                if (newOption.name === "stationaryConsumers") {
                    //  от stationaryConsumers =  зависит стоимость 1 module
                    if (newOption.payload === "стиралка") {
                        state.calcData.prices.modulePrice = 2500;
                    }
                }

                dispatch('recalculatePreset', optionsPreset);
            }

        },
        recalculatePreset({ state, commit }, optionsPreset) {

            // copy Options
            let presetOptions = JSON.parse(JSON.stringify(state.calcOptions))

            for (const newOpt in optionsPreset) {
                if (newOpt.payload !== null && newOpt.payload !== 0) {
                    presetOptions[newOpt].trigger_flag = true;
                    presetOptions[newOpt].payload = optionsPreset[newOpt].payload;


                    // console.log(optionsPreset[newOpt]);

                    if (optionsPreset[newOpt].visible !== undefined) {
                        presetOptions[newOpt].visible = optionsPreset[newOpt].visible;

                        if (newOpt === "avrIsOn") {
                            presetOptions[newOpt].visible = optionsPreset[newOpt].payload
                        }
                    }
                } else if (!(typeof optionsPreset[newOpt].payload === "boolean") && optionsPreset[newOpt].payload === 0) {
                    presetOptions[newOpt].trigger_flag = false;
                }
            }


            const presetOptionsCopy = JSON.stringify(presetOptions);
            const stateOptionsCopy = JSON.stringify(state.calcOptions);
            if (stateOptionsCopy !== presetOptionsCopy) {

                commit('updateState', presetOptions);
                commit('recalcPrice');

            }
        }
    },
    getters: {
        getStepState(state) {
            return state.currentQuizStep
        },
        getCalcOptions: state => state.calcOptions,
        getPayloadByName: state => optionName => {
            return state.calcOptions[optionName].payload;
        },

        // getTodoById: state => id => {
        //     return state.todos.find(todo => todo.id === id);
        // }

        getTotal(state) {
            const total = {
                priceTotal: state.priceTotal,
                priceAccessory: state.priceSegments.accessory,
                priceProject: state.priceSegments.project,
                priceAssembly: state.priceSegments.assembly,
            }
            return total
        },
    }
})

export default store;
