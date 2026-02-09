<script>
export default {
  props: {
    typeOfButton: String,
  },
};
</script>

<template>
  <button v-if="typeOfButton === 'play'" type="button">
    <img src="/public/play(black).png" alt="" />SPELA UPP
  </button>
  <input v-else-if="typeOfButton === 'trailer'" type="button" value="TRAILER" />
  <input v-else type="button" value="FAVORITER" />
</template>
