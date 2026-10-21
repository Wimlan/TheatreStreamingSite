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
    Results for {{ globalSearch }}:<TheatreList
      id="search_result"
      :searchQuery="globalSearch"
    />
  </div>
  <article v-else id="show_article">
    <h1 id="site_intro">YOUR NEXT THEATRE EXPERIENCE</h1>

    <MainBanner />
    <section>
      <TheatreList slicedNumber="4" />
    </section>
    <section class="show_list">
      <h2>Musical</h2>
      <TheatreList sortByKeyword="musical" slicedNumber="4" />
    </section>
    <section class="show_list">
      <h2>Drama</h2>
      <TheatreList sortByKeyword="drama" slicedNumber="4" />
    </section>
    <section class="show_list">
      <h2>Comedy</h2>
      <TheatreList sortByKeyword="comedy" slicedNumber="4" />
    </section>
  </article>
</template>
