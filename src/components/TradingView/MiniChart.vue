<!-- https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/ -->
 
<template>
  <div class="mini-chart">

    <div class="tradingview-widget-container" ref="widgetContainer">
      <div class="tradingview-widget-container__widget"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  symbol: {
    type: String,
    default: 'FX:EURUSD'
  }
});

const widgetContainer = ref(null);

onMounted(() => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
  script.async = true;
  script.innerHTML = JSON.stringify({
    symbol: props.symbol,
    width: '100%',
    height: '100%',
    locale: 'en',
    dateRange: '12M',
    colorTheme: 'light',
    isTransparent: false,
    autosize: true,
    largeChartUrl: ''
  });

  widgetContainer.value.appendChild(script);
});
</script>

<style scoped>
.mini-chart {
  width: 100%;
  height: 350px;
}

.tradingview-widget-container {
  height: 100%;
  width: 100%;
}
</style>