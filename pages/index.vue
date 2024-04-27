<script setup lang="ts">
const mainStore = useMainStore();
</script>

<template>
  <v-row class="h-100" justify="center" align="start">
    <v-col cols="12" sm="6" md="4">
      <v-select
        label="Ticker"
        :model-value="mainStore.currentTicker"
        @update:model-value="mainStore.changeTicker"
        :items="['BTCUSDT', 'BNBBTC', 'ETHBTC']"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="h-100 overflow-auto">
      <div
        v-for="(item, index) in mainStore.tickerChangeHistory"
        :key="item"
        :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']"
      >
        {{ item }}
      </div>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss"></style>
