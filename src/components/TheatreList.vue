<script>
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator.vue";

export default {
  components: { LoadingIndicator },
  data() {
    return {
      shows: [],
      error: null,
      pendingRequests: 0,
      debouncedSearch: null,
    };
  },
  computed: {
    isLoading() {
      return this.pendingRequests > 0;
    },
    displayedShows() {
      return this.shows.slice(0, this.slicedNumber);
    },
  },
  created() {
    this.debouncedSearch = this.debounce(this.searchShows, 300);
    this.loadShows();
  },
  watch: {
    sortByKeyword() {
      this.loadShows();
    },
    searchQuery() {
      this.debouncedSearch();
    },
  },
  methods: {
    debounce(fn, delay) {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    async fetchShows(params) {
      this.pendingRequests += 1;
      try {
        this.error = null;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/shows`,
          { params },
        );

        const allShows = response.data || [];
        this.shows = allShows.sort(() => Math.random() - 0.5);
      } catch (err) {
        this.error = "Kunde inte hittas. Försöker igen...";
        setTimeout(() => this.fetchShows(params), 2000);
      } finally {
        this.pendingRequests -= 1;
      }
    },

    loadShows() {
      this.fetchShows({ genre: this.sortByKeyword || undefined });
    },

    searchShows() {
      this.fetchShows({
        genre: this.sortByKeyword || undefined,
        title: this.searchQuery.trim() || undefined,
      });
    },
  },
  props: {
    sortByKeyword: String,
    searchQuery: { type: String, default: "" },
    slicedNumber: { type: Number },
  },
};
</script>

<template>
  <section>
    <p class="loading" v-if="error" role="alert">{{ error }}</p>
    <LoadingIndicator v-else-if="isLoading" text="Läser in föreställningar..." />
    <p v-else-if="shows.length === 0" class="loading">Inga föreställningar hittades.</p>
    <div v-else class="show_genresection">
      <ul v-for="show in displayedShows" :key="show.id">
        <RouterLink id="to_show" :to="`show/${show.id}`">
          <li class="show_image">
            <img width="250" height="150" :src="show.image" alt="show image" />
          </li>
          <li class="play_icon">
            <img width="36" src="/play.png" alt="play ikon" />
          </li>
          <li class="play_icon_blue">
            <img width="36" src="/play(blue).png" alt="play ikon" />
          </li>
          <li class="description">
            <h3>{{ show.title }}</h3>
            <p>
              {{ show.subHeading }}
            </p>
          </li>
        </RouterLink>
      </ul>
    </div>
  </section>
</template>
