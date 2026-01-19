<!-- https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/ -->
 
<template>
  <div class="technical-analysis-wrapper">
    <div class="tradingview-widget-container" ref="widgetContainer">
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a 
          :href="`https://www.tradingview.com/symbols/${symbolForUrl}/technicals/`" 
          rel="noopener nofollow" 
          target="_blank"
        >
          <span class="blue-text">{{ symbolName }} stock analysis</span>
        </a>
        <span class="trademark"> by TradingView</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';

// Define component props with defaults and validation
const props = defineProps({
  symbol: {
    type: String,
    default: 'NASDAQ:MSFT', // Microsoft stock as default
    required: true
  },
  interval: {
    type: String,
    default: '1m',
    validator: (value) => [
      '1m', '5m', '15m', '30m', '1h', '2h', '4h', '1D', '1W', '1M'
    ].includes(value)
  },
  colorTheme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  displayMode: {
    type: String,
    default: 'single', // 'single' or 'full'
    validator: (value) => ['single', 'full'].includes(value)
  },
  isTransparent: {
    type: Boolean,
    default: false
  },
  locale: {
    type: String,
    default: 'en'
  },
  showIntervalTabs: {
    type: Boolean,
    default: true
  },
  width: {
    type: [Number, String],
    default: 425
  },
  height: {
    type: [Number, String],
    default: 450
  }
});

const widgetContainer = ref(null);
let scriptElement = null;

// Create a URL-friendly version of the symbol (e.g., "NASDAQ:AAPL" -> "NASDAQ-AAPL")
const symbolForUrl = computed(() => props.symbol.replace(':', '-'));

// Extract the ticker part of the symbol for display (e.g., "NASDAQ:AAPL" -> "AAPL")
const symbolName = computed(() => {
  const parts = props.symbol.split(':');
  return parts.length > 1 ? parts[1] : props.symbol;
});

/**
 * Loads the TradingView widget by creating and appending a script element
 * to the component's container. It cleans up any existing script first.
 */
const loadWidget = () => {
  // Clean up the old script if it exists to prevent duplicates
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }

  if (!widgetContainer.value) return;

  // Create the new script element
  scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
  scriptElement.async = true;
  
  // Set the widget configuration from props
  scriptElement.innerHTML = JSON.stringify({
    symbol: props.symbol,
    interval: props.interval,
    colorTheme: props.colorTheme,
    displayMode: props.displayMode,
    isTransparent: props.isTransparent,
    locale: props.locale,
    showIntervalTabs: props.showIntervalTabs,
    width: props.width,
    height: props.height
  });
  
  // Append the script to the container to load the widget
  widgetContainer.value.appendChild(scriptElement);
};

// Load the widget when the component is mounted
onMounted(() => {
  // Use a small timeout to ensure the DOM is fully ready
  setTimeout(() => {
    loadWidget();
  }, 100);
});

// Watch for any changes in props and reload the widget to apply them
watch(props, () => {
  loadWidget();
});

// Clean up the script when the component is unmounted
onBeforeUnmount(() => {
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }
});
</script>

<style scoped>
.technical-analysis-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tradingview-widget-container {
  display: inline-block;
  position: relative;
}

.blue-text {
  color: #2962FF;
}

.trademark {
  font-size: 11px;
  color: #787B86;
}

.tradingview-widget-copyright {
  font-size: 13px !important;
  line-height: 32px !important;
  text-align: center !important;
  vertical-align: middle !important;
  font-family: 'Trebuchet MS', Arial, sans-serif !important;
  color: #9db2bd !important;
}

.tradingview-widget-copyright a {
  text-decoration: none !important;
  color: #2962FF !important;
  font-weight: 600 !important;
}

.tradingview-widget-copyright a:visited {
  color: #2962FF !important;
}

.tradingview-widget-copyright a:hover {
  color: #1E53E5 !important;
}
</style>