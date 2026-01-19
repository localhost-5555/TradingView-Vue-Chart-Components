<!-- https://www.tradingview.com/widget-docs/widgets/symbol-details/fundamental-data/ -->

<template>
  <div class="financials-wrapper">
    <div class="tradingview-widget-container" ref="widgetContainer">
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a 
          :href="`https://www.tradingview.com/symbols/${symbolForUrl}/financials-overview/`" 
          rel="noopener nofollow" 
          target="_blank"
        >
          <span class="blue-text">{{ symbolName }} fundamentals</span>
        </a>
        <span class="trademark"> by TradingView</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';

const props = defineProps({
  symbol: {
    type: String,
    default: 'NASDAQ:NVDA', // Default symbol for demonstration
    required: true
  },
  colorTheme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  displayMode: {
    type: String,
    default: 'regular', // 'regular' or 'compact'
    validator: (value) => ['regular', 'compact'].includes(value)
  },
  isTransparent: {
    type: Boolean,
    default: false
  },
  locale: {
    type: String,
    default: 'en'
  },
  width: {
    type: [Number, String],
    default: 400
  },
  height: {
    type: [Number, String],
    default: 550
  }
});

const widgetContainer = ref(null);
let scriptElement = null;

// Computed properties for URL formatting
const symbolForUrl = computed(() => {
  // Convert 'NASDAQ:AAPL' to 'NASDAQ-AAPL' for URL
  return props.symbol.replace(':', '-');
});

const symbolName = computed(() => {
  // Extract just the ticker part (e.g., 'AAPL' from 'NASDAQ:AAPL')
  const parts = props.symbol.split(':');
  return parts.length > 1 ? parts[1] : props.symbol;
});

const loadWidget = () => {
  // Clear previous widget if it exists
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }

  if (!widgetContainer.value) return;

  // Create new script element
  scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
  scriptElement.async = true;
  
  // Set configuration
  scriptElement.innerHTML = JSON.stringify({
    symbol: props.symbol,
    colorTheme: props.colorTheme,
    displayMode: props.displayMode,
    isTransparent: props.isTransparent,
    locale: props.locale,
    width: props.width,
    height: props.height
  });
  
  // Append to container
  widgetContainer.value.appendChild(scriptElement);
};

onMounted(() => {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    loadWidget();
  }, 100);
});

// Reload widget when symbol changes
watch(() => props.symbol, () => {
  loadWidget();
});

onBeforeUnmount(() => {
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }
});
</script>

<style scoped>
.financials-wrapper {
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

<!-- ========== SYMBOL FORMAT REFERENCE ========== -->
<!--
Symbol format: EXCHANGE:TICKER

Common exchanges:
- NASDAQ: NASDAQ stocks (e.g., NASDAQ:AAPL, NASDAQ:GOOGL)
- NYSE: New York Stock Exchange (e.g., NYSE:BAC, NYSE:JPM)
- Colombian stocks: Just use ticker.CL (e.g., ECOPETROL.CL, PFBCOLOM.CL)

Display modes:
- regular: Full detailed view with all financial metrics
- compact: Condensed view with key metrics only

The widget displays:
- Income Statement
- Balance Sheet
- Cash Flow
- Financial Ratios
- Key Metrics
- Quarterly and Annual data
-->