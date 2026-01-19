<!-- https://www.tradingview.com/widget-docs/widgets/news/top-stories/ -->
 
<template>
  <div class="timeline-wrapper">
    <div class="tradingview-widget-container" ref="widgetContainer">
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a 
          href="https://www.tradingview.com/news/top-providers/tradingview/" 
          rel="noopener nofollow" 
          target="_blank"
        >
          <span class="blue-text">Top stories</span>
        </a>
        <span class="trademark"> by TradingView</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

// Define component props with defaults and validation
const props = defineProps({
  feedMode: {
    type: String,
    default: 'all_symbols',
    required: true
  },
  colorTheme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  displayMode: {
    type: String,
    default: 'regular', // 'regular' or 'adaptive'
    validator: (value) => ['regular', 'adaptive'].includes(value)
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
  scriptElement.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
  scriptElement.async = true;
  
  // Set the widget configuration from props
  scriptElement.innerHTML = JSON.stringify({
    feedMode: props.feedMode,
    displayMode: props.displayMode,
    colorTheme: props.colorTheme,
    isTransparent: props.isTransparent,
    locale: props.locale,
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

// Watch for changes in props and reload the widget accordingly
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
.timeline-wrapper {
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