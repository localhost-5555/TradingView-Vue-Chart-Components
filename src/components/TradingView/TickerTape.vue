<!-- ========== Ticker Tape Widget ========== -->
 <!-- https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/ -->

<template>
  <div class="ticker-tape-widget">
    <tv-ticker-tape 
      ref="tickerTape"
      :symbols="symbolsString"
      :show-symbol-logo="showSymbolLogo"
      :color-theme="colorTheme"
      :is-transparent="isTransparent"
      :display-mode="displayMode"
      :locale="locale"
    ></tv-ticker-tape>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  symbols: {
    type: Array,
    default: () => [
      'NASDAQ:AAPL',
      'NASDAQ:MSFT',
      'NASDAQ:GOOGL'
    ]
  },
  showSymbolLogo: {
    type: Boolean,
    default: true
  },
  colorTheme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  isTransparent: {
    type: Boolean,
    default: false
  },
  displayMode: {
    type: String,
    default: 'adaptive',
    validator: (value) => ['adaptive', 'regular', 'compact'].includes(value)
  },
  locale: {
    type: String,
    default: 'en'
  }
});

const tickerTape = ref(null);

// Convert array to comma-separated string format
const symbolsString = computed(() => {
  return props.symbols.join(',');
});

function loadTickers() {
    // Load the TradingView widget script
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js';
  script.async = true;
  
  document.head.appendChild(script);
}

onMounted(() => {
  loadTickers();
});
</script>

<style scoped>
.ticker-tape-widget {
  width: 100%;
  height: 80px;
}
</style>
