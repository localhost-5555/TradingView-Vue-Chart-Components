<!-- https://www.tradingview.com/widget-docs/widgets/screeners/screener/ -->
 
<template>
  <div class="tradingview-widget-container" ref="widgetContainer">
    <div class="tradingview-widget-container__widget"></div>
    <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/screener/" rel="noopener nofollow" target="_blank"><span class="blue-text">Stock Screener</span></a><span class="trademark"> by TradingView</span></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Props to customize the widget
const props = defineProps({
  market: {
    type: String,
    default: 'usa'
  },
  showToolbar: {
    type: Boolean,
    default: true
  },
  defaultColumn: {
    type: String,
    default: 'overview'
  },
  defaultScreen: {
    type: String,
    default: 'most_capitalized'
  },
  isTransparent: {
    type: Boolean,
    default: false
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
  width: {
    type: [Number, String],
    default: "100%"
  },
  height: {
    type: [Number, String],
    default: 550
  },
});

const widgetContainer = ref(null);
let scriptElement = null;

onMounted(() => {
  // Create the script element
  scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
  scriptElement.async = true;
  
  // Set the configuration as the script's innerHTML
  // This is how TradingView reads the config
  scriptElement.innerHTML = JSON.stringify({
    market: props.market,
    showToolbar: props.showToolbar,
    defaultColumn: props.defaultColumn,
    defaultScreen: props.defaultScreen,
    isTransparent: props.isTransparent,
    locale: props.locale,
    colorTheme: props.colorTheme,
    width: props.width,
    height: props.height,
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