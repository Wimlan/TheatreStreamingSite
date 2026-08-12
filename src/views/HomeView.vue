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
    Resultat för {{ globalSearch }}:<TheatreList
      id="search_result"
      :searchQuery="globalSearch"
    />
  </div>
  <article v-else id="show_article">
    <h1 id="site_intro">DIN NÄSTA TEATERUPPLEVELSE</h1>

    <MainBanner />
    <section>
      <TheatreList slicedNumber="4" />
    </section>
    <section class="show_list">
      <h2>Musikal</h2>
      <TheatreList sortByKeyword="musikal" slicedNumber="4" />
    </section>
    <section class="show_list">
      <h2>Drama</h2>
      <TheatreList sortByKeyword="drama" slicedNumber="4" />
    </section>
    <section class="show_list">
      <h2>Komedi</h2>
      <TheatreList sortByKeyword="komedi" slicedNumber="4" />
    </section>
  </article>
</template>
