<!-- https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/ -->
 
<template>
  <div class="tradingview-widget-container" ref="widgetContainer">
    <div class="tradingview-widget-container__widget"></div>
    <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/" rel="noopener nofollow" target="_blank"><span class="blue-text">World markets</span></a><span class="trademark"> by TradingView</span></div>
  </div>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue';

// Props to customize the widget
const props = defineProps({
  colorTheme: {
    type: String,
    default: 'light', // 'light' or 'dark'
    validator: (value) => ['light', 'dark'].includes(value)
  },
  dateRange: {
    type: String,
    default: '12M'
  },
  locale: {
    type: String,
    default: 'en'
  },
  largeChartUrl: {
    type: String,
    default: ''
  },
  isTransparent: {
    type: Boolean,
    default: false
  },
  showFloatingToolTip: {
    type: Boolean,
    default: false
  },
  plotLineColorGrowing: {
    type: String,
    default: 'rgba(41, 98, 255, 1)'
  },
  plotLineColorFalling: {
    type: String,
    default: 'rgba(41, 98, 255, 1)'
  },
  gridLineColor: {
    type: String,
    default: 'rgba(240, 243, 250, 0)'
  },
  scaleFontColor: {
    type: String,
    default: '#0F0F0F'
  },
  belowLineFillColorGrowing: {
    type: String,
    default: 'rgba(41, 98, 255, 0.12)'
  },
  belowLineFillColorFalling: {
    type: String,
    default: 'rgba(41, 98, 255, 0.12)'
  },
  belowLineFillColorGrowingBottom: {
    type: String,
    default: 'rgba(41, 98, 255, 0)'
  },
  belowLineFillColorFallingBottom: {
    type: String,
    default: 'rgba(41, 98, 255, 0)'
  },
  symbolActiveColor: {
    type: String,
    default: 'rgba(240, 243, 250, 0)'
  },
  support_host: {
    type: String,
    default: 'https://www.tradingview.com'
  },
  width: {
    type: [Number, String],
    default: 400
  },
  height: {
    type: [Number, String],
    default: 550
  },
  showSymbolLogo: {
    type: Boolean,
    default: true
  },
  showChart: {
    type: Boolean,
    default: true
  },
  tabs: {
    type: Array,
    default: [
                {
                  "title": "Indices",
                  "symbols": [
                    {
                      "s": "FOREXCOM:SPXUSD",
                      "d": "S&P 500 Index"
                    },
                    {
                      "s": "FOREXCOM:NSXUSD",
                      "d": "US 100 Cash CFD"
                    },
                    {
                      "s": "FOREXCOM:DJI",
                      "d": "Dow Jones Industrial Average Index"
                    },
                    {
                      "s": "INDEX:NKY",
                      "d": "Japan 225"
                    },
                    {
                      "s": "INDEX:DEU40",
                      "d": "DAX Index"
                    },
                    {
                      "s": "FOREXCOM:UKXGBP",
                      "d": "FTSE 100 Index"
                    },
                    {
                      "s": "MCX:GOLD1!",
                      "d": "Gold futures"
                    }
                  ],
                  "originalTitle": "Indices"
                },
                {
                  "title": "Futures",
                  "symbols": [
                    {
                      "s": "BMFBOVESPA:ISP1!",
                      "d": "S&P 500"
                    },
                    {
                      "s": "BMFBOVESPA:EUR1!",
                      "d": "Euro"
                    },
                    {
                      "s": "CMCMARKETS:GOLD",
                      "d": "Gold"
                    },
                    {
                      "s": "PYTH:WTI3!",
                      "d": "WTI Crude Oil"
                    },
                    {
                      "s": "BMFBOVESPA:CCM1!",
                      "d": "Corn"
                    }
                  ],
                  "originalTitle": "Futures"
                },
                {
                  "title": "Bonds",
                  "symbols": [
                    {
                      "s": "EUREX:FGBL1!",
                      "d": "Euro Bund"
                    },
                    {
                      "s": "EUREX:FBTP1!",
                      "d": "Euro BTP"
                    },
                    {
                      "s": "EUREX:FGBM1!",
                      "d": "Euro BOBL"
                    }
                  ],
                  "originalTitle": "Bonds"
                },
                {
                  "title": "Forex",
                  "symbols": [
                    {
                      "s": "FX:EURUSD",
                      "d": "EUR to USD"
                    },
                    {
                      "s": "FX:GBPUSD",
                      "d": "GBP to USD"
                    },
                    {
                      "s": "FX:USDJPY",
                      "d": "USD to JPY"
                    },
                    {
                      "s": "FX:USDCHF",
                      "d": "USD to CHF"
                    },
                    {
                      "s": "FX:AUDUSD",
                      "d": "AUD to USD"
                    },
                    {
                      "s": "FX:USDCAD",
                      "d": "USD to CAD"
                    }
                  ],
                  "originalTitle": "Forex"
                }
              ]
  }
});

const widgetContainer = ref(null);
let scriptElement = null;

onMounted(() => {
  // Create the script element
  scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
  scriptElement.async = true;
  
  // Set the configuration as the script's innerHTML
  // This is how TradingView reads the config
  scriptElement.innerHTML = JSON.stringify({
    colorTheme: props.colorTheme,
    dateRange: props.dateRange,
    locale: props.locale,
    largeChartUrl: props.largeChartUrl,
    isTransparent: props.isTransparent,
    showFloatingToolTip: props.showFloatingToolTip,
    plotLineColorGrowing: props.plotLineColorGrowing,
    plotLineColorFalling: props.plotLineColorFalling,
    gridLineColor: props.gridLineColor,
    scaleFontColor: props.scaleFontColor,
    belowLineFillColorGrowing: props.belowLineFillColorGrowing,
    belowLineFillColorFalling: props.belowLineFillColorFalling,
    belowLineFillColorGrowingBottom: props.belowLineFillColorGrowingBottom,
    belowLineFillColorFallingBottom: props.belowLineFillColorFallingBottom,
    symbolActiveColor: props.symbolActiveColor,
    support_host: props.support_host,
    width: props.width,
    height: props.height,
    showSymbolLogo: props.showSymbolLogo,
    showChart: props.showChart,
    tabs: props.tabs
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