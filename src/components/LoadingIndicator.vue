<script>
export default {
  props: {
    text: { type: String, default: "Läser in..." },
  },
};
</script>

<template>
  <div class="loading loading_indicator" role="status">
    <span class="loading_spinner" aria-hidden="true"></span>
    <span>{{ text }}</span>
  </div>
</template>
