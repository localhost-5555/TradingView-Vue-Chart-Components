<template>
  <div class="flex content-center justify-center flex-wrap items-center p-5 gap-2">
    <p class="font-bold text-4xl md:text-4xl">TradingView Charts</p>
  </div>
  <div class="flex justify-center">
    <a href="/chart-gallery" class="w-fit px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-black">Charts Gallery</a>
  </div>
  <div class="flex flex-col md:flex-row justify-between items-center gap-3 p-5">
    <!-- Left container: List -->
    <div class="w-full lg:w-1/4 h-[60vh] overflow-y-auto">
      <div class="flex flex-col text-xl">
        <ul class="flex flex-col gap-0.5 p-1 bg-zinc-900 rounded-md">
          <li
            v-for="chart in charts"
            :key="chart.label"
            @click="selectedChart = chart"
            :class="[
              'w-full px-2 py-2 rounded-sm border-l-2 transition-all cursor-pointer',
              selectedChart.label === chart.label
                ? 'bg-amber-400 text-black border-amber-400'
                : 'border-neutral-600 hover:border-amber-400 hover:bg-neutral-700'
            ]"
          >
            {{ chart.label }}
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Middle container: Selected component preview -->
    <div class="flex w-full lg:w-1/3 min-h-[60vh] h-full overflow-y-scroll overflow-x-scroll">
      <component class="shadow-gray-700" :is="selectedChart.component" v-if="selectedChart" />
    </div>

    <!-- Right container: Code display -->
    <div class="w-full lg:w-1/3 h-1/2 overflow-y-auto">
      <div class="bg-zinc-900 rounded-md p-4 shadow-md shadow-gray-700">
        <div class="flex items-center justify-between mb-3 pb-2 border-b border-zinc-700">
          <span class="text-green-400 font-semibold">{{ selectedChart.label }} Vue Component</span>
          <button 
            @click="copyCode"
            class="px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-white rounded transition"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        
        <!-- Raw vue -->
        <pre class="text-sm text-gray-300">
          <code class="flex h-[60vh] overflow-x-scroll overflow-y-scroll">{{ selectedChart.code }}</code>
        </pre>

        <div class="flex items-center justify-between pt-2 border-t border-zinc-700">
          <a :href="selectedChart.url" class="text-blue-500 underline">
            See TradingView documentation
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdvancedChart from '@/components/TradingView/AdvancedChart.vue'
import EconomicCalendar from '@/components/TradingView/EconomicCalendar.vue'
import FundamentalData from '@/components/TradingView/FundamentalData.vue'
import HeatMap from '@/components/TradingView/HeatMap.vue'
import MarketOverview from '@/components/TradingView/MarketOverview.vue'
import MiniChart from '@/components/TradingView/MiniChart.vue'
import Screener from '@/components/TradingView/Screener.vue'
import SymbolOverview from '@/components/TradingView/SymbolOverview.vue'
import SingleTicker from '@/components/TradingView/SingleTicker.vue'
import SymbolInfo from '@/components/TradingView/SymbolInfo.vue'
import TechnicalAnalysis from '@/components/TradingView/TechnicalAnalysis.vue'
import TickerTape from '@/components/TradingView/TickerTape.vue'
import TopStories from '@/components/TradingView/TopStories.vue'

// Import raw file contents using ?raw suffix
import advancedChartCode from '@/components/TradingView/AdvancedChart.vue?raw'
import economicCalendarCode from '@/components/TradingView/EconomicCalendar.vue?raw'
import fundamentalDataCode from '@/components/TradingView/FundamentalData.vue?raw'
import heatMapCode from '@/components/TradingView/HeatMap.vue?raw'
import marketOverviewCode from '@/components/TradingView/MarketOverview.vue?raw'
import miniChartCode from '@/components/TradingView/MiniChart.vue?raw'
import screenerCode from '@/components/TradingView/Screener.vue?raw'
import symbolOverviewCode from '@/components/TradingView/SymbolOverview.vue?raw'
import singleTickerCode from '@/components/TradingView/SingleTicker.vue?raw'
import symbolInfoCode from '@/components/TradingView/SymbolInfo.vue?raw'
import technicalAnalysisCode from '@/components/TradingView/TechnicalAnalysis.vue?raw'
import tickerTapeCode from '@/components/TradingView/TickerTape.vue?raw'
import topStoriesCode from '@/components/TradingView/TopStories.vue?raw'

// Define all charts with their source code
const charts = [
  { label: 'Advanced Chart', component: AdvancedChart, code: advancedChartCode,url: "https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/" },
  { label: 'Economic Calendar', component: EconomicCalendar, code: economicCalendarCode, url: "https://www.tradingview.com/widget-docs/widgets/calendars/economic-calendar/" },
  { label: 'Fundamental Data', component: FundamentalData, code: fundamentalDataCode, url: "https://www.tradingview.com/widget-docs/widgets/symbol-details/fundamental-data/" },
  { label: 'Heat Map', component: HeatMap, code: heatMapCode, url: "https://www.tradingview.com/widget-docs/widgets/heatmaps/stock-heatmap/" },
  { label: 'Market Overview', component: MarketOverview, code: marketOverviewCode, url: "https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/" },
  { label: 'Mini Chart', component: MiniChart, code: miniChartCode, url: "https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/" },
  { label: 'Screener', component: Screener, code: screenerCode, url: "https://www.tradingview.com/widget-docs/widgets/screeners/screener/" },
  { label: 'Symbol Overview', component: SymbolOverview, code: symbolOverviewCode, url: "https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/" },
  { label: 'Single Ticker', component: SingleTicker, code: singleTickerCode, url: "https://www.tradingview.com/widget-docs/widgets/tickers/single-ticker/" },
  { label: 'Symbol Info', component: SymbolInfo, code: symbolInfoCode, url: "https://www.tradingview.com/widget-docs/widgets/symbol-details/symbol-info/" },
  { label: 'Technical Analysis', component: TechnicalAnalysis, code: technicalAnalysisCode, url: "https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/" },
  { label: 'Ticker Tape', component: TickerTape, code: tickerTapeCode, url: "https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/" },
  { label: 'Top Stories', component: TopStories, code: topStoriesCode, url: "https://www.tradingview.com/widget-docs/widgets/news/top-stories/" },
]

// Default to first chart
const selectedChart = ref(charts[0])

// Copy functionality
const copied = ref(false)
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(selectedChart.value.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

</script>