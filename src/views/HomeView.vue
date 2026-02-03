<script>
import TheatreList from "../components/TheatreList.vue";

export default {
  components: {
    TheatreList,
  },
  props: { globalSearch: String },
};
</script>

<template>
  <div v-if="globalSearch.trim().length > 0">
    Resultat för {{ globalSearch }}:<TheatreList :searchQuery="globalSearch" />
  </div>
  <div v-else>
    <section><TheatreList sortByKeyword="dance" /></section>
    <section><TheatreList sortByKeyword="musical" /></section>
    <section><TheatreList sortByKeyword="comedy" /></section>
  </div>
</template>
