<!-- TradingView Symbol Overview Widget -->
<template>
  <div class="tradingview-widget-container" ref="container">
    <div class="tradingview-widget-container__widget"></div>
    <div class="tradingview-widget-copyright">
      <a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank">
        <span class="blue-text">Apple</span>
      </a>
      <span class="comma">,</span>&nbsp;
      <a href="https://www.tradingview.com/symbols/NASDAQ-GOOGL/" rel="noopener nofollow" target="_blank">
        <span class="blue-text">Google</span>
      </a>
      <span class="comma">,</span>
      <span class="and">&nbsp;and&nbsp;</span>
      <a href="https://www.tradingview.com/symbols/NASDAQ-MSFT/" rel="noopener nofollow" target="_blank">
        <span class="blue-text">Microsoft stock price</span>
      </a>
      <span class="trademark">&nbsp;by TradingView</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  symbols: {
    type: Array,
    default: () => [
      ["Apple", "NASDAQ:AAPL|1D"],
      ["Google", "NASDAQ:GOOGL|1D"],
      ["Microsoft", "NASDAQ:MSFT|1D"]
    ]
  },
  lineWidth: {
    type: Number,
    default: 2
  },
  lineType: {
    type: Number,
    default: 0
  },
  chartType: {
    type: String,
    default: 'area',
    validator: (value) => ['area', 'line', 'candlesticks', 'bars'].includes(value)
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
  locale: {
    type: String,
    default: 'en'
  },
  chartOnly: {
    type: Boolean,
    default: false
  },
  scalePosition: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },
  autosize: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '60vh'
  }
});

const container = ref(null);
let scriptElement = null;

onMounted(() => {
  scriptElement = document.createElement('script');
  scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
  scriptElement.type = 'text/javascript';
  scriptElement.async = true;
  scriptElement.innerHTML = JSON.stringify({
    lineWidth: props.lineWidth,
    lineType: props.lineType,
    chartType: props.chartType,
    fontColor: "rgb(106, 109, 120)",
    gridLineColor: "rgba(46, 46, 46, 0.06)",
    volumeUpColor: "rgba(34, 171, 148, 0.5)",
    volumeDownColor: "rgba(247, 82, 95, 0.5)",
    backgroundColor: "#ffffff",
    widgetFontColor: "#0F0F0F",
    upColor: "#22ab94",
    downColor: "#f7525f",
    borderUpColor: "#22ab94",
    borderDownColor: "#f7525f",
    wickUpColor: "#22ab94",
    wickDownColor: "#f7525f",
    colorTheme: props.colorTheme,
    isTransparent: props.isTransparent,
    locale: props.locale,
    chartOnly: props.chartOnly,
    scalePosition: props.scalePosition,
    scaleMode: "Normal",
    fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
    valuesTracking: "1",
    changeMode: "price-and-percent",
    symbols: props.symbols,
    dateRanges: [
      "1d|1",
      "1m|30",
      "3m|60",
      "12m|1D",
      "60m|1W",
      "all|1M"
    ],
    fontSize: "10",
    headerFontSize: "medium",
    autosize: props.autosize,
    width: props.width,
    height: props.height,
    noTimeScale: false,
    hideDateRanges: false,
    hideMarketStatus: false,
    hideSymbolLogo: false
  });
  
  container.value.appendChild(scriptElement);
});

onBeforeUnmount(() => {
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }
});
</script>

<style scoped>
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