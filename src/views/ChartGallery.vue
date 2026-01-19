<template>
  <div class="min-h-screen bg-neutral-900 text-white">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
      <div class="flex justify-between items-center p-5">
        <h1 class="font-bold text-4xl">TradingView Charts Gallery</h1>
      </div>
    </div>

    <!-- Bento Grid Layout -->
    <div class="p-5">
      <div class="sm:flex sm:flex-col bento-grid">
        <div
          v-for="(chart, index) in charts"
          :key="chart.label"
          :class="[
            'group relative bg-neutral-800 rounded-xl overflow-hidden',
            'transition-all duration-300',
            getBentoClass(index)
          ]"
        >
          <!-- Chart Title Header -->
          <div class="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
            <h3 class="font-bold text-lg">{{ chart.label }}</h3>
          </div>

          <!-- Chart View -->
          <div
            v-if="!chart.showCode"
            @click="toggleCode(chart)"
            class="w-full h-full cursor-pointer"
          >
            <component :is="chart.component" />
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span class="text-amber-400 font-bold text-xl">See code</span>
            </div>
          </div>

          <!-- Code View -->
          <div
            v-else
            class="w-full h-full flex flex-col p-4 pt-16"
          >
            <!-- Code Display -->
            <div class="flex-1 overflow-auto bg-neutral-900 rounded-lg p-3 mb-3">
              <pre class="text-xs text-gray-300"><code>{{ chart.code }}</code></pre>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 flex-wrap">
              <button
                @click="copyCode(chart)"
                :class="[
                  'flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2',
                  chart.copied
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-400 hover:bg-amber-500 text-black'
                ]"
              >
                <svg v-if="!chart.copied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {{ chart.copied ? 'Copied!' : 'Copy' }}
              </button>
              
              <a
                :href="chart.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                Docs
              </a>
              
              <button
                @click="toggleCode(chart)"
                class="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
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

// Import raw file contents
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

// Use reactive to make properties reactive
const charts = reactive([
  { label: 'Advanced Chart', component: AdvancedChart, code: advancedChartCode, url: "https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/", showCode: false, copied: false },
  { label: 'Economic Calendar', component: EconomicCalendar, code: economicCalendarCode, url: "https://www.tradingview.com/widget-docs/widgets/calendars/economic-calendar/", showCode: false, copied: false },
  { label: 'Fundamental Data', component: FundamentalData, code: fundamentalDataCode, url: "https://www.tradingview.com/widget-docs/widgets/symbol-details/fundamental-data/", showCode: false, copied: false },
  { label: 'Heat Map', component: HeatMap, code: heatMapCode, url: "https://www.tradingview.com/widget-docs/widgets/heatmaps/stock-heatmap/", showCode: false, copied: false },
  { label: 'Market Overview', component: MarketOverview, code: marketOverviewCode, url: "https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/", showCode: false, copied: false },
  { label: 'Mini Chart', component: MiniChart, code: miniChartCode, url: "https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/", showCode: false, copied: false },
  { label: 'Screener', component: Screener, code: screenerCode, url: "https://www.tradingview.com/widget-docs/widgets/screeners/screener/", showCode: false, copied: false },
  { label: 'Symbol Overview', component: SymbolOverview, code: symbolOverviewCode, url: "https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/", showCode: false, copied: false },
  { label: 'Single Ticker', component: SingleTicker, code: singleTickerCode, url: "https://www.tradingview.com/widget-docs/widgets/tickers/single-ticker/", showCode: false, copied: false },
  { label: 'Symbol Info', component: SymbolInfo, code: symbolInfoCode, url: "https://www.tradingview.com/widget-docs/widgets/symbol-details/symbol-info/", showCode: false, copied: false },
  { label: 'Technical Analysis', component: TechnicalAnalysis, code: technicalAnalysisCode, url: "https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/", showCode: false, copied: false },
  { label: 'Ticker Tape', component: TickerTape, code: tickerTapeCode, url: "https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/", showCode: false, copied: false },
  { label: 'Top Stories', component: TopStories, code: topStoriesCode, url: "https://www.tradingview.com/widget-docs/widgets/news/top-stories/", showCode: false, copied: false },
])

// Bento grid pattern - varies by index for visual interest
const getBentoClass = (index) => {
  const patterns = [
    'col-span-2 row-span-2', // 0: large square
    'col-span-1 row-span-1', // 1: small
    'col-span-1 row-span-2', // 2: tall
    'col-span-2 row-span-1', // 3: wide
    'col-span-1 row-span-1', // 4: small
    'col-span-2 row-span-1', // 5: wide
    'col-span-1 row-span-2', // 6: tall
    'col-span-2 row-span-2', // 7: large square
    'col-span-1 row-span-1', // 8: small
    'col-span-1 row-span-1', // 9: small
    'col-span-2 row-span-1', // 10: wide
    'col-span-1 row-span-1', // 11: small
    'col-span-2 row-span-1', // 12: wide
  ]
  return patterns[index % patterns.length]
}

const toggleCode = (chart) => {
  chart.showCode = !chart.showCode
  if (!chart.showCode) {
    chart.copied = false
  }
}

const copyCode = async (chart) => {
  try {
    await navigator.clipboard.writeText(chart.code)
    chart.copied = true
    setTimeout(() => {
      chart.copied = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
/* Bento Grid Layout */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
  grid-auto-rows: 250px;
  grid-auto-flow: dense;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>