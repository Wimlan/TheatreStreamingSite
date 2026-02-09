<script>
import TheatreList from "../components/TheatreList.vue";
import MainBanner from "../components/MainBanner.vue";

export default {
  components: {
    TheatreList,
    MainBanner,
  },
  props: { globalSearch: String },
};
</script>

<template>
  <div v-if="globalSearch.trim().length > 0">
    Resultat för {{ globalSearch }}:<TheatreList :searchQuery="globalSearch" />
  </div>
  <article v-else id="show_article">
    <h1 id="site_intro">DIN NÄSTA TEATERUPPLEVELSE</h1>

    <MainBanner />
    <section>
      <TheatreList slicedNumber="4" />
    </section>
    <section>
      <h2>Dans</h2>
      <TheatreList sortByKeyword="classical" slicedNumber="4" />
    </section>
    <section>
      <h2>Musikal</h2>
      <TheatreList sortByKeyword="musical" slicedNumber="4" />
    </section>
    <section>
      <h2>Komedi</h2>
      <TheatreList sortByKeyword="comedy" slicedNumber="4" />
    </section>
  </article>
</template>
