<script>
export default {
  props: {
    text: { type: String, default: "Loading..." },
  },
};
</script>

<template>
  <div class="loading loading_indicator" role="status">
    <span class="loading_spinner" aria-hidden="true"></span>
    <span>{{ text }}</span>
  </div>
</template>
