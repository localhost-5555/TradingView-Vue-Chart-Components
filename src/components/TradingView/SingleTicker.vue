<!-- https://www.tradingview.com/widget-docs/widgets/tickers/single-ticker/ -->

<template>
  <div class="tradingview-widget-container" ref="widgetContainer">
    <div class="tradingview-widget-container__widget"></div>
    <a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"><span class="blue-text">AAPL performance</span></a><span class="trademark"> by TradingView</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Props to customize the widget
const props = defineProps({
  symbol: {
    type: String,
    default: 'NASDAQ:AAPL'
  },
  colorTheme: {
    type: String,
    default: 'light', // 'light' or 'dark'
    validator: (value) => ['light', 'dark'].includes(value)
  },
  isTransparent: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    default: 350
  },
  locale: {
    type: String,
    default: 'en'
  },
});

const widgetContainer = ref(null);
let scriptElement = null;

onMounted(() => {
  // Create the script element
  scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
  scriptElement.async = true;
  
  // Set the configuration as the script's innerHTML
  // This is how TradingView reads the config
  scriptElement.innerHTML = JSON.stringify({
    symbol: props.symbol,
    colorTheme: props.colorTheme,
    isTransparent: props.isTransparent,
    locale: props.locale,
    width: props.width,
  });
  
  // Append script to the widget container
  widgetContainer.value.appendChild(scriptElement);
});

onBeforeUnmount(() => {
  // Clean up: remove the script when component is destroyed
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }
});
</script>