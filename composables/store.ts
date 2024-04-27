import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const currentTicker = ref("BTCUSDT");
  const tickerChangeHistory = ref<string[]>([]);

  const changeTicker = (ticker: string) => {
    currentTicker.value = ticker;
    tickerChangeHistory.value.unshift(new Date().toUTCString() + ": " + ticker);
  };

  return {
    currentTicker,
    tickerChangeHistory,
    changeTicker,
  };
});
