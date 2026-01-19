<!-- https://www.tradingview.com/widget-docs/widgets/heatmaps/stock-heatmap/ -->
 
<template>
  <div class="tradingview-widget-container" ref="widgetContainer">
    <div class="tradingview-widget-container__widget"></div>
    <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/heatmap/stock/" rel="noopener nofollow" target="_blank"><span class="blue-text">Stock Heatmap</span></a><span class="trademark"> by TradingView</span></div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Props to customize the widget
const props = defineProps({
  dataSource: {
    type: String,
    default: 'SPX500' // United states S&P500
  },
  blockSize: {
    type: String,
    default: 'market_cap_basic'
  },
  blockColor: {
    type: String,
    default: 'change'
  },
  grouping: {
    type: String,
    default: 'sector'
  },
  locale: {
    type: String,
    default: 'en'
  },
  colorTheme: {
    type: String,
    default: 'light', // 'light' or 'dark'
    validator: (value) => ['light', 'dark'].includes(value)
  },
  symbolUrl: {
    type: String,
    default: ''
  },
  exchanges: {
    type: Array,
    default: []
  },
  hasTopBar: {
    type: Boolean,
    default: false
  },
  isDataSetEnabled: {
    type: Boolean,
    default: false
  },
  isZoomEnabled: {
    type: Boolean,
    default: true
  },
  hasSymbolTooltip: {
    type: Boolean,
    default: false
  },
  isMonoSize: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    default: "95%"
  },
  height: {
    type: [Number, String],
    default: "500"
  },
});

const widgetContainer = ref(null);
let scriptElement = null;

onMounted(() => {
  // Create the script element
  scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
  scriptElement.async = true;
  
  // Set the configuration as the script's innerHTML
  // This is how TradingView reads the config
  scriptElement.innerHTML = JSON.stringify({
    dataSource: props.dataSource,
    blockSize: props.blockSize,
    blockColor: props.blockColor,
    grouping: props.grouping,
    locale: props.locale,
    colorTheme: props.colorTheme,
    symbolUrl: props.symbolUrl,
    exchanges: props.exchanges,
    hasTopBar: props.hasTopBar,
    isDataSetEnabled: props.isDataSetEnabled,
    isZoomEnabled: props.isZoomEnabled,
    hasSymbolTooltip: props.hasSymbolTooltip,
    isMonoSize: props.isMonoSize,
    width: props.width,
    height: props.height
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
<!-- TradingView Widget END -->