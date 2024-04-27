<script setup lang="ts">
const mainStore = useMainStore();

const isLoading = ref(true);
const asksMap = new Map<string, string>();
const bidsMap = new Map<string, string>();
const asksTableData = ref<any>([]);
const bidssTableData = ref<any>([]);
const prefiredUpdates: any[] = [];

const spotSocket = new WebSocket(
  `wss://stream.binance.com:9443/ws/${mainStore.currentTicker.toLowerCase()}@depth`
);

const proccessUpdate = (update: any) => {
  update.a?.forEach(([price, value]: [string, string]) => {
    if (value === "0.00000000") {
      asksMap.delete(price);
    } else {
      asksMap.set(price, value);
    }
  });

  asksTableData.value = Array.from(asksMap, ([price, amount]) => ({
    price,
    amount,
    total: Number(price) * Number(amount),
  }));
  update.b?.forEach(([price, value]: [string, string]) => {
    if (value === "0.00000000") {
      bidsMap.delete(price);
    } else {
      bidsMap.set(price, value);
    }
  });

  bidssTableData.value = Array.from(bidsMap, ([price, amount]) => ({
    price,
    amount,
    total: Number(price) * Number(amount),
  }));
};

spotSocket.onopen = async () => {
  const { lastUpdateId, asks, bids } = await fetch(
    `https://api.binance.com/api/v3/depth?symbol=${mainStore.currentTicker}&limit=1000`
  ).then((res) => res.json());

  const filteredUpdates = prefiredUpdates.filter(
    (update) => update.u > lastUpdateId
  );

  proccessUpdate({ a: asks, b: bids });

  filteredUpdates.forEach(proccessUpdate);

  spotSocket.onmessage = (u) => proccessUpdate(JSON.parse(u.data));
  isLoading.value = false;
};
spotSocket.onmessage = (u) => prefiredUpdates.push(JSON.parse(u.data));

spotSocket.onerror = () => (isLoading.value = true);
spotSocket.onclose = () => (isLoading.value = true);

// const wrapper = ref<HTMLInputElement | null>(null);

// const tableHeight = ref(0);
// const tableWidth = ref(0);

// const handleResize = () => {
//   if (!wrapper.value) {
//     return;
//   }

//   const { height, width } = wrapper.value.getBoundingClientRect();

//   tableHeight.value = Math.floor(height * 0.5);
//   tableWidth.value = Math.floor(width);
// };

// watch(wrapper, handleResize);

// window.addEventListener("resize", handleResize);
</script>

<template>
  <div class="h-100 w-100 d-flex justify-center">
    <v-data-table-virtual
      :headers="[
        { title: 'Price', align: 'start', key: 'price' },
        { title: 'Amount', align: 'end', key: 'amount' },
        { title: 'Total', align: 'end', key: 'total' },
      ]"
      :items="asksTableData"
      item-value="price"
      class="w-50"
      fixed-header
    />
    <v-data-table-virtual
      :headers="[
        { title: 'Price', align: 'start', key: 'price' },
        { title: 'Amount', align: 'end', key: 'amount' },
        { title: 'Total', align: 'end', key: 'total' },
      ]"
      :items="bidssTableData"
      item-value="price"
      class="w-50"
      fixed-header
    />
  </div>
</template>

<style scoped lang="scss"></style>
