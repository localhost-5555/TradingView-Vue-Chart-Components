<!-- https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/ -->
 
<template>
  <div class="chart-container">
    <div ref="chartContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  symbol: {
    type: String,
    default: 'NASDAQ:NVDA',
    required: true
  },
  interval: {
    type: String,
    default: 'D' // D, W, M for daily, weekly, monthly
  },
  theme: {
    type: String,
    default: 'light'
  }
});

const chartContainer = ref(null);
let widget = null;

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/tv.js';
  script.async = true;
  script.onload = () => {
    widget = new window.TradingView.widget({
      width: '100%',
      height: 500,
      symbol: props.symbol, // e.g., "NASDAQ:AAPL"
      interval: props.interval,
      timezone: 'America/Bogota',
      theme: props.theme,
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      container_id: chartContainer.value.id
    });
  };

  chartContainer.value.id = `tradingview_${Math.random().toString(36).substr(2, 9)}`;
  document.head.appendChild(script);
});

onBeforeUnmount(() => {
  if (widget && widget.remove) {
    widget.remove();
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
}
</style>
