<!-- https://www.tradingview.com/widget-docs/widgets/calendars/economic-calendar/ -->
 
<template>
  <div class="economic-calendar-wrapper">
    <div class="tradingview-widget-container" ref="widgetContainer">
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a 
          href="https://www.tradingview.com/economic-calendar/" 
          rel="noopener nofollow" 
          target="_blank"
        >
          <span class="blue-text">Economic Calendar</span>
        </a>
        <span class="trademark"> by TradingView</span>
      </div>
    </div>
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
  isTransparent: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    default: 400
  },
  height: {
    type: [Number, String],
    default: 550
  },
  locale: {
    type: String,
    default: 'en'
  },
  // Countries to show events for
  countryFilter: {
    type: String,
    default: 'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu'
  },
  // Importance levels: -1 (low), 0 (medium), 1 (high)
  importanceFilter: {
    type: String,
    default: '-1,0,1'
  }
});

const widgetContainer = ref(null);
let scriptElement = null;

onMounted(() => {
  // Create the script element
  scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
  scriptElement.async = true;
  
  // Set the configuration as the script's innerHTML
  // This is how TradingView reads the config
  scriptElement.innerHTML = JSON.stringify({
    colorTheme: props.colorTheme,
    isTransparent: props.isTransparent,
    locale: props.locale,
    countryFilter: props.countryFilter,
    importanceFilter: props.importanceFilter,
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

<style scoped>
.economic-calendar-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
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